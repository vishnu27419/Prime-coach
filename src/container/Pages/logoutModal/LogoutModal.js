import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

class LogoutModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassToggle: false,
      newPassToggle: false,
      confirmPassToggle: false,
    };
  }

  render() {
    const { show, onHide, logoutLoader } = this.props;
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          // centered
          // size="sm"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="coachprofileTitle">
                Logout
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

            <p
              style={{
                // display: "flex",
                // justifyContent: "center",
                // alignItems: "center",
                marginTop: "34px",
                marginLeft: "17px",
              }}
            >
              Are you sure you want to logout !!
            </p>
          </Modal.Body>
          <ModalFooter>
            <button
              type="button"
              className=" Model_btn_Cancel"
              onClick={onHide}
              // style={{
              //   backgroundColor: "var(--appRed)",
              //   border: "1x solid var(--appRed)",
              //   color: "#fff",
              // }}
            >
              Cancel
            </button>

            <button
              type="button"
              className=" Model_btn_Cancel"
              // style={{
              //   backgroundColor: "var(--appYellow)",
              //   border: "1x solid var(--appYellow)",
              //   color: "#fff",
              // }}
              onClick={() => this.props.logoutApi()}
              style={
                logoutLoader
                  ? { padding: "5px 46px", cursor: "not-allowed" }
                  : { padding: "5px 46px" }
              }
              disabled={logoutLoader}
            >
              Ok {logoutLoader && <i className="fa fa-spinner fa-pulse" />}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default LogoutModal;
