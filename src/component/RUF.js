import React, { Component } from "react";
// import { toast } from 'react-toastify'
import { successToast } from "../utils/toastMessage";

export default class componentName extends Component {
  tryToast = () => {
    successToast("hihihihhi");
  };

  render() {
    return (
      <div>
        <button onClick={() => this.tryToast()}>Click me </button>
      </div>
    );
  }
}

// "homepage": "http://prime-coach.co.uk",
//"build": "react-scripts build",
