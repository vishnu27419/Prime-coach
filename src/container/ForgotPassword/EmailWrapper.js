import React from "react";
import { Link } from "react-router-dom";
import Header from "../PublicLayout/Header";
import Footer from "container/PublicLayout/Footer";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { successToast } from "utils/toastMessage";
import { connect } from "react-redux";
import { FORGOT_PASSWORD_EMAIL } from "store/actions/athleteAction/athlete";

class EmailWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { email: "", isLoading: false, emailError: "" };
  }

  // componentDidMount() {
  //   alert("coming soon!");
  // }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("on Change", this.state);
  };

  handelForgotPassword = async () => {
    const isValid = this.validation();

    if (isValid) {
      this.setState({ isLoading: true });
      try {
        const res = await standardPostApiJsonBased(
          "forgot_password",
          undefined,
          { email: this.state.email },
          true
        );
        if (res.data.code === 200) {
          console.log("response of forgot password", res.data);
          successToast(res.data.message);
          this.props.FORGOT_PASSWORD_EMAIL(this.state.email);

          this.props.history.push("/passwordconfirmation");
        }
      } catch (error) {
        console.error("error of forgot passsword", error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  validation = () => {
    let emailError = "";
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.state.email) {
      emailError = "The Email field is required.";
    } else if (!this.state.email.match(emailReg)) {
      emailError = "This Email Address is not valid. ";
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { email, isLoading, emailError } = this.state;
    return (
      <div className="loader_sec">
        <Header />

        <div className="login-page-wrapper">
          <section className="login_page">
            <div
              className="container"
              style={{ marginTop: "2%", marginBottom: "17vw" }}
            >
              <div className="row">
                <div className="col-md-12">
                  <h2 style={{ color: "#fff", textAlign: "center" }}>
                    Forgot Your Password?
                  </h2>
                  <h4
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    Enter Your Email.
                  </h4>
                  <div style={{ background: "#fff" }}>
                    <hr />
                  </div>
                  <div className="col-md-5 form-align-centre">
                    <div className="form-group">
                      <label style={{ color: "#fff", textAlign: "center" }}>
                        Email
                      </label>
                      <input
                        className="form-control"
                        type="email"
                        name="email"
                        value={email}
                        onChange={this.onChange}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            this.handelForgotPassword();
                          }
                        }}
                      />

                      <p
                        className="react_validation"
                        style={{ marginTop: "5px" }}
                      >
                        {emailError}
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
                      {/* <Link to="/passwordconfirmation"> */}
                      <button
                        // type="submit"
                        className="btn btn-default forgot_Password_Email_button"
                        style={{ padding: "6px 52px" }}
                        onClick={() => this.handelForgotPassword()}
                        disabled={isLoading}
                      >
                        Submit{" "}
                        {isLoading && <i className="fa fa-spinner fa-pulse" />}
                      </button>
                      {/* </Link> */}
                    </div>
                  </div>
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

// export default EmailWrapper;

const mapDispatchToProps = (dispatch) => {
  return {
    FORGOT_PASSWORD_EMAIL: (data) => dispatch(FORGOT_PASSWORD_EMAIL(data)),
  };
};
export default connect(null, mapDispatchToProps)(EmailWrapper);
