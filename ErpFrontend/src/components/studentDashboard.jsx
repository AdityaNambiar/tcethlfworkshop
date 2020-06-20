import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Notice from "./notice";
import urls from "./../urls";
const axios = require("axios");

class StudentDashboard extends Component {
  constructor() {
    super();
    this.state = {
      noticeBy: ["Admin1", "Admin2", "Admin3", "Admin4"],
      studentDetails: {
        fname: "Gopi",
        lname: "Mehta",
        email: "gopi@gmail.com",
        dob: "1997-08-25",
        mobile: "8898843882"
      }
    };
  }

  getStudentDetails = async e => {
    e.preventDefault();
    try {
      //let token = window.localStorage.getItem("x-auth-token")
      let url = urls.readStudentDetails;
      //let config = {
      //headers:{'x-auth-token':token}
      //}
      let { data } = await axios.get(url);
      this.setState({ studentDetails: data });
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let studentDetails = this.state.studentDetails;
    return (
      <div className="ml-2" style={{ width: "177%" }}>
        <div class="row">
          <div className="card  col-md-3 bg-dark">
            <label className="text-center p-2 m-2 bg-warning">Notice</label>
            {this.state.noticeBy.map((noticeBy, index) => (
              <Notice key={index} noticeBy={noticeBy} />
            ))}
          </div>
          <div className="ml-4 w-50 ">
            <h3>Student's personal details!</h3>
            <form className="ml-4 mt-4">
              <div class="form-group col-md-6">
                <label for="inputFName">First Name</label>
                <input
                  type="text"
                  class="form-control"
                  id="inputFName"
                  placeholder="First Name"
                  value={studentDetails.fname}
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputLName">Last Name</label>
                <input
                  type="text"
                  name="lname"
                  class="form-control"
                  id="inputLName"
                  placeholder="Last Name"
                  value={studentDetails.lname}
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputEmail4">Email</label>
                <input
                  type="email"
                  name="email"
                  class="form-control"
                  id="inputEmail4"
                  placeholder="Email"
                  value={studentDetails.email}
                  disabled
                />
              </div>
              <div class="form-group col-md-6">
                <label for="inputDOB">Date of Birth</label>
                <input
                  type="date"
                  name="dob"
                  class="form-control"
                  id="inputDOB"
                  value={studentDetails.dob}
                  disabled
                />
              </div>
              <div class="form-group col-md-3">
                <label for="exampleFormControlSelect1">Current Year</label>
                <select
                  class="form-control"
                  name="currentYear"
                  id="exampleFormControlSelect1"
                  value={studentDetails.currentYear}
                  disabled
                >
                  <option value="First Year">First Year</option>
                  <option value="Second Year">Second Year</option>
                  <option value="Third Year">Third Year</option>
                  <option value="Fourth Year">Fourth Year</option>
                </select>
              </div>
              <div class="form-group col-md-6">
                <label for="mobileNo">Mobile No</label>
                <input
                  type="text"
                  name="mobile"
                  class="form-control"
                  id="mobileNo"
                  placeholder="Eg: 1234567890"
                  value={studentDetails.mobile}
                  disabled
                />
              </div>
              <button type="submit" class="btn btn-primary m-2">
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(StudentDashboard);
