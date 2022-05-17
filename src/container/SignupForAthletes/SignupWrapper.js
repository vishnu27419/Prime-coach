import React, { Component } from "react";
// import axios from "axios";
import Header from "../PublicLayout/Header";
import Footer from "../PublicLayout/Footer";
import { Redirect } from "react-router-dom";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
import { standardPostApi } from "../API/ApiWrapper";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";

class SignupWrapper extends Component {
  userData;
  constructor(props) {
    super(props);

    this.state = {
      signupPage: false,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      Surname: "",
      date: null,
      hasSetDate: false,
      phone: "",
      address: "",
      BodyWeight: "",
      height: "",
      gender: "",
      workoutLocation: "",
      workoutFrequency: "",
      workoutPeriod: "",
      workoutDifficulty: "",
      plan: this.props.match.params.planId,
      sport: this.props.match.params.id,
      emailError: "",
      passwordError: "",
      confirmPasswordError: "",
      firstNameError: "",
      surnameError: "",
      dateOfBirthError: "",
      phoneError: "",
      addressError: "",
      BodyWeightError: "",
      heightError: "",
      genderError: "",
      workoutLocationError: "",
      workoutFrequencyError: "",
      workoutPeriodError: "",
      workoutDifficultyError: "",
      phoneErrorValidation: "",
      ageLimitError: "",
      hidden: false,
      hiddenConfirmPass: false,
      isLoading: false,
    };
    this.signUp = this.signUp.bind(this);
    this.onChange = this.onChange.bind(this);
    this.isInputNumber = this.isInputNumber.bind(this);
  }

  validate = () => {
    let emailError = "";
    let passwordError = "";
    let confirmPasswordError = "";
    let firstNameError = "";
    let surnameError = "";
    let dateOfBirthError = "";
    let phoneError = "";
    let addressError = "";
    let BodyWeightError = "";
    let heightError = "";
    let genderError = "";
    let workoutLocationError = "";
    let workoutFrequencyError = "";
    let workoutPeriodError = "";
    let workoutDifficultyError = "";
    let phoneErrorValidation = "";
    // let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailReg = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/;
    let phoneReg = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    let passReg =
      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/;
    const dob = new Date(this.state.date);
    const today = new Date();
    let ageLimitError = "";

    if (!this.state.email) {
      emailError = "Email field is not a valid.";
    } else if (!this.state.email.match(emailReg)) {
      emailError = "Email field is not a valid.";
    }

    if (!this.state.password) {
      passwordError = "Password field is required.";
    } else if (!this.state.password.match(passReg)) {
      passwordError =
        "Password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }

    if (!this.state.confirmPassword) {
      confirmPasswordError = "Confirm password is required.";
    } else if (!this.state.confirmPassword.match(this.state.password)) {
      confirmPasswordError = "Password and confirmation password do not match.";
    }
    if (!this.state.firstName) {
      firstNameError = "The First Name field is required.";
    }
    if (!this.state.Surname) {
      surnameError = "The Surname field is required.";
    }

    if (!this.state.hasSetDate) {
      // alert("Please select a Date of Birth.");
      dateOfBirthError = "Please select a Date of Birth.";
      // return false;
    } else if (today.getFullYear() - dob.getFullYear() < 16) {
      ageLimitError = "You must be at least 16 year old, in order to sign up.";
      // return false;
    }

    if (!this.state.phone) {
      phoneError = "Phone number field is required.";
    } else if (!this.state.phone.match(phoneReg)) {
      phoneErrorValidation = " Phone number is not valid.";
    } else if (this.state.phone == 0) {
      phoneError = "Phone number is not valid.";
    }
    if (!this.state.address) {
      addressError = " Address field is required.";
    }
    if (!this.state.BodyWeight) {
      BodyWeightError = " Body weight field is required.";
    } else if (this.state.BodyWeight == 0) {
      BodyWeightError =
        "This is not a valid value . Field must be greater then zero ";
    } else if (this.state.BodyWeight < 36) {
      BodyWeightError = "Body weight must be grater then 35";
    }
    if (!this.state.height) {
      heightError = " Height field is required.";
    } else if (this.state.height == 0) {
      heightError =
        "This is not a valid value . Field must be greater then zero ";
    }
    if (!this.state.gender) {
      genderError = "Choose Gender Field";
    }
    if (!this.state.workoutLocation) {
      workoutLocationError = "Choose Workout Location Field";
    }
    if (!this.state.workoutFrequency) {
      workoutFrequencyError = "Choose Workout Frequency Field";
    }
    if (!this.state.workoutPeriod) {
      workoutPeriodError = "Choose Workout Period Field";
    }
    if (!this.state.workoutDifficulty) {
      workoutDifficultyError = "Choose Workout Difficulty Field";
    }

    if (
      emailError ||
      passwordError ||
      confirmPasswordError ||
      firstNameError ||
      surnameError ||
      dateOfBirthError ||
      phoneError ||
      addressError ||
      BodyWeightError ||
      heightError ||
      genderError ||
      workoutLocationError ||
      workoutFrequencyError ||
      workoutPeriodError ||
      workoutDifficultyError ||
      phoneErrorValidation ||
      ageLimitError
    ) {
      this.setState({
        emailError,
        passwordError,
        confirmPasswordError,
        firstNameError,
        surnameError,
        dateOfBirthError,
        phoneError,
        addressError,
        BodyWeightError,
        heightError,
        genderError,
        workoutLocationError,
        workoutFrequencyError,
        workoutPeriodError,
        workoutDifficultyError,
        phoneErrorValidation,
        ageLimitError,
      });
      return false;
    } else {
      return true;
    }
  };

  signUp = async (e) => {
    this.setState(this.state);
    e.preventDefault();

    const isValid = this.validate();

    const DOB = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const dateOfBirth = DOB;

    // console.log("moment", dateOfBirth);

    if (isValid) {
      this.setState({ isLoading: true });
      try {
        const res = await standardPostApi(
          // "register",
          "register_final",
          undefined,
          {
            email: this.state.email,
            password: this.state.password,
            // confirm_password: this.state.confirmPassword,
            first_name: this.state.firstName,
            last_name: this.state.Surname,
            dob: dateOfBirth,
            phone: this.state.phone,
            address: this.state.address,
            body_weight: this.state.BodyWeight,
            height: this.state.height,
            gender: this.state.gender,
            workout_location: this.state.workoutLocation,
            workout_frequency: this.state.workoutFrequency,
            workout_period: this.state.workoutPeriod,
            workout_difficulty: this.state.workoutDifficulty,
            plan: this.state.plan,
            role: "2",
            login_type: "web",
            sport: this.state.sport,
          },
          true
        );
        if (res.data.code === 200) {
          this.setState({ signupPage: true });
          localStorage.setItem("access_token", res.data.data.access_token);
          localStorage.setItem("access_role", res.data.data.role);
          this.props.history.push("/selfscreening");
        }
        console.log("This is register ->", res);
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  handleDateChange = async (date, moment) => {
    await this.setState({ date: date, hasSetDate: true });
    // console.log("The date selected is ", this.state.date);
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  isInputAlphabet = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/^[a-zA-Z ]+$/.test(char)) {
      event.preventDefault();
    }
  };

  isHeightNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/^\d*(\.\d{0,2})?$/.test(char)) {
      event.preventDefault();
    }
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  togglePassword = async () => {
    await this.setState({ hidden: !this.state.hidden });
  };

  toggleConfirmPassword = async () => {
    await this.setState({ hiddenConfirmPass: !this.state.hiddenConfirmPass });
  };
  render() {
    // if (this.state.signupPage) {
    //   localStorage.getItem("access_token") &&
    //     this.props.history.push("/selfscreening");
    // }

    const {
      email,
      password,
      confirmPassword,
      firstName,
      Surname,
      phone,
      address,
      BodyWeight,
      height,
      gender,
      workoutLocation,
      workoutFrequency,
      workoutPeriod,
      workoutDifficulty,
      isLoading,
    } = this.state;
    return (
      <div className="loader_sec">
        <Header />
        <div className="signup-wrapper">
          <div className="container">
            <div className="row">
              <form className="prime_signup_form w-100" onSubmit={this.signUp}>
                {/* <div className="heading text-center">SignUp for Athletes</div> */}
                <div className="react-title">Register</div>
                <h4 className="react-title-center">Create a new account</h4>
                <hr className="hr_title" />
                <div className="row">
                  <div className="col-lg-6">
                    <div className="form-group mb-4">
                      <label htmlFor="">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        id="InputEmail"
                        aria-describedby="emailHelp"
                        placeholder=" Email"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                      />
                      <p className="react_validation">
                        {this.state.emailError}
                      </p>
                    </div>
                    <div
                      className="form-group mb-4"
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="">Password</label>
                      <input
                        type={this.state.hidden === false ? "password" : "text"}
                        className="form-control"
                        id="InputPassword1"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                      />
                      <p className="react_validation">
                        {this.state.passwordError}
                      </p>
                      {this.state.hidden === false ? (
                        <img
                          src={show}
                          alt="show"
                          onClick={() => this.togglePassword()}
                          className="signupPassImg"
                        />
                      ) : (
                        <img
                          className="signupPassImg"
                          onClick={() => this.togglePassword()}
                          src={hide}
                          alt="hide"
                        />
                      )}
                    </div>
                    <div
                      className="form-group mb-4"
                      style={{ position: "relative" }}
                    >
                      <label htmlFor="">Confirm Password</label>
                      <input
                        type={
                          this.state.hiddenConfirmPass === false
                            ? "password"
                            : "text"
                        }
                        className="form-control"
                        id="InputPassword1"
                        placeholder="Re-enter password"
                        name="confirmPassword"
                        value={confirmPassword}
                        onChange={this.onChange}
                      />
                      <p className="react_validation">
                        {this.state.confirmPasswordError}
                      </p>
                      {this.state.hiddenConfirmPass === false ? (
                        <img
                          src={show}
                          className="signupPageConfirmPassImg"
                          alt="show"
                          onClick={() => this.toggleConfirmPassword()}
                        />
                      ) : (
                        <img
                          src={hide}
                          className="signupPageConfirmPassImg"
                          alt="hide"
                          onClick={() => this.toggleConfirmPassword()}
                        />
                      )}
                    </div>
                    <div className="form-group mb-4">
                      <label>First Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        aria-describedby="name"
                        placeholder="First Name"
                        name="firstName"
                        value={firstName}
                        onChange={this.onChange}
                        onKeyPress={this.isInputAlphabet}
                        maxLength={50}
                      />
                      <p className="react_validation">
                        {this.state.firstNameError}
                      </p>
                    </div>
                    <div className="form-group mb-4">
                      <label>Last Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="surname"
                        aria-describedby="name"
                        placeholder="Last Name"
                        name="Surname"
                        value={Surname}
                        onChange={this.onChange}
                        onKeyPress={this.isInputAlphabet}
                        maxLength={50}
                      />
                      <p className="react_validation">
                        {this.state.surnameError}
                      </p>
                    </div>
                    <div className="form-group mb-4 react_icon">
                      <label htmlFor="">Date of Birth</label>
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        name="dateOfBirth"
                        value={this.state.date}
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        showMonthDropdown
                        showYearDropdown
                        placeholderText="DD/MM/YYYY"
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

                      {/* <i class="fa fa-calendar" aria-hidden="true"></i> */}
                      <p className="react_validation ">
                        {this.state.dateOfBirthError}
                        {this.state.ageLimitError}
                      </p>
                    </div>

                    <div className="form-group mb-4 ">
                      <label htmlFor=""> Phone Number</label>
                      <input
                        maxLength={10}
                        type="text"
                        className="form-control"
                        id="phone"
                        placeholder="Phone Number"
                        aria-describedby="phone"
                        name="phone"
                        value={phone}
                        onChange={this.onChange}
                        onKeyPress={this.isInputNumber}
                      />
                      <p className="react_validation">
                        {this.state.phoneError}
                      </p>
                      <p className="react_validation">
                        {this.state.phoneErrorValidation}
                      </p>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Address</label>
                      <input
                        type="text"
                        className="form-control"
                        id="address"
                        aria-describedby="address"
                        placeholder="Address"
                        name="address"
                        vale={address}
                        onChange={this.onChange}
                      />
                      <p className="react_validation">
                        {this.state.addressError}
                      </p>
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Body Weight <span className="react-span">(in lbs)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="bodyweight"
                        aria-describedby="bodyweight"
                        placeholder="Weight"
                        name="BodyWeight"
                        value={BodyWeight}
                        onChange={this.onChange}
                        onKeyPress={this.isInputNumber}
                        maxLength={3}
                      />
                      <p className="react_validation">
                        {this.state.BodyWeightError}
                      </p>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Height <span className="react-span">(in cms)</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="height"
                        aria-describedby="height"
                        placeholder="Height"
                        name="height"
                        value={height}
                        onChange={this.onChange}
                        onKeyPress={this.isHeightNumber}
                        maxLength={4}
                      />
                      <p className="react_validation">
                        {this.state.heightError}
                      </p>
                    </div>
                    <div className="form-group">
                      <label htmlFor="">Gender</label>
                      <select
                        id=""
                        className="form-control"
                        name="gender"
                        value={gender}
                        onChange={this.onChange}
                      >
                        <option value="">Select a Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                      <p className="react_validation">
                        {this.state.genderError}
                      </p>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Workout Location</label>
                      <select
                        id=""
                        className="form-control"
                        name="workoutLocation"
                        value={workoutLocation}
                        onChange={this.onChange}
                      >
                        <option value="">Select Workout Location</option>
                        <option value="1">Home</option>
                        <option value="2">Gym</option>
                      </select>
                      <p className="react_validation">
                        {this.state.workoutLocationError}
                      </p>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">
                        Workout Frequency
                        <span className="react-span">(per week)</span>
                      </label>
                      <select
                        id=""
                        className="form-control"
                        name="workoutFrequency"
                        value={workoutFrequency}
                        onChange={this.onChange}
                      >
                        <option value="">Select Workout Frequency</option>
                        <option value="1">2x</option>
                        <option value="2">3x</option>
                        <option value="3">4x</option>
                      </select>
                      <p className="react_validation">
                        {this.state.workoutFrequencyError}
                      </p>
                    </div>

                    <div className="form-group mb-4">
                      <label htmlFor="">Workout Period</label>
                      <select
                        id=""
                        className="form-control"
                        name="workoutPeriod"
                        value={workoutPeriod}
                        onChange={this.onChange}
                      >
                        <option value="">Select Workout Period</option>
                        <option value="1">12 Weeks</option>
                        <option value="2">36 Weeks</option>
                        <option value="3">48 Weeks</option>
                      </select>
                      <p className="react_validation">
                        {this.state.workoutPeriodError}
                      </p>
                    </div>
                    <div className="form-group mb-4">
                      <label htmlFor="">Workout Difficulty</label>
                      <select
                        id=""
                        className="form-control"
                        name="workoutDifficulty"
                        value={workoutDifficulty}
                        onChange={this.onChange}
                      >
                        <option value="">Select Workout Difficulty</option>
                        <option value="1">Beginner</option>
                        <option value="2">Intermediate</option>
                        <option value="3">Advanced</option>
                      </select>
                      <p className="react_validation">
                        {this.state.workoutDifficultyError}
                      </p>
                    </div>
                    <button
                      type="submit"
                      value="signUp"
                      className="btn btn-primary submit_btn pull-right"
                      onClick={this.signUp}
                      disabled={isLoading}
                    >
                      Register{" "}
                      {isLoading && <i className="fa fa-spinner fa-pulse" />}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}
export default SignupWrapper;
