import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import logo from "../../Custom/images/logo.png";
import { Modal } from "react-bootstrap";
// for jquery in reactJs
import $, { isEmptyObject } from "jquery";
import { findDOMNode } from "react-dom";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";
import LogoutModal from "../Pages/logoutModal/LogoutModal";

function HelpModal(props) {
  return (
    <Modal
      show={props.showModal}
      onHide={props.onHidePress}
      size="lg"
      // aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body key={Math.random().toString()}>
        <div className="modal-header">
          <h5 className="modal-title" id="how-to-earnTitle">
            {props.modalTitle}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHidePress}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <ul className="list-inline">
            {props.contentArray &&
              props.contentArray.map((item) => {
                return (
                  <li key={item.point} className="help_modal_content">
                    {"\u2022 " + item.point}
                  </li>
                );
              })}
            {props.subPointArray &&
              props.subPointArray.map((data) => {
                return (
                  <li key={data.point} className="help_modal_SubPoints">
                    {"\u2212 " + data.point}
                  </li>
                );
              })}
          </ul>
        </div>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
}

class CoachHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      showProfile: false,
      showChangePassword: false,
      userProfileData: [],
      updateUserProfile: [],
      firstName: "",
      Surname: "",
      DateOfBirth: "",
      Address: "",
      specialization: "",
      updateName: "",
      updateLastName: "",
      date: "",
      firstNameError: "",
      surNameError: "",
      DateOfBirthError: "",
      addressError: "",
      specializationError: "",
      changePassword: [],
      helpData: [],
      modalTitle: "",
      modalContent: [],
      modalSubPoints: [],
      password: "",
      newpassword: "",
      confirmPassword: "",
      oldPasswordError: "",
      newPasswordError: "",
      confirmPasswordError: "",
      newPasswordRequiredError: "",
      confirmPasswordRequiredError: "",
      visibleUserName: true,
      CoachSpecialization: [],
      coachSpecialisationValue: "",
      oldPasswordToggle: false,
      newPasswordToggle: false,
      confirmPasswordToggle: false,
      logoutToggle: false,
      logoutLoader: false,
    };
    this.onChange = this.onChange.bind(this);
    this.onHandle = this.onHandle.bind(this);
  }
  componentDidMount() {
    this.fetchData();
    this.fetchHelpData();
    this.pre_update_profile();
    // setTimeout(() => {
    //   this.fetchHelpData();
    //   this.pre_update_profile();
    // }, 700);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("state of on change ", this.state);
  }

  onHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  fetchData = async () => {
    try {
      const res = await standardPostApi(
        "user_profile",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        this.setState({ userProfileData: res.data.data });
        // console.log("This is User Profile ->", this.state.userProfileData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  refreshPage = async () => {
    await window.location.reload(false);
  };

  onHandleChange = (e) => {
    this.setState({ coachSpecialisationValue: e.target.value });
  };

  pre_update_profile = async () => {
    try {
      const res = await standardPostApi(
        "pre_update_profile",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log("THIS IS RESPONSE OF pre_update_profile-->", res.data.data);
        await this.setState({
          CoachSpecialization: res.data.data.CoachSpecialization.pickerArray,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  UpdateUserProfile = async () => {
    const DOB = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const dateOfBirth = DOB;

    const isValidProfile = this.validationProfile();

    if (isValidProfile) {
      try {
        const res = await standardPostApi(
          "update_user_profile",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            first_name: this.state.firstName,
            last_name: this.state.Surname,
            dob: dateOfBirth,
            address: this.state.Address,
            specialization: this.state.coachSpecialisationValue,
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({
            updateName: res.data.data.first_name,
            updateLastName: res.data.data.last_name,
            visibleUserName: false,
            userProfileData: res.data.data,
          });
          // console.log("this is update user profile response =>", res.data.data);
          // alert(res.data.message);
          toast.success(res.data.message);
          await this.hideShowProfile();
          // return this.refreshPage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  validationProfile = () => {
    let DateOfBirthError = "";
    const dob = new Date(this.state.date);
    const today = new Date();
    let firstNameError = "";
    let surNameError = "";
    let addressError = "";

    if (!this.state.date) {
      DateOfBirthError = "Please select a Date of Birth.";
    } else if (today.getFullYear() - dob.getFullYear() < 16) {
      DateOfBirthError =
        "You must be at least 16 year old, in order to sign up.";
    }

    if (!this.state.firstName) {
      firstNameError = "The First Name field is required.";
    }

    if (!this.state.Surname) {
      surNameError = "The Surname field is required.";
    }

    if (!this.state.Address) {
      addressError = "The Surname field is required.";
    }

    if (firstNameError || surNameError || DateOfBirthError || addressError) {
      this.setState({
        firstNameError,
        surNameError,
        DateOfBirthError,
        addressError,
      });
      return false;
    } else {
      return true;
    }
  };

  ChangePassword = async () => {
    const isValid = this.validation();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "change_password",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            old_password: this.state.password,
            new_password: this.state.newpassword,
          },
          true
        );
        console.log("this is responser", res.data.data);
        alert(res.data.message);
        if (res.data.code === 200) {
          return this.refreshPage();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  fetchHelpData = async () => {
    try {
      const res = await standardPostApi("list_help_data", undefined, {}, true);
      if (res.data.code === 200) {
        this.setState({ helpData: res.data.data.HelpData });
        // console.log("this is res of Help =>", this.state.helpData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  validation = () => {
    let oldPasswordError = "";
    let newPasswordError = "";
    let passReg = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;
    let confirmPasswordError = "";
    let newPasswordRequiredError = "";
    let confirmPasswordRequiredError = "";

    if (!this.state.password) {
      oldPasswordError = "The old Password Field is required .";
    }
    if (!this.state.newpassword) {
      newPasswordRequiredError = "This New Password field is required .";
    } else if (!this.state.newpassword.match(passReg)) {
      newPasswordError =
        "Password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }
    if (!this.state.confirmPassword) {
      confirmPasswordRequiredError =
        "This Confirm New Password field is required";
    } else if (!this.state.confirmPassword.match(this.state.newpassword)) {
      confirmPasswordError =
        " new password and confirmation password do not match.";
    }
    if (
      oldPasswordError ||
      newPasswordError ||
      confirmPasswordError ||
      newPasswordRequiredError ||
      confirmPasswordRequiredError
    ) {
      this.setState({
        oldPasswordError,
        newPasswordError,
        confirmPasswordError,
        newPasswordRequiredError,
        confirmPasswordRequiredError,
      });
      return false;
    } else {
      return true;
    }
  };

  handleToggle = () => {
    const el = findDOMNode(this.refs.toggle);
    $(el).slideToggle();
  };

  showModal = async (item) => {
    await this.setState({
      show: !this.state.show,
      modalTitle: item.title,
      modalContent: item.points,
      modalSubPoints: item.subPoint,
    });
  };

  hideModal = async (item) => {
    await this.setState({ show: false });
  };

  showShowProfile = (e) => {
    this.setState({
      showProfile: true,
      firstName: this.state.userProfileData.first_name,
      Surname: this.state.userProfileData.last_name,
      Address: this.state.userProfileData.address,
      date: new Date(this.state.userProfileData.dob),
    });
  };

  hideShowProfile = (e) => {
    this.setState({
      showProfile: false,
    });
  };

  showShowChangePassword = async (item) => {
    await this.setState({
      showChangePassword: !this.state.showChangePassword,
    });
  };

  hideChangePassword = async (item) => {
    await this.setState({
      showChangePassword: false,
    });
  };

  //  date picker
  handleDateChange = async (date) => {
    await this.setState({ date: date });
    // console.log("The start date selected is ", this.state.date);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  // userLogout = async () => {
  //   // console.log("will log the user out.");
  //   await localStorage.removeItem("access_token");
  //   await localStorage.removeItem("access_role");
  //   await localStorage.removeItem("primeCoachStore");
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

  oldPassToggle = () => {
    this.setState({ oldPasswordToggle: !this.state.oldPasswordToggle });
  };

  newPassToggle = () => {
    this.setState({ newPasswordToggle: !this.state.newPasswordToggle });
  };

  confirmPassToggle = () => {
    this.setState({ confirmPasswordToggle: !this.state.confirmPasswordToggle });
  };

  toggleLogoutModal = async () => {
    this.setState({ logoutToggle: !this.state.logoutToggle });
  };

  isInputAlphabet = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z ]+$/.test(char)) {
      event.preventDefault();
    }
  };

  render() {
    if (this.state.logoutUser) {
      return <Redirect to="/" />;
    }

    if (!localStorage.getItem("access_token")) {
      return <Redirect to="/" />;
    }

    const {
      userProfileData,
      helpData,
      password,
      newpassword,
      confirmPassword,
      specializationPreValue,
    } = this.state;
    const coachRole = localStorage.getItem("access_role");

    return (
      <div>
        <header id="header">
          <nav className="navbar navbar-expand-lg navbar-light">
            <div className="container">
              <div className="web-logo">
                {/* <a className="navbar-brand logo" href="javaScript;"> */}
                <Link to="/" className="navbar-brand logo">
                  <img src={logo} className="img-fluid" alt={logo} />
                  <div>
                    <span>Prime</span>
                    <br />
                    Coach
                  </div>
                </Link>
                {/* </a> */}
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
                {/* <!-- <span className="navbar-toggler-icon"></span> --> */}
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
                  {/* Admin Start */}
                  {userProfileData.role === "Admin" ? (
                    <li className="nav-item dropdown">
                      <a
                        className="nav-link dropdown-toggle"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                        href="javaScript;"
                        style={
                          userProfileData.role === "Admin"
                            ? { fontSize: "15px" }
                            : { fontSize: "16px" }
                        }
                      >
                        Admin Panel
                      </a>
                      <div
                        className="dropdown-menu"
                        aria-labelledby="dropdownMenuButton"
                      >
                        <Link
                          to="/exercisesettings"
                          // style={{ textDecoration: "none" }}
                          style={
                            userProfileData.role === "Admin"
                              ? { fontSize: "15px", textDecoration: "none" }
                              : { fontSize: "16px", textDecoration: "none" }
                          }
                        >
                          <button className="dropdown-item">
                            Exercise Settings
                          </button>
                        </Link>

                        <Link
                          // to="/users"
                          to="/userssection"
                          // style={{ textDecoration: "none" }}
                          style={
                            userProfileData.role === "Admin"
                              ? { fontSize: "15px", textDecoration: "none" }
                              : { fontSize: "16px", textDecoration: "none" }
                          }
                        >
                          <button className="dropdown-item">Users</button>
                        </Link>

                        <Link
                          to="/createAwards"
                          // style={{ textDecoration: "none" }}
                          style={
                            userProfileData.role === "Admin"
                              ? { fontSize: "15px", textDecoration: "none" }
                              : { fontSize: "16px", textDecoration: "none" }
                          }
                        >
                          <button className="dropdown-item">
                            Create Awards
                          </button>
                        </Link>
                      </div>
                    </li>
                  ) : null}
                  {/* admin End */}

                  {userProfileData.role === "Admin" ? (
                    <li className="nav-item active">
                      <Link
                        to="/coachList"
                        className="nav-link home"
                        style={
                          userProfileData.role === "Admin"
                            ? { fontSize: "15px" }
                            : { fontSize: "16px" }
                        }
                      >
                        Coaches
                      </Link>
                    </li>
                  ) : null}

                  {/* <li className="nav-item active">
                    <Link
                      to="/awardsBoard"
                      className="nav-link home"
                      style={
                        userProfileData.role === "Admin"
                          ? { fontSize: "15px" }
                          : { fontSize: "16px" }
                      }
                    >
                      Award's Board
                    </Link>
                  </li> */}

                  <li className="nav-item active">
                    <Link
                      to="/annualtrainingplan"
                      className="nav-link home"
                      style={
                        userProfileData.role === "Admin"
                          ? { fontSize: "15px" }
                          : { fontSize: "16px" }
                      }
                    >
                      {userProfileData.role === "Admin"
                        ? "ATP"
                        : "Annual Training Plan"}
                      {/* "Annual Training Plan" */}
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      to="/myteamwrapper"
                      className="nav-link athlete"
                      style={
                        userProfileData.role === "Admin"
                          ? { fontSize: "15px" }
                          : { fontSize: "16px" }
                      }
                    >
                      My Teams
                    </Link>
                  </li>

                  {coachRole === "S&C Coach" ? null : coachRole ===
                    "Assistant Coach" ? null : (
                    <li className="nav-item active">
                      <Link
                        // to="/alternativeExercise"
                        to="/coachalternativeExercise"
                        className="nav-link home"
                        style={
                          userProfileData.role === "Admin"
                            ? { fontSize: "15px" }
                            : { fontSize: "16px" }
                        }
                      >
                        Alternative Exercise
                      </Link>
                    </li>
                  )}

                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      // href="javaScript;"
                      style={
                        userProfileData.role === "Admin"
                          ? { fontSize: "15px" }
                          : { fontSize: "16px" }
                      }
                    >
                      Help &nbsp;
                      <i
                        className="fa fa-question-circle"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <HelpModal
                      onHidePress={() => this.hideModal()}
                      showModal={this.state.show}
                      modalTitle={this.state.modalTitle}
                      contentArray={this.state.modalContent}
                      subPointArray={this.state.modalSubPoints}
                    />
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      {helpData &&
                        helpData.map((item) => {
                          return (
                            <div key={item.title}>
                              <button
                                key={item.title}
                                className="dropdown-item"
                                href="javaScript;"
                                data-toggle="modal"
                                data-target="#how-to-earn"
                                onClick={(e) => {
                                  this.showModal(item);
                                }}
                              >
                                {item.title}
                              </button>
                            </div>
                          );
                        })}
                    </div>
                  </li>
                  <li className="nav-item dropdown">
                    <a
                      className="nav-link dropdown-toggle"
                      id="dropdownMenuButton"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                      href="javaScript;"
                      style={
                        userProfileData.role === "Admin"
                          ? { fontSize: "15px" }
                          : { fontSize: "16px" }
                      }
                    >
                      {this.state.visibleUserName ? (
                        <span>
                          {userProfileData.first_name}{" "}
                          {userProfileData.last_name}
                        </span>
                      ) : null}
                      {this.state.updateName} {this.state.updateLastName} &nbsp;
                      <i
                        className="fa fa-arrow-circle-down"
                        aria-hidden="true"
                      ></i>
                    </a>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton"
                    >
                      <button
                        className="dropdown-item"
                        href="javaScript;"
                        data-toggle="modal"
                        data-target="#coachprofile"
                        onClick={(e) => {
                          this.showShowProfile();
                        }}
                      >
                        Profile
                      </button>

                      <button
                        className="dropdown-item"
                        href="javaScript;"
                        data-toggle="modal"
                        data-target="#changepassword"
                        onClick={(e) => {
                          this.showShowChangePassword();
                        }}
                      >
                        Change Password
                      </button>

                      {/* {coachRole === "Assistant Coach" ? null : (
                        <Link
                          to={{
                            pathname: `/exercisesetting`,
                            state: "coach",
                          }}
                          style={{ textDecoration: "none" }}
                        >
                          <button
                            className="dropdown-item"
                            href="javaScript;"
                            data-toggle="modal"
                            data-target="#changepassword"
                          >
                            Exercise Settings
                          </button>
                        </Link>
                      )} */}

                      <button
                        // onClick={() => this.userLogout()}
                        onClick={() => this.toggleLogoutModal()}
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
        <Modal
          show={this.state.showProfile}
          onHide={this.hideShowProfile}
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="coachprofileTitle">
                Update Personal Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  this.hideShowProfile();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form action="" className="create_newteam">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userProfileData.first_name}
                    name="firstName"
                    onChange={this.onChange}
                    onKeyPress={this.isInputAlphabet}
                    maxLength={50}
                  />
                  <p className="react_validation">
                    {this.state.firstNameError}
                  </p>
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userProfileData.last_name}
                    name="Surname"
                    onChange={this.onChange}
                    onKeyPress={this.isInputAlphabet}
                    maxLength={50}
                  />
                  <p className="react_validation">{this.state.surNameError}</p>
                </div>

                <div className="form-group react_icon">
                  <label>Date of Birth</label>
                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    name="endDate"
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    ref={(ref) => (this.accordionContent = ref)}
                  />

                  <img
                    className="celender_img "
                    src={Calander}
                    alt={Calander}
                    onClick={() => this.accordionContent.onInputClick()}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="react_validation ">
                    {this.state.DateOfBirthError}
                  </p>
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={userProfileData.address}
                    name="Address"
                    // defaultValue={Address}
                    onChange={this.onChange}
                  />
                  <p className="react_validation">{this.state.addressError}</p>
                </div>
                <div className="form-group">
                  <label>Coach Specialisation</label>
                  {/* <select
                    // name=""
                    className="form-control"
                    // defaultValue={userProfileData.specialization}
                    name="specialization"
                    onChange={this.onChange}
                  >
                    <option value="">Select Coach Specialisation</option>
                    <option value="1">{userProfileData.specialization}</option>
                    <option value="11">SportsSpecific</option>
                  </select> */}
                  <select
                    className="form-control"
                    name="specialization"
                    onChange={this.onHandleChange}
                    defaultValue={
                      (specializationPreValue, userProfileData.specialization)
                    }
                  >
                    <option value="" hidden>
                      {userProfileData.specialization}
                    </option>
                    <option value="" disabled>
                      Select Coach Specialisation
                    </option>
                    {this.state.CoachSpecialization &&
                      this.state.CoachSpecialization.map((item) => {
                        return (
                          <option value={item.value} key={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                  <p className="react_validation">
                    {this.state.specializationError}
                  </p>
                </div>
                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={(e) => {
                    this.UpdateUserProfile();
                  }}
                >
                  Save
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>

        {/* this is a model for Coach Change PassWord*/}

        <Modal
          show={this.state.showChangePassword}
          onHide={this.hideChangePassword}
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="coachprofileTitle">
                Change Password
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.hideChangePassword}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <form action="" className="create_newteam">
                <div className="form-group" style={{ position: "relative" }}>
                  <label>Old Password</label>
                  <input
                    type={
                      this.state.oldPasswordToggle === false
                        ? "password"
                        : "text"
                    }
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={this.onHandle}
                  />
                  <p className="react_validation">
                    {this.state.oldPasswordError}
                  </p>
                  {this.state.oldPasswordToggle === false ? (
                    <img
                      src={show}
                      alt="show"
                      style={{
                        position: "absolute",
                        height: "20px",
                        top: "41px",
                        right: "13px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={() => this.oldPassToggle()}
                    />
                  ) : (
                    <img
                      src={hide}
                      alt="hide"
                      style={{
                        position: "absolute",
                        height: "20px",
                        top: "41px",
                        right: "13px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={() => this.oldPassToggle()}
                    />
                  )}
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label>New Password</label>
                  <input
                    type={
                      this.state.newPasswordToggle === false
                        ? "password"
                        : "text"
                    }
                    className="form-control"
                    name="newpassword"
                    value={newpassword}
                    onChange={this.onHandle}
                  />
                  <p className="react_validation">
                    {this.state.newPasswordError}
                  </p>
                  <p className="react_validation">
                    {this.state.newPasswordRequiredError}
                  </p>
                  {this.state.newPasswordToggle === false ? (
                    <img
                      src={show}
                      alt="show"
                      style={{
                        position: "absolute",
                        height: "20px",
                        top: "41px",
                        right: "13px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={() => this.newPassToggle()}
                    />
                  ) : (
                    <img
                      src={hide}
                      alt="hide"
                      style={{
                        position: "absolute",
                        height: "20px",
                        top: "41px",
                        right: "13px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={() => this.newPassToggle()}
                    />
                  )}
                </div>
                <div className="form-group" style={{ position: "relative" }}>
                  <label>Confirm New Password</label>
                  <input
                    type={
                      this.state.confirmPasswordToggle === false
                        ? "password"
                        : "text"
                    }
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={this.onHandle}
                  />
                  <p className="react_validation">
                    {this.state.confirmPasswordError}
                  </p>
                  <p className="react_validation">
                    {this.state.confirmPasswordRequiredError}
                  </p>
                  {this.state.confirmPasswordToggle === false ? (
                    <img
                      src={show}
                      alt="show"
                      style={{
                        position: "absolute",
                        height: "20px",
                        top: "41px",
                        right: "13px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={() => this.confirmPassToggle()}
                    />
                  ) : (
                    <img
                      src={hide}
                      alt="hide"
                      style={{
                        position: "absolute",
                        height: "20px",
                        top: "41px",
                        right: "13px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={() => this.confirmPassToggle()}
                    />
                  )}
                </div>
                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={this.ChangePassword}
                  // onClick={(e) => {
                  //   this.ChangePassword();
                  // }}
                >
                  Save
                </button>
              </form>
            </div>
          </Modal.Body>
        </Modal>
        <LogoutModal
          show={this.state.logoutToggle}
          onHide={this.toggleLogoutModal}
          logoutApi={this.logoutApi}
          logoutLoader={this.state.logoutLoader}
        />
      </div>
    );
  }
}

export default CoachHeader;
