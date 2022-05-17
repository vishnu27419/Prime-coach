import React from "react";
import { Link } from "react-router-dom";
import DeleteWorkoutExerciseModal from "./DeleteWorkoutExerciseModal";
import ViewVideoModal from "./viewVideoModal";
class ExerciseRightSection extends React.Component {
  state = {
    a: false,
    viewModal: false,
    viewVideoData: "",
    viewName: "",
  };

  toggleViewModal = async (item) => {
    console.log("item", item);
    await this.setState({
      viewModal: !this.state.viewModal,
      viewVideoData: item?.video,
      viewName: item?.exercise,
    });
  };

  render() {
    const {
      ExerciseName,
      ExerciseDescription,
      exerciseVideos,
      exerciseNameUpdate,
      exerciseDescriptionUpdate,
      exerciseVideoUpdate,
    } = this.props.value;

    const { exerciseNameReset, exerciseDescriptionReset, exerciseVideoReset } =
      this.props;

    return (
      <div>
        <div className="col-md-12">
          <div className=" home_sc_admin ">
            <div className="pannel_heading_react  ">
              <h2 style={{ color: "white", fontSize: "38px" }}>Exercises</h2>
            </div>
            <div className="panel-body">
              <div className="form-group col-md-4">
                <h3
                  style={{
                    color: "white",
                    marginTop: "10%",
                    marginBottom: "5%",
                  }}
                >
                  Exercise Groups
                </h3>

                <select className="form-control" onChange={this.props.onHandel}>
                  <option value="">Select Exercise Group</option>
                  {this.props.ExerciseGroups.map((data) => {
                    return (
                      <option key={data.id} value={data.id}>
                        {data.exercise_group}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="table-responsive exercise_group_table">
                <table className="table table-condensed table-bordered ">
                  <thead className="exercise_group_table_thead">
                    <tr>
                      <th>Name</th>
                      <th>Description</th>
                      <th>Video Link</th>
                      <th>Exercise Group</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody style={{ color: "black" }}>
                    <tr>
                      <td>
                        <input
                          className="col-md-12 form-control exercise-name"
                          name="ExerciseName"
                          value={(ExerciseName, exerciseNameReset)}
                          onChange={this.props.onChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col-md-12 form-control exercise-description"
                          name="ExerciseDescription"
                          value={
                            (ExerciseDescription, exerciseDescriptionReset)
                          }
                          onChange={this.props.onChange}
                        />
                      </td>
                      <td>
                        <input
                          className="col-md-12 form-control exercise-video-link"
                          name="exerciseVideos"
                          value={(exerciseVideos, exerciseVideoReset)}
                          onChange={this.props.onChange}
                        />
                      </td>
                      <td>
                        <select
                          className="col-md-12 form-control exercise-group-id"
                          value={this.props.exercise_group_id}
                          selected
                          readOnly
                        >
                          {/* <option value="">Select Exercise Group</option> */}
                          {this.props.ExerciseGroupsSelectpicker.map((item) => {
                            return (
                              <option key={item.id} value={item.value}>
                                {item.label}
                              </option>
                            );
                          })}
                        </select>
                      </td>
                      <td>
                        <button
                          className="btn admin_button"
                          onClick={this.props.addWorkoutExercise}
                        >
                          <i className="fa fa-plus"></i>
                        </button>
                      </td>
                    </tr>

                    {this.props.selectedGroupExercises.map((item) => {
                      console.log("ITEM", item);
                      return (
                        <tr key={item.id}>
                          <td>
                            <input
                              className="col-md-12 form-control exercise-name"
                              name="exerciseNameUpdate"
                              defaultValue={(exerciseNameUpdate, item.exercise)}
                              onChange={this.props.onChange}
                            />
                          </td>
                          <td>
                            <input
                              className="col-md-12 form-control exercise-description"
                              name="exerciseDescriptionUpdate"
                              defaultValue={
                                (exerciseDescriptionUpdate, item.description)
                              }
                              onChange={this.props.onChange}
                            />
                          </td>
                          <td>
                            <input
                              className="col-md-12 form-control exercise-video-link"
                              name="exerciseVideoUpdate"
                              defaultValue={(exerciseVideoUpdate, item.video)}
                              onChange={this.props.onChange}
                            />
                          </td>
                          <td>
                            <select
                              className="col-md-12 form-control exercise-group-id"
                              // defaultValue={item.exercise_group_id}
                              value={this.props.exercise_group_id}
                              selected
                              readOnly
                            >
                              {this.props.ExerciseGroupsSelectpicker.map(
                                (data) => {
                                  return (
                                    <option key={data.id} value={data.value}>
                                      {data.label}
                                    </option>
                                  );
                                }
                              )}
                            </select>
                          </td>
                          <td>
                            <span style={{ display: "flex" }}>
                              <button
                                className="btn admin_button"
                                onClick={() =>
                                  this.props.updateWorkoutExercise(item)
                                }
                              >
                                <i className="fa fa-check"></i>
                              </button>
                              <button
                                className="btn admin_button"
                                onClick={() =>
                                  this.props.showDeleteWorkoutExerciseModal(
                                    item
                                  )
                                }
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                              {/* <Link to={item?.video}> */}
                              <button
                                className="btn admin_button"
                                onClick={() => this.toggleViewModal(item)}
                              >
                                <i className="fa fa-eye"></i>
                              </button>
                              {/* </Link> */}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <DeleteWorkoutExerciseModal
          show={this.props.deleteExerciseModal}
          onHide={this.props.hideDeleteWorkoutExerciseModal}
          deleteWorkoutExercise={this.props.deleteWorkoutExercise}
        />

        <ViewVideoModal
          show={this.state.viewModal}
          onHide={this.toggleViewModal}
          state={this.state}
        />
      </div>
    );
  }
}

export default ExerciseRightSection;
