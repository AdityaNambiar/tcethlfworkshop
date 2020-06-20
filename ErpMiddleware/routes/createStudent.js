const networkAdminCard = 'admin@erp'
const CardExport = require('composer-cli').Card.Export;
const IdentityIssue = require('composer-cli').Identity.Issue;
const config = require('config');
const IdCard = require('composer-common').IdCard;
const AdminConnection = require('composer-admin').AdminConnection;
const BusinessNetworkCardStore = require('composer-common').BusinessNetworkCardStore;
const namespace = "org.erp.assets";
const transactionType = "createStudent";
const MyNetwork = require('../utilities/MyNetwork');
const express = require('express');
const auth = require('../utilities/auth');
const path = require('path')
const exportCard = require('../utilities/exportCard')
const fs = require('fs');
const procesEvents  = require('../utilities/processEvents')
const router = express.Router();
 
router.post('/',async(req,res)=>{
    const mynetwork = new MyNetwork(networkAdminCard);
try{
    
    await mynetwork.connect();
    let bnDef = mynetwork.connection.getBusinessNetwork();
    let factory = bnDef.getFactory();
    console.log("2. Received Definition from Runtime: ",bnDef.getName(),bnDef.getVersion());
    let options = {
        generate:false,
       includeOptionalFields:false
    }
    const networkName = "erp";
let pType = 'Student';
let pIdentifier = req.body.email;
let fname = req.body.fname;
let lname = req.body.lname;
let dob = req.body.dob;
let email = req.body.email;
let phone = req.body.mobile;

let transaction = factory.newTransaction(namespace,transactionType,pIdentifier,options);

transaction.setPropertyValue("pType",pType);
transaction.setPropertyValue("pIdentifier",pIdentifier);
transaction.setPropertyValue("fname",fname);
transaction.setPropertyValue("lname",lname);
transaction.setPropertyValue("dob",dob);
transaction.setPropertyValue("email",email);
transaction.setPropertyValue("phone",phone);
 
let flag=true;
let finalResponse = "";

//checking identity exist or not ;
let identityData = await identityExists(pIdentifier);
if(identityData){
    return res.status(400).send("Please select new Participant name...")
    // throw new Error("Please select new Particpant name...")
}
procesEvents(mynetwork,(response)=>{
    // console.log(response.pregistry)
    finalResponse = response.pregistry;
    res.status(200).send(finalResponse);
})
    //Submitting the transaction
    if(flag==true){
        console.log("Submitting transaction...")
        await mynetwork.connection.submitTransaction(transaction);
        flag=false;
    }
    
    //Issuing the identity

      let newUserId = pIdentifier;
      let participantId = `resource:org.erp.participant.${pType}#${pIdentifier}`;
      let identity=  await mynetwork.connection.issueIdentity(participantId,newUserId);
        console.log("Issuing Identity without issuer");
        
    const userID = identity.userID;
     const userSecret = identity.userSecret;
    await createCard(userID,userSecret,pType,networkName);
//Ping with the new Card
    console.log('Ping with the card..')
    const NetworkPing = require('composer-cli').Network.Ping;

        let pingOptions = {
        card: `${pIdentifier}@${networkName}`
        };

    NetworkPing.handler(pingOptions);
    return res.status(200).send(finalResponse);
    // res.status(200).send({"participantKey":pIdentifier,"type":pType})
}catch(error){
    mynetwork.disconnect();
    return res.status(400).send(error.toString());
   
}
async function identityExists(name){
    return new Promise(async (resolve,reject)=>{
 
     try{
         let identityRegistry = await mynetwork.connection.getIdentityRegistry();
         let identities = await identityRegistry.getAll();
         
         let identityData = {};
         for(let i=0;i<identities.length;i++){
             let identity = identities[i];
             let identityName = identity.name;
                 let certificate = identity.certificate;
                 if(identityName==name){
                     identityData = {"name":identityName,"certificate":certificate}
                     break;
                 }   
         } 
         if(Object.keys(identityData).length>0){
             resolve(identityData)
         }else{
             resolve(false)
         }
     }catch(error){
         return res.status(400).send(error)
     }
 
     })
 }
})




async function createCard(userID,enrollSecret,role,networkName){
    const adminConnection = new AdminConnection();
    let connectionProfile = config.get("connectionProfile");
    let hlfVersion = config.get("hlfVersion");
    const metadata = {
        userName: userID,
        version: hlfVersion,
        enrollmentSecret: enrollSecret,
        businessNetwork: networkName
     };
     const idCardData = new IdCard(metadata,connectionProfile);
     const idCardName = BusinessNetworkCardStore.getDefaultCardName(idCardData);
     try{
        const imported = await adminConnection.importCard(idCardName, idCardData);
        console.log("Card Imported Successfully..",idCardName);
        
    } catch(error){
        console.log("Card To directory failed..")
        throw error;
    }
}

module.exports = router;