import React from "react";
import tabletImg from "../../Custom/images/tablet-img.png";

const YouthAthleteWrapper = (props) => {
  return (
    <div>
      <section className="youth_athlete_wrapper athlete_progress_wrapper">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-md-8">
              <div className="athlete-img">
                <figure>
                  <img src={tabletImg} className="img-fluid" alt={tabletImg} />
                </figure>
              </div>
            </div>
            <div className="col-lg-4 col-md-4">
              <div className="athlete-content pt-lg-5 text-right">
                <h2>
                  Track Your <span>Athletes Progress</span>
                </h2>
                <p>
                  Know exactly how your team members are tracking with Prime
                  Coach. Access athlete's reports such as their well-being
                  scale, training details, training intensity, and volume and
                  number of performed or engaged sessions to monitor their
                  progress. Easily share reports with other coaches to ensure
                  the whole coaching team’s in the loop. Also use the leader
                  board to highlight the best performer within the team at any
                  given time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default YouthAthleteWrapper;
