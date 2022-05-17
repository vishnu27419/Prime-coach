import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function RoundOff(num) {
  return parseInt(Math.round(Number(num)));
}

export default class WorkoutCompletedModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const { setPercent, repsPercent, loadPercent } = this.props;
    return (
      <div>
        <div className="col-xs-12 ">
          <h2
            style={{
              color: "#555",
              fontSize: "38px",
              fontWeight: "400",
              lineHeight: "50px",
              marginTop: "10px",
              textAlign: "center",
              marginBottom: "3%",
            }}
          >
            Workout Completed
            <i
              style={{ fontSize: "large", color: "green" }}
              className="fa fa-check"
            ></i>
          </h2>
        </div>
        <div
          className="popup_heading"
          style={{
            // marginBottom: "2%",
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          <label>Please estimate the workout intensity</label>
        </div>
        <ul className="d-flex justify-content-around">
          <li>low</li>
          <li>medium</li>
          <li>high</li>
        </ul>
        <div className="middle">
          {Array.from(Array(10).keys()).map((index) => (
            <span key={index}>
              <label>
                <input
                  type="radio"
                  name="radio11"
                  value={index + 1}
                  onChange={this.props.setSelectedIntensity}
                />
                <div className="front-end box">
                  <span>{index + 1}</span>
                </div>
              </label>
              &nbsp;
            </span>
          ))}
        </div>
        {this.props.visibleWellBeingInformation ? (
          <div>
            <h2
              style={{
                color: "#555",
                fontSize: "38px",
                fontWeight: "400",
                lineHeight: "50px",
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Well-Being Information
            </h2>
            <ul
              className="d-flex justify-content-around col-xl-12"
              style={{ padding: "0 124px" }}
            >
              <li>Fresh</li>
              <li>Sore</li>
              <li>Fatigue</li>
              <li>Sleep</li>
            </ul>
            <div className="middle_New">
              {this.props.wellInfo &&
                this.props.wellInfo.map((item, index) => (
                  <span key={index}>
                    <label>
                      <input type="radio" name="radio11" value={index + 1} />
                      <div className="front-end box">
                        <span>{RoundOff(item)}</span>
                      </div>
                    </label>
                    &nbsp;
                  </span>
                ))}
            </div>
            <h2
              style={{
                color: "#555",
                fontSize: "38px",
                fontWeight: "400",
                lineHeight: "50px",
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              Accomplishments
            </h2>
            <ul
              className="d-flex justify-content-around"
              style={{
                padding: "0 219px",
                color: "#555",
                // fontSize: "38px",
                fontWeight: "900",
                lineHeight: "50px",
                marginTop: "10px",
                textAlign: "center",
                marginBottom: "3%",
              }}
            >
              <li>Sets</li>
              <li>Reps</li>
              <li>Load</li>
            </ul>
            <div
              style={{ padding: "0 203px", display: "flex", marginLeft: "2px" }}
            >
              <div style={{ marginRight: "11px", marginLeft: "5px" }}>
                <CircularProgressbar
                  value={setPercent}
                  text={`${setPercent}%`}
                  styles={buildStyles({
                    pathColor:
                      setPercent > 25
                        ? `rgba(0,255,127, ${setPercent / 100})`
                        : "#f00",
                    textColor:
                      setPercent > 25
                        ? `rgba(0,255,127, ${setPercent / 100})`
                        : "#f00",
                  })}
                />
              </div>
              <div style={{ marginRight: "11px" }}>
                <CircularProgressbar
                  value={repsPercent}
                  text={`${repsPercent}%`}
                  styles={buildStyles({
                    pathColor:
                      repsPercent > 25
                        ? `rgba(0,255,127, ${repsPercent / 100})`
                        : "#f00",
                    textColor:
                      repsPercent > 25
                        ? `rgba(0,255,127, ${repsPercent / 100})`
                        : "#f00",
                  })}
                />
              </div>
              <div style={{ marginRight: "11px" }}>
                <CircularProgressbar
                  value={loadPercent}
                  text={`${loadPercent}%`}
                  styles={buildStyles({
                    pathColor:
                      loadPercent > 25
                        ? `rgba(255, 0, 0, ${loadPercent / 100})`
                        : "#f00",
                    textColor:
                      loadPercent > 25
                        ? `rgba(255, 0, 0, ${loadPercent / 100})`
                        : "#f00",
                  })}
                />
              </div>
            </div>
          </div>
        ) : null}
      </div>
    );
  }
}
