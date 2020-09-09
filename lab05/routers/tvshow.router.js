const express = require("express");
let data = require("./../data");
const router = express.Router();

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

// Save an item

router.route("/data/").post((req,res) => {
  console.log(req.body);
  let item = req.body;
  data.push(item)
  items = data.slice(-1);
  res.json(items[0]);
});

// Update an item

router.route("/data/:id").put((req, res) => {
  let input = req.body;
  console.log(input);

  let id = Number(req.params.id);

  let updateItem = { ...input,id};
  // find existing item in the list
  let index = data.findIndex((item) => item.id == req.params.id);

  if(!data[index]){
    res.status(404).json({message: `Item with id ${id} not found`});
    return;
  }

  data.splice(index, 1, updateItem);
  console.log(index, data[index])
  res.json(data[index])

  //res.send(`Updating item ${req.params.id} : ${JSON.stringify(input)}`);
});

// Delete an item
router.route("/data/:id").delete((req,res) => {
  console.log(req.params.id);
  let id = Number(req.params.id);
  let index = data.findIndex((item) => id == item.id);
  if(! data[index]){
    res.status(404).json({message: `Item with id ${id} not found`});
    return;
  }
  item = data.splice(index,1);
  console.log(item);

  res.send(`Delete item with id ${req.params.id}`);
})

module.exports = { router };
