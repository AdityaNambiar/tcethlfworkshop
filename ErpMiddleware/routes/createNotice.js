const processEvents = require('../utilities/processEvents');
const namespace = "org.erp.assets";
const transactionType = "createNotice";
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
        let desc = req.body.desc; 
        let datetime = req.body.datetime;
        //Creating the Transaction
        let transaction = factory.newTransaction(namespace,transactionType,nID,options);
    
        transaction.setPropertyValue("nID",nID);
        transaction.setPropertyValue("desc",desc);
        transaction.setPropertyValue("datetime",datetime);
       
        processEvents(mynetwork,(response)=>{
            
            res.status(200).send(JSON.parse(response.notice))
        })
        return mynetwork.connection.submitTransaction(transaction).then(res=>{
            console.log("Notice created Successfully");
            mynetwork.disconnect();
        }).catch(error=>{
            console.log(error);
            res.status(400).send({err: error.toString()})
            mynetwork.disconnect();
        })
    

    }catch(error){
        res.status(400).send(error.toString());
    }
    
})

module.exports = router;