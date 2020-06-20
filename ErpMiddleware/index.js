const express = require('express');
const config = require('config');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
const bnUtil = require('./routes/bnUtil');
const home = require('./routes/home');
const downloadCard = require('./routes/downloadCard');
const createStudent = require('./routes/createStudent');
const readStudent = require('./routes/readStudent');
const deleteStudent  = require('./routes/deleteStudent');
const getStudents = require('./routes/getStudents');
const createNotice = require('./routes/createNotice');
const readNotices   = require('./routes/readNotices');
const updateNotice = require('./routes/updateNotice');
const deleteNotice = require('./routes/deleteNotice');


if(!config.get("jwtPrivateKey")){
    console.error("FATAL error: Jwt key not defined...");
    process.exit(1);
  }
app.use(bodyparser.json()) 
app.use(cors());
app.use('/downloadCard',downloadCard);
app.use('/bnUtil',bnUtil);
app.use('/',home);
app.use('/createStudentParticipant',createStudent);
app.use('/readStudent',readStudent);
app.use('/deleteStudent',deleteStudent);
app.use('/getStudents',getStudents);
app.use('/createNotice',createNotice);
app.use('/readNotices',readNotices);
app.use('/updateNotice',updateNotice);
app.use('/deleteNotice',deleteNotice);

const port = process.env.PORT||5000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));