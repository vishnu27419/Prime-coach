import React, { Component } from "react";
import { Link } from "react-router-dom";
import CoachHeader from "../../PublicLayout/CoachHeader";
import Footer from "../../PublicLayout/Footer";
import Checkbox from "component/Checkbox/Checkbox";
import AddNewExerciseCochSideModal from "component/alternativeExercise/AddNewExerciseCochSideModal";
import { standardPostApi } from "container/API/ApiWrapper";
import ViewAlternativeExercise from "component/alternativeExercise/ViewAlternaiveExercise";
import { errorToast, successToast } from "utils/toastMessage";
import NoDataFound from "component/lottiLoader/LottiLoader";
import { ContactsOutlined } from "@material-ui/icons";
import DeleteAlternativeExercise from "component/alternativeExercise/DeleteAlternativeExercise";
import EditModalDelete from "../screeningProtocol/modals/EditModalDelete";

class AlternativeExercise extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addExercise: false,
      listOfAlternativeExercise: [],
      viewModal: false,
      viewModalData: {},
      exercise: "",
      videoLink: "",
      repsState: "",
      loadState: "",
      repsEachSide: 0,
      loadRequired: 0,
      repetitionType: "",
      sets: "",
      rest: "",
      description: "",
      exerciseError: "",
      repsError: "",
      loadError: "",
      repetitionTypeError: "",
      setsError: "",
      restError: "",
      descriptionError: "",
      isTableLoading: false,
      isAddExerciseLoading: false,
      isEditLoader: false,
      deleteModal: false,
      editButtonId: null,
      editDeleteButtonId: null,
      editdeleteObject: {},
      isDeleteLoading: false,
    };
  }

  componentDidMount() {
    this.list_alternative_exercise_Api();
  }

  addExerciseToggle = async () => {
    await this.setState({
      addExercise: !this.state.addExercise,
      exercise: "",
      videoLink: "",
      repsState: "",
      loadState: "",
      repsEachSide: 0,
      loadRequired: 0,
      repetitionType: "",
      sets: "",
      rest: "",
      description: "",
      exerciseError: "",
      repsError: "",
      loadError: "",
      repetitionTypeError: "",
      setsError: "",
      restError: "",
      descriptionError: "",
      videoError: "",
      editButtonId: null,
    });
  };

  viewAlternativeExercise = async (data) => {
    if (data) {
      await this.setState({
        viewModal: !this.state.viewModal,
        viewModalData: data,
      });
    } else {
      await this.setState({ viewModal: false });
    }
  };

  repsEachSide = async () => {
    await this.setState({ repsEachSide: !this.state.repsEachSide });

    if (this.state.repsEachSide === true) {
      this.setState({ repsEachSide: 1 });
    } else {
      this.setState({ repsEachSide: 0 });
    }
  };

  loadRequired = async () => {
    await this.setState({ loadRequired: !this.state.loadRequired });
    if (this.state.loadRequired === true) {
      this.setState({ loadRequired: 1 });
    } else {
      this.setState({ loadRequired: 0 });
    }
  };

  list_alternative_exercise_Api = async (message) => {
    this.setState({ isTableLoading: message === "update" ? false : true });
    try {
      const res = await standardPostApi(
        "list_alternative_exercise",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "Response of list_alternative_exercise_Api ---->",
        //   res.data.data
        // );
        this.setState({ listOfAlternativeExercise: res?.data?.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isTableLoading: false });
    }
  };

  alternative_exercise_add_update_Api = async () => {
    const {
      exercise,
      videoLink,
      repsState,
      loadState,
      repsEachSide,
      loadRequired,
      repetitionType,
      sets,
      rest,
      description,
    } = this.state;

    const isValid = this.addAlternativeExerciseValidation();

    if (isValid) {
      this.setState({ isAddExerciseLoading: true });
      try {
        const res = await standardPostApi(
          "alternative_exercise_add_update",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            // alternative_exercise_id: "",
            alternative_exercise_name: exercise,
            alternative_exercise_description: description,
            alternative_exercise_video: videoLink,
            alternative_exercise_repetition: repsState,
            alternative_exercise_load: loadState ? loadState : 0,
            alternative_exercise_load_required: loadRequired,
            alternative_exercise_repetition_each_side: repsEachSide,
            alternative_exercise_repetition_type: repetitionType,
            alternative_exercise_sets: sets,
            alternative_exercise_rest: rest,
            api_action: "add",
          },
          true,
          true
        );
        if (res.data.code === 200) {
          console.log(
            "This is response of add alternative Exercise",
            res.data.data
          );
          successToast(res.data.message);
          this.list_alternative_exercise_Api();
          this.setState({ addExercise: false });
        }
      } catch (error) {
        console.log(JSON.stringify(error));
        errorToast(error.message);
      } finally {
        this.setState({ isAddExerciseLoading: false });
      }
    }
  };
  addAlternativeExerciseValidation = () => {
    const {
      exercise,
      repsState,
      loadState,
      repetitionType,
      sets,
      rest,
      loadRequired,
      description,
      videoLink,
    } = this.state;
    let exerciseError = "";
    let repsError = "";
    let loadError = "";
    let repetitionTypeError = "";
    let setsError = "";
    let restError = "";
    let descriptionError = "";
    let videoError = "";
    let regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

    console.log("load Required", this.state.loadRequired);

    if (!exercise) {
      exerciseError = "Exercise field is required.";
    }

    if (!repsState) {
      repsError = "Reps field is required.";
    }

    if (!loadState && loadRequired === 1) {
      loadError = "Load field is required.";
    }

    if (!repetitionType) {
      repetitionTypeError = "Please select repetition type";
    }

    if (!sets) {
      setsError = "Sets field is required.";
    }

    if (!rest) {
      restError = "Rest field is required.";
    }

    if (!description) {
      descriptionError = "Description field is required";
    }
    if (!videoLink.match(regExp)) {
      videoError = "Please enter valid video url";
    }

    if (
      exerciseError ||
      repsError ||
      loadError ||
      repetitionTypeError ||
      setsError ||
      restError ||
      descriptionError ||
      videoError
    ) {
      this.setState({
        exerciseError,
        repsError,
        loadError,
        repetitionTypeError,
        setsError,
        restError,
        descriptionError,
        videoError,
      });
      return false;
    } else {
      return true;
    }
  };

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  onChange = async (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handelEditChange = async (index, field, event) => {
    const { listOfAlternativeExercise } = this.state;

    let temp1 = [...listOfAlternativeExercise];
    temp1[index][field] = event.target.value;

    this.setState({ listOfAlternativeExercise: temp1 });
  };

  updateEditRCSCheckbox = async (item, index) => {
    const { listOfAlternativeExercise } = this.state;

    console.log("item", item, index);

    let temp1 = [...listOfAlternativeExercise];

    temp1[index].alt_repetition_each_side =
      item.alt_repetition_each_side === "1" ? "0" : "1";

    this.setState({ listOfAlternativeExercise: temp1 });
  };

  updateEditLRCheckbox = async (item, index) => {
    const { listOfAlternativeExercise } = this.state;

    let temp1 = [...listOfAlternativeExercise];

    temp1[index].alt_load_required = item.alt_load_required === "1" ? "0" : "1";

    this.setState({ listOfAlternativeExercise: temp1 });
  };

  editAlternativeExercise = async (data) => {
    this.setState({ editButtonId: data?.id });
    const isValid = this.validationEditAlternativeExercise(data);
    if (isValid) {
      this.setState({ isEditLoader: true });
      try {
        const res = await standardPostApi(
          "alternative_exercise_add_update",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            alternative_exercise_id: data?.id,
            alternative_exercise_name: data?.exercise,
            alternative_exercise_description: data?.description,
            alternative_exercise_video: data?.video,
            alternative_exercise_repetition: data?.alt_repetition,
            alternative_exercise_load:
              data?.alt_load_required === "0" ? "0" : data?.alt_load,
            alternative_exercise_repetition_each_side:
              data?.alt_repetition_each_side,
            alternative_exercise_load_required: data?.alt_load_required,
            alternative_exercise_repetition_type: data?.alt_repetition_type,
            alternative_exercise_sets: data?.alt_sets,
            alternative_exercise_rest: data?.alt_rest,
            api_action: "update",
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response of Edit Alternative Exercise", res.data.data);
          this.list_alternative_exercise_Api("update");
          successToast(res.data.message);
        }
      } catch (error) {
        console.error("error of edit alternative exercise", error);
      } finally {
        this.setState({ isEditLoader: false });
      }
    }
  };

  validationEditAlternativeExercise = (item) => {
    console.log("this is Itma From function", item);
    let editExerciseError = false;
    let editVideoError = false;
    let errorRepetitionError = false;
    let errorRepetitionType = false;
    let errorSets = false;
    let errorRest = false;
    let errorDescription = false;
    let regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;

    if (!item.exercise) {
      editExerciseError = true;
      errorToast("Exercise field is required.");
    } else {
      editExerciseError = false;
    }
    if (!item?.video.match(regExp)) {
      editVideoError = true;
      errorToast("Video field is not valid");
    } else {
      editVideoError = false;
    }
    if (!item?.alt_repetition) {
      errorRepetitionError = true;
      errorToast("Reps field is required");
    } else {
      errorRepetitionError = false;
    }
    if (!item?.alt_repetition_type) {
      errorRepetitionType = true;
      errorToast("Repetition type field is required");
    } else {
      errorRepetitionType = false;
    }
    if (!item?.alt_sets) {
      errorSets = true;
      errorToast("Sets field is required");
    } else {
      errorSets = false;
    }
    if (!item?.alt_rest) {
      errorRest = true;
      errorToast("Rest field is required");
    } else {
      errorRest = false;
    }
    if (!item?.description) {
      errorDescription = true;
      errorToast("Description field is required");
    } else {
      errorDescription = false;
    }

    if (
      editExerciseError ||
      editVideoError ||
      errorRepetitionError ||
      errorRepetitionType ||
      errorSets ||
      errorRest ||
      errorDescription
    ) {
      return false;
    } else {
      return true;
    }
  };

  toggleDeleteModal = (data) => {
    this.setState({
      deleteModal: !this.state.deleteModal,
      editDeleteButtonId: data?.id,
      editdeleteObject: data,
    });
  };

  deleteAlternativeExercise = async () => {
    const { editdeleteObject, isDeleteLoading } = this.state;
    this.setState({ isDeleteLoading: true });
    try {
      const res = await standardPostApi(
        "alternative_exercise_add_update",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          alternative_exercise_id: editdeleteObject?.id,
          alternative_exercise_name: editdeleteObject?.exercise,
          alternative_exercise_description: editdeleteObject?.description,
          alternative_exercise_video: editdeleteObject?.video,
          api_action: "delete",
        },
        true
      );
      if (res.data.code === 200) {
        successToast(res.data.message);
        this.list_alternative_exercise_Api("update");
        this.setState({ deleteModal: false });
      }
    } catch (error) {
      console.log("error of delete alternative Exercise", error);
    } finally {
      this.setState({ isDeleteLoading: false });
    }
  };

  render() {
    const {
      addExercise,
      listOfAlternativeExercise,
      viewModal,
      isTableLoading,
      isEditLoader,
      editButtonId,
      editdeleteObject,
    } = this.state;

    console.log("editdeleteObject", editdeleteObject);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection">
                <div className="d-lg-flex justify-content-between align-items-center ">
                  <div className="heading">Alternative Exercise</div>
                  <button
                    className="Model_Btn_term"
                    onClick={this.addExerciseToggle}
                  >
                    Add New Exercise{" "}
                    <i className="fa fa-plus" aria-hidden="true"></i>
                    {/* </a> */}
                  </button>
                </div>
                <div className="home_sc" style={{ overflow: "auto" }}>
                  <table className="table table-condensed react_workout_table">
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Video Link</th>
                        <th>Reps</th>
                        <th>Load</th>
                        <th>Reps Each Side?</th>
                        <th>Load Required?</th>
                        <th>Repetition Type</th>
                        <th>Sets</th>
                        <th>Rest</th>
                        <th>Description</th>
                        <th>View</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>

                    {listOfAlternativeExercise &&
                      listOfAlternativeExercise.length !== 0 &&
                      listOfAlternativeExercise.map((data, index) => {
                        return (
                          <tbody key={data.id}>
                            <tr>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-exercise"
                                  defaultValue={data.exercise}
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "exercise",
                                      text
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-reps"
                                  defaultValue={data.video}
                                  onChange={(text) =>
                                    this.handelEditChange(index, "video", text)
                                  }
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-load"
                                  defaultValue={data.alt_repetition}
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "alt_repetition",
                                      text
                                    )
                                  }
                                  onKeyPress={this.isInputNumber}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-load"
                                  defaultValue={
                                    data.alt_load_required === "0"
                                      ? ""
                                      : data.alt_load
                                  }
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "alt_load",
                                      text
                                    )
                                  }
                                  onKeyPress={this.isInputNumber}
                                  disabled={
                                    data.alt_load_required == "1" ? false : true
                                  }
                                  style={
                                    data.alt_load_required == "1"
                                      ? { backgroundColor: "#fff" }
                                      : {
                                          backgroundColor: "#A9A9A9	",
                                          border: "1px solid #A9A9A9",
                                          cursor: "not-allowed",
                                        }
                                  }
                                  title={
                                    data.alt_load_required == "1"
                                      ? ""
                                      : "Please enable load required to fill load"
                                  }
                                />
                              </td>
                              <td>
                                <Checkbox
                                  checked={
                                    data.alt_repetition_each_side === "1"
                                      ? true
                                      : false
                                  }
                                  toggleCb={() =>
                                    this.updateEditRCSCheckbox(data, index)
                                  }
                                />
                              </td>
                              <td>
                                <Checkbox
                                  checked={
                                    data.alt_load_required === "1"
                                      ? true
                                      : false
                                  }
                                  toggleCb={() =>
                                    this.updateEditLRCheckbox(data, index)
                                  }
                                />
                              </td>
                              <td style={{ width: "151px" }}>
                                <select
                                  className="form-control col-md-12 superset_select_react"
                                  defaultValue={data.alt_repetition_type}
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "alt_repetition_type",
                                      text
                                    )
                                  }
                                >
                                  <option value="repetition">Repetition</option>
                                  <option value="minutes">Minutes</option>
                                  <option value="seconds">Seconds</option>
                                </select>
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-reps"
                                  defaultValue={data.alt_sets}
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "alt_sets",
                                      text
                                    )
                                  }
                                  onKeyPress={this.isInputNumber}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-reps"
                                  defaultValue={data.alt_rest}
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "alt_rest",
                                      text
                                    )
                                  }
                                  onKeyPress={this.isInputNumber}
                                />
                              </td>
                              <td>
                                <input
                                  type="text"
                                  className="form-control col-md-12 builder-reps"
                                  defaultValue={data.description}
                                  onChange={(text) =>
                                    this.handelEditChange(
                                      index,
                                      "description",
                                      text
                                    )
                                  }
                                />
                              </td>

                              <td>
                                <button
                                  title="Save"
                                  className="btn btn-md btn-primary workout-builder-save-workout-exercise "
                                  onClick={() =>
                                    this.viewAlternativeExercise(data)
                                  }
                                >
                                  <i className="fa fa-eye"></i>
                                </button>
                              </td>
                              <td>
                                <button
                                  title="Save"
                                  className="btn btn-md btn-primary"
                                  // disabled={true}
                                  onClick={() =>
                                    this.editAlternativeExercise(data)
                                  }
                                  disabled={
                                    isEditLoader &&
                                    editButtonId === data.id &&
                                    true
                                  }
                                >
                                  {isEditLoader && editButtonId === data.id ? (
                                    <i className="fa fa-spinner fa-pulse" />
                                  ) : (
                                    <i className="fa fa-check" />
                                  )}
                                  {/* {isEditLoader && editButtonId === data.id && (
                                    <i className="fa fa-spinner fa-pulse" />
                                  )} */}
                                </button>
                              </td>
                              <td>
                                <button
                                  title="Save"
                                  className="btn btn-md btn-danger"
                                  onClick={() => this.toggleDeleteModal(data)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          </tbody>
                        );
                      })}
                  </table>

                  {isTableLoading && (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <i
                        className="fa fa-spinner fa-spin fa-3x fa-fw"
                        // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                        style={{
                          color: "var(--appBlue2)",
                          fontSize: "40px",
                          // marginTop: "50px",
                        }}
                      />
                    </div>
                  )}

                  {!isTableLoading &&
                    listOfAlternativeExercise.length === 0 && (
                      <NoDataFound
                        height={250}
                        width={250}
                        text="No data avalable yet"
                      />
                    )}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <AddNewExerciseCochSideModal
          show={addExercise}
          onHide={this.addExerciseToggle}
          state={this.state}
          onChange={this.onChange}
          RepsEachSide={this.repsEachSide}
          loadRequired={this.loadRequired}
          alternative_exercise_add_update_Api={
            this.alternative_exercise_add_update_Api
          }
          isInputNumber={this.isInputNumber}
        />

        <ViewAlternativeExercise
          show={viewModal}
          onHide={this.viewAlternativeExercise}
          state={this.state}
        />

        <DeleteAlternativeExercise
          show={this.state.deleteModal}
          onHide={this.toggleDeleteModal}
          deleteAlternativeExercise={this.deleteAlternativeExercise}
          isDeleteLoading={this.state.isDeleteLoading}
        />
      </div>
    );
  }
}
export default AlternativeExercise;
