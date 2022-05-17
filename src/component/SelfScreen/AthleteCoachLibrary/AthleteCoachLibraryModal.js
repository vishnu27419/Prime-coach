import { Tooltip } from "@material-ui/core";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

export class AthleteCoachLibraryModal extends Component {
  render() {
    const { show, onHide, detailObj } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                View Coach Library
              </h5>
              <Tooltip arrow title="close">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                  onClick={onHide}
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tooltip>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Activity Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={detailObj?.activity_name}
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div>

              {/* <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Team Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  defaultValue={currentTeamName}
                  readOnly
                  style={{ cursor: "not-allowed" }}
                />
              </div> */}

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Description
                </label>
                <textarea
                  cols="4"
                  rows="4"
                  className="form-control"
                  style={{ resize: "none", cursor: "not-allowed" }}
                  defaultValue={detailObj?.description}
                  readOnly
                />
              </div>
              {detailObj?.youtube_link && (
                <div>
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Video
                  </label>
                  <iframe
                    width="100%"
                    height="315"
                    src={detailObj?.youtube_link}
                    title=" video"
                    frameborder="0"
                    //   allow="autoplay; encrypted-media"
                    allowFullScreen
                  ></iframe>
                </div>
              )}

              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ borderTop: "none" }}>Tips</th>
                    </tr>
                  </thead>

                  <tbody>
                    {detailObj?.tips?.length !== 0 &&
                      detailObj?.tips?.map((item) => {
                        return (
                          <tr>
                            <td
                              style={{
                                borderTop: "none",
                                cursor: "not-allowed",
                              }}
                            >
                              <input
                                type="text"
                                className="form-control"
                                placeholder=""
                                readOnly
                                defaultValue={item?.tip}
                                style={{ cursor: "not-allowed" }}
                              />
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter style={{ display: "flex", justifyContent: "center" }}>
            <Tooltip arrow title="close">
              <button type="button" className="Model_btn " onClick={onHide}>
                Close
              </button>
            </Tooltip>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AthleteCoachLibraryModal;
