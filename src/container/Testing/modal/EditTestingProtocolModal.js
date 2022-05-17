import React, { Component } from "react";
import Checkbox from "../../../component/Checkbox/Checkbox";
import { Modal } from "react-bootstrap";

class EditTestingProtocolModal extends Component {
  render() {
    const {
      show,
      onHide,
      state,
      onChange,
      handelUpdateTestingProtocol,
      handelUpdateTestingProtocolCheckbox,
      toggleEditCb,
      addToUpdateTestingProtocolExerciseNew,
      updateTestingProtocolApi,
      toggleConfirmModal,
      editNewDetailsObj,
    } = this.props;

    return (
      <div>
        <Modal show={show} onHide={onHide} size="lg" centered>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="edit-protocol">
                Edit Testing Protocol
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
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="editNewdefName"
                  defaultValue={
                    (state.editNewdefName, state?.editNewDetailsName)
                  }
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Units</th>
                      <th>Smaller is Better?</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* CHeck Start */}
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="editExerciseNew"
                          value={state.editExerciseNew}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {state.editNewTestingExerciseError}
                        </p>
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="editUnitNew"
                          value={state.editUnitNew}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {state.editNewTestingUnitsError}
                        </p>
                      </td>

                      <td colSpan="2">
                        <div className="form-inline">
                          <div className="custom-control custom-checkbox">
                            <Checkbox
                              style={{ marginTop: "5px" }}
                              name="smaller_better"
                              checked={state.editTestingProtocolCheckbox}
                              toggleCb={() => toggleEditCb()}
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <div>
                          <div className="delete-button">
                            <button
                              type="button"
                              className="btn btn-danger add_Check_Button"
                              onClick={() =>
                                addToUpdateTestingProtocolExerciseNew()
                              }
                            >
                              <i className="fa fa-check"></i>
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* check Ends */}
                    {editNewDetailsObj &&
                      editNewDetailsObj.lenght !== 0 &&
                      editNewDetailsObj.map((item, ind) => {
                        return (
                          <tr key={item.id}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={item?.exercise}
                                onChange={(text) =>
                                  handelUpdateTestingProtocol(
                                    ind,
                                    "exercise",
                                    text
                                  )
                                }
                              />
                            </td>

                            <td>
                              <input
                                type="text"
                                className="form-control"
                                defaultValue={item?.units}
                                onChange={(text) =>
                                  handelUpdateTestingProtocol(
                                    ind,
                                    "units",
                                    text
                                  )
                                }
                              />
                            </td>

                            <td colSpan="2">
                              <div className="form-inline">
                                <div className="custom-control custom-checkbox">
                                  <div className="testing_protocol_edit_checkbox">
                                    <Checkbox
                                      checked={
                                        item.smaller_better === "1"
                                          ? true
                                          : false
                                      }
                                      toggleCb={() =>
                                        handelUpdateTestingProtocolCheckbox(
                                          item,
                                          ind
                                        )
                                      }
                                    />
                                  </div>
                                </div>
                              </div>
                            </td>

                            <td>
                              <div className="delete-button">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => toggleConfirmModal(ind)}
                                >
                                  {state.deleteExerciseLoader &&
                                  state.deleteExeIndex === ind ? (
                                    <i
                                      className="fa fa-spinner fa-spin fa-3x fa-fw"
                                      style={{
                                        color: "#fff",
                                        fontSize: "20px",
                                      }}
                                    />
                                  ) : (
                                    <i className="fa fa-trash"></i>
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => updateTestingProtocolApi()}
              >
                Save
                {state.editLoader && (
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    style={{
                      color: "#fff",
                      fontSize: "20px",
                    }}
                  ></i>
                )}
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditTestingProtocolModal;
