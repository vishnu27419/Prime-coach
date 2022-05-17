import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import AddCoachAlternativeExercise from "./AddCoachAlternativeExercise";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
import NoDataFound from "component/lottiLoader/LottiLoader";
import ViewCoachAlternativeExerciseModal from "./ViewCoachAlternativeExerciseModal";

export class CoachAlternativeExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addModal: false,
      exerciseGroupDetail: [],
      exerciseGroup: "",
      exerciseDetail: [],
      exerciseGroupName: "",
      hideExercisePicker: false,
      exercise: "",
      exerciseName: "",
      groupPickerLoader: false,
      RelatableOption: [],
      alternativeExerciseIds: [],
      createAlternativeExerciseLoader: false,
      alternativeExerciseList: [],
      alternativeExerciseLoader: false,
      viewAlternativeExerciseModal: false,
      exerciseObj: {},
      alternativeExerciseIdsEvent: [],
      relatableExerciseGroup: "",
    };
  }

  componentDidMount() {
    this.featchExerciseGroup();
  }

  toggleAddModal = () => {
    const isValid = this.validationToggleModal();

    if (isValid) {
      this.setState({ addModal: !this.state.addModal });
    }
  };

  validationToggleModal = () => {
    if (!this.state.exerciseGroup) {
      errorToast("Please select exercise group field.");
      return false;
    } else if (!this.state.exercise) {
      errorToast("Please select exercise field.");
      return false;
    } else {
      return true;
    }
  };

  featchExerciseGroup = async () => {
    this.setState({ groupPickerLoader: true });
    try {
      const res = await standardPostApi(
        "exercise/get_group_exercises",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
        },
        true
      );

      if (res.data.code === 200) {
        // console.log(
        //   "This  is response of Group exercise ",
        //   res.data.data.ExerciseGroups
        // );

        this.setState({
          exerciseGroupDetail: res?.data?.data?.ExerciseGroups,
          exerciseDetail: res?.data?.data?.ExerciseGroups[0]?.exercises,
          exerciseGroup: res?.data?.data?.ExerciseGroups[0]?.id,
          exercise: res?.data?.data?.ExerciseGroups[0]?.exercises[0]?.id,
          exerciseGroupName: res?.data?.data?.ExerciseGroups[0]?.exercise_group,
          exerciseName:
            res?.data?.data?.ExerciseGroups[0]?.exercises[0]?.exercise,
          relatableExerciseGroup: res?.data?.data?.ExerciseGroups[0]?.id,
        });
        this.fetchAlternativeExercise(this.state.exercise);
        this.fetchRelatedExercise(
          this.state.exercise,
          this.state.relatableExerciseGroup
        );
      }
    } catch (error) {
      console.error("featch exercise Group", error);
    } finally {
      this.setState({ groupPickerLoader: false });
    }
  };

  exerciseGroupOnChange = async (event) => {
    const { exerciseGroupDetail } = this.state;
    this.setState({
      exerciseGroup: event.target.value,
      hideExercisePicker: true,
    });

    let temp = exerciseGroupDetail.find(
      (x) => x.id === parseInt(event.target.value)
    );

    await this.setState({
      exerciseDetail: temp?.exercises,
      exerciseGroupName: temp?.exercise_group,
      exercise: temp?.exercises[0]?.id,
      exerciseName: temp?.exercises[0]?.exercise,
    });

    this.fetchAlternativeExercise(temp?.exercises[0]?.id);
    // this.fetchRelatedExercise(temp?.exercises[0]?.id);
  };

  exerciseOnChange = (e) => {
    // console.log("event", e.target.value);
    const { exerciseDetail } = this.state;

    let temp = exerciseDetail.find((x) => x.id === parseInt(e.target.value));
    // console.log("temp", temp);
    // this.fetchRelatedExercise(e.target.value);
    this.fetchAlternativeExercise(e.target.value);
    this.setState({
      exercise: e.target.value,
      exerciseName: temp?.exercise,
    });
  };

  fetchRelatedExercise = async (exerciseId, exerciseGroup) => {
    try {
      const res = await standardPostApi(
        "exercise/get_exercises",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_id: exerciseId,
          exercise_group_id: exerciseGroup,
        },
        true
      );

      if (res.data.code === 200) {
        // console.log(
        //   "Response of relatable exercise",
        //   res?.data?.data?.exercises
        // );

        const temp = res?.data?.data?.exercises.map((item) => {
          return { value: item.id, label: item.exercise };
        });

        this.setState({
          RelatableOption: temp,
        });
      }
    } catch (error) {
      console.error("response of error", error);
    }
  };

  fetchAlternativeExercise = async (exerciseId) => {
    this.setState({ alternativeExerciseLoader: true });
    try {
      const res = await standardPostApi(
        "exercise/get_alternate_exercises",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_id: exerciseId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "Response of alternative exercise",
        //   res.data.data?.alternate_exercises
        // );
        this.setState({
          alternativeExerciseList: res.data?.data?.alternate_exercises,
        });
      }
    } catch (error) {
      console.error("fetch alternative exercise error", error);
    } finally {
      this.setState({ alternativeExerciseLoader: false });
    }
  };

  onRelatableExerciseChange = (event) => {
    console.log("event", event);
    let temp = [];

    this.setState({ alternativeExerciseIdsEvent: event });

    if (event.length !== 0) {
      event.map((item) => {
        temp.push(item.value);
      });

      this.setState({
        alternativeExerciseIds: temp,
      });
    }
  };

  handelCreateAlternativeExercise = async () => {
    const isValid = this.validdationCreateAlternativeExercise();

    if (isValid) {
      this.setState({ createAlternativeExerciseLoader: true });
      try {
        const res = await standardPostApiJsonBased(
          "exercise/create_alternate_exercises",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            exercise_id: this.state.exercise,
            alternate_exercise_ids: this.state.alternativeExerciseIds,
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("Response of create alternative exercise", res.data.data);
          successToast(res.data.message);
          this.setState({
            addModal: false,
            alternativeExerciseIds: [],
            exerciseDetail: [],
            exerciseGroupDetail: [],
            exerciseGroup: "",
            exercise: "",
          });
          this.featchExerciseGroup();
        }
      } catch (error) {
        console.error("create alternative exercise error", error);
      } finally {
        this.setState({ createAlternativeExerciseLoader: false });
      }
    }
  };

  validdationCreateAlternativeExercise() {
    if (this.state.alternativeExerciseIds.length === 0) {
      errorToast("Please choose related alternative exercise's ");
      return false;
    } else if (this.state.alternativeExerciseIdsEvent.length === 0) {
      errorToast("Please choose related alternative exercise's ");
      return false;
    } else {
      return true;
    }
  }

  toggleViewModal = async (item) => {
    this.setState({
      viewAlternativeExerciseModal: !this.state.viewAlternativeExerciseModal,
      exerciseObj: item,
    });
  };
  relatableExerciseGroupOnChange = (e) => {
    const { exerciseGroupDetail } = this.state;
    this.setState({ relatableExerciseGroup: e.target.value });

    let temp = exerciseGroupDetail.find(
      (x) => x.id === parseInt(e.target.value)
    );

    this.fetchRelatedExercise(temp?.exercises[0]?.id, temp?.id);

    console.log("temp", temp);
  };

  render() {
    const {
      exerciseGroupDetail,
      exerciseGroup,
      exerciseDetail,
      exercise,
      groupPickerLoader,
    } = this.state;

    console.log("relatableExerciseGroup", this.state.relatableExerciseGroup);

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div
                className="inner_teamsection"
                style={{ padding: "61px 30px" }}
              >
                <div className="d-lg-flex justify-content-between align-items-center ">
                  <div className="heading">Alternative Exercise</div>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          className="btn protocol_btn dropdown-toggle w-100"
                          name="exerciseGroup"
                          value={exerciseGroup}
                          onChange={(e) => this.exerciseGroupOnChange(e)}
                        >
                          {exerciseGroupDetail.length !== 0 &&
                            exerciseGroupDetail.map((item) => {
                              return (
                                <option
                                  value={item.id}
                                  key={item?.id}
                                  className="dropdown-item dropdown-menu react_select_menu"
                                >
                                  {item?.exercise_group}
                                </option>
                              );
                            })}
                        </select>

                        {groupPickerLoader && (
                          <span style={{ position: "relative" }}>
                            <i
                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                              style={{
                                color: "var(--appBlue2)",
                                fontSize: "29px",
                                marginTop: "20px",
                                position: "absolute",
                                right: "15px",
                                top: "-22px",
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                      <li>
                        <span className="basic-multi-select">
                          {!groupPickerLoader && (
                            <select
                              className="btn protocol_btn dropdown-toggle w-100"
                              name="exercise"
                              value={exercise}
                              onChange={(e) => this.exerciseOnChange(e)}
                            >
                              {exerciseDetail?.length !== 0 &&
                                exerciseDetail?.map((data) => {
                                  return (
                                    <option
                                      value={data?.id}
                                      key={data?.id}
                                      className="dropdown-item dropdown-menu react_select_menu"
                                    >
                                      {data?.exercise}
                                    </option>
                                  );
                                })}
                            </select>
                          )}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div style={{ width: "15%" }}>
                    <div className="dropdown">
                      <div className="form-group">
                        {!groupPickerLoader && (
                          <button
                            className="Model_Btn_term"
                            onClick={() => this.toggleAddModal()}
                            style={{ cursor: "pointer", padding: "8px 48px" }}
                          >
                            Add Exercise{" "}
                            <i className="fa fa-plus" aria-hidden="true"></i>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {!this.state.groupPickerLoader &&
                  !this.state.alternativeExerciseLoader &&
                  this.state.alternativeExerciseList.length === 0 && (
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No alternative exercise available yet."
                    />
                  )}

                {this.state.alternativeExerciseLoader ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      marginBottom: "20px",
                    }}
                  >
                    <i
                      className="fa fa-spinner fa-spin fa-3x fa-fw"
                      style={{
                        color: "var(--appBlue2)",
                        fontSize: "50px",
                        marginTop: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <>
                    {this.state.alternativeExerciseList.length !== 0 && (
                      <div className="home_sc" style={{ overflow: "auto" }}>
                        <table className="table table-condensed react_workout_table">
                          <thead>
                            <tr>
                              <th>Exercise Group</th>
                              <th>Exercise</th>

                              <th>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  View
                                </span>
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {this.state.alternativeExerciseList.length !== 0 &&
                              this.state.alternativeExerciseList?.map(
                                (item, index) => {
                                  return (
                                    <tr key={item?.id}>
                                      <td>
                                        {item?.exercise_group?.exercise_group}
                                      </td>
                                      <td>{item?.exercise}</td>

                                      <td>
                                        <span
                                          style={{
                                            display: "flex",
                                            justifyContent: "center",
                                          }}
                                        >
                                          <button
                                            title="view"
                                            className="btn btn-md btn-primary workout-builder-save-workout-exercise "
                                            onClick={() =>
                                              this.toggleViewModal(item)
                                            }
                                          >
                                            <i className="fa fa-eye"></i>
                                          </button>
                                        </span>
                                      </td>
                                    </tr>
                                  );
                                }
                              )}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <AddCoachAlternativeExercise
          show={this.state.addModal}
          onHide={() => this.toggleAddModal()}
          parentState={this.state}
          onRelatableExerciseChange={this.onRelatableExerciseChange}
          handelCreateAlternativeExercise={this.handelCreateAlternativeExercise}
          exerciseGroupDetail={exerciseGroupDetail}
          relatableExerciseGroupOnChange={this.relatableExerciseGroupOnChange}
        />

        <ViewCoachAlternativeExerciseModal
          onHide={this.toggleViewModal}
          show={this.state.viewAlternativeExerciseModal}
          parentState={this.state}
        />
      </div>
    );
  }
}

export default CoachAlternativeExercise;
