import React from "react";
import laptopTeamBuilderImg from "../../Custom/images/laptop-team-builder-img.png";

const BannerWrapper = (props) => {
  return (
    <div>
      <section className="banner_wrapper coaches-banner">
        <div className="banner_content d-flex flex-column justify-content-center">
          <div className="container">
            <div className="row">
              <div className="col-lg-7">
                <h1>
                  <span>For</span> Coaches
                </h1>
                <p>
                  Smart online strength and conditioning support for all types
                  of coaches across a range of sports.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="individual_athlete team_build_wrapper">
          <div className="container">
            <div className="row">
              <div className="col-lg-5 col-md-6">
                <div className="athlete_left_img">
                  <figure className="m-0">
                    <img
                      src={laptopTeamBuilderImg}
                      className="img-fluid"
                      alt={laptopTeamBuilderImg}
                    />
                  </figure>
                </div>
              </div>
              <div className="col-lg-7 col-md-6">
                <div className="athlete_content text-right">
                  <h2>
                    Team <span>Builder</span>
                  </h2>
                  <p>
                    Effortlessly build your coaching team and team of players
                    with Prime Coach. Build your coaching team and assign them
                    with custom roles and permissions. Plus create accounts for
                    each team player and add their sports specific details,
                    including their position played, fitness level, athletic
                    experience and more.
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
