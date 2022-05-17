import React from "react";

export default class FreshnessLevel extends React.Component {
  render() {
    return (
      <div>
        <div
          className="popup_heading"
          style={{ marginBottom: "2%", fontWeight: "bold" }}
        >
          How Fresh Do You Feel?
        </div>
        <ul className="d-flex justify-content-around">
          <li>not fresh</li>
          <li>fresh</li>
          <li>very fresh</li>
        </ul>
        <div className="middle ">
          {Array.from(Array(10).keys()).map((index) => (
            <span key={index}>
              <label>
                <input
                  type="radio"
                  name="radio"
                  value={index + 1}
                  onChange={this.props.onValueChange}
                />
                <div className="front-end box ">
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
