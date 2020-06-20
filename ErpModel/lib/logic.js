/**
 * Create Student record transaction
 * @param { org.erp.assets.createStudent } studentRecord
 * @transaction 
 */
async function createStudent(studentRecord) {
    let factory = getFactory();
    let pType = studentRecord.pType;
    let pIdentifier = studentRecord.pIdentifier;
    let fname = studentRecord.fname;
    let lname = studentRecord.lname;
    let dob = studentRecord.dob;
    let phone = studentRecord.phone;
    let email = studentRecord.email;

    let participantRegistry = await  getParticipantRegistry("org.erp.participant."+pType);
    let resource = factory.newResource('org.erp.participant',pType,pIdentifier);
    resource.pType = pType;
    resource.fname = fname;
    resource.lname = lname;
    resource.dob = dob;
    resource.phone = phone;
    resource.email = email;
    participantRegistry.add(resource).then(()=>{
        let event  = factory.newEvent('org.erp.assets','participantCreated');
        event.pregistry = JSON.stringify(resource);
        emit(event);
    })
}  

/**
 * 
 * @param {org.erp.assets.readStudent} readStudent
 * @transaction
 */
async function readStudent(readStudent){
    let namespace = "org.erp.participant.";
    let studentID = readStudent.studentID;
    let factory = getFactory();
    try{
        let pType = getCurrentParticipant().getType();
        // let pIdentifier = getCurrentParticipant().getIdentifier();
        let pregistry = await getParticipantRegistry('org.erp.participant.Student');
            let student = await pregistry.get(studentID);
      		console.log(student);
            let event = factory.newEvent('org.erp.assets','studentRead');
            event.studentdetail = JSON.stringify(student);
            emit(event);

    }catch(error){
        console.log(error);
    }
        
}

//Permission on Notice is done by ACL
/**
 * Create Notice transaction
 * @param { org.erp.assets.createNotice } adminNotice
 * @transaction 
 */
async function createNotice(adminNotice) {
    let nID = adminNotice.nID;
    let desc = adminNotice.desc;
    let datetime = adminNotice.datetime;

    let namespace = "org.erp.assets";
    // Time to also give a relationship since we added a field there
    let factory = getFactory();
    let pIdentifier = getCurrentParticipant().getIdentifier();
    let pType = getCurrentParticipant().getType();
    let creator = factory.newRelationship('org.erp.participant',pType,pIdentifier);

    // Fetch registry giving a namespace, fill it up, add it.
    let NoticeReg = await getAssetRegistry(namespace+'.Notice');
    let record = factory.newResource(namespace,'Notice',nID);
    record.nID = nID;
    record.desc = desc;
    record.datetime = datetime;
    record.creator = creator;

    await NoticeReg.add(record);

    // Create and Emit an Event to notify calling applicaton with appropriate response
    let event = factory.newEvent(namespace,'noticeCreated');
    event.notice = JSON.stringify(record);
    emit(event);
}  



/**
 * Create Notice transaction
 * @param { org.erp.assets.updateNotice } updateNotice
 * @transaction 
 */
async function updateNotice(updateNotice) {
    let nID =  updateNotice.nID;
    let newdesc = updateNotice.desc;
    let namespace = "org.erp.assets";
    // Time to also give a relationship since we added a field there
    let factory = getFactory();

    // Fetch registry giving a namespace, fill it up, add it.
    let NoticeReg = await getAssetRegistry('org.erp.assets.Notice');
 	 	 let record = await NoticeReg.get(nID);
  		record.desc = newdesc;
    await NoticeReg.update(record);

    // Create and Emit an Event to notify calling applicaton with appropriate response
    let event = factory.newEvent(namespace,'NoticeUpdated');
   		event.updatedNotice = JSON.stringify(record);
    emit(event);
}  

/**
 * 
 * @param {org.erp.assets.deleteNotice} noticeData
 * @transaction 
 */
async function deleteNotice(noticeData){
    let nID = noticeData.nID;
    let namespace = "org.erp.assets";
    let factory = getFactory();

    let NoticeReg = await getAssetRegistry(namespace+'.Notice');
    let record = await NoticeReg.get(nID);
    await NoticeReg.remove(record);
  let event = factory.newEvent(namespace,'noticeDeleted');
  	event.deletedNotice = JSON.stringify(record);
  	emit(event);
}

 
 /**
  * @param {org.erp.assets.deleteParticipant} pData
  * @transaction
  */
 async function deleteParticipant(pData){
    let pIdentifier = pData.pIdentifier;
    let factory = getFactory();
    //Programmatic Acess Control
     let currentParticipant = getCurrentParticipant().getType();
    if(currentParticipant!=='Admin' && currentParticipant!=='NetworkAdmin'){
        throw new Error("Only Admin can delete Student");
    } 
    

    let namespace = "org.erp.participant.Student";
    let participantRegistry = await  getParticipantRegistry(namespace);
    const student = await participantRegistry.get(pIdentifier);
   await participantRegistry.remove(student);
   let event = factory.newEvent('org.erp.assets','studentDeleted');
   event.pregistry = JSON.stringify(student);
        emit(event);
}
    

/**
 * @param {org.erp.assets.getAllStudents} students
 * @transaction
 */
async function getAllStudents(students){
  
    //Programmatic Access Control
    let currentParticipant = getCurrentParticipant().getType();
    if(currentParticipant!=='Admin'){
        throw new Error("Only Admin can Read the Students Record");
    }
  	 let factory = getFactory();
    let results = await query('getAllStudents');
    let event = factory.newEvent('org.erp.assets','allStudents');
    event.students = JSON.stringify(results);
    emit(event);
}

 

/**
 * @param {org.erp.assets.readNotices} readNotices
 * @transaction 
 */
async function readNotices(readNotices){
    let factory = getFactory();
let results = await query('getNotices');
let event = factory.newEvent('org.erp.assets','NoticeRead');
event.notices = JSON.stringify(results);
emit(event);
}