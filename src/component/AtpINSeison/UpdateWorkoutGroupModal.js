import React, { Component } from "react";
import { Modal } from "react-bootstrap";
import UpdateSetsRest from "component/AtpINSeison/UpdateSetsRest";

class UpdateWorkoutGroupModal extends Component {
  render() {
    const {
      state,
      onHide,
      onHandelChange,
      hideSetsAndRest,
      updateSets,
      updateRest,
      updateDescription,
      updateSetsType,
      update_annual_training_program_workout_group,
      onChange,
    } = this.props;

    return (
      <div>
        <Modal
          show={state.updateWorkoutGroupModal}
          onHide={onHide}
          size="lg"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <div className="col-xs-12">
                <h2>Edit Workouts Groups </h2>
              </div>
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
              <div className="form-group ">
                <label htmlFor="Description">Description</label>
                <input
                  type="text"
                  className="form-control"
                  name="updateDescription"
                  defaultValue={updateDescription}
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation">
                  {state.UpdateDescriptionError}
                </p>
              </div>
              <div className="form-group ">
                <label>Sets Type</label>
                <select
                  className="form-control"
                  name="updateSetsType"
                  value={updateSetsType}
                  onChange={(e) => onHandelChange(e)}
                >
                  <option value="">Select an Item </option>
                  <option value="procedural">Procedural</option>

                  <option value="super_set">Super set</option>
                  <option value="triset">Triset</option>
                  <option value="quarter_set">Quater Set</option>
                </select>
                <p className="react_validation">{state.updateSetsTypeError}</p>
              </div>
              {!hideSetsAndRest ? null : (
                <UpdateSetsRest
                  state={state}
                  updateSets={updateSets}
                  updateRest={updateRest}
                  onChange={(e) => onHandelChange(e)}
                  onKeyPress={this.props.onKeyPress}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <div>
              <button
                className="Model_btn"
                onClick={() => update_annual_training_program_workout_group()}
              >
                {state.updateGroupExerciseLoader === false ? (
                  "save"
                ) : (
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    style={{
                      color: "var(--defaultWhite)",
                      marginLeft: "5px",
                      fontSize: "14px",
                    }}
                  />
                )}
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
export default UpdateWorkoutGroupModal;
// workout_modal_label
