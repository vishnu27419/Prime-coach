import React, { Component } from "react";
import AthletesDashBoard from "./AthletesDashBoard";
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
        <Redirect to={role === "Coach" ? "/myteamwrapper" : "/selfscreening"} />
      );
    }
    return (
      <div>
        <AthletesDashBoard />
      </div>
    );
  }
}

export default index;
