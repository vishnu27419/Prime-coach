import React, { Component } from "react";
import DashBoard from "./DashBoard";
import { Redirect } from "react-router";

class index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
    };
    this.checkAuth();
  }

  checkAuth = async () => {
    const token = await localStorage.getItem("access_token");
    if (token) {
      this.setState({ login: true });
    }
  };

  render() {
    const role = localStorage.getItem("access_role");
    // console.log("role at home condition =>>", " ", role, role === "Coach");
    if (this.state.login) {
      return (
        <Redirect
          to={role === "Athlete" ? "/selfscreening" : "/myteamwrapper"}
        />
      );
    }
    return (
      <div>
        <DashBoard />
      </div>
    );
  }
}

export default index;
