import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

export class AddAwayTeamModal extends Component {
  render() {
    const { show, onHide, onChange, parentState, handelAddAwayTeam } =
      this.props;
    return (
      <div>
        <Modal
          show={show}
          onHide={() => false}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="sm"
          contentClassName="videoModal"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5
                className="modal-title"
                id="teamcreate"
                style={{ color: "#fff" }}
              >
                Add Away Team
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                style={{ marginTop: "-5px" }}
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Away Team Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Team"
                  name="awayTeamName"
                  value={parentState.awayTeamName}
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation" style={{ fontWeight: "bold" }}>
                  {parentState.awayTeamError}
                </p>
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
                onClick={() => handelAddAwayTeam()}
                disabled={parentState.addAwayTeamLoader}
                style={
                  parentState.addAwayTeamLoader ? { cursor: "not-allowed" } : {}
                }
              >
                Save{" "}
                {parentState.addAwayTeamLoader && (
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                    }}
                  />
                )}
              </button>
            </div>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddAwayTeamModal;
