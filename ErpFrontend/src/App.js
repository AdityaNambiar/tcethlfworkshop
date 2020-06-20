import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NavBar from "./components/navbar";
import Login from "./components/login";
import StudentDashboard from "./components/studentDashboard";
import AdminDashboard from "./components/adminDashboard";
import NotFound from "./components/notFound";
import Register from "./components/register";

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="content">
          <Switch>
            <Route path="/login" component={Login} />
            <Route path="/studentDashboard" component={StudentDashboard} />
            <Route path="/adminDashboard" component={AdminDashboard} />
            <Route path="/register" component={Register} />
            <Route path="/not-found" component={NotFound} />
            <Route path="/" component={Login} />
            <Redirect to="/not-found" />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
