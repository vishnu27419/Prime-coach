import React from "react";
import { Modal } from "react-bootstrap";

class UserDeleteModal extends React.Component {
  render() {
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          animation={true}
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete User Account
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
            <div className="delete_modal_react">
              Are you sure you want to delete this user account? This cannot be
              undone!
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              onClick={this.props.onHide}
            >
              Cancel
            </button>

            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              style={{ padding: "5px 41px" }}
              onClick={this.props.admin_delete_user}
            >
              OK{" "}
              {this.props.deleteLoader && (
                <i
                  className="fa fa-spinner fa-spin fa-3x fa-fw"
                  style={{
                    color: "#337AB7",
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

export default UserDeleteModal;
