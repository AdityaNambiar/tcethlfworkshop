import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import jwt from 'jsonwebtoken';
import { returnStatement } from "@babel/types";
class NavBar extends Component {
  state = {
    user:""
  }

  //logout button functionality
  handleLogout = e => {
    e.preventDefault();
    this.props.history.replace("./login");
  };
  
    
  // componentDidMount =()=>{
  //   try{
  //     let name =  jwt.decode(window.localStorage.getItem('x-auth-token')).cardName.split('@')[0];
  //      this.setState({"user":name})
  //    }catch(error){
  //     this.setState({"user":""})
  //    }
  // }
  
  render() {
 
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <Link className="navbar-brand" to="/homepage">
          ERP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item nav-link ml-2">
              <NavLink to="/login">Login</NavLink>
            </li>
            {/* <li className="nav-item nav-link ml-2">
              <NavLink to="/studentDashboard">Student Dashboard</NavLink>
            </li> */}
            <li className="nav-item nav-link ml-2">
              <NavLink to="/register">Register</NavLink>
            </li>
            {/* <li className="nav-item nav-link ml-2">
              <NavLink to="/adminDashboard">Admin Dashboard</NavLink>
            </li> */}
            {/* <li className="nav-item nav-link ml-2 text-light">
              Welcome: {this.state.user}
            </li> */}
          </ul>

          <button
            type="button"
            class="btn btn-outline-danger"
            onClick={this.handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>
    );
  }
}
export default withRouter(NavBar);
