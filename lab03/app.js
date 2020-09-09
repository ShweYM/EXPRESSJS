const express = require('express');

const app = express();
const path = require("path")

app.use("/hello/world",(req, res, next) => {
   console.log("I m in middleware");
   next();
})

app.use("/static",express.static(path.join(__dirname,"/public")));

const handler = (req,res) => {
    console.log("I m in handler");
    res.send(`<h1>Method ${req.method} - path ${req.originalUrl}`)
};

app.get('/about',(req,res) => {
   //res.redirect("/static/about.html");
   throw new Error("Error occured");
})

app.get("/hello",handler);

app.use((req,res) => {
   res
      .status(404)
      .sendFile(path.join(__dirname,"public","404.html"));
});

app.use((err,req,res,next)=>{
   res.status(500).redirect("/static/500.html");
});

app.listen(3000, () => {
    console.log("Server is running on port 3000")
});