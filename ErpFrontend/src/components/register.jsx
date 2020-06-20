import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import urls from "./../urls";
import Spinner from "../Utils/spinner";
const axios = require("axios");

class Register extends Component {
  state = {
    studentDetails: {
      fname: "",
      lname: "",
      email: "",
      dob: "",
      mobile: ""
    },
    loading:false
  };

  handleChange = e => {
    let studentDetails = this.state.studentDetails;
    let name = e.target.name;
    studentDetails[name] = e.target.value;
    this.setState({ studentDetails: studentDetails });
  };

   cardImport(){
      return axios.post(urls.register,this.state.studentDetails);
  }

  handleRegisterBtn = async e => {
    e.preventDefault();
    this.setState({"loading":true});
    try {
      //let token = window.localStorage.getItem("x-auth-token")
      
      let body = this.state.studentDetails;
      //let config = {
      //headers:{'x-auth-token':token}

      //}
          // const response = await axios.post(urls.register,body);
          // console.log("Hello!!");
            let _this = this;
               return axios.post(urls.register,body)
            .then(function (response) {
                let pIdentifier = response.data.pIdentifier;
                setTimeout(()=>{
                  axios.post(urls.downloadCard,{"pIdentifier":pIdentifier}).then(()=>{
                    
                    _this.setState({"loading":false})
                    _this.props.history.replace("./login");
                  }).catch((error)=>{
                    _this.setState({"loading":false})
                      console.log(error)
                  })
                },4000)
                
            })
            .catch(function (error) {
              // handle error
              console.log(error);
            })
      
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    let studentDetails = this.state.studentDetails;
    return (
      <div>
        <h2 className="text-center bg-warning p-2 font-weight-bold ">
          Student Registration
        </h2>
        <div className="ml-4 w-75 ml-auto">
          <form className="ml-4 w-100 ml-auto">
            <div class="form-group col-md-6">
              <label for="inputFName">First Name</label>
              <input
                type="text"
                name="fname"
                class="form-control"
                id="inputFName"
                placeholder="First Name"
                value={studentDetails.fname}
                onChange={this.handleChange}
                required
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
                onChange={this.handleChange}
                required
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
                onChange={this.handleChange}
                required
              />
            </div>

            <div class="form-group col-md-3">
              <label for="inputDOB">Date of Birth</label>
              <input
                type="date"
                name="dob"
                class="form-control"
                id="inputDOB"
                value={studentDetails.dob}
                onChange={this.handleChange}
                required
              />
            </div>
            <div class="form-group col-md-3">
              <label for="mobileNo">Mobile No</label>
              <input
                type="text"
                name="mobile"
                class="form-control"
                id="mobileNo"
                placeholder="Eg: 1234567890"
                value={studentDetails.mobile}
                onChange={this.handleChange}
                required
              />
            </div>
            <button
              type="submit"
              class="btn btn-primary m-2 text-center"
              onClick={this.handleRegisterBtn}
              disabled={this.state.loading}
            >
             {this.state.loading && <span>Registering <Spinner/></span>}
              {!this.state.loading && <span>Register</span>}
            </button>
          </form>
        </div>
      </div>
    );
  }
}

export default withRouter(Register);
