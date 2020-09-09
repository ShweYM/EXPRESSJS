const express = require("express");

//const router = require("./routers/helloRouter");
//const obj = require("./routers/helloRouter");
const { router } = require("./routers/tvshow.router");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/api", router);

app.get("/", (req, res) => {
  res.send("Home Page");
});

// localhost:3000/
app.listen(3000, () => {
  console.log("Server is running at port 3000");
});
