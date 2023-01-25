var express = require("express");
var app = express();
//var getData = require("./data/getDataDstSrv");
var getData = require("./data/getDataset")


// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/scripts"));

// use res.render to load up an ejs view file

// index page

app.get("/", async function(req, res) {
  var newData = await getData.getDatasetres();
  //var postInference = await getData.postInference();
  console.log({newData});
  //console.log({postInference})
  //var result = inference
  //console.log(result)
  res.render("./index");
});

app.listen(8080);
console.log("Server is listening on port 8080");
