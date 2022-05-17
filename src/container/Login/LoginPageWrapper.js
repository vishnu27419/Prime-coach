import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Header from "../PublicLayout/Header";
import Footer from "../PublicLayout/Footer";
import { standardPostApi } from "../API/ApiWrapper";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";
import { errorToast } from "../../utils/toastMessage";
import userImg from "Custom/images/coachimg.png";
import userAthleteImg from "Custom/images/uesrAthlete.png";

class LoginPageWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      emailError: "",
      passwordError: "",
      login: false,
      person: this.props.match.params.person,
      passwordToggle: false,
      isLoading: false,
      // userDetails: {},
    };
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  login = async (e) => {
    e.preventDefault();
    const isValid = this.validation();
    if (isValid) {
      this.setState({ isLoading: true });
      try {
        const res = await standardPostApi(
          "login",
          undefined,
          {
            email: this.state.email,
            password: this.state.password,
            role: this.state.person === "coach" ? 3 : 2,
            device_token: "874874874874",
            device_type: "ios",
            login_type: "web",
          },
          true
        );

        if (res.data.code === 200) {
          localStorage.setItem("access_token", res.data.data.access_token);
          localStorage.setItem("access_role", res.data.data.role);
          this.setState({ login: true });
          console.log("response of log in ", res.data.data);
          await this.saveDeviceToServer();
          this.props.history.push(
            this.state.person === "coach" ? "/myteamwrapper" : "/selfscreening"
          );
        }
      } catch (error) {
        errorToast(error?.message);
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  validation = (e) => {
    let emailError = "";
    let passwordError = "";
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.state.email) {
      emailError = "The Email field is required.";
    } else if (!this.state.email.match(emailReg)) {
      emailError = "This Email Address is not valid. ";
    }
    if (!this.state.password) {
      passwordError = " The Password field is required.";
    }
    if (emailError || passwordError) {
      this.setState({ emailError, passwordError });
      return false;
    } else {
      return true;
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  togglePassfunc = async () => {
    const { passwordToggle } = this.state;
    await this.setState({ passwordToggle: !passwordToggle });
  };

  async saveDeviceToServer() {
    const playerId = localStorage.getItem("useragentid");
    console.log("Devise state at Login", {
      access_token: await localStorage.getItem("access_token"),
      player_id: playerId,
      device_type: "web",
      device_id: "12345978",
      device_model: "dell",
    });
    try {
      const res = await standardPostApi(
        "save_device",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          player_id: playerId,
          device_type: "web",
          device_id: "12345978",
          device_model: "dell",
        },
        true,
        false
      );
      if (res.data.status) {
        console.log("Push Notification connected");
      }
    } catch (error) {
      console.log("error of save divice", error);
    }
  }

  render() {
    // if (this.state.login) {
    //   return localStorage.getItem("access_token") ? (
    //     <Redirect
    //       to={
    //         this.state.person === "coach" ? "/myteamwrapper" : "/selfscreening"
    //       }
    //     />
    //   ) : null;
    // }

    // if (this.state.login) {
    //   this.props.history.push(
    //     this.state.person === "coach" ? "/myteamwrapper" : "/selfscreening"
    //   );
    // }

    // console.log(
    //   "snfkjbhafjfdfhozbujzbxcujbzjxc----------------->",
    //   localStorage.getItem("useragentid")
    // );

    const { email, password, passwordToggle, isLoading } = this.state;

    return (
      <div className="loader_sec">
        <Header />
        <div className="login-page-wrapper">
          <section className="login_page">
            <div
              className="container"
              style={{ marginTop: "0", marginBottom: "10%" }}
            >
              <div className="row">
                <div className="col-lg-6 m-auto">
                  <form action="" className="login_form">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "14px",
                      }}
                    >
                      {this.state.person === "coach" ? (
                        <img
                          src={userImg}
                          alt="no_img"
                          style={{ width: "20%" }}
                        />
                      ) : (
                        <img
                          src={userAthleteImg}
                          alt="no_img"
                          style={{ width: "20%" }}
                        />
                      )}
                    </div>
                    <div
                      className="heading text-center"
                      style={{ textTransform: "none", fontWeight: "500" }}
                    >
                      {this.state.person === "coach"
                        ? "Coach Log in"
                        : "Athlete Log in"}{" "}
                    </div>
                    <hr className="hr_title" />
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Email Address"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                      />

                      <p className="react_validation">
                        {this.state.emailError}
                      </p>
                    </div>

                    <div
                      className="form-group"
                      style={{ position: "relative" }}
                    >
                      <input
                        // type="password"
                        type={passwordToggle === false ? "password" : "text"}
                        className="form-control"
                        placeholder="Password"
                        name="password"
                        value={password}
                        onChange={this.onChange}
                      />
                      <p className="react_validation">
                        {this.state.passwordError}
                      </p>
                      {passwordToggle === false ? (
                        <img
                          src={hide}
                          alt="hide"
                          style={{
                            height: "20px",
                            position: "absolute",
                            top: "7px",
                            right: "14px",
                            cursor: "pointer",
                            opacity: "0.5",
                          }}
                          onClick={() => this.togglePassfunc()}
                        />
                      ) : (
                        <img
                          src={show}
                          alt="show"
                          style={{
                            height: "20px",
                            position: "absolute",
                            top: "7px",
                            right: "14px",
                            cursor: "pointer",
                            opacity: "0.5",
                          }}
                          onClick={() => this.togglePassfunc()}
                        />
                      )}
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary submit_btn"
                      onClick={this.login}
                      style={{ padding: "5px 26px" }}
                      disabled={isLoading}
                    >
                      Log in{" "}
                      {isLoading && <i className="fa fa-spinner fa-pulse" />}
                    </button>
                    <div className="page_links mt-4">
                      {/* /forgotpassword */}
                      <Link to="/forgotpassword" className="forgot_password">
                        {/* <div onClick={() => alert("coming soon!")}>
                        <Link className="forgot_password"> */}
                        Forgot Your Password ?
                      </Link>
                      {/* </div> */}
                      <Link
                        to="/sportsection"
                        className="forgot_password"
                        // style={{ marginBottom: "10%" }}
                      >
                        Register as a New User
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default LoginPageWrapper;
