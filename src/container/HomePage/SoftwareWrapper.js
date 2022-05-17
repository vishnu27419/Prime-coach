import React from "react";
import screenshotsCombinedImg from "../../Custom/images/screenshots_combined_img.png";

const SoftwareWrapper = (props) => {
  return (
    <div>
      <section id="software_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="left_side_img">
                <figure>
                  <img
                    src={screenshotsCombinedImg}
                    className="img-fluid"
                    alt={screenshotsCombinedImg}
                  />
                </figure>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="right_side_text">
                Our unique software is designed with athletes like you in mind.
                Our easy to follow, individually tailored programmes will help
                you to take your performance to the next level.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default SoftwareWrapper;
