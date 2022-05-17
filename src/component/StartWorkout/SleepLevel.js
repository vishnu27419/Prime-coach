import React from "react";

export default class SleepLevel extends React.Component {
  render() {
    return (
      <div>
        <div
          className="popup_heading"
          style={{ marginBottom: "2%", fontWeight: "bold" }}
        >
          How Did You Sleep?
        </div>
        <ul className="d-flex justify-content-around">
          <li>not well</li>
          <li>well</li>
          <li>very well</li>
        </ul>
        <div className="middle">
          {Array.from(Array(10).keys()).map((index) => (
            <span key={index}>
              <label>
                <input
                  type="radio"
                  name="radio4"
                  value={index + 1}
                  onChange={this.props.onValueChangeHowDidYouSleep}
                />
                <div className="front-end box">
                  <span>{index + 1}</span>
                </div>
              </label>
              &nbsp;
            </span>
          ))}
        </div>
      </div>
    );
  }
}
