import React from "react";

export default class FatigueLevel extends React.Component {
  render() {
    return (
      <div>
        <div
          className="popup_heading"
          style={{ marginBottom: "2%", fontWeight: "bold" }}
        >
          Fatigue Level
        </div>
        <ul className="d-flex justify-content-around">
          <li>high</li>
          <li>medium</li>
          <li>low</li>
        </ul>
        <div className="middle">
          {Array.from(Array(10).keys()).map((index) => (
            <span key={index}>
              <label>
                <input
                  type="radio"
                  name="radio3"
                  value={index + 1}
                  onChange={this.props.onValueChangeFatigueLevel}
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
