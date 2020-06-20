import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Spinner from "./../Utils/spinner";
import urls from "./../urls";
const axios = require("axios");

class Login extends Component {
  state = {
    loading: false,
    id: "cardUpload",
    fileName: "Choose File to Upload"
  };

  onChange = e => {
    switch (e.target.name) {
      case "myfile":
        if (e.target.files.length > 0) {
          this.setState({ fileName: e.target.files[0].name });
        }
        break;
      default:
        this.setState({ [e.target.name]: e.target.value });
    }
  };

  handleLoginRegister = e => {
    e.preventDefault();
    this.props.history.replace("./register");
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({"loading":true});
    const file = e.target.myfile.files[0];
    const url = urls.login;
    const formData = new FormData();
    formData.append("card", file);
    let configuration = {
      headers: {
        "content-type": "multipart/form-data"
      }
    };

    try {
      const { data } = await axios.post(url, formData, configuration);
      let token = data.acessToken;
      // this.props.handleToken.setToken(token);
      // window.localStorage.getItem(key);
      window.localStorage.setItem("x-auth-token", token);
      this.props.history.replace("./adminDashboard");
    } catch (error) {
      this.setState({"loading":false});
      console.log(error);
    }
  };

  render() {
    return (
      <div>
        <h2 className="text-center bg-warning p-2 font-weight-bold mb-0">
          Student Login
        </h2>
        <form
          className="text-center border border-dark"
          onSubmit={this.handleSubmit}
        >
          <div className="form-group m-5 p-b-2">
            <div class="custom-file  col-md-6">
              <input
                type="file"
                className="custom-file-input"
                id="customFile"
                name="myfile"
                onChange={event => this.onChange(event)}
              />
              <label className="custom-file-label" for="customFile">
                {this.state.fileName}
              </label>
            </div>
            <hr />
            <button
              type="submit"
              id="modalButton"
              className="btn btn-primary"
              disabled={this.state.loading}
              data-toggle="modal"
              data-target="#showModal"
              disabled={this.state.loading}
            >
              {this.state.loading && (
                <span>
                  Verifying Card <Spinner />
                </span>
              )}
              {!this.state.loading && <span>Upload Card</span>}
            </button>
            <div className="m-4">
              Yet to register?
              <button
                className="btn btn-danger ml-2"
                onClick={this.handleLoginRegister}
              >
                Click Here!
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
