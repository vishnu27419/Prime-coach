import React from "react";
import { Modal } from "react-bootstrap";
import Checkbox from "../../component/Checkbox/Checkbox";

class CreateExerciseModal extends React.Component {
  render() {
    const { testingProtocolName, exerciseName, units } = this.props.value;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          centered
          size="lg"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                Create Testing Protocol
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
                  name="testingProtocolName"
                  value={testingProtocolName}
                  onChange={this.props.onChange}
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
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="exerciseName"
                          value={exerciseName}
                          onChange={this.props.onChange}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="units"
                          value={units}
                          onChange={this.props.onChange}
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
                              onClick={() =>
                                this.props.addToTestingProtocolExercises()
                              }
                            >
                              <i className="fa fa-check"></i>
                            </button>
                          </div>
                        </div>
                      </td>

                      <td></td>
                    </tr>
                    {this.props.inputList &&
                      this.props.inputList.map((item, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="exerciseName"
                                defaultValue={(exerciseName, item.exercise)}
                                onChange={this.props.onChange}
                              />
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                name="units"
                                defaultValue={(units, item.units)}
                                onChange={this.props.onChange}
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
                                    onClick={() =>
                                      this.props.addToTestingProtocolExercisesNewButton(
                                        item
                                      )
                                    }
                                  >
                                    <i className="fa fa-check"></i>
                                  </button>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="delete-button">
                                <button
                                  type="button"
                                  className="btn btn-danger"
                                  onClick={() => this.props.deleteEvent(index)}
                                >
                                  <i className="fa fa-trash"></i>
                                </button>
                              </div>
                            </td>
                            <td></td>
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
                onClick={this.props.createTestingProtocol}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default CreateExerciseModal;
