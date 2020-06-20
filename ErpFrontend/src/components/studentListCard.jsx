import React, { Component } from "react";
import axios from "axios";
import urls from "../urls";
import Spinner from "../Utils/spinner";

class StudentListCard extends Component {
  state = {
    loading:false
  };

  deletestudent  = ()=>{
    this.setState({"loading":true})
    const students = this.props.student;
      let body = {"pType":students.pType,"pIdentifier":students.pIdentifier};
      let token =  window.localStorage.getItem('x-auth-token');
    console.log(token);
    let config = {
      headers:{
        'x-auth-token':token
      }
    }
      axios.post(urls.deleteStudents,body,config).then((response)=>{
        this.setState({"loading":false})
            console.log(response)
      }).catch((error)=>{
        this.setState({"loading":false})
        alert(error)
      })
  }

  render() {
    let student = this.props.student;
    return (
      <div className="card text-white bg-dark mb-3">
        <div className="card-body">
          <span className="mr-4 ml-4">{student.pIdentifier}</span>
          <div className="btn-group">
            <button
              type="button"
              className="btn btn-primary mr-2"
              data-toggle="modal"
              data-target="#studentDetailsModal"
            >
              Details
            </button>

            <div
              className="modal fade text-dark"
              id="studentDetailsModal"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="studentDetailsModalTitle"
              aria-hidden="true"
            >
              <div
                className="modal-dialog modal-dialog-centered"
                role="document"
              >
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="studentDetailsModalTitle">
                      Details of selected student
                    </h5>
                    <button
                      type="button"
                      className="close"
                      data-dismiss="modal"
                      aria-label="Close"
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form>
                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputstudentName">First Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputstudentName"
                            placeholder="Name"
                            disabled="true"
                            value={student.fname}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputstudentName">Last Name</label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputstudentName"
                            placeholder="Name"
                            disabled="true"
                            value={student.lname}
                          />
                        </div>
                        <div className="form-group col-md-6">
                          <label htmlFor="inputstudentEmail">Email</label>
                          <input
                            type="email"
                            className="form-control"
                            id="inputstudentEmail"
                            placeholder="Email"
                            disabled="true"
                            value={student.email}
                          />
                        </div>
                      </div>

                      <div className="form-row">
                        <div className="form-group col-md-6">
                          <label htmlFor="inputMobile">Mobile #</label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputMobile"
                            disabled="true"
                            value={student.phone}
                          />
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-dismiss="modal"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button 
              type="button"
              className="btn btn-danger mr-2"
              onClick={this.deletestudent}
              disabled={this.state.loading}
            >
             {this.state.loading && <span>Deleting Student <Spinner/></span>}
              {!this.state.loading && <span>Delete</span>}
            </button>
          </div>
        </div>
      </div>
    );
  }
}
export default StudentListCard;
