import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import AdminTabs from "./adminTabs";
import Notice from "./notice";
import urls from "./../urls";
import Spinner from "../Utils/spinner";
const axios = require("axios");

class AdminDashboard extends Component {
  constructor() {
    super();
    this.state = {
      notice: [],
      noticeText: "This is a notice!!!",
      loading:false
    };
  }

  handleChange = noticeText => {
    noticeText = noticeText.target.value;
    this.setState({
      noticeText
    });
  };

  handlePostBtn = async e => {
    e.preventDefault();
    this.setState({"loading":true})
    try {
      //let token = window.localStorage.getItem("x-auth-token")
      let url = urls.createNotice;
      let nID = "notice"+this.state.notice.length+1;
      let desc=  this.state.noticeText;
      let datetime = new Date().toJSON().slice(0,10).replace(/-/g,'-');
      let body = {"nID":nID,"desc":desc,"datetime":datetime};
      let token =  window.localStorage.getItem('x-auth-token');
    let config = {
      headers:{
        'x-auth-token':token
      }
    }
      await axios.post(url, body,config).then((response)=>{
          console.log(response)
          this.setState({"loading":false})
      })
      window.location.reload();
    } catch (error) {
      this.setState({"loading":false})
      alert(error.err);
      console.log(error);
    }
  };

  componentDidMount =()=>{
    try {
      let token = window.localStorage.getItem("x-auth-token")
      let url = urls.getNotice;
      let config = {
      headers:{'x-auth-token':token}
      }
      axios.post(url,{},config).then((response)=>{
        
        let notices = Array.from(response.data);
        // console.log(notices)
      this.setState({"notice":notices})
      })
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    return (
      <div className="ml-2" style={{ width: "177%" }}>
        <div className="row">
          <div className="card  col-md-3 bg-dark">
            <label className="text-center p-2 m-2 bg-warning">Notice</label>
            <div className="text-center">
              <button
                type="button"
                className="btn btn-success mr-0"
                data-toggle="modal"
                data-target="#exampleModalCenter"
                style={{ width: "30%" }}
              >
                Create Notice
              </button>

              <div
                class="modal fade"
                id="exampleModalCenter"
                tabindex="-1"
                role="dialog"
                aria-labelledby="exampleModalCenterTitle"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered" role="document">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h5 class="modal-title" id="exampleModalCenterTitle">
                        Enter Notice Details
                      </h5>
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                    </div>
                    <div class="modal-body">
                      <form class="">
                        <div class="form-group border border-info">
                          <textarea
                            class="form-control"
                            id="exampleFormControlTextarea1"
                            rows="5"
                            placeholder="Start Writing Here....."
                            onChange={this.handleChange}
                          ></textarea>
                        </div>
                      </form>
                    </div>
                    <div class="modal-footer">
                      <button
                        type="button"
                        class="btn btn-secondary"
                        data-dismiss="modal"
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary"
                        onClick={this.handlePostBtn}
                        disabled={this.state.loading}
                      >
                       >
             {this.state.loading && <span>Posting Notice <Spinner/></span>}
              {!this.state.loading && <span>Post</span>}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {this.state.notice.map((noticeobj, index) => (
              
              <Notice key={index} noticeBy={noticeobj} />
            ))}
          </div>
          <div className="ml-4">
            <AdminTabs />
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(AdminDashboard);
