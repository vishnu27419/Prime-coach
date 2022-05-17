import React from "react";
import piotrCoach from "../../Custom/images/piotr-coach.png";
import jamesCoach from "../../Custom/images/james-coach.png";
import joshResizedCoach from "../../Custom/images/josh-resized-coach.png";
import arrowRightBlueImg from "../../Custom/images/arrow-right-blue-img.png";
import { Link } from "react-router-dom";

class OurCoachWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { firstCoach: false, secondCoach: false, thirdCoach: false };
  }

  firstCoachShow = async () => {
    await this.setState({ firstCoach: !this.state.firstCoach });
  };

  secondCoachShow = async () => {
    await this.setState({ secondCoach: !this.state.secondCoach });
  };

  thirdCoachShow = async () => {
    await this.setState({ thirdCoach: !this.state.thirdCoach });
  };

  render() {
    return (
      <div>
        <section id="our-coaches-wrapper">
          <div className="container">
            <div className="heading mb-4">
              <h2>Our Coaches</h2>
              <p>
                Created by our leading strength and conditioning coaches, our
                programmes are designed to help you reach your full athletic
                potential. You’ll be assigned an expert coach in your field
                who’ll provide advice and support to help you enhance your
                performance.
              </p>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-4">
                <div className="coach_details">
                  <figure>
                    <img
                      src={piotrCoach}
                      className="img-fluid"
                      alt={piotrCoach}
                    />
                    {/* <a href="#" className="btn coachabout_btn about_btn"> */}
                    <a
                      onClick={this.firstCoachShow}
                      className="btn coachabout_btn about_btn"
                      style={{ color: "#ffff" }}
                    >
                      about
                    </a>
                    {this.state.firstCoach ? (
                      <div className="coach_decription">
                        <p>
                          Over the last decade, Piotr has worked with some of
                          the best universities, and athletes in the world. He
                          holds an MSc in Sports Therapy, a BSc in Sports
                          Science and Medicine, and is an accredited strength
                          and conditioning coach through the UKSCA. He’s
                          currently employed at Anglia Ruskin University as a
                          lecturer/practitioner in Sport and Exercise Therapy.
                        </p>
                        <p>
                          Founder of Prime Coach, Piotr combined the smarts of
                          AI technology with his years of experience in the
                          field and his in-depth knowledge, to create a system
                          that supports athletes and coaches throughout the
                          year.{" "}
                        </p>
                        <div className="text-right">
                          <a
                            onClick={this.firstCoachShow}
                            className="btn about_btn"
                            style={{ marginTop: "17%" }}
                          >
                            close
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </figure>
                  <div className="coach-name">Piotr Golaszczyk</div>
                  <div className="role">
                    Founder | Strength & Conditioning Coach
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="coach_details">
                  <figure>
                    <img
                      src={jamesCoach}
                      className="img-fluid"
                      alt={jamesCoach}
                    />
                    <a
                      onClick={this.secondCoachShow}
                      className="btn coachabout_btn about_btn"
                      style={{ color: "#ffff" }}
                    >
                      about
                    </a>
                    {this.state.secondCoach ? (
                      <div className="coach_decription">
                        <p>
                          With a BSc (Hons) in Psychology, and a Premier Diploma
                          in Personal Training, James has a wealth of knowledge.
                          James has over 3 years of experience as a strength and
                          conditioning coach; he’s currently employed at the
                          University of Cambridge, and is pursuing his UKSCA
                          accreditation.
                        </p>
                        <p>
                          He’s previously worked on The Bristol School Sports
                          Partnership’s Gifted and Talented Young Athlete’s
                          programme, training some of the most talented youth
                          athletes in the region. He’s worked with athletes from
                          a range of clubs and sports, including American
                          football, cricket, fencing and lightweight rowing. His
                          unrivalled knowledge and experience have been
                          invaluable in the creation of Prime Coach.
                        </p>
                        <div className="text-right">
                          <a
                            onClick={this.secondCoachShow}
                            className="btn about_btn"
                          >
                            close
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </figure>
                  <div className="coach-name">James Meadows</div>
                  <div className="role">Strength & Conditioning Coach</div>
                </div>
              </div>

              <div className="col-lg-4 col-md-4">
                <div className="coach_details">
                  <figure>
                    <img
                      src={joshResizedCoach}
                      className="img-fluid"
                      alt={joshResizedCoach}
                    />
                    <a
                      onClick={this.thirdCoachShow}
                      className="btn coachabout_btn about_btn"
                      style={{ color: "#ffff" }}
                    >
                      about
                    </a>

                    {this.state.thirdCoach ? (
                      <div className="coach_decription">
                        <p>
                          Josh graduated with both an MSc in Applied Sport
                          Physiology and a BSc in Sport Coaching from the
                          University of Brighton. During his studies, Josh
                          worked with elite sporting institutes, including
                          Sussex County Cricket, Brighton and Hove Albion
                          Football Club and the Sport and Exercise Science
                          Consultancy Unit at The University of Brighton.
                        </p>
                        <p>
                          Currently, Josh works as a Strength & Conditioning
                          Coach at the University of Cambridge, delivering S&C
                          services to both local and university athletes. In
                          this role, Josh coaches several team sports and
                          individual athletes, with many of them currently
                          competing at national or international levels. Aside
                          from S&C, Josh has a Football coaching role at various
                          primary school clubs.
                        </p>
                        <div className="text-right">
                          <a
                            onClick={this.thirdCoachShow}
                            className="btn about_btn"
                          >
                            close
                          </a>
                        </div>
                      </div>
                    ) : null}
                  </figure>
                  <div className="coach-name">Josh Gooden</div>
                  <div className="role">Strength & Conditioning Coach</div>
                </div>
              </div>
            </div>
          </div>
          <div className="trial-wrapper">
            <div className="container">
              <div className="inner-text">
                Start your
                <span>14 day Free Trial</span>
                {/* <a href="javaScript;" className="start_trial_btn"> */}
                <Link
                  to="/sportsection"
                  className="start_trial_btn"
                  style={{ textDecoration: "none" }}
                >
                  Start Now{" "}
                  <img
                    src={arrowRightBlueImg}
                    className="img-fluid"
                    alt={arrowRightBlueImg}
                  />
                </Link>
                {/* </a> */}
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default OurCoachWrapper;
