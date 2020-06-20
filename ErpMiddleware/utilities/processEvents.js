
 function processEvents(bnUtil,callback){
    bnUtil.connection.on('event',(event)=>{
        const NS = 'org.erp.assets'
        var namespace = event.$namespace;
        var eventtype = event.$type;
        var fqn = namespace+'.'+eventtype;
        // #3 Filter the events
        switch(fqn){
            case    `${NS}.participantCreated`:
                    returnResponse(bnUtil,callback,event);    
                    break;
            case    `${NS}.studentRead`:
                    returnResponse(bnUtil,callback,event);    
                    break;
            case    `${NS}.noticeCreated`:
                    returnResponse(bnUtil,callback,event);  
                    break;
            case    `${NS}.NoticeUpdated`:
                    returnResponse(bnUtil,callback,event);    
                    break;
            case    `${NS}.noticeDeleted`:
                     returnResponse(bnUtil,callback,event);    
                      break;
             case     `${NS}.allStudents`:
                        returnResponse(bnUtil,callback,event);
                        break;
            case      `${NS}.NoticeRead`:
                        returnResponse(bnUtil,callback,event);    
                        break;
            case    `${NS}.studentDeleted`:
                     returnResponse(bnUtil,callback,event); 
            default:    
                    console.log("Ignored event: ", fqn);
        }
    });
}
function returnResponse(bnUtil,callback,event){
        // console.log(event)
        callback(event);
//     bnUtil.disconnect();
}
module.exports = processEvents;
