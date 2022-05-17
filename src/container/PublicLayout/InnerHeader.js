import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../Custom/images/logo.png";
// for jquery in reactJs
import $ from "jquery";
import { findDOMNode } from "react-dom";

import AddActivityModal from "../../component/AthleteHeader/AddActivityModal";
import ChangePasswordModal from "../../component/AthleteHeader/ChangePasswordModal";
import { standardPostApi } from "../../container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
import LogoutModal from "../Pages/logoutModal/LogoutModal";
import ProfileModal from "component/AthleteHeader/ProfileModal";
import moment from "moment";

class InnerHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      changePassword: false,
      logoutUser: false,
      athleteList: "",
      RESULT: {},
      user_Details: "",
      noWrkoutAssignAddActivity: true,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      oldPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",
      changePasswordLoader: false,
      logoutToggle: false,
      profileToggle: false,
      date: new Date(),
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      BodyWeight: "",
      height: "",
      email: "",
      firstNameError: "",
      lastNameError: "",
      DateOfBirthError: "",
      phoneError: "",
      addressError: "",
      genderError: "",
      BodyWeightError: "",
      heightError: "",
    };
  }

  handleToggle = () => {
    const el = findDOMNode(this.refs.toggle);
    $(el).slideToggle();
  };

  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  hideModal = (e) => {
    this.setState({
      show: false,
    });
  };

  showChangePassword = (e) => {
    this.setState({
      changePassword: true,
    });
  };

  hideChangePassword = (e) => {
    this.setState({
      changePassword: false,
      oldPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  onChange = async (e) => {
    await this.setState({ [e.target.name]: e.target.value });
    console.log("this.state onchange---->", this.state);
  };

  // userLogout = async () => {
  //   // console.log("will log the user out.");
  //   await localStorage.removeItem("access_token");
  //   await localStorage.removeItem("access_role");
  //   await localStorage.removeItem("primeCoachStore");
  //   // await localStorage.removeItem("userDetail");
  //   this.setState({ logoutUser: true });
  // };

  logoutApi = async () => {
    const playerId = localStorage.getItem("useragentid");
    this.setState({ logoutLoader: true });
    try {
      const res = await standardPostApi(
        "logout",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          player_id: playerId,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        console.log("Response of Logout", res.data.data);
        // this.userLogout();
        await localStorage.removeItem("access_token");
        await localStorage.removeItem("access_role");
        await localStorage.removeItem("primeCoachStore");
        this.toggleLogoutModal();
        this.setState({ logoutUser: true });
      }
    } catch (error) {
      console.error("error of logout", error);
    } finally {
      this.setState({ logoutLoader: false });
    }
  };

  componentDidMount() {
    this.user_profile();
    this.list_athlete_workout();
  }

  list_athlete_workout = async () => {
    try {
      const res = await standardPostApi(
        "list_athlete_workout",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code == 301) {
        this.setState({ noWrkoutAssignAddActivity: false });
      }
      if (res.data.code === 200) {
        // console.log("this is res LIST ATHLETE", res.data.data);

        const resultFirst = res.data.data.find(
          (data) => data.annual_program_completed === false
        );

        if (resultFirst) {
          this.setState({ RESULT: resultFirst });
        } else {
          this.setState({ RESULT: res.data.data[res.data.data.length - 1] });
        }

        await this.setState({ athleteList: this.state.RESULT });
      }
    } catch (error) {
      console.log(error);
    }
  };

  user_profile = async () => {
    try {
      const res = await standardPostApi(
        "user_profile",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log("THIS IS A USER PROFILE ->", res.data.data);
        await this.setState({ user_Details: res.data.data });
      }
    } catch (error) {
      console.log(error);
    }
  };

  changePassword = async () => {
    const { oldPassword, newPassword } = this.state;
    const isValid = this.validationChangePassword();
    if (isValid) {
      this.setState({ changePasswordLoader: true });
      try {
        const res = await standardPostApi(
          "change_password",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            old_password: oldPassword,
            new_password: newPassword,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response of Change PassWord---->", res.data);
          this.hideChangePassword();
          this.setState({ changePasswordLoader: false });
          successToast(res.data.message);
        }
      } catch (error) {
        this.setState({ changePasswordLoader: false });
        console.error(error);
      }
    }
  };

  validationChangePassword = () => {
    let oldPasswordError = "";
    let newPasswordError = "";
    let confirmPasswordError = "";
    let passReg =
      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/;

    if (!this.state.oldPassword) {
      oldPasswordError = "Old password field is required.";
    } else if (!this.state.oldPassword.match(passReg)) {
      oldPasswordError =
        "Old password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }

    if (!this.state.newPassword) {
      newPasswordError = "New password field is required.";
    } else if (!this.state.newPassword.match(passReg)) {
      newPasswordError =
        "New password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }

    if (!this.state.confirmPassword) {
      confirmPasswordError = "Confirm password field is required";
    } else if (!this.state.confirmPassword.match(this.state.newPassword)) {
      confirmPasswordError =
        " new password and confirmation password do not match.";
    }

    if (oldPasswordError || newPasswordError || confirmPasswordError) {
      this.setState({
        oldPasswordError,
        newPasswordError,
        confirmPasswordError,
      });
      return false;
    } else {
      return true;
    }
  };

  logoutModalToggle = async () => {
    await this.setState({ logoutToggle: !this.state.logoutToggle });
  };

  profileModalToggle = async () => {
    const { user_Details } = this.state;
    console.log("THIS IS user_Details---->", user_Details);
    await this.setState({
      profileToggle: !this.state.profileToggle,
      firstName: user_Details.first_name,
      lastName: user_Details.last_name,
      phoneNumber: user_Details.phone,
      address: user_Details.address,
      BodyWeight: user_Details.body_weight,
      height: user_Details.height,
      date: new Date(`${user_Details.dob}`),
      email: user_Details.email,
      gender: user_Details.gender,
      firstNameError: "",
      lastNameError: "",
      DateOfBirthError: "",
      phoneError: "",
      addressError: "",
      genderError: "",
      BodyWeightError: "",
      heightError: "",
    });
  };

  handleDateChange = async (date) => {
    await this.setState({ date: date });
    console.log("this is date ", this.state.date);
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  isHeightNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/^\d*(\.\d{0,2})?$/.test(char)) {
      event.preventDefault();
    }
  };

  updateUserProfile = async () => {
    const {
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      BodyWeight,
      height,
    } = this.state;

    const DOB = moment(this.state.date).format("YYYY-MM-DD");

    const isValid = this.validationProfile();

    if (isValid) {
      try {
        const res = await standardPostApi(
          "update_user_profile",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            first_name: firstName,
            last_name: lastName,
            dob: DOB,
            phone: phoneNumber,
            address: address,
            body_weight: BodyWeight,
            height: height,
            gender: gender,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("THis is response of Update User Profile", res.data.data);
          this.setState({ profileToggle: false });
          this.user_profile();
          successToast(res.data.message);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  validationProfile = () => {
    let firstNameError = "";
    let lastNameError = "";
    const dob = new Date(this.state.date);
    const today = new Date();
    let DateOfBirthError = "";
    let phoneError = "";
    let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let addressError = "";
    let genderError = "";
    let BodyWeightError = "";
    let heightError = "";

    if (!this.state.firstName) {
      firstNameError = " First name field is required.";
    }

    if (!this.state.lastName) {
      lastNameError = "Last name field is required.";
    }

    if (!this.state.date) {
      DateOfBirthError = "Please select a Date of Birth.";
    } else if (today.getFullYear() - dob.getFullYear() < 16) {
      DateOfBirthError =
        "You must be at least 16 year old, in order to update personal details.";
    }

    if (!this.state.phoneNumber) {
      phoneError = "Phone number field is required.";
    } else if (!this.state.phoneNumber.match(phoneReg)) {
      phoneError = " Phone number is not valid.";
    } else if (this.state.phoneNumber == 0) {
      phoneError = "Phone number is not valid.";
    }

    if (!this.state.address) {
      addressError = "Address field is required.";
    }

    if (!this.state.gender) {
      genderError = "Please choose gender field.";
    }

    if (!this.state.BodyWeight) {
      BodyWeightError = " Body weight field is required.";
    } else if (this.state.BodyWeight == 0) {
      BodyWeightError =
        "This is not a valid value. field must be greater then zero ";
    } else if (this.state.BodyWeight < 36) {
      BodyWeightError = "Body weight must be grater then 35";
    }

    if (!this.state.height) {
      heightError = " Height field is required.";
    } else if (this.state.height == 0) {
      heightError =
        "This is not a valid value . Field must be greater then zero ";
    }

    if (
      firstNameError ||
      lastNameError ||
      DateOfBirthError ||
      phoneError ||
      addressError ||
      genderError ||
      BodyWeightError ||
      heightError
    ) {
      this.setState({
        firstNameError,
        lastNameError,
        DateOfBirthError,
        phoneError,
        addressError,
        genderError,
        BodyWeightError,
        heightError,
      });
      return false;
    } else {
      return true;
    }
  };

  render() {
    if (this.state.logoutUser) {
      return <Redirect to="/" />;
    }
    if (!localStorage.getItem("access_token")) {
      return <Redirect to="/" />;
    }

    // console.log("THIS IS USER DETAILS", this.state.user_Details);
    return (
      <div>
        <header id="header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <div className="web-logo">
                <Link to="/" className="navbar-brand logo">
                  <img src={logo} className="img-fluid" alt={logo} />
                  <div>
                    <span>Prime</span>
                    <br />
                    Coach
                  </div>
                </Link>
              </div>
              <button
                className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
                onClick={this.handleToggle}
              >
                <span>
                  <i className="fa fa-bars" aria-hidden="true"></i>
                </span>
              </button>

              <div
                className="collapse navbar-collapse"
                id="navbarSupportedContent"
                ref="toggle"
              >
                <ul className="navbar-nav ml-auto">
                  {/* <li className="nav-item active">
                    <Link to="/awardsBoard" className="nav-link home">
                      Award's Board
                    </Link>
                  </li> */}
                  <li className="nav-item active">
                    <a
                      className="nav-link home"
                      // href="selfscreening#need-analysis"
                      href="#need-analysis"
                    >
                      Needs Analysis <span className="sr-only">(current)</span>
                    </a>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link athlete"
                      // href="selfscreening#corrective-exercises"
                      href="#corrective-exercises"
                    >
                      Corrective Exercises
                    </a>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link  "
                      to=""
                      data-toggle="modal"
                      data-target="#add_activity"
                      onClick={(e) => {
                        this.showModal();
                      }}
                    >
                      Add Activity
                    </button>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="javaScript;"
                    >
                      {/* Athelete */}
                      {/* {this.state.athleteList.name} */}
                      {this.state.user_Details.first_name}{" "}
                      {this.state.user_Details.last_name}
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        onClick={() => {
                          this.profileModalToggle();
                        }}
                      >
                        Profile
                      </button>

                      <Link
                        to="/awardbordforathlete"
                        style={{ textDecoration: "none" }}
                      >
                        <button className="dropdown-item">Award Board</button>
                      </Link>

                      <button
                        className="dropdown-item"
                        href="javaScript;"
                        onClick={(e) => {
                          this.showChangePassword();
                        }}
                      >
                        Change Password
                      </button>

                      <button
                        // onClick={() => this.userLogout()}
                        onClick={() => this.logoutModalToggle()}
                        className="dropdown-item"
                      >
                        Logout
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
        </header>
        {/* ...........................Add Activity Modal.......................................  */}
        <AddActivityModal
          show={this.state.show}
          onHide={this.hideModal}
          athleteList={this.state.athleteList}
          noWrkoutAssignAddActivity={this.state.noWrkoutAssignAddActivity}
        />

        {/* ...........................CHange Password  Modal.......................................  */}
        <ChangePasswordModal
          show={this.state.changePassword}
          onHide={this.hideChangePassword}
          state={this.state}
          onChange={this.onChange}
          changePassword={this.changePassword}
        />

        <LogoutModal
          show={this.state.logoutToggle}
          onHide={this.logoutModalToggle}
          // userLogout={this.userLogout}
          logoutApi={this.logoutApi}
          logoutLoader={this.state.logoutLoader}
        />

        <ProfileModal
          show={this.state.profileToggle}
          onHide={this.profileModalToggle}
          state={this.state}
          onChange={this.onChange}
          handleDateChange={this.handleDateChange}
          isInputNumber={this.isInputNumber}
          isHeightNumber={this.isHeightNumber}
          updateUserProfile={this.updateUserProfile}
        />
      </div>
    );
  }
}

export default InnerHeader;
