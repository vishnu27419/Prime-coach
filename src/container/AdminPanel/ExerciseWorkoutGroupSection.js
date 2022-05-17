import React from "react";
import DeleteExerciseGroupModal from "./DeleteExerciseGroupModal";

class ExerciseWorkoutGroupSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // listExerciseGroup: this.props.ExerciseGroupsSelectpicker
    };
  }

  render() {
    // console.log("this is new component", this.props.ExerciseGroupsSelectpicker);

    // console.log("props from state", this.state.listExerciseGroup);

    const {
      addWorkoutExerciseField,
      workoutExerciseGroupUpdate,
    } = this.props.value;
    return (
      <div>
        <div className="col-md-12">
          <div className=" home_sc_admin ">
            <div className="pannel_heading_react  ">
              <h2 style={{ color: "white", fontSize: "38px" }}>
                Exercise Groups
              </h2>
            </div>
            <div className="panel-body exercise_group_table_Second">
              <table className="table table-condensed table-bordered">
                <thead>
                  <tr>
                    <th>Exercise Group</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody style={{ color: "black" }}>
                  <tr>
                    <td>
                      <input
                        className="col-md-12 form-control exercise-description"
                        name="addWorkoutExerciseField"
                        value={
                          (addWorkoutExerciseField,
                          this.props.addWorkoutExerciseGroupReset)
                        }
                        onChange={this.props.onChange}
                      />
                    </td>
                    <td>
                      <button
                        className="btn admin_button"
                        onClick={this.props.addWorkoutExerciseGroup}
                      >
                        <i className="fa fa-plus"></i>
                      </button>
                    </td>
                  </tr>

                  {this.props.visibleListGroupExercise && (
                    <>
                      {this.props.ExerciseGroupsSelectpicker.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <input
                                className="col-md-12 form-control exercise-description"
                                name="workoutExerciseGroupUpdate"
                                defaultValue={
                                  (workoutExerciseGroupUpdate, item.label)
                                }
                                onChange={this.props.onChange}
                              />
                            </td>
                            <td style={{ display: "flex" }}>
                              <button
                                className="btn admin_button"
                                onClick={() =>
                                  this.props.updateWorkoutExerciseGroup(item)
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>

                              <button
                                className="btn admin_button"
                                onClick={() => this.props.showModal(item)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}

                  {this.props.visibleNewListGroupExercise && (
                    <>
                      {this.props.ExerciseGroupsSelectpicker.map((item) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <input
                                className="col-md-12 form-control exercise-description"
                                name="workoutExerciseGroupUpdate"
                                defaultValue={
                                  (workoutExerciseGroupUpdate, item.label)
                                }
                                onChange={this.props.onChange}
                              />
                            </td>
                            <td style={{ display: "flex" }}>
                              <button
                                className="btn admin_button"
                                onClick={() =>
                                  this.props.updateWorkoutExerciseGroup(item)
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>

                              <button
                                className="btn admin_button"
                                onClick={() => this.props.showModal(item)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <DeleteExerciseGroupModal
          show={this.props.show}
          onHide={this.props.hideModal}
          deleteWorkoutExerciseGroup={this.props.deleteWorkoutExerciseGroup}
        />
      </div>
    );
  }
}

export default ExerciseWorkoutGroupSection;
