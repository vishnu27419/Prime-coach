import React from "react";
import laptopTestingImg from "../../Custom/images/laptop-testing-img.png";

const TestingWrapper = (props) => {
  return (
    <div>
      <section className="team_wrapper testing_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-6">
              <div className="team_content pt-lg-4">
                <h2>Testing</h2>
                <p>
                  Test your team’s performance and easily adjust training
                  programmes based on results. With Prime Coach, you can easily
                  design your own testing protocols for your teams, as well as
                  continuously monitor results and compare them with previous
                  reports using our Testing Reports.
                </p>
              </div>
            </div>
            <div className="col-lg-6 col-md-6">
              <div className="team_side_img">
                <figure className="m-0">
                  <img
                    src={laptopTestingImg}
                    className="img-fluid"
                    alt={laptopTestingImg}
                  />
                </figure>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TestingWrapper;
