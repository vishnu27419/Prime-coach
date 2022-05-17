import React from "react";
import laptopImg from "../../Custom/images/laptop-img.png";

const TeamWrapper = (props) => {
  return (
    <div>
      <section className="team_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="team_content">
                <h2>
                  For <span>Teams</span>
                </h2>
                <p>
                  No matter what your sport, Prime coach is the perfect addition
                  to your team. Our intelligent online strength and conditioning
                  programmes can be tailored to individual team members based on
                  fitness level and athletic ability. From selecting specific
                  training season periods and comparing test results to
                  monitoring fatigue levels and everything in-between, Prime
                  Coach helps your team members reach their fitness goals.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="team_side_img">
                <figure className="m-0">
                  <img src={laptopImg} className="img-fluid" alt={laptopImg} />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TeamWrapper;
