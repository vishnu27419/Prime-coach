import React from "react";
import { Modal } from "react-bootstrap";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";

class ResetPasswordModal extends React.Component {
  render() {
    const { password, confirmPassword, passwordVisible } = this.props.value;
    return (
      <div>
        <Modal show={this.props.show} onHide={this.props.onHide} centered>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Reset User Password
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="row">
              <div className="col-md-12">
                <form>
                  <div className="col-md-12" style={{ position: "relative" }}>
                    <label
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        marginBottom: "5px",
                        marginTop: "8%",
                        fontWeight: "700",
                      }}
                    >
                      New Password
                    </label>
                    <input
                      className="form-control "
                      type={!this.props.passwordVisible ? "password" : "text"}
                      name="password"
                      value={password}
                      onChange={(e) => this.props.onChange(e)}
                    />
                    <p className="react_validation">
                      {this.props.passwordError}
                    </p>
                    {!this.props.passwordVisible ? (
                      <img
                        src={show}
                        alt="hide"
                        style={{
                          height: "20px",
                          position: "absolute",
                          top: "74px",
                          right: "29px",
                          cursor: "pointer",
                          opacity: "0.5",
                        }}
                        onClick={() => this.props.toggleShowPassword()}
                      />
                    ) : (
                      <img
                        src={hide}
                        alt="hide"
                        style={{
                          height: "20px",
                          position: "absolute",
                          top: "74px",
                          right: "29px",
                          cursor: "pointer",
                          opacity: "0.5",
                        }}
                        onClick={() => this.props.toggleShowPassword()}
                      />
                    )}
                  </div>
                  <div className="col-md-12" style={{ position: "relative" }}>
                    <label
                      style={{
                        display: "inline-block",
                        maxWidth: "100%",
                        marginBottom: "5px",
                        marginTop: "5%",
                        fontWeight: "700",
                      }}
                    >
                      Confirm New Password
                    </label>
                    <input
                      className="form-control "
                      // type="password"
                      type={
                        !this.props.passwordConfirmVisible ? "password" : "text"
                      }
                      name="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => this.props.onChange(e)}
                    />
                    <p className="react_validation">
                      {this.props.confirmPasswordError}
                    </p>

                    {!this.props.passwordConfirmVisible ? (
                      <img
                        src={show}
                        alt="hide"
                        style={{
                          height: "20px",
                          position: "absolute",
                          top: "59px",
                          right: "29px",
                          cursor: "pointer",
                          opacity: "0.5",
                        }}
                        onClick={() => this.props.toggleShowConfirmPassword()}
                      />
                    ) : (
                      <img
                        src={hide}
                        alt="hide"
                        style={{
                          height: "20px",
                          position: "absolute",
                          top: "59px",
                          right: "29px",
                          cursor: "pointer",
                          opacity: "0.5",
                        }}
                        onClick={() => this.props.toggleShowConfirmPassword()}
                      />
                    )}
                  </div>
                </form>
              </div>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn "
              data-dismiss="modal"
              onClick={this.props.admin_reset_password}
            >
              Save{" "}
              {this.props.confirmPasswordLoader && (
                <i
                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                  style={{
                    color: "#fff",
                    fontSize: "15px",
                  }}
                />
              )}
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default ResetPasswordModal;
