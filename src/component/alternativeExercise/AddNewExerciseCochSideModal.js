import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Checkbox from "component/Checkbox/Checkbox";
import RelatableExerciseGroup from "./RelatableExerciseGroup";
import Dembel from "component/lottiLoader/dumbelLoader";
import { standardPostApi } from "container/API/ApiWrapper";
import { type } from "jquery";

class AddNewExerciseCochSideModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      relatableExerciseModal: false,
      exerciseGroupDetail: [],
      exerciseGroup: "",
      hideExercisePicker: false,
      exerciseDetail: [],
      exercise: "",
      chipsArray: [],
    };
  }

  componentDidMount() {
    this.featchExerciseGroup();
  }

  toggleRelatableExerciseModal = () => {
    this.setState({
      relatableExerciseModal: !this.state.relatableExerciseModal,
    });
  };

  exerciseGroupOnChange = async (event) => {
    console.log("event", event.target.value);
    const { exerciseGroupDetail, exerciseGroup } = this.state;
    this.setState({
      exerciseGroup: event.target.value,
      hideExercisePicker: true,
    });
    console.log("STATE", typeof event.target.value);

    let temp = exerciseGroupDetail.find(
      (x) => x.id === parseInt(event.target.value)
    );
    console.log("temp", temp);

    await this.setState({ exerciseDetail: temp?.exercises });
  };

  featchExerciseGroup = async () => {
    try {
      const res = await standardPostApi(
        "admin_exercise_settings",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );

      if (res.data.code === 200) {
        // console.log(
        //   "This  is response of Group exercise ",
        //   res.data.data.ExerciseGroups
        // );
        this.setState({ exerciseGroupDetail: res?.data?.data?.ExerciseGroups });
      }
    } catch (error) {
      console.error("featch exercise Group", error);
    }
  };

  exerciseOnChange = (e) => {
    console.log("event", e.target.value);
    this.setState({
      exercise: e.target.value,
      chipsArray: [...this.state.chipsArray, e.target.value],
    });
  };

  render() {
    const {
      show,
      onHide,
      state,
      onChange,
      alternative_exercise_add_update_Api,
      loadRequired,
      isInputNumber,
    } = this.props;
    // const { exercise } = this.props.value;

    console.log("this is chipsArray", this.state.chipsArray);

    return (
      <div>
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Add New Exercise
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="">Exercise</label>
                <input
                  type="text"
                  className="form-control"
                  name="exercise"
                  value={state.exercise}
                  onChange={onChange}
                />
                <p className="react_validation">{state.exerciseError}</p>
              </div>
              <div className="form-group" style={{ marginBottom: "11px" }}>
                <label htmlFor="">Video Link</label>
                <input
                  type="text"
                  className="form-control"
                  name="videoLink"
                  value={state.videoLink}
                  onChange={onChange}
                />
                <p className="react_validation">{state.videoError}</p>
              </div>

              <div>
                {/* <button
                  className="btn btn-md  btn_update_exercise_react "
                  style={{ color: "#2F84AA", marginBottom: "20px" }}
                >
                  <i className="fas fa-dumbbell"></i>
                  Update Exercise
                </button> */}
                <button
                  type="button"
                  className="Model_btn"
                  style={{ marginBottom: "13px", backgroundColor: "#041E43" }}
                  onClick={() => this.toggleRelatableExerciseModal()}
                >
                  <span
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    Related Exercise &nbsp;
                    <Dembel />
                  </span>
                </button>
              </div>
              <div className="reps_check">
                <div className="form-group" style={{ marginBottom: "11px" }}>
                  <label htmlFor="">Reps</label>
                  <input
                    type="text"
                    className="form-control"
                    name="repsState"
                    value={state.repsState}
                    onChange={onChange}
                    onKeyPress={isInputNumber}
                  />
                  <p className="react_validation">{state.repsError}</p>
                </div>
                <div
                  className="form-group"
                  style={{ marginLeft: "10%", marginBottom: "11px" }}
                >
                  <label htmlFor="">Load</label>
                  <input
                    type="text"
                    className="form-control"
                    name="loadState"
                    value={state.loadRequired === 0 ? "" : state.loadState}
                    onChange={onChange}
                    onKeyPress={isInputNumber}
                    style={
                      state.loadRequired === 0
                        ? {
                            backgroundColor: "rgb(217 216 216)	",
                            border: "1px solid rgb(217 216 216)",
                            cursor: "not-allowed",
                          }
                        : { backgroundColor: "#fff" }
                    }
                    disabled={state.loadRequired === 0 ? true : false}
                    title={
                      state.loadRequired === 0
                        ? "Please enable load required to fill load"
                        : ""
                    }
                  />
                  <p className="react_validation">{state.loadError}</p>
                </div>
              </div>
              <div className="reps_check">
                <div className="form-group ">
                  <label htmlFor="">Reps Each Side?</label>
                  <Checkbox
                    checked={state.repsEachSide}
                    toggleCb={() => this.props.RepsEachSide()}
                  />
                </div>

                <div className="form-group load_required">
                  <label htmlFor="">Load Required?</label>
                  <Checkbox
                    checked={state.loadRequired}
                    toggleCb={() => loadRequired()}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="">Repetition type</label>
                <select
                  className="form-control col-md-12 superset_select_react"
                  name="repetitionType"
                  value={state.repetitionType}
                  onChange={onChange}
                >
                  <option value="">Select Repetition Type</option>
                  <option value="repetition">Repetition</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
                </select>
                <p className="react_validation">{state.repetitionTypeError}</p>
              </div>

              <div className="reps_check">
                <div className="form-group ">
                  <label htmlFor="">Sets</label>
                  <input
                    type="text"
                    className="form-control"
                    name="sets"
                    value={state.sets}
                    onChange={onChange}
                    onKeyPress={isInputNumber}
                  />
                  <p className="react_validation">{state.setsError}</p>
                </div>

                <div className="form-group" style={{ marginLeft: "10%" }}>
                  <label htmlFor="">Rest</label>
                  <input
                    type="text"
                    className="form-control"
                    name="rest"
                    value={state.rest}
                    onChange={onChange}
                    onKeyPress={isInputNumber}
                  />
                  <p className="react_validation">{state.restError}</p>
                </div>
              </div>

              <div className="form-group ">
                <label htmlFor=""> Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  className="form-control"
                  name="description"
                  value={state.description}
                  onChange={onChange}
                ></textarea>
                <p className="react_validation">{state.descriptionError}</p>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <button
                type="button"
                className="Model_btn"
                onClick={() => alternative_exercise_add_update_Api()}
                display={state.isAddExerciseLoading}
              >
                Save{" "}
                {state.isAddExerciseLoading && (
                  <i className="fa fa-spinner fa-pulse" />
                )}
              </button>
            </div>
          </ModalFooter>
        </Modal>

        <RelatableExerciseGroup
          onHide={this.toggleRelatableExerciseModal}
          show={this.state.relatableExerciseModal}
          exerciseGroupDetail={this.state.exerciseGroupDetail}
          parentState={this.state}
          exerciseGroupOnChange={(e) => this.exerciseGroupOnChange(e)}
          exerciseDetail={this.state.exerciseDetail}
          exerciseOnChange={(e) => this.exerciseOnChange(e)}
          chipsArray={this.state.chipsArray}
        />
      </div>
    );
  }
}
export default AddNewExerciseCochSideModal;
