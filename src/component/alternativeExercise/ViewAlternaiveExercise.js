import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Checkbox from "component/Checkbox/Checkbox";

class ViewAlternativeExercise extends Component {
  render() {
    const { show, onHide, state } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                {state?.viewModalData?.description}
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
              {state?.viewModalData?.video && (
                <div>
                  <iframe
                    title="video"
                    width="100%"
                    height="315"
                    src={state?.viewModalData.video}
                    frameBorder="0"
                    allow="autoplay; encrypted-media"
                    allowFullScreen=""
                  ></iframe>
                </div>
              )}
              <div className="form-group">
                <label htmlFor="">Exercise</label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={state?.viewModalData?.exercise}
                  readOnly
                />
              </div>
              <div className="reps_check">
                <div className="form-group">
                  <label htmlFor="">Reps</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={state?.viewModalData?.alt_repetition}
                    readOnly
                  />
                </div>
                <div className="form-group" style={{ marginLeft: "10%" }}>
                  <label htmlFor="">Load</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={state?.viewModalData.alt_load}
                    readOnly
                  />
                </div>
              </div>
              <div className="reps_check">
                <div className="form-group ">
                  <label htmlFor="">Reps Each Side?</label>
                  <Checkbox
                    checked={
                      state?.viewModalData?.alt_repetition_each_side === "1"
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
                      state?.viewModalData?.alt_load_required === "1"
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
                  defaultValue={state?.viewModalData?.alt_repetition_type}
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
                    defaultValue={state?.viewModalData?.alt_sets}
                    readOnly
                  />
                </div>

                <div className="form-group" style={{ marginLeft: "10%" }}>
                  <label htmlFor="">Rest</label>
                  <input
                    type="text"
                    className="form-control"
                    defaultValue={state?.viewModalData?.alt_rest}
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
                  defaultValue={state?.viewModalData?.description}
                  readOnly
                ></textarea>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <button type="button" className="Model_btn " onClick={onHide}>
                close
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ViewAlternativeExercise;
