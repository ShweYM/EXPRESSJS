const express = require("express");
let data = require("./../data");
const router = express.Router();
//const contains = express.contains();

const sorting = (order) => {
  if (order == "asc") {
    return (a, b) => (a.title < b.title ? -1 : 1);
  } else if (order == "desc") {
    return (a, b) => (a.title < b.title ? 1 : -1);
  } else {
    return undefined;
  }
};

router.route("/world").get((req, res) => {
  res.send("Hello World");
});

router.route("/singapore").get((req, res) => {
  res.send("Hello Singapore");
});

router.route("/data").get((req, res) => {
  console.log("Query Strings: ", req.query);

  let result = {};

  // Filtering

  if (req.query.title) {
    result = data.filter((item) => {
      return item.title.toLowerCase().includes(req.query.title.toLowerCase());
    });
  } else {
    result = data;
  }

  // Sorting

  let f = sorting(req.query.sorted);
  result.sort(f);

  // if (req.query.sorted == "asc") {
  //   result.sort((a, b) => (a.title < b.title ? -1 : 1));
  // }
  // else if(req.query.sorted == "desc"){
  //   result.sort((a, b) => a.title < b.title ? 1 : -1 );
  // }

  res.json({ result, count: data.length });
});

router.route("/data").get((req, res) => {
  res.json({ result: data, count: data.length });
});

//////////

router.route("/demo/:x/:y?/:z?").get((req, res) => {
  console.log(req.params);
  res.json(req.params);
});

router.route("/data/:id").get((req, res) => {
  const result = data.filter((item) => item.id == req.params.id);
  if (result.length == 0) {
    res.status(404).send(`Not found ${req.params.id}`);
  }
  res.json(result[0]);
});

router.route("/data/:id/:case?").get((req, res) => {
  const result = data.filter((item) => item.id == req.params.id);

  let item = { ...result[0] };
  console.log(item);

  //update item's title
  if (item) {
    let { title } = item;
    if (req.params.case === "upper") {
      title = item.title.toUpperCase();
    } else if (req.params.case === "lower") {
      title = item.title.toLowerCase();
    }
    item = { ...item, title };
  }
  res.json({ result: item });
});

const name = "Alex";
const age = 21;

module.exports = { router, name, age };

//module.exports = router;//export this particular object
