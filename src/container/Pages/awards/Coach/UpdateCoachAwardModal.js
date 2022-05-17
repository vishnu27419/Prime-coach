import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

export class UpdateCoachAwardModal extends Component {
  render() {
    const {
      updateChange,
      parentState,
      toggleUpdateAssignTo,
      handelUpdateAwards,
    } = this.props;
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          //   size="lg"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="edit-protocol">
                Create Awards
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
                <label htmlFor="" style={{ fontWeight: "500" }}>
                  Name of the award
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="updateAwardName"
                  defaultValue={parentState.updateAwardName}
                  onChange={(e) => updateChange(e)}
                />
                <p className="react_validation">
                  {parentState.updateAwardNameError}
                </p>
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "500" }}>
                  Award type
                </label>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Button
                    color="primary"
                    style={
                      parentState.updateAssignTo === "team"
                        ? {
                            backgroundColor: "#2F84CA",
                            color: "#fff",
                            padding: "5px 42px",
                          }
                        : { border: "1px solid #2F84CA", padding: "5px 42px" }
                    }
                    onClick={() => toggleUpdateAssignTo("team")}
                  >
                    Award Team
                  </Button>

                  <Button
                    color="primary"
                    style={
                      parentState.updateAssignTo === "individual"
                        ? {
                            backgroundColor: "#2F84CA",
                            color: "#fff",
                            padding: "5px 30px",
                          }
                        : { border: "1px solid #2F84CA", padding: "5px 30px" }
                    }
                    onClick={() => toggleUpdateAssignTo("individual")}
                  >
                    {" "}
                    Award Individual
                  </Button>
                </div>
                <p className="react_validation" style={{ marginTop: "3px" }}>
                  {parentState.updateAssgnToError}
                </p>
              </div>
            </div>
          </Modal.Body>

          <ModalFooter>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#2F84CA", color: "#fff" }}
              onClick={handelUpdateAwards}
              disabled={parentState.updateLoader}
            >
              Update{" "}
              {parentState.updateLoader && (
                <i
                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                  }}
                />
              )}
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default UpdateCoachAwardModal;
