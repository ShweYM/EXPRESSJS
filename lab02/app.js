const express = require('express');

const app = express();

app.get('/',(req,res) => {
    res.send("Hello From Lab02");
})

const handler = (req,res) => {
    console.log(req.mehtod, " ", req.originalUrl);
    //res.send('<h1>Endpoint method ${req.method} at path ${req.originalUrl}')

    res.format({
        "text/html": () => {
            res.send(`<h1>Mehod ${req.method} - path ${req.originalUrl}</h1>`);
         },
         "text/plain": () => {
            res.send(`Mehod ${req.method}, Path ${req.originalUrl}`);
         },
         "application/json": () => {
            res.send({method : `${req.method}`, path : `${req.originalUrl}` });
         },
         default: () => {
            res.status(406).send("Not acceptable");
         }, 
    })
};

app.get("/hello",handler);

app.post("/foo",handler);

app.put("/bar",handler);

app.delete("/foo/bar",handler);

//exercise

const handlerEx = (req,res) => {
    console.log(req.mehtod, " ", req.originalUrl);
    let datetime = new Date();
    //res.send('<h1>Endpoint method ${req.method} at path ${req.originalUrl}')

    res.format({
        "text/html": () => {
            //res.send(`<h1>Mehod ${req.method} - path ${req.originalUrl}</h1>`);
            //res.send(datetime)
            res.send(`<h3> ${datetime.toISOString()} </h3>`);
         },
         "text/plain": () => {
            //res.send(`Mehod ${req.method}, Path ${req.originalUrl}`);
            res.send(datetime.toISOString());
         },
         "application/json": () => {
            res.send({datetime : `${datetime.toISOString()}` });
            
         },
         default: () => {
            res.status(406).send("Not acceptable");
         }, 
    })
};

app.get("/time",handlerEx);

//


app.listen(3000, () => {
    console.log("Server is running on port 3000")
});