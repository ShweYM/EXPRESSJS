const jwt = require("jsonwebtoken");

const jwt_key = "my-secret";
const payload = { name: "Alex", age: 18};
let token = jwt.sign(payload, jwt_key, {expiresIn: 5})
//jwt.sign(payload, jwt_key);
console.log(token);

jwt.verify(token, jwt_key, (err, data) => {
    if(err){
        console.log("Verifcation error: ", err);
    }
    else{
        console.log("Verified data: ", data);
    }
})