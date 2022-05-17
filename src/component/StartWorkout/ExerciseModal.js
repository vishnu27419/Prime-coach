import React from "react";

export default class ExerciseModal extends React.Component {
  getId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  render() {
    const urlId = this.getId(this.props.videoUrl);
    return (
      <div>
        <div className="col-md-12">
          <p style={{ textAlign: "center", padding: "0 138px" }}>
            Below are some exercises which you should perform based upon your
            muscle soreness, before procedding with the workouts.
          </p>
          <button
            className="workout_Complete_Btn"
            style={{
              marginLeft: "34%",
              // marginTop: "2%",
              fontSize: "20px",
              alignItems: "center",
            }}
          >
            {this.props.exerciseType}
          </button>
          <div style={{ margin: "0 13%", marginTop: "3%", marginBottom: "5%" }}>
            <iframe
              title="try"
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${urlId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              //   allowfullscreen
            ></iframe>
          </div>
          <button
            type="button"
            className="Model_btn_ok "
            data-dismiss="modal"
            style={{ marginLeft: "42%", marginBottom: "15%" }}
            onClick={this.props.onNext}
          >
            Next
          </button>
        </div>
      </div>
    );
  }
}
