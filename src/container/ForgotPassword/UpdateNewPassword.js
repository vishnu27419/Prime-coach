import React from "react";
import { Link } from "react-router-dom";
import Header from "../PublicLayout/Header";
import Footer from "container/PublicLayout/Footer";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";

class UpdateNewPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passwordVisibale: false,
      password: "",
      email: "",
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    console.log("on Change", this.state);
  };

  togglePassword = async () => {
    await this.setState({ passwordVisibale: !this.state.passwordVisibale });
  };

  render() {
    const { passwordVisibale, password, email } = this.state;
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
                    Update New Password
                  </h2>
                  {/* <h4
                    style={{
                      color: "#fff",
                      fontSize: "18px",
                      textAlign: "center",
                    }}
                  >
                    Enter Your Email.
                  </h4> */}
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
                      />
                    </div>

                    <div
                      className="form-group"
                      style={{ position: "relative" }}
                    >
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
                      >
                        Submit
                      </button>
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

export default UpdateNewPassword;
