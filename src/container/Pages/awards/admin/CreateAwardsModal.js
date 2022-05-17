import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

export class CreateAwardsModal extends Component {
  render() {
    const {
      assignTo,
      toggleAssignTo,
      onChange,
      awardName,
      parentState,
      handelCreateAward,
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
                Create Award
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
                  name="awardName"
                  value={awardName}
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation">{parentState.awardNameError}</p>
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
                      assignTo === "team"
                        ? {
                            backgroundColor: "#2F84CA",
                            color: "#fff",
                            padding: "5px 42px",
                          }
                        : { border: "1px solid #2F84CA", padding: "5px 42px" }
                    }
                    onClick={() => toggleAssignTo("team")}
                  >
                    Award Team
                  </Button>

                  <Button
                    color="primary"
                    style={
                      assignTo === "individual"
                        ? {
                            backgroundColor: "#2F84CA",
                            color: "#fff",
                            padding: "5px 30px",
                          }
                        : { border: "1px solid #2F84CA", padding: "5px 30px" }
                    }
                    onClick={() => toggleAssignTo("individual")}
                  >
                    {" "}
                    Award Individual
                  </Button>
                </div>
                <p className="react_validation" style={{ marginTop: "3px" }}>
                  {parentState.assignToError}
                </p>
              </div>
            </div>
          </Modal.Body>

          <ModalFooter>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#2F84CA", color: "#fff" }}
              onClick={handelCreateAward}
              disabled={parentState.createAwardLoader}
            >
              Create{" "}
              {parentState.createAwardLoader && (
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

export default CreateAwardsModal;
