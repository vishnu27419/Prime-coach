import React, { Component } from "react";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  constructor(props) {
    super(props);
    localStorage.removeItem("access_token");
    localStorage.removeItem("access_role");
    // console.log("logout", token);
    // alert("logout");
    // let signup = "gibber";
    // if (token && role) {
    //   signup = false;
    // }
    // this.state = {
    //   signup,
    // };
  }

  render() {
    return <Redirect to="/" />;
  }
}

export default Logout;
