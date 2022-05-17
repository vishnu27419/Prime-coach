import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import hide from "../../Custom/images/hide.png";
import showimg from "../../Custom/images/show.png";

class ChangePasswordModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      oldPassToggle: false,
      newPassToggle: false,
      confirmPassToggle: false,
    };
  }

  toggleOldPassword = async () => {
    await this.setState({ oldPassToggle: !this.state.oldPassToggle });
  };

  toggleNewPassword = async () => {
    await this.setState({ newPassToggle: !this.state.newPassToggle });
  };

  toggleConfirmPassword = async () => {
    await this.setState({ confirmPassToggle: !this.state.confirmPassToggle });
  };

  render() {
    const { show, onHide, state, onChange, changePassword } = this.props;
    const { oldPassToggle, newPassToggle, confirmPassToggle } = this.state;
    return (
      <div>
        <Modal
          show={show}
          onHide={onHide}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="coachprofileTitle">
                Change Password
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
              <div className="form-group" style={{ position: "relative" }}>
                <label>Old Password</label>
                <input
                  maxLength={32}
                  type={oldPassToggle === false ? "password" : "text"}
                  className="form-control"
                  name="oldPassword"
                  value={state.oldPassword}
                  onChange={(e) => onChange(e)}
                />

                {oldPassToggle === false ? (
                  <img
                    src={showimg}
                    alt="show"
                    style={{
                      height: "20px",
                      position: "absolute",
                      top: "41px",
                      right: "13px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    onClick={() => this.toggleOldPassword()}
                  />
                ) : (
                  <img
                    src={hide}
                    alt="hide"
                    style={{
                      height: "20px",
                      position: "absolute",
                      top: "41px",
                      right: "13px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    onClick={() => this.toggleOldPassword()}
                  />
                )}
                <p className="react_validation">{state.oldPasswordError}</p>
              </div>
              <div className="form-group" style={{ position: "relative" }}>
                <label>New Password</label>
                <input
                  maxLength={32}
                  type={newPassToggle === false ? "password" : "text"}
                  className="form-control"
                  name="newPassword"
                  value={state.newPassword}
                  onChange={(e) => onChange(e)}
                />
                {newPassToggle === false ? (
                  <img
                    src={showimg}
                    alt="show"
                    style={{
                      height: "20px",
                      position: "absolute",
                      top: "41px",
                      right: "13px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    onClick={() => this.toggleNewPassword()}
                  />
                ) : (
                  <img
                    src={hide}
                    alt="hide"
                    style={{
                      height: "20px",
                      position: "absolute",
                      top: "41px",
                      right: "13px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    onClick={() => this.toggleNewPassword()}
                  />
                )}
                <p className="react_validation">{state.newPasswordError}</p>
              </div>
              <div className="form-group" style={{ position: "relative" }}>
                <label>Confirm New Password</label>
                <input
                  maxLength={32}
                  type={confirmPassToggle === false ? "password" : "text"}
                  className="form-control"
                  name="confirmPassword"
                  value={state.confirmPassword}
                  onChange={(e) => onChange(e)}
                />

                {confirmPassToggle === false ? (
                  <img
                    src={showimg}
                    alt="show"
                    style={{
                      height: "20px",
                      position: "absolute",
                      top: "41px",
                      right: "13px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    onClick={() => this.toggleConfirmPassword()}
                  />
                ) : (
                  <img
                    src={hide}
                    alt="hide"
                    style={{
                      height: "20px",
                      position: "absolute",
                      top: "41px",
                      right: "13px",
                      cursor: "pointer",
                      opacity: "0.5",
                    }}
                    onClick={() => this.toggleConfirmPassword()}
                  />
                )}
                <p className="react_validation">{state.confirmPasswordError}</p>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <button
              type="button"
              className="Model_btn"
              data-dismiss="modal"
              onClick={() => changePassword()}
              style={{ float: "right" }}
            >
              {state.changePasswordLoader ? (
                <i
                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                  style={{
                    color: "var(--defaultWhite)",
                    fontSize: "15px",
                  }}
                />
              ) : (
                "Save"
              )}
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ChangePasswordModal;
