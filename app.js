var express = require("express");
var app = express();
var getData = require("./data/getDataset")
var session = require("express-session")

var cors = require('cors')
var bodyParser= require("body-parser")


app.use(cors())

// set the view engine to ejs
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/scripts"));

app.use(bodyParser.urlencoded({extended: false}))

app.use(bodyParser.json())

app.use(session({
  secret:'keyboard cat',
  resave: false,
  saveUnitialized:true,
  cookie: {secure:true,  maxAge:120000},

}))


// index page

app.get("/",  function(req, res) {
  //var newData = await getData.getDatasetres();
  //var postInference = await getData.postInference();
  //console.log({newData});
  //console.log({postInference})
  //var result = inference
  //console.log(result)
  var result = req.session.response
  res.render("../scripts/index",{data:result});
});

app.post("/postinference",async (req,res)=>{
 
    var text = req.body.text
    var dataModel = req.body.dataModel
    //var postInference = await getData.postInference(text,dataModel);
   // var id = postInference.id
    //console.log(id)
    //var response = await getData.getInference(id)
   // req.session.response= response
    //console.log({response})
    //res.redirect("/")
  
  getData.postInference(text,dataModel).then((response)=>{
    var id = response.data.id
    getData.getInference(id).then((result)=>{
      console.log({result})
      req.session.response = result
    })
  })
})

app.get("/getinference",async (req,res)=>{
  

})

app.listen(8080);
console.log("Server is listening on port 8080");