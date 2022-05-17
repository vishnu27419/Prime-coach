import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import "./StartWorkoutAlternativeExercise.css";
import Checkbox from "component/Checkbox/Checkbox";
import NoDataFound from "component/lottiLoader/LottiLoader";

class ViewExerciseModal extends React.Component {
  render() {
    const { show, onHide, alternativeExerciseObj } = this.props;

    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          contentClassName="videoModal"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5
                className="modal-title"
                id="teamcreate"
                style={{ color: "#fff" }}
              >
                {/* {alternativeExerciseObj?.description} */}
                View Alternative Exercise
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
              {alternativeExerciseObj?.video && (
                <div>
                  <iframe
                    title="video"
                    width="100%"
                    height="315"
                    src={alternativeExerciseObj.video}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen=""
                  ></iframe>
                </div>
              )}

              <div className="form-group">
                <label htmlFor="" style={{ color: "#fff" }}>
                  Exercise Group
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={
                    alternativeExerciseObj?.exercise_group?.exercise_group
                  }
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              <div className="form-group" style={{ color: "#fff" }}>
                <label htmlFor="">Exercise</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={alternativeExerciseObj?.exercise}
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>
              {/* <div className="reps_check">
                <div className="form-group">
                  <label htmlFor="">Reps</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={alternativeExerciseObj?.alt_repetition}
                    readOnly
                  />
                </div>
                <div className="form-group" style={{ marginLeft: "10%" }}>
                  <label htmlFor="">Load</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={alternativeExerciseObj?.alt_load}
                    readOnly
                  />
                </div>
              </div>
              <div className="reps_check">
                <div className="form-group ">
                  <label htmlFor="">Reps Each Side?</label>
                  <Checkbox
                    checked={
                      alternativeExerciseObj?.alt_repetition_each_side === "1"
                        ? true
                        : false
                    }
                    readOnly
                    disabled
                  />
                </div>

                <div className="form-group load_required">
                  <label htmlFor="">Load Required?</label>
                  <Checkbox
                    checked={
                      alternativeExerciseObj?.alt_load_required === "1"
                        ? true
                        : false
                    }
                    readOnly
                    disabled
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="">Repetition type</label>
                <select
                  className="form-control col-md-12 superset_select_react"
                  name="updateRepetitionType"
                  defaultValue={alternativeExerciseObj?.alt_repetition_type}
                  readOnly
                  disabled
                >
                  <option value="">Select Repetition Type</option>
                  <option value="repetition">Repetition</option>
                  <option value="minutes">Minutes</option>
                  <option value="seconds">Seconds</option>
                </select>
              </div>
              <div className="reps_check">
                <div className="form-group ">
                  <label htmlFor="">Sets</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={alternativeExerciseObj?.alt_sets}
                    readOnly
                  />
                </div>

                <div className="form-group" style={{ marginLeft: "10%" }}>
                  <label htmlFor="">Rest</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={alternativeExerciseObj?.alt_rest}
                    readOnly
                  />
                </div>
              </div>
              <div className="form-group ">
                <label htmlFor=""> Description</label>
                <textarea
                  rows="4"
                  cols="50"
                  className="form-control"
                  defaultValue={alternativeExerciseObj?.description}
                  readOnly
                ></textarea>
              </div> */}
            </div>
          </Modal.Body>
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <button
                type="button"
                className="Model_btn "
                onClick={() => onHide()}
              >
                close
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export class StartWorkoutAlternativeExercise extends Component {
  state = {
    alternativeExerciseDetails: [],
    viewModal: false,
    alternativeExerciseObj: {},
  };

  handelView = async (data) => {
    await this.setState({
      viewModal: !this.state.viewModal,
      alternativeExerciseObj: data,
    });
  };

  render() {
    const {
      show,
      onHide,
      alternativeExerciseDetails,
      onAlternativeSelect,
      loaderAlternativeExercise,
    } = this.props;

    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          contentClassName="startWorkoutAlternativeExercise"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5
                className="modal-title"
                id="teamcreate"
                style={{ color: "#fff" }}
              >
                Alternative Exercise
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

            {!loaderAlternativeExercise &&
              alternativeExerciseDetails.length === 0 && (
                <NoDataFound
                  height={250}
                  width={250}
                  text="No alternative exercise avalable yet"
                />
              )}

            {loaderAlternativeExercise ? (
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
                  // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                  style={{
                    color: "var(--appBlue2)",
                    fontSize: "50px",
                    marginTop: "50px",
                    marginbottom: "60px",
                  }}
                />
              </div>
            ) : (
              <div>
                <table className="table table-condensed react_workout_table">
                  {alternativeExerciseDetails.length !== 0 && (
                    <thead>
                      <tr style={{ color: "#fff" }}>
                        <th>Exercise</th>
                        <th>View</th>
                        <th>Assign</th>
                      </tr>
                    </thead>
                  )}
                  <tbody>
                    {alternativeExerciseDetails.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>
                            <input
                              type="text"
                              className="form-control col-md-12 builder-exercise"
                              defaultValue={data?.exercise}
                              style={{ cursor: "not-allowed" }}
                              readOnly
                            />
                          </td>

                          <td>
                            <button
                              title="Save"
                              className="btn btn-md btn-primary workout-builder-save-workout-exercise "
                              onClick={() => this.handelView(data)}
                            >
                              <i className="fa fa-eye"></i>
                            </button>
                          </td>

                          <td>
                            <button
                              title="Save"
                              className="btn btn-md btn-primary workout-builder-save-workout-exercise "
                              onClick={() => onAlternativeSelect(data)}
                            >
                              <i className="fa fa-check"></i>
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            <div style={{ borderBottom: "1px solid #fff" }}></div>
          </Modal.Body>
          <ModalFooter
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "none",
            }}
          >
            <div>
              <button type="button" className="Model_btn " onClick={onHide}>
                close
              </button>
            </div>
          </ModalFooter>
        </Modal>

        <ViewExerciseModal
          show={this.state.viewModal}
          onHide={this.handelView}
          alternativeExerciseObj={this.state.alternativeExerciseObj}
        />
      </div>
    );
  }
}

export default StartWorkoutAlternativeExercise;
