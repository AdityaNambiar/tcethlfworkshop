import React, { Component } from "react";
import axios from "axios";
import urls from "../urls";
import Spinner from "../Utils/spinner";

class Notice extends Component {
  state = {
    notice:
      "Non dolor nostrud c.",
      loading:false
  };

  handleUpdate = e => {
    this.setState({"loading":true})
    let notice = this.props.noticeBy;
    let nID = notice.nID;
    console.log(nID)
    let desc  = this.state.notice
    let token = window.localStorage.getItem("x-auth-token")
    let url = urls.updateNotice;
    let config = {
    headers:{'x-auth-token':token}
    }
    axios.post(url,{"nID":nID,"desc":desc},config).then((response)=>{
      console.log(response)
      this.setState({"loading":false})
        window.location.reload()
    }).catch((error)=>{
      this.setState({"loading":false})
      alert(error)
    })
    
  };
  
  handleDelete = e => {
    this.setState({"loading":true})
    let notice = this.props.noticeBy;
    let nID = notice.nID;
    let token = window.localStorage.getItem("x-auth-token")
    let url = urls.deleteNotice;
    let config = {
    headers:{'x-auth-token':token}
    }
    axios.post(url,{"nID":nID},config).then((response)=>{
      this.setState({"loading":false})
        window.location.reload()
    }).catch((error)=>{
      this.setState({"loading":false})
      alert(error)
    })
    
  };
  handleUpdateNotice = e => {
        let notice  = e.target.value;
        this.setState({"notice":notice})
  };
  render() {
    let notice = this.props.noticeBy;
    // console.log(notice)
    let creator = notice.creator.split('#')[1]
    let desc = notice.desc;
    return (
      <div className="text-center">
        <div className="card m-2">
          <div className="card-body">
            <label className="">Notice By: {creator}</label>{" "}
            <hr className="bg-dark" />
            <div>{desc}</div>
            <button
              className="btn btn-danger m-2"
              type="button"
              data-toggle="modal"
              data-target= {`#${notice.nID}`}
            >
              Update
            </button>
            <button
                    type="button"
                    class="btn btn-primary"
                    onClick={this.handleDelete}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && <span>Deleting Notice <Spinner/></span>}
              {!this.state.loading && <span>Delete</span>}
                  </button>
          </div>
          <div
            class="modal fade"
            id={`${notice.nID}`}
            tabindex="-1"
            role="dialog"
            aria-labelledby={`${notice.nID}`}
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id={`#${notice.nID}`}>
                    Enter Updated Data
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
                        onChange={this.handleUpdateNotice}
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
                    onClick={this.handleUpdate}
                    disabled={this.state.loading}
                  >
                    {this.state.loading && <span>Updating Notice <Spinner/></span>}
              {!this.state.loading && <span>Update</span>}
                  </button>
                 
                </div>
              </div>
            </div>
          </div>
        </div> 
      </div>
    );
  }
}
export default Notice;
