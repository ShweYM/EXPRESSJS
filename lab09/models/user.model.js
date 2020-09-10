const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  roles: {
    type: [{ type: String }],
    default: ["user"],
  },
});

//let getJwtBody = (user) => user;
const getJwtBody = ({ _id, email, roles}) => ({ _id, email, roles});

schema.methods.generateAuthToken = async function () {
  // Generate an auth token for the user
  const user = this;
  const token = jwt.sign(getJwtBody(user), process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXP,
  });
  return token;
};

schema.statics.findByCredentials = async (email, password) => {
  // Search for a user by email and password.
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error({ error: "Invalid login credentials" });
  }
  const isMatched = password === user.password;
  if (!isMatched) {
    throw new Error({ error: "Invalid login credentials" });
  }
  return user;
};

// (Model Name, Schema object, Collection Name)
const User = mongoose.model("User", schema, "users");

module.exports = User;
