import React, { Component } from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import StudentListCard from "./studentListCard";
import urls from "../urls";
import jwt from 'jsonwebtoken';
const axios = require("axios");

class AdminTabs extends Component {
  state = {
    students: []
  };
  getStudents = ()=> {
   let sArray = [];
    this.state.students.map((sobj, i) => {
      sArray.push(<StudentListCard student={sobj} key={sobj.pIdentifier} />);
    });
    return sArray;
  }; 

  componentDidMount = async () => {
    let token =  window.localStorage.getItem('x-auth-token');
      let pType = jwt.decode(token).pType;
      let config = {
        headers:{
          'x-auth-token':token
        }
      }
      if(pType=='Admin'){
        axios.post(urls.getStudents,{},config).then((response)=>{
            this.setState({"students":response.data})
        })
      }else{
          axios.post(urls.readStudentDetails,{},config).then((response)=>{
            let studentsArray = [];
            studentsArray.push(response.data)
           this.setState({"students":studentsArray})
          })

      }
  };
  docs = {
    width: 550,
    height: "auto",
    borderRadius: "15px",
    boxShadow: "10px 5px 15px rgba(0,0,0,0.4)",
    display: "block",
    margin: "0px auto"
  };

  render() {
    return (
      <div className="form-row mb-0">
        <fieldset className="form-group col-md-12 mb-0">
          <div style={{ margin: "10px auto" }}>
            <legend style={{ fontSize: "20px" }}>All Students</legend>
            <div style={this.docs}>
             {this.getStudents()}
            </div>
          </div>
        </fieldset>
      </div>
    );
  }
}

export default AdminTabs;
