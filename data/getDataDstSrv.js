const axios = require("axios");
const xsenv = require("@sap/xsenv");

xsenv.loadEnv();

const destSRVCred = xsenv.getServices({ destination:{tag:"destination"}}).destination;
const uaaSRVCred = xsenv.getServices({ uaa:{tag:"xsuaa"}}).uaa;
const credUAADst = destSRVCred.clientid + ":" + destSRVCred.clientsecret;
const sNameDst = "Business-Entity";

const getUAAToken = async () => {
    try{
        const dataToken = await axios({
            method:"get",
            url:uaaSRVCred.url+"/oauth/token?grant_type=client_credentials&response_type=token",
            headers:{
                Authorization:"Basic " + Buffer.from(credUAADst).toString("base64")
            }
        })

        //console.log({dataToken});
        return dataToken;
    }catch(err){

        console.log({err});
        return {};
    }

}


const getDestRes = async (token) =>{
    try{
        const restDest = await axios({
            method:"get",
            url: destSRVCred.uri+"/destination-configuration/v1/destinations/"+sNameDst,
            headers:{
                Authorization:"Bearer " + token
            }
        })

        console.log({"Details":restDest.data.destinationConfiguration});
        return restDest;
    }catch(err){

        console.log({err});
        return {};
    }

}




//console.log({uaa_srv_cred});

const getData = async () =>{

    const dataToken =  await getUAAToken();
    const restDest = await getDestRes(dataToken.data.access_token);
    
    const urlAPI = restDest.data.destinationConfiguration.URL+"/api/v1/datasets";
    const username = restDest.data.destinationConfiguration.clientId;
    const password = restDest.data.destinationConfiguration.clientSecret;


    try{   
    const retRes = await axios.get(urlAPI,{
            auth:{
                username:username,
                password:password
            }
        });
        console.log(retRes.data.d.results);
        return retRes.data.d.results;
    }catch(err){
        console.log({err});
        return [];
    }

}




module.exports = getData;