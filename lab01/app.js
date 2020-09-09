const express = require("express");

const app = express();

app.get('/',(req,res) => {
    res.send("Home Page")
});

app.get('/hello',(req,res) => {
    res.send("Hello World")
});

//npx nodemon app.js (no need to restart server)
app.get('/hello/world',(req,res) => {
    res.send("Another Hello World")
});

// endpoint 'GET /time'
app.get('/time',(req,res) => {
    let today = new Date();
    //const pi = 3.1415926;
    res.send("Current Date Time: " + today);
});

app.get('/greet',(req,res) => {
    let today = new Date();
    let hour = today.getHours();
    //res.send(today);
    if(hour > 5 && hour < 12){
        //console.log(today);
        res.send("Good Morning");
    }
    else if(hour > 12 && hour < 7){
        res.send("Good Afternoon");
    }
    else{
        res.status(201).send("Good Night");
    }
    
});

// localhost:3000/
app.listen(3000, () => {
    console.log("Server is running at port 3000");
});