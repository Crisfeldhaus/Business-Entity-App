import { postInference, getInference } from '/getDataset.js';

var btn = document.getElementById("submit")
var text = document.getElementById("text").value
var modelName = document.getElementById("framework").value

 async function formSubmit(){
    preventDefault();
    
    var req = await postInference(text,modelName)
    console.log({req})
    var res = await getInference(req.data.id)
    console.log({res})
    var response = document.getElementById("response")

    response.innerHTML = res.data
}