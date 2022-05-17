import React from "react";
import Footer from "../PublicLayout/Footer";
import Header from "../PublicLayout/Header";
import OtpInput from "react-otp-input";
import { Link } from "react-router-dom";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";
import { connect } from "react-redux";
import { standardPostApi } from "container/API/ApiWrapper";
import { successToast } from "utils/toastMessage";

class PasswordConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      otp: "",
      passwordVisibale: false,
      password: "",
      email: "",
      emailError: "",
      passwordError: "",
      otpError: "",
      isLoading: false,
    };
  }

  handleOtp = async (otp) => {
    await this.setState({ otp: otp });
    console.log("THIS IS OTP", this.state.otp);
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("on Change", this.state);
  };

  togglePassword = async () => {
    await this.setState({ passwordVisibale: !this.state.passwordVisibale });
  };

  handelUpdatePassword = async () => {
    const { password, otp } = this.state;
    const userEmail = this.props.emailState;

    const isValid = this.validation();

    if (isValid) {
      this.setState({ isLoading: true });
      try {
        const res = await standardPostApi(
          "update_password",
          undefined,
          { email: userEmail, password: password, otp: otp },
          true
        );

        if (res.data.code) {
          console.log("THIS IS RESPONSE OF ", res);
          successToast(res.data.message);

          res.data.length &&
            this.props.history.push(`/loginsection/${"athlete"}/${"coach"}`);
        }
      } catch (error) {
        console.error("error of update password", error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  validation = () => {
    let passwordError = "";
    let otpError = "";
    let passReg =
      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/;

    if (!this.state.password) {
      passwordError = "Password field is required.";
    } else if (!this.state.password.match(passReg)) {
      passwordError =
        "Password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    } else if (!this.state.otp) {
      otpError = "OTP field is required.";
    }

    if (passwordError || otpError) {
      this.setState({ passwordError, otpError });
      return false;
    } else {
      return true;
    }
  };

  render() {
    const {
      otp,
      passwordVisibale,
      password,
      email,

      passwordError,
      otpError,
      isLoading,
    } = this.state;

    // console.log("emailState", this.props.emailState);

    const userEmail = this.props.emailState;
    return (
      <div className="loader_sec">
        <Header />
        <section className="login_page_react">
          <div className="body-content">
            <div
              className="container"
              style={{ marginBottom: "17vw", marginTop: "5%" }}
            >
              <div className="row">
                <div className="col-md-12">
                  <h2 style={{ color: "#fff", textAlign: "center" }}>
                    Update New Password
                  </h2>
                  <h4
                    // style={{
                    //   color: "#fff",
                    //   fontSize: "18px",
                    //   textAlign: "center",
                    // }}

                    style={{
                      color: "#ffffff",
                      fontSize: "17px",
                      fontWeight: "100",
                      lineHeight: "50px",
                      marginTop: "5px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Please Check Your Email To Reset Your Password.
                  </h4>
                  <div style={{ background: "#fff" }}>
                    <hr />
                  </div>
                </div>
              </div>
              <h2
                style={{
                  color: "#555",
                  fontSize: "38px",
                  fontWeight: "100",
                  lineHeight: "50px",
                  marginTop: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginBottom: "30px",
                }}
              >
                Enter The OTP Sent To Your Email Address
              </h2>

              <div className="col-md-5 form-align-centre">
                <div className="form-group">
                  <label style={{ color: "#fff", textAlign: "center" }}>
                    Email
                  </label>
                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    defaultValue={(email, userEmail)}
                    onChange={this.onChange}
                    readOnly
                    style={{ cursor: "not-allowed" }}
                  />
                  {/* <p className="react_validation" style={{ marginTop: "5px" }}>
                    {emailError}
                  </p> */}
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label style={{ color: "#fff", textAlign: "center" }}>
                    Password
                  </label>
                  <input
                    className="form-control"
                    type={passwordVisibale === false ? "password" : "text"}
                    name="password"
                    value={password}
                    onChange={this.onChange}
                  />

                  <p className="react_validation" style={{ marginTop: "5px" }}>
                    {passwordError}
                  </p>

                  {passwordVisibale === false ? (
                    <img
                      src={show}
                      alt="show"
                      style={{
                        height: "20px",
                        position: "absolute",
                        top: "40px",
                        right: "14px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={this.togglePassword}
                    />
                  ) : (
                    <img
                      src={hide}
                      alt="hide"
                      style={{
                        height: "20px",
                        position: "absolute",
                        top: "40px",
                        right: "14px",
                        cursor: "pointer",
                        opacity: "0.5",
                      }}
                      onClick={this.togglePassword}
                    />
                  )}
                </div>
                <div className="form-group">
                  <label style={{ color: "#fff", textAlign: "center" }}>
                    OTP
                  </label>
                  <OtpInput
                    inputStyle={{
                      width: "100%",
                      height: "31px",
                      borderRadius: "3px",
                      border: "none",
                      // marginRight: "5px",
                      outline: "0",
                    }}
                    value={otp}
                    onChange={this.handleOtp}
                    numInputs={6}
                    containerStyle="otp_container"
                    isInputNum={true}
                    // isInputSecure={true}
                    separator={
                      <span
                        style={{
                          color: "#fff",
                          margin: "5px",
                        }}
                      >
                        -
                      </span>
                    }
                  />

                  <p className="react_validation" style={{ marginTop: "5px" }}>
                    {otpError}
                  </p>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "5%",
                  }}
                >
                  <button
                    // type="submit"
                    className="btn btn-default forgot_Password_Email_button"
                    style={{ padding: "6px 52px" }}
                    onClick={this.handelUpdatePassword}
                    disabled={isLoading}
                  >
                    Reset Password{" "}
                    {isLoading && <i className="fa fa-spinner fa-pulse" />}
                  </button>
                </div>
              </div>
              {/* <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "3%",
                }}
              >
                <Link to="/updatenewpassword">
                  <button className="btn btn-default forgot_Password_Email_button">
                    Reset Password
                  </button>
                </Link>
              </div> */}
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

// export default PasswordConfirmation;

const mapStateToProps = (state) => {
  return {
    emailState: state.athlete.forgotPasswordEmail,
  };
};

export default connect(mapStateToProps, null)(PasswordConfirmation);
