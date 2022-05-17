import React from "react";
import { Link } from "react-router-dom";
import arrowRightBlackImg from "../../Custom/images/arrow-right-black-img.png";
import setImgPng from "../../Custom/images/set-img.png";
import screenImg from "../../Custom/images/screen-img.png";
import succes from "../../Custom/images/succes.png";
import winImgPng from "../../Custom/images/win-img.png";

const BannerWrapper = (props) => {
  return (
    <div>
      {/* <br />
      <br />
      <br />
      <br /> */}
      <div className="page-wrapper">
        <section className="banner_wrapper">
          <div className="banner_content">
            <div className="banner_image d-flex flex-column justify-content-center">
              <div className="container">
                <h1>
                  <span>Smart</span> Online Strength & Conditioning Coach
                </h1>
                {/* <a href="javaScript;" className="start_btn"> */}
                <Link
                  to="/sportsection"
                  className="start_btn"
                  style={{ textDecoration: "none" }}
                >
                  start now
                  <img
                    src={arrowRightBlackImg}
                    className="img-fluid"
                    alt={arrowRightBlackImg}
                  />
                  {/* </a> */}
                </Link>
              </div>
            </div>
            <div className="how-it-work-wrapper">
              <div className="container">
                <div className="heading_text">
                  <h2>
                    How <span>Prime</span>Coach Works?
                  </h2>
                </div>
                <div className="row text-center">
                  <div className="col-lg-3">
                    <div className="inner_boxes">
                      <figure>
                        <img
                          src={setImgPng}
                          className="img-fluid"
                          alt={setImgPng}
                        />
                      </figure>
                      <div className="details">
                        <div className="detail-title">SELECT</div>
                        <p>
                          Start your training journey by selecting your sport,
                          your preferred training location (gym or home), the
                          number of weekly sessions and the duration of your
                          programme.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="inner_boxes">
                      <figure>
                        <img
                          src={screenImg}
                          className="img-fluid"
                          alt={screenImg}
                        />
                      </figure>
                      <div className="details">
                        <div className="detail-title">SCREEN</div>
                        <p>
                          Perform self-screening so our smart technology can
                          identify any movement dysfunction. You’ll be assigned
                          a tailored pre-training corrective programme based on
                          your screening result.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="inner_boxes">
                      <figure>
                        <img src={succes} className="img-fluid" alt={succes} />
                      </figure>
                      <div className="details">
                        <div className="detail-title">TRAIN HARDER</div>
                        <p>
                          Become stronger, fitter and faster than ever before
                          with our unique, sports specific programme tailored to
                          your individual needs. Get in touch with your personal
                          coach to check your progress and form with the
                          Feedback setting.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="inner_boxes">
                      <figure>
                        <img
                          src={winImgPng}
                          className="img-fluid"
                          alt={winImgPng}
                        />
                      </figure>
                      <div className="details">
                        <div className="detail-title">PERFORM</div>
                        <p>
                          Take your training to the next level so you perform at
                          your best. Become a better athlete with Prime Coach.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default BannerWrapper;
