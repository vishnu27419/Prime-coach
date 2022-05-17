import React from "react";

export default class WellBeingWarningModal extends React.Component {
  render() {
    return (
      <div
        className="modal-body"
        style={{ textAlign: "center", color: "black" }}
      >
        <div className="row">
          <div className="col-md-12">
            <h2
              style={{
                color: "#555",
                fontSize: "38px",
                fontWeight: "421",
                lineHeight: "50px",
                marginTop: "10px",
              }}
            >
              You should consider Deloading...{" "}
            </h2>
            <i
              style={{
                color: "orange",
                fontSize: "48px",
                fontWeight: "421",
                lineHeight: "35px",
                marginBottom: "20px",
              }}
              className="fa fa-exclamation-circle"
            ></i>
          </div>
          <div className="col-md-12">
            <button
              className="btn btn-info btn-success col-md-4 col-md-offset-4"
              // id="well-being-start-workout"
              onClick={this.props.wellBeingWarninButton}
            >
              Start Workout
            </button>
          </div>
        </div>
      </div>
    );
  }
}
