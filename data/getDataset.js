const axios = require("axios");
const xsenv = require("@sap/xsenv");

//xsenv.loadEnv();

//const destSRVCred = xsenv.getServices({ destination:{tag:"destination"}}).destination;
//const uaaSRVCred = xsenv.getServices({ uaa:{tag:"xsuaa"}}).uaa;
const berSRVCred = xsenv.getServices({ber:{tag:"business"}}).ber;
const credUAABer = berSRVCred.uaa.clientid + ":" + berSRVCred.uaa.clientsecret;
//const sNameDst = "Business-Entity";

const getUAAToken = async () => {
    try{
        const dataToken = await axios({
            method:"get",
            url:berSRVCred.uaa.url+"/oauth/token?grant_type=client_credentials&response_type=token",
            headers:{
                Authorization:"Basic " + Buffer.from(credUAABer).toString("base64")
            }
        })

        //console.log({dataToken});
        return dataToken;
    }catch(err){

        console.log({err});
        return {};
    }

}


const getDataset = async (token) =>{
    try{
        const restDest = await axios({
            method:"get",
            url: berSRVCred.url+"/api/v1/datasets",
            headers:{
                Authorization:"Bearer " + token
            }
        })

        console.log({"Details":restDest.data});
        return restDest;
    }catch(err){

        console.log({err});
        return {};
    }

}




//console.log({uaa_srv_cred});

const getDatasetres = async () =>{

    const dataToken =  await getUAAToken();
    //const restDest = await getDataset(dataToken.data.access_token);
    
    const urlAPI = berSRVCred.url+"/api/v1/datasets"

    try{   
    const retRes = await axios.get(urlAPI,{
        headers:{
            Authorization:"Bearer " + dataToken.data.access_token
        }
        });
        console.log("Info: "+retRes.data);
        return retRes.data;
    }catch(err){
        console.log({err});
        return [];
    }

}

const postInference = async  (text,modelName,modelVersion) =>{
    const dataToken =  await getUAAToken();
    var data = JSON.stringify({
        "text": text,
        "modelName": modelName,
        "modelVersion": modelVersion
      });
    const urlAPI = berSRVCred.url+"/api/v1/inference/jobs"

    try{   
        const retRes = await axios(urlAPI,{
            method:"post",
            headers:{
                Authorization:"Bearer " + dataToken.data.access_token,
                "Content-Type": "application/json"
            },
            data:data
        });
        console.log("Info: "+retRes.data);
        return retRes.data;
    }catch(err){
        console.log({err});
        return [];
    }
}

const getInference =  async(inferenceId) => {
    const dataToken =  await getUAAToken();
    const urlAPI = berSRVCred.url+"/api/v1/inference/jobs/"+inferenceId;
    try{
        const inferenceRes = await axios(urlAPI,{
            method:"get",
            headers: {
                Authorization: "Bearer "+ dataToken.data.access_token
            }
        })
        //console.log(inferenceRes.data.data.result)
        return inferenceRes.data.data.result
    }catch(err){
        console.log({err})
        return[]
    }
}



module.exports = { getDatasetres,
                postInference,
                getDataset,
                getInference
}