import React from "react";
// import { Form } from "react-bootstrap";
import { errorToast } from "../../utils/toastMessage";
class DaysWorkout extends React.Component {
  render() {
    const { description, workoutLocationChange, intensity, workoutType } =
      this.props.value;

    return (
      <div className="col-lg-4">
        <div className="pl-3 react_right_line">
          <div className="week_details workout_section">
            <div className="week_heading">
              Workouts &nbsp;{" "}
              <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
            </div>
            <div className="form-group">
              <label htmlFor="">Description</label>
              <input
                type="text"
                className="form-control w-100"
                name="description"
                value={(description, this.props.descriptionClean)}
                onChange={this.props.onChange}
                placeholder="Description"
              />
              <p className="react_validation">{this.props.descriptionError}</p>
            </div>

            <div className="form-group">
              <label htmlFor="">Workout Location</label>
              <select
                name="workoutLocationChange"
                value={
                  (workoutLocationChange, this.props.workoutLocationChangeClen)
                }
                onChange={this.props.onChange}
                className="form-control"
              >
                <option value="">Select Workout Location</option>
                {this.props.workoutLocation &&
                  this.props.workoutLocation.map((data) => {
                    return (
                      <option value={data.value} key={data.id}>
                        {data.label}
                      </option>
                    );
                  })}
              </select>
              <p className="react_validation">
                {this.props.workoutLocationError}
              </p>
            </div>

            <div className="form-group">
              <label htmlFor="">Intensity</label>
              <input
                maxLength={4}
                type="text"
                className="form-control w-100"
                placeholder="0"
                name="intensity"
                value={(intensity, this.props.intensityClean)}
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
              />
              <p className="react_validation">{this.props.intensityError}</p>
            </div>

            <div className="form-group">
              <label htmlFor="">Workout Type</label>
              <select
                name="workoutType"
                value={(workoutType, this.props.workoutTypeClean)}
                onChange={this.props.onChange}
                className="form-control"
              >
                <option value="">Select Workout Type </option>
                {this.props.WorkoutType &&
                  this.props.WorkoutType.map((item) => {
                    return (
                      <option value={item.value} key={item.id}>
                        {item.label}
                      </option>
                    );
                  })}
              </select>
              <p className="react_validation">{this.props.workoutTypeError}</p>
            </div>

            {this.props.workout.length !== 1 ? (
              <>
                <button
                  style={{ marginBottom: "10px" }}
                  type="button"
                  className=" btn-md col-md-12  btn_react_add_new_workout"
                  onClick={this.props.addWorkout}
                >
                  Add New Workout
                </button>
              </>
            ) : (
              <>
                <button
                  style={{ marginBottom: "10px" }}
                  type="button"
                  className=" btn-md col-md-12  btn_react_add_new_workout"
                  // onClick={this.props.addWorkout}
                  onClick={() =>
                    errorToast(
                      "You can add only single workout for a single day."
                    )
                  }
                  // disabled
                >
                  Add New Workout
                </button>
              </>
            )}
          </div>

          <div>
            {this.props.workoutLoder === true ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "20px",
                }}
              >
                <i
                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                  style={{
                    color: "var(--appBlue2)",
                    fontSize: "60px",
                  }}
                />
              </div>
            ) : (
              <div>
                {this.props.workout &&
                  this.props.workout.map((item) => {
                    return (
                      <div className="home_sc workout_data" key={item.id}>
                        <div className="home_sc_inner text-center ">
                          <button
                            className="btn  btn-sm col-md-12 react_workout_exercise_btn"
                            onClick={() => this.props.DaysWorkoutButton(item)}
                          >
                            {item.name}
                          </button>
                          <ul
                            className="list-inline d-flex justify-content-between"
                            style={{
                              display: "flex",
                              flexWrap: "wrap",
                            }}
                          >
                            {/* <li>
                          <a href="#">
                            <i className="fa fa-pencil-square-o"></i>
                          </a>
                        </li> */}
                            <li>
                              <button
                                className="atp_modal_btn"
                                onClick={() => this.props.showModal(item)}
                              >
                                <i className="fa fa-clone"></i>
                              </button>
                            </li>
                            <li>
                              <button
                                className="workout_delete_button"
                                onClick={() =>
                                  this.props.workoutDeleteModal(item)
                                }
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    );
                  })}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default DaysWorkout;
