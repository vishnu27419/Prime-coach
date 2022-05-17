import { IconButton } from "@material-ui/core";
import { data } from "jquery";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import CancelIcon from "@material-ui/icons/Cancel";

export class RelatableExerciseGroup extends Component {
  render() {
    const {
      show,
      onHide,
      exerciseGroupDetail,
      parentState,
      exerciseGroupOnChange,
      exerciseDetail,
      exerciseOnChange,
      chipsArray,
    } = this.props;
    return (
      <div>
        <Modal
          show={show}
          // onHide={onHide}
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
                Related Exercise
              </h5>
              {/* <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button> */}
            </div>
            <div className="modal-body">
              <div className="form-group " style={{ marginBottom: "0px" }}>
                <label htmlFor="" style={{ color: "#fff", fontWeight: "bold" }}>
                  {" "}
                  Exercise Group
                </label>
                <select
                  className="form-control"
                  name="exerciseGroup"
                  value={parentState.exerciseGroup}
                  onChange={(e) => exerciseGroupOnChange(e)}
                >
                  <option>Select Exercise Group</option>
                  {exerciseGroupDetail.length !== 0 &&
                    exerciseGroupDetail.map((item) => {
                      return (
                        <option value={item.id} key={item?.id}>
                          {item?.exercise_group}
                        </option>
                      );
                    })}
                </select>
              </div>

              {parentState.hideExercisePicker && (
                <div className="form-group ">
                  <label
                    htmlFor=""
                    style={{ color: "#fff", fontWeight: "bold" }}
                  >
                    {" "}
                    Exercise
                  </label>
                  <select
                    className="form-control"
                    name="exercise"
                    value={parentState.exercise}
                    onChange={(e) => exerciseOnChange(e)}
                  >
                    <option value="">Select Exercise</option>
                    {exerciseDetail?.length !== 0 &&
                      exerciseDetail?.map((data) => {
                        return (
                          <option value={data?.exercise} key={data?.id}>
                            {data?.exercise}
                          </option>
                        );
                      })}
                  </select>
                </div>
              )}

              <div
                style={{
                  color: "#fff",
                  marginTop: "20px",
                  display: "flex",
                  flexWrap: "wrap",
                }}
              >
                {chipsArray.map((item) => {
                  return (
                    <span
                      style={{
                        padding: "7px 10px",
                        background: "#4D4D4D",
                        borderRadius: "50px",
                        marginLeft: "10px",
                        marginTop: "20px",
                      }}
                    >
                      {item}
                      <IconButton style={{ with: "20px", height: "20px" }}>
                        <CancelIcon style={{ color: "#fff" }} />
                      </IconButton>
                    </span>
                  );
                })}
              </div>
            </div>

            <hr style={{ backgroundColor: "#fff" }} />
          </Modal.Body>
          <ModalFooter
            style={{
              display: "flex",
              justifyContent: "center",
              borderTop: "none",
            }}
          >
            <div>
              <button
                type="button"
                className="Model_btn "
                onClick={() => onHide()}
              >
                Save
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default RelatableExerciseGroup;
