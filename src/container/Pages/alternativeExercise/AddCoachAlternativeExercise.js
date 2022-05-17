import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import ReactMultiSelectCheckboxes from "react-multiselect-checkboxes";
import "./CoachAlternativeExercise.css";

export class AddCoachAlternativeExercise extends Component {
  render() {
    const {
      show,
      onHide,
      parentState,
      onRelatableExerciseChange,
      handelCreateAlternativeExercise,
      exerciseGroupDetail,
      relatableExerciseGroupOnChange,
    } = this.props;
    return (
      <div>
        <Modal
          show={show}
          onHide={() => false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="videopopupTitle">
                Add Alternative Exercise
              </h5>
              <button
                type="button"
                className="close"
                onClick={() =>
                  parentState?.createAlternativeExerciseLoader ? null : onHide()
                }
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Exercise Group
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={parentState?.exerciseGroupName}
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Exercise{" "}
                </label>

                <input
                  type="text"
                  className="form-control"
                  defaultValue={parentState?.exerciseName}
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap ",
                }}
              >
                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Related Alternative Group
                  </label>
                  <select
                    className="form-control"
                    name="relatableExerciseGroup"
                    value={parentState.relatableExerciseGroup}
                    onChange={(e) => relatableExerciseGroupOnChange(e)}
                  >
                    {exerciseGroupDetail.map((item) => {
                      return (
                        <option value={item.id} key={item?.id}>
                          {item?.exercise_group}
                        </option>
                      );
                    })}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Related Alternative Exercise
                  </label>
                  <span className="basic-multi-select">
                    <ReactMultiSelectCheckboxes
                      options={parentState?.RelatableOption}
                      placeholderButtonLabel="Select Exercise"
                      onChange={(e) => onRelatableExerciseChange(e)}
                    />
                  </span>
                </div>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            {/* <Tooltip arrow title="Add testing result"> */}
            <button
              type="button"
              className="Model_btn pull-right"
              style={
                parentState?.createAlternativeExerciseLoader
                  ? { cursor: "not-allowed" }
                  : {}
              }
              disabled={parentState?.createAlternativeExerciseLoader}
              onClick={() => handelCreateAlternativeExercise()}
            >
              Save{" "}
              {parentState?.createAlternativeExerciseLoader && (
                <i className="fa fa-spinner fa-pulse" />
              )}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddCoachAlternativeExercise;
