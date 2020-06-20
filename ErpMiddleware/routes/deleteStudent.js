const namespace = "org.erp.assets";
const transactionType = "deleteParticipant";
const MyNetwork = require('../utilities/MyNetwork');
const express = require('express');
const auth = require('../utilities/auth');
const processEvents = require('../utilities/processEvents');
const AdminConnection = require('composer-admin').AdminConnection;
const router = express.Router();

router.post('/',auth,async(req,res)=>{
    const mynetwork = new MyNetwork(req.cardName);
  try{
    await mynetwork.connect();
    let bnDef = mynetwork.connection.getBusinessNetwork();
    let factory = bnDef.getFactory();
    console.log("2. Received Definition from Runtime: ",bnDef.getName(),bnDef.getVersion());
    let options = {
        generate:false,
       includeOptionalFields:false
    }
    const pType = req.body.pType;
    const pIdentifier = req.body.pIdentifier;
    // console.log(pType,pIdentifier)
    let transaction = factory.newTransaction(namespace,transactionType,pIdentifier,options);
    transaction.setPropertyValue("pType",pType);
    transaction.setPropertyValue("pIdentifier",pIdentifier);

    processEvents(mynetwork,async (response)=>{
  
      new AdminConnection().deleteCard(`${pIdentifier}@erp`).then(response=>{
        return res.status(200).send("Participant Deleted Successfully...")
      }).catch(error=>{
        console.log(error)
        return res.status(400).send(error);
      }) 
        // return res.status(200).send(response.pregistry);
       
    })
    
    //Submitting the transaction
    return mynetwork.connection.submitTransaction(transaction).then(response=>{
      console.log("Deleting Card...")
    }).catch(error=>{
      console.log("Something went wrong")
      return res.status(400).send(error);
    })
     
  }catch(error){
    console.log(error)
      return res.status(400).send(error)
  }
   
})

module.exports = router;