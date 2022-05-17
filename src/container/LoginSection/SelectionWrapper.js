import React, { Component } from "react";
import { Link } from "react-router-dom";
import AthleteLoginImg from "../../Custom/images/Athlete-login-img.png";
import coachLoginImg from "../../Custom/images/coach-login-img.png";
import Header from "../PublicLayout/Header";
import { Redirect } from "react-router";
import Footer from "../PublicLayout/Footer";

class SelectionWrapper extends Component {
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
    // console.log("***log sec***", this.props.match.params);
    return (
      <div className="loader_sec">
        <Header />
        <section className="selection-wrapper">
          <div
            className="container react_loginSection_container"
            style={{ marginTop: "10%", marginBottom: "10%" }}
          >
            <div className="row">
              <div className="col-lg-5 col-md-5 offset-md-1">
                {/* <a href="javaScript;"> */}
                <div className="athelete-login px-lg-4 ">
                  <figure>
                    <img
                      src={AthleteLoginImg}
                      className="img-fluid"
                      alt={AthleteLoginImg}
                    />
                  </figure>
                  <Link
                    className="btn btn-lg periodisation-plan-legend-btn plan-legend-in-season-btn pull-left react_login_Section_btn"
                    to={`/login/${this.props.match.params.athlete}`}
                  >
                    Sign-in as Athlete
                  </Link>
                </div>
              </div>
              <div className="side_hr_loginsection"></div>
              <div className="col-lg-5 col-md-5">
                {/* <a href="javaScript;"> */}
                <div className="coach-login px-lg-4">
                  <figure>
                    <img
                      src={coachLoginImg}
                      className="img-fluid"
                      alt={coachLoginImg}
                    />
                  </figure>
                  <Link
                    className="btn  btn-lg periodisation-plan-legend-btn plan-legend-off-season-btn pull-right  react_login_Section_coach_btn"
                    to={`/login/${this.props.match.params.coach}`}
                  >
                    Sign-in as Coach
                  </Link>
                </div>
                {/* </a> */}
              </div>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    );
  }
}

export default SelectionWrapper;
