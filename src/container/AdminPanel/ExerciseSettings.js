import React from "react";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import ExerciseWorkoutGroupSection from "./ExerciseWorkoutGroupSection";
// import ExerciseSectionRight from "./ExerciseSectionRight";
import ExerciseRightSection from "./ExerciseRightSection";
import { standardPostApi } from "../API/ApiWrapper";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoaderWrapper from "../Loader/LoaderWrapper";

class ExerciseSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loding: true,
      ExerciseGroups: [],
      ExerciseGroupsSelectpicker: [],
      addWorkoutExerciseField: "",
      visibleListGroupExercise: true,
      visibleNewListGroupExercise: false,
      workoutExerciseGroupUpdate: "",
      show: false,
      exerciseGroupName: "",
      exerciseGroupId: "",
      exercisesListOnclick: [],
      exercise_group_id: "",
      ExerciseName: "",
      ExerciseDescription: "",
      exerciseVideos: "",
      selectedGroupExercises: [],
      exerciseNameUpdate: "",
      exerciseDescriptionUpdate: "",
      exerciseVideoUpdate: "",
      deleteExerciseModal: false,
      exerciseGroupID: "",
      exerciseId: "",
      exerciseNameUpdateError: "",
      onAdd: false,
      userRoll: this.props.location.state,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  componentDidMount() {
    this.admin_exercise_settings();
  }

  showModal = async (item) => {
    // console.log("this is data for delete ", item);
    await this.setState({
      show: !this.state.show,
      exerciseGroupName: item.label,
      exerciseGroupId: item.id,
    });
  };

  hideModal = async () => {
    await this.setState({ show: false });
  };

  showDeleteWorkoutExerciseModal = async (item) => {
    console.log("delete Exercise", item);
    await this.setState({
      deleteExerciseModal: !this.state.deleteExerciseModal,
      exerciseGroupID: item.exercise_group_id,
      exerciseId: item.id,
      exerciseNameUpdate: item.exercise,
      exerciseDescriptionUpdate: item.description,
      // exerciseVideoUpdate: item.video,
    });
  };

  hideDeleteWorkoutExerciseModal = async () => {
    await this.setState({ deleteExerciseModal: false });
  };

  admin_exercise_settings = async () => {
    try {
      const res = await standardPostApi(
        "admin_exercise_settings",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          type: this.state.userRoll === "coach" ? "coach" : "admin",
        },
        true
      );
      if ((res.data.code = 200)) {
        await this.setState({
          ExerciseGroups: res.data.data.ExerciseGroups,
          ExerciseGroupsSelectpicker:
            res.data.data.ExerciseGroupsSelectpicker.pickerArray,
          loding: false,
        });
        console.log("RESPONSE OF admin_exercise_settings", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Add Workout exercise Group
  addWorkoutExerciseGroup = async () => {
    try {
      const res = await standardPostApi(
        "create_workout_exercise_group",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_group_name: this.state.addWorkoutExerciseField,
          api_action: "add",
          type: this.state.userRoll === "coach" ? "coach" : "admin",
        },
        true
      );
      if (res.data.code === 200) {
        await this.setState({
          visibleListGroupExercise: false,
          visibleNewListGroupExercise: true,
          addWorkoutExerciseGroup: "",
        });
        console.log(
          "THIS IS RESPONSER OF ADD WORKOUT EXERCISE GROUP",
          res.data.data
        );
        toast.success(res.data.message);
        await this.admin_exercise_settings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Update Workout exercise Group

  updateWorkoutExerciseGroup = async (item) => {
    // console.log("data  for update function", item);
    try {
      const res = await standardPostApi(
        "create_workout_exercise_group",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_group_id: item.id,
          exercise_group_name:
            this.state.workoutExerciseGroupUpdate === ""
              ? item?.label
              : this.state.workoutExerciseGroupUpdate,
          api_action: "update",
        },
        true
      );
      if (res.data.code === 200) {
        console.log("THIS IS RES OF WORKOUT EXERCISE GROUP ", res.data.data);
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Workout exercise Group

  deleteWorkoutExerciseGroup = async () => {
    try {
      const res = await standardPostApi(
        "create_workout_exercise_group",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_group_id: this.state.exerciseGroupId,
          exercise_group_name: this.state.exerciseGroupName,
          api_action: "delete",
        },
        true
      );
      if (res.data.code === 200) {
        console.log(
          "THIS IS RESPONSE OF DELETE WORKOUT EXERCISE GROUP",
          res.data.data
        );
        toast.success(res.data.message);
        await this.hideModal();
        await this.admin_exercise_settings();
      }
    } catch (error) {
      console.log(error);
    }
  };

  onHandel = async (e) => {
    console.log("value-->", e.target.value);

    this.setSelectedExercise(e.target.value);
  };

  setSelectedExercise = async (id) => {
    const { ExerciseGroups } = this.state;

    ExerciseGroups.forEach(async (item) => {
      if (item.id == id) {
        await this.setState({
          pickerValue: id,
          selectedGroupExercises: item.exercises,
          exercise_group_id: id,
        });
      }
    });
  };

  // Add Workout Exercises
  addWorkoutExercise = async () => {
    const isValid = this.validationAddWorkoutExercise();

    // console.log("this is pickerValue--> ", this.state.pickerValue);

    if (isValid) {
      try {
        const res = await standardPostApi(
          "create_workout_exercise",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            exercise_group_id: this.state.exercise_group_id,
            exercise_name: this.state.ExerciseName,
            exercise_description: this.state.ExerciseDescription,
            exercise_video: this.state.exerciseVideos,
            api_action: "add",
            type: this.state.userRoll === "coach" ? "coach" : "admin",
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({ onAdd: true });
          console.log("THIS IS RES OF ADD EXERCISE", res.data.data);
          toast.success(res.data.message);
          await this.admin_exercise_settings();
          await this.setSelectedExercise(this.state.pickerValue);
          this.state.onAdd &&
            (await this.setState({
              ExerciseDescription: "",
              ExerciseName: "",
              exerciseVideos: "",
            }));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  validationAddWorkoutExercise = () => {
    let ExerciseNameError = "";
    let ExerciseDescriptionError = "";

    if (!this.state.ExerciseName) {
      ExerciseNameError = toast.error("Name Field is Required.");
    }

    if (!this.state.ExerciseDescription) {
      ExerciseDescriptionError = toast.error("Description Field is Required.");
    }

    if (ExerciseNameError || ExerciseDescriptionError) {
      this.setState({ ExerciseNameError, ExerciseDescriptionError });
      return false;
    } else {
      return true;
    }
  };

  // Update Workout Exercise
  updateWorkoutExercise = async (item) => {
    // const isValid = this.validationUpdateWorkoutExercise();
    console.log("item.id", item);
    // if (isValid) {
    try {
      const res = await standardPostApi(
        "create_workout_exercise",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_group_id: this.state.exercise_group_id,
          exercise_id: item?.id,
          exercise_name:
            this.state.exerciseNameUpdate === ""
              ? item?.exercise
              : this.state.exerciseNameUpdate,
          exercise_description:
            this.state.exerciseDescriptionUpdate === ""
              ? item?.description
              : this.state.exerciseDescriptionUpdate,
          exercise_video:
            this.state.exerciseVideoUpdate === ""
              ? item?.video
              : this.state.exerciseVideoUpdate,
          api_action: "update",
        },
        true
      );
      if (res.data.code === 200) {
        console.log("THIS IS RES OF UPDATE WORKOUT EXERCISE", res.data.data);
        toast.success(res.data.message);
      }
      await this.admin_exercise_settings();
      this.setSelectedExercise(this.state.pickerValue);
      console.log(
        "this is selectedGroupExercises array",
        this.state.selectedGroupExercises
      );
    } catch (error) {
      console.log(error);
    }
    // }
  };

  // validationUpdateWorkoutExercise = () => {
  //   let exerciseNameUpdateError = "";

  //   if (!this.state.exerciseNameUpdate) {
  //     exerciseNameUpdateError = toast.error("Please Change Name");
  //   }
  //   if (!this.state.exerciseDescriptionUpdate) {
  //     exerciseNameUpdateError = toast.error("Please Change Description");
  //   }

  //   if (exerciseNameUpdateError) {
  //     this.setState({ exerciseNameUpdateError });
  //     return false;
  //   } else {
  //     return true;
  //   }
  // };

  // Delete Workout Exercise
  deleteWorkoutExercise = async () => {
    try {
      const res = await standardPostApi(
        "create_workout_exercise",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          exercise_group_id: this.state.exerciseGroupID,
          exercise_id: this.state.exerciseId,
          exercise_name: this.state.exerciseNameUpdate,
          exercise_description: this.state.exerciseDescriptionUpdate,
          exercise_video: " ",
          api_action: "delete",
        },
        true
      );
      if (res.data.code === 200) {
        console.log("THIS IS RESPONSE OF DELETE EXERCISE", res.data.data);
        toast.success(res.data.message);
        await this.hideDeleteWorkoutExerciseModal();
        await this.admin_exercise_settings();
        this.setSelectedExercise(this.state.pickerValue);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    console.log("role", this.state.userRoll);
    return (
      <div className="loader_sec">
        <CoachHeader />
        {this.state.loding ? (
          <LoaderWrapper />
        ) : (
          <div className="dashboard-wrapper">
            <h2
              style={{
                color: "white",
                textAlign: "center",
                fontSize: "38px",
              }}
            >
              <span style={{ borderBottom: "3px dashed #337AB7" }}>
                {this.state.userRoll === "coach"
                  ? `Exercise Settings For ${
                      localStorage.getItem("access_role") === "Coach"
                        ? "Coach"
                        : localStorage.getItem("access_role") === "S&C Coach"
                        ? "S&C Coach"
                        : "Admin"
                    }`
                  : "Exercise Settings"}
              </span>
            </h2>
            <section className="myteams_wrapper">
              <div className="container-fluid pr-0">
                <div className="row">
                  <div className="col-md-12">
                    <div
                      style={{ marginTop: "5%", marginBottom: "5%" }}
                      id="coach-portal-content"
                    >
                      <div className="row">
                        <div className="col-md-12">
                          <div className="row">
                            <div className="col-md-4">
                              <ExerciseWorkoutGroupSection
                                ExerciseGroupsSelectpicker={
                                  this.state.ExerciseGroupsSelectpicker
                                }
                                value={
                                  (this.state.addWorkoutExerciseField,
                                  this.state.workoutExerciseGroupUpdate)
                                }
                                onChange={(e) => this.onChange(e)}
                                addWorkoutExerciseGroup={() =>
                                  this.addWorkoutExerciseGroup()
                                }
                                visibleListGroupExercise={
                                  this.state.visibleListGroupExercise
                                }
                                visibleNewListGroupExercise={
                                  this.state.visibleNewListGroupExercise
                                }
                                updateWorkoutExerciseGroup={(item) =>
                                  this.updateWorkoutExerciseGroup(item)
                                }
                                showModal={(item) => this.showModal(item)}
                                show={this.state.show}
                                hideModal={() => this.hideModal()}
                                deleteWorkoutExerciseGroup={() =>
                                  this.deleteWorkoutExerciseGroup()
                                }
                                addWorkoutExerciseGroupReset={
                                  this.state.addWorkoutExerciseGroup
                                }
                              />
                            </div>

                            <div
                              className="col-md-8"
                              id="admin-exercises-container"
                            >
                              <ExerciseRightSection
                                ExerciseGroups={this.state.ExerciseGroups}
                                onHandel={(e) => {
                                  this.onHandel(e);
                                }}
                                ExerciseGroupsSelectpicker={
                                  this.state.ExerciseGroupsSelectpicker
                                }
                                onChange={(e) => this.onChange(e)}
                                value={
                                  (this.state.ExerciseName,
                                  this.state.ExerciseDescription,
                                  this.state.exerciseVideos,
                                  this.state.exerciseNameUpdate,
                                  this.state.exerciseDescriptionUpdate,
                                  this.state.exerciseVideoUpdate)
                                }
                                addWorkoutExercise={() =>
                                  this.addWorkoutExercise()
                                }
                                exercise_group_id={this.state.exercise_group_id}
                                selectedGroupExercises={
                                  this.state.selectedGroupExercises
                                }
                                updateWorkoutExercise={(item) => {
                                  this.updateWorkoutExercise(item);
                                }}
                                deleteExerciseModal={
                                  this.state.deleteExerciseModal
                                }
                                showDeleteWorkoutExerciseModal={(item) =>
                                  this.showDeleteWorkoutExerciseModal(item)
                                }
                                hideDeleteWorkoutExerciseModal={() =>
                                  this.hideDeleteWorkoutExerciseModal()
                                }
                                deleteWorkoutExercise={() =>
                                  this.deleteWorkoutExercise()
                                }
                                exerciseNameReset={this.state.ExerciseName}
                                exerciseDescriptionReset={
                                  this.state.ExerciseDescription
                                }
                                exerciseVideoReset={this.state.exerciseVideos}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default ExerciseSetting;
