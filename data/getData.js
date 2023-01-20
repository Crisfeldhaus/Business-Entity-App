const axios = require("axios");

//The System Exposed with Below IP address is removed
//Use your own System IP
const _URL = 
"http://34.134.118.214:50000/sap/opu/odata/sap/Z_C_SALES_LEAD_03_CDS/Z_C_SALES_LEAD_03?$format=json";


var getData = async () => {
    try{   
    const retRes = await axios.get(_URL,{
            auth:{
                username:"developer",
                password:"Ldtf5432"
            }
        });
        return retRes.data.d.results;
    }catch(err){
        console.log({err});
        return [];
    }
}

module.exports = getData;