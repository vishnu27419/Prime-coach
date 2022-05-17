import React from "react";
import Checkbox from "../../component/Checkbox/Checkbox";

class SuperSet extends React.Component {
  render() {
    const exerciseData = this.props.workoutGroupIdForExerciseObject;
    const {
      repsData,
      loadData,
      repetitionType,
      setsWorkoutExercise,
      restWorkoutExercise,
      // updateExerciseField,
      updateRepsData,
      // updateLoadData,
      updateRepetitionType,
      updateSetsWorkoutExercise,
      updateRestWorkoutExercise,
    } = this.props.value;
    const {
      updateExerciseField,
      workoutExerciseLoader,
      updateLoadData,
    } = this.props;

    // const {  } = this.props;
    // console.log("dd", updateLoadData);

    // console.log("THIS IS updateExerciseField--->", updateExerciseField);

    return (
      <div className="col-md-9 ">
        <div className="panel-heading-builder super_set_react_center ">
          <h2 style={{ color: "white", marginTop: "25px" }}>
            {exerciseData.group_name} - {exerciseData.group_set_type}&nbsp;
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </h2>
          {exerciseData.group_set_type === "Procedural" ? null : (
            <h4
              style={{
                color: "white",
                fontSize: "18px",
                marginLeft: "10%",
                marginTop: "25px",
              }}
            >
              Sets: {exerciseData.group_sets} Rest: {exerciseData.group_rest}{" "}
              sec
            </h4>
          )}
        </div>

        <div id="workout-builder-workout-exercises-panel">
          <div className="panel panel-primary panel-builder">
            <div className="panel-body">
              {/* <div className="home_sc"> */}
              <table className="table table-condensed react_workout_table">
                <thead>
                  {exerciseData.group_set_type === "Procedural" ? (
                    <tr>
                      <th>Exercise</th>
                      <th>Reps</th>
                      <th>Load</th>
                      <th>Load Required?</th>
                      <th>Reps Each Side?</th>
                      <th>Repetition type</th>
                      <th>Sets</th>
                      <th>Rest</th>
                    </tr>
                  ) : (
                    <tr>
                      <th>Exercise</th>
                      <th>Reps</th>
                      <th>Load</th>
                      <th>Load Required?</th>
                      <th>Reps Each Side?</th>
                      <th>Repetition type</th>
                    </tr>
                  )}
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        disabled="disabled"
                        className="form-control col-md-12 builder-exercise"
                        id="workout-builder-row-0"
                        defaultValue={this.props.exercisePickerName}
                      />

                      <button
                        className="btn btn-md  btn_update_exercise_react "
                        onClick={this.props.showExerciseModal}
                      >
                        <i className="fas fa-dumbbell"></i>
                        Update Exercise
                      </button>
                      <p className="react_validation">
                        {this.props.exerciseError}
                      </p>
                    </td>
                    <td>
                      <input
                        type="text"
                        className="form-control col-md-12 builder-reps"
                        name="repsData"
                        value={(repsData, this.props.resertRepsData)}
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                      />
                      <p className="react_validation">
                        {this.props.repsDataError}
                      </p>
                    </td>

                    <td>
                      <input
                        style={
                          this.props.loadRequiredChecked === 0
                            ? {
                                backgroundColor: "#A9A9A9	",
                                border: "1px solid #A9A9A9",
                                cursor: "not-allowed",
                              }
                            : { backgroundColor: "#fff" }
                        }
                        type="text"
                        className="form-control col-md-12 builder-load"
                        name="loadData"
                        value={(loadData, this.props.resertLoadData)}
                        onChange={this.props.onChange}
                        onKeyPress={this.props.onKeyPress}
                        disabled={
                          this.props.loadRequiredChecked === 0 ? true : false
                        }
                        title={
                          this.props.loadRequiredChecked === 0
                            ? "Please enable load required to fill load"
                            : ""
                        }
                      />
                      <p className="react_validation">
                        {this.props.loadDataError}
                      </p>
                    </td>
                    <td>
                      <Checkbox
                        checked={this.props.loadRequiredChecked}
                        toggleCb={() => this.props.toggleCb()}
                      />
                    </td>
                    <td>
                      <Checkbox
                        checked={this.props.repsEachside}
                        toggleCb={() => this.props.toggleRips()}
                      />
                    </td>
                    <td>
                      <select
                        className="form-control col-md-12 superset_select_react"
                        name="repetitionType"
                        value={(repetitionType, this.props.resetRepetitionType)}
                        onChange={this.props.onChange}
                      >
                        <option value="">Select Repetition Type </option>
                        <option value="repetition">Repetition</option>
                        <option value="minutes">Minutes</option>
                        <option value="seconds">Seconds</option>
                      </select>
                      <p className="react_validation">
                        {this.props.repetitionTypeError}
                      </p>
                    </td>
                    {/* {exerciseData.group_set_type === "Procedural" ? null : (
                      <>
                        <td>
                          <input
                            type="text"
                            className="form-control col-md-12 builder-reps"
                            name="setsWorkoutExercise"
                            defaultValue={setsWorkoutExercise}
                            onChange={this.props.onChange}
                            onKeyPress={this.props.onKeyPress}
                          />
                          <p className="react_validation">
                            {this.props.setsWorkoutExerciseError}
                          </p>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control col-md-12 builder-reps"
                            name="restWorkoutExercise"
                            defaultValue={restWorkoutExercise}
                            onChange={this.props.onChange}
                            onKeyPress={this.props.onKeyPress}
                          />
                          <p className="react_validation">
                            {this.props.restWorkoutExerciseError}
                          </p>
                        </td>
                      </>
                    )} */}
                    {/* {exerciseData.group_set_type === "Procedural" ? null : ( */}
                    {exerciseData.group_set_type === "Procedural" ? (
                      <>
                        <td>
                          <input
                            type="text"
                            className="form-control col-md-12 builder-reps"
                            name="setsWorkoutExercise"
                            value={
                              (setsWorkoutExercise,
                              this.props.setsWorkoutExercise)
                            }
                            onChange={this.props.onChange}
                            onKeyPress={this.props.onKeyPress}
                          />
                          <p className="react_validation">
                            {this.props.setsWorkoutExerciseError}
                          </p>
                        </td>

                        <td>
                          <input
                            type="text"
                            className="form-control col-md-12 builder-reps"
                            name="restWorkoutExercise"
                            value={
                              (restWorkoutExercise,
                              this.props.restWorkoutExercise)
                            }
                            onChange={this.props.onChange}
                            onKeyPress={this.props.onKeyPress}
                          />
                          <p className="react_validation">
                            {this.props.restWorkoutExerciseError}
                          </p>
                        </td>
                      </>
                    ) : null}
                    {/* )} */}
                    <td>
                      <button
                        title="Save"
                        className="btn btn-md btn-primary workout-builder-save-workout-exercise exerciseSaverButton"
                        onClick={
                          this.props
                            .annual_training_program_workout_group_exercise
                        }
                      >
                        {workoutExerciseLoader === false ? (
                          <i className="fa fa-check"></i>
                        ) : (
                          <i
                            className="fa fa-spinner fa-spin fa-3x fa-fw"
                            style={{
                              color: "var(--appBlue2)",
                              marginLeft: "5px",
                              fontSize: "14px",
                            }}
                          ></i>
                        )}
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>

              {/* this is check update start */}
              {/* {this.props.visiblePreWorkoutGroupExercise ? ( */}
              <div>
                {this.props.workout_group_exercise_Array &&
                  this.props.workout_group_exercise_Array.map((item, index) => {
                    return (
                      <table
                        className="table table-condensed react_workout_table"
                        key={item.id}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <input
                                type="text"
                                disabled="disabled"
                                className="form-control col-md-12 builder-exercise"
                                id="workout-builder-row-0"
                                name="updateExerciseField"
                                // value={
                                //   updateExerciseField
                                //     ? updateExerciseField
                                //     : item.workout_exercise_name
                                // }
                                value={item.workout_exercise_name}
                                onChange={this.props.onChange}
                              />

                              <button
                                className="btn btn-md  btn_update_exercise_react "
                                onClick={() =>
                                  this.props.showUpdateGroupExerciseModal(
                                    item,
                                    index
                                  )
                                }
                              >
                                <i className="fas fa-dumbbell"></i>
                                Update Exercise
                              </button>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control col-md-12 builder-reps"
                                // defaultValue={
                                //   (updateRepsData, item.workout_reps)
                                // }
                                defaultValue={
                                  updateRepsData
                                    ? updateRepsData[index]
                                    : item.workout_reps
                                }
                                name="updateRepsData"
                                // onChange={this.props.onChange}
                                onChange={(e) =>
                                  this.props.handelUpdateRepsData(e, index)
                                }
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control col-md-12 builder-load"
                                // defaultValue={
                                //   (updateLoadData, item.workout_load)
                                // }
                                defaultValue={
                                  item.workout_load_required === "0"
                                    ? ""
                                    : updateLoadData[index]
                                    ? updateLoadData[index]
                                    : item.workout_load
                                }
                                name="updateLoadData"
                                // onChange={this.props.onChange}
                                onChange={(e) =>
                                  this.props.handleUploadLoadDataName(e, index)
                                }
                                disabled={
                                  item.workout_load_required == "1"
                                    ? false
                                    : true
                                }
                                style={
                                  item.workout_load_required == "1"
                                    ? { backgroundColor: "#fff" }
                                    : {
                                        backgroundColor: "#A9A9A9	",
                                        border: "1px solid #A9A9A9",
                                        cursor: "not-allowed",
                                      }
                                }
                                title={
                                  item.workout_load_required == "1"
                                    ? ""
                                    : "Please enable load required to fill load"
                                }
                              />
                            </td>
                            <td>
                              <Checkbox
                                checked={
                                  item.workout_load_required == "1"
                                    ? true
                                    : false
                                  // item.workout_load_required == 1 ? 1 : 0
                                }
                                toggleCb={() =>
                                  this.props.toggleUpdateLoadRequired(
                                    item,
                                    index
                                  )
                                }
                              />
                            </td>
                            <td>
                              <Checkbox
                                checked={
                                  item.workout_reps_each_side == "1"
                                    ? true
                                    : false
                                }
                                toggleCb={() =>
                                  this.props.toggleUpdateRepsEachSide(
                                    item,
                                    index
                                  )
                                }
                              />
                            </td>
                            {/* <td>
                              <select
                                className="form-control col-md-12 superset_select_react"
                                name="updateRepetitionType"
                                value={updateRepetitionType}
                                onChange={this.props.onChange}
                              >
                                <option value="">Select Repetition Type</option>
                                <option value="" disabled>
                                  .....
                                  {item.workout_repetition_type}
                                  ......
                                </option>
                                <option value="repetition">Repetition</option>
                                <option value="minutes">Minutes</option>
                                <option value="seconds">Seconds</option>
                              </select>
                            </td> */}
                            <td>
                              <select
                                className="form-control col-md-12 superset_select_react"
                                name="updateRepetitionType"
                                defaultValue={
                                  (updateRepetitionType,
                                  item.workout_repetition_type
                                    .charAt(0)
                                    .toLowerCase() +
                                    item.workout_repetition_type.slice(1))
                                }
                                onChange={this.props.onChange}
                              >
                                <option value="">Select Repetition Type</option>
                                {/* <option value="" disabled>
                                  .....
                                  {item.workout_repetition_type}
                                  ......
                                </option> */}
                                <option value="repetition">Repetition</option>
                                <option value="minutes">Minutes</option>
                                <option value="seconds">Seconds</option>
                              </select>
                            </td>

                            {/* {exerciseData.group_set_type ===
                            "Procedural" ? null : (
                              <>
                                <td>
                                  <input
                                    type="text"
                                    className="form-control col-md-12 builder-reps"
                                    defaultValue={
                                      (updateSetsWorkoutExercise,
                                      item.workout_sets)
                                    }
                                    name="updateSetsWorkoutExercise"
                                    onChange={this.props.onChange}
                                  />
                                </td>

                                <td>
                                  <input
                                    type="text"
                                    className="form-control col-md-12 builder-reps"
                                    name="updateRestWorkoutExercise"
                                    defaultValue={
                                      (updateRestWorkoutExercise,
                                      item.workout_rest)
                                    }
                                    onChange={this.props.onChange}
                                  />
                                </td>
                              </>
                            )} */}

                            {exerciseData.group_set_type === "Procedural" ? (
                              <>
                                <td>
                                  <input
                                    style={{
                                      backgroundColor: "#bfbbbb",
                                      textAlign: "center",
                                      pointerEvents: "none",
                                    }}
                                    type="text"
                                    className="form-control col-md-12 builder-reps"
                                    defaultValue={
                                      (updateSetsWorkoutExercise,
                                      item.workout_sets)
                                    }
                                    name="updateSetsWorkoutExercise"
                                    onChange={this.props.onChange}
                                    readOnly
                                  />
                                </td>

                                <td>
                                  <input
                                    style={{
                                      backgroundColor: "#bfbbbb",
                                      textAlign: "center",
                                      pointerEvents: "none",
                                    }}
                                    type="text"
                                    className="form-control col-md-12 builder-reps"
                                    name="updateRestWorkoutExercise"
                                    defaultValue={
                                      (updateRestWorkoutExercise,
                                      item.workout_rest)
                                    }
                                    onChange={this.props.onChange}
                                    readOnly
                                  />
                                </td>
                              </>
                            ) : null}

                            <td>
                              <button
                                title="Save"
                                className="btn btn-md btn-primary workout-builder-save-workout-exercise"
                                onClick={() =>
                                  this.props.update_annual_training_program_workout_group_exercise(
                                    item,
                                    index
                                  )
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </td>

                            <td>
                              <button
                                type="button"
                                className="btn btn-danger"
                                onClick={() =>
                                  this.props.showDeleteWorkoutExerciseModal(
                                    item
                                  )
                                }
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SuperSet;
