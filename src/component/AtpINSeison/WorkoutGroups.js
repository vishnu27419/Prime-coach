import React from "react";
import SetsResets from "../../component/AtpINSeison/SetsResets";
import { textTruncate } from "../../helpers/textTruncate";

class WorkoutGroups extends React.Component {
  render() {
    const { descriptionGroup } = this.props.value;
    const { resetSetsType, addNewWorkoutGroup } = this.props;
    return (
      <div className="col-md-3">
        <div className="panel-heading-builder">
          <h2 style={{ color: "white" }}>
            Workouts Groups &nbsp;{" "}
            <i className="fa fa-arrow-circle-down" aria-hidden="true"></i>
          </h2>
        </div>

        <div id="workout-builder-workout-groups-panel">
          <form>
            <div className="form-group col-md-12">
              <label>Description</label>
              <input
                className="form-control"
                name="descriptionGroup"
                value={(descriptionGroup, this.props.descriptionGroup)}
                onChange={this.props.onChange}
                autoComplete="off"
              />
              <p className="react_validation">
                {this.props.descriptionGroupError}
              </p>
            </div>

            <div className="form-group col-md-12">
              <label>Sets Type</label>

              <select
                className="form-control"
                name="setsType"
                value={(this.props?.setsType, resetSetsType)}
                onChange={this.props.hangelExerciseGroup}
              >
                <option value="">Select an Item </option>
                <option value="procedural">Procedural</option>

                <option value="super_set">Super set</option>
                <option value="triset">Triset</option>
                <option value="quarter_set">Quater Set</option>
              </select>
              <p className="react_validation">{this.props.setsTypeError}</p>
            </div>

            {this.props.setsResetsState ? (
              <SetsResets
                onChange={this.props.onChange}
                value={(this.props.setsGroup, this.props.restGroup)}
                onKeyPress={this.props.onKeyPress}
                setsGroupError={this.props.setsGroupError}
                restGroupError={this.props.restGroupError}
                setsGroup={this.props.setsGroup}
                cleanRestGroup={this.props.cleanRestGroup}
              />
            ) : null}

            <button
              style={{
                marginBottom: "40px",
              }}
              type="button"
              className=" btn-md col-md-12  btn_react_workot_group"
              onClick={this.props.annual_training_program_workout_group}
            >
              Add New Workout Group
              {addNewWorkoutGroup && (
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
          </form>

          <div className="workout_data " style={{ height: "31vh !important" }}>
            <div className="panel-body react_workout_group">
              {this.props.visiblePreWorkout_Group ? (
                <div>
                  {this.props.workoutGroupData &&
                    this.props.workoutGroupData.map((item) => {
                      return (
                        <div
                          className="col-md-12"
                          style={{
                            border: "1px solid",
                            padding: "inherit",
                          }}
                          key={item.id}
                        >
                          <div className="workout_group_btn_react">
                            <button
                              title={item?.group_name}
                              className="btn btn-primary btn-sm col-md-12 react_workout_exercise_btn"
                              onClick={() => this.props.WorkoutGroupsShow(item)}
                            >
                              {/* Back */}
                              {textTruncate(item?.group_name)}
                            </button>
                            <ul
                              className="list-inline d-flex justify-content-between edit_workout_group"
                              // style={{
                              //   display: "flex",
                              //   flexWrap: "wrap",
                              //   marginTop: "15px",
                              //   paddingBottom: "0px",
                              // }}
                            >
                              <li className="edit_workout_group_button_li_li">
                                <button
                                  className=" edit_workout_group_button_update "
                                  style={
                                    {
                                      // padding: "3px 30px",
                                      // fontSize: "15px",
                                      // background: "var(--appYellow)",
                                      // color: "#fff",
                                      // display: "none",
                                    }
                                  }
                                  onClick={() =>
                                    this.props.updateWorkoutGroupModal(item)
                                  }
                                  title="Click to edit workout group exercise."
                                >
                                  <i className="fa fa-clone"></i>
                                </button>
                              </li>
                              <li className="edit_workout_group_button_li">
                                <button
                                  type="button"
                                  className="btn week_btn edit_workout_group_button"
                                  style={{ background: "var(--appRed)" }}
                                  onClick={() =>
                                    this.props.showDeleteWorkoutGroup(item)
                                  }
                                  title="Click to delete workout group exercise."
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
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default WorkoutGroups;
