const processEvents = require('../utilities/processEvents');
const namespace = "org.erp.assets";
const transactionType = "deleteNotice";
const MyNetwork = require('../utilities/MyNetwork');
const express = require('express');
const auth = require('../utilities/auth');
const router = express.Router();

router.post('/',auth,async(req,res)=>{
    const mynetwork = new MyNetwork(req.cardName);
    try{

        await mynetwork.connect();
        let bnDef = mynetwork.connection.getBusinessNetwork();
        console.log("2. Received Definition from Runtime: ",bnDef.getName(),bnDef.getVersion());
        
        let factory  = bnDef.getFactory();
        let options = {
            generate:false,
           includeOptionalFields:false
        }
        //Setting the transaction variables
        let nID = req.body.nID;
       
        //Creating the Transaction
        let transaction = factory.newTransaction(namespace,transactionType,nID,options);
    
        transaction.setPropertyValue("nID",nID);
       

        processEvents(mynetwork,(response)=>{
            res.status(200).send(JSON.parse(response.deletedNotice))
        })
        return mynetwork.connection.submitTransaction(transaction).then(res=>{
            console.log("Notice Deleted Successfully");
            mynetwork.disconnect();
        }).catch(error=>{
            // console.log(error);
            res.status(400).send(error.toString())
            mynetwork.disconnect();
        })
    

    }catch(error){
        res.status(400).send(error.toString());
    }
    
})

module.exports = router;