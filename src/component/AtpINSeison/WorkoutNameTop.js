import React from "react";

function WorkoutNameTop(props) {
  return (
    <div className="col-lg-12">
      <h2 style={{ color: "white" }} className="Workout_top_react">
        Workout &nbsp;{" "}
        <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
      </h2>
      <div className="col-lg-12">
        <h2
          style={{ color: "white", marginLeft: "40%" }}
          className="Worhout_exercise_react"
        >
          {/* Name */}
          {props.WorkoutNameTopExerciseName}
        </h2>
      </div>
    </div>
  );
}

export default WorkoutNameTop;
