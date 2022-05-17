import React from "react";
import mobileImg from "../../Custom/images/mobile-img.png";

const BannerWrapper = (props) => {
  return (
    <div>
      <section className="banner_wrapper athlete-banner">
        <div className="banner_content d-flex flex-column justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h1>
                  <span>For</span> Athletes
                </h1>
                <p>
                  Intelligent online strength and conditioning coaching for all
                  levels of athletes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="individual_athlete">
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4">
                <div className="athlete_left_img">
                  <figure className="m-0">
                    <img
                      src={mobileImg}
                      className="img-fluid"
                      alt={mobileImg}
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-9 col-md-8">
                <div className="athlete_content text-right">
                  <h2>
                    Individual <span>Athletes</span>
                  </h2>
                  <p>
                    From amateur to semi-professional and professional athletes,
                    Prime Coach has a strength and conditioning program to fit
                    your training needs. Self-screen your movements, select your
                    training season period, set your training schedule, monitor
                    your fatigue levels, assess your progress and connect with a
                    sports specific coach to reach your full athletic potential.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default BannerWrapper;
