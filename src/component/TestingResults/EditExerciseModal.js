import React from "react";
import { Modal } from "react-bootstrap";
import Checkbox from "../../component/Checkbox/Checkbox";

class EditExerciseModal extends React.Component {
  render() {
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide} size="lg">
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
                onClick={this.props.onHide}
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
                  name="editTestingName"
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
                          name="editNewTestingExercise"
                        />
                      </td>

                      <td>
                        <input
                          type="text"
                          className="form-control"
                          name="editNewTestingUnits"
                        />
                      </td>

                      <td colSpan="2">
                        <div className="form-inline">
                          <div className="custom-control custom-checkbox">
                            <Checkbox
                              style={{ marginTop: "5px" }}
                              name="smaller_better"
                            />
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="custom-control custom-checkbox">
                          <div className="delete-button">
                            <button
                              type="button"
                              className="btn btn-danger add_Check_Button"
                            >
                              <i className="fa fa-check"></i>
                            </button>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div className="delete-button">
                          <button type="button" className="btn btn-danger">
                            <i className="fa fa-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <button type="button" className="Model_btn" data-dismiss="modal">
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default EditExerciseModal;
