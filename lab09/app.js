const express = require("express");
require("dotenv").config();
const bodyParser = require("body-parser");
const bookRouter = require('./routers/user.router')
require("./models/db")

console.log(process.env.PORT);
console.log(process.env.DATABASE_URL);

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/", bookRouter);

app.get("/",(req,res) => {
  res.send("Homepage");
})

// localhost:3000/
app.listen(process.env.PORT, () => {
  console.log(`Server running at port ${process.env.PORT}`);
});
