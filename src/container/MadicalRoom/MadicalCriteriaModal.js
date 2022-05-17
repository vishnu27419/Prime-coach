import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Checkbox from "component/Checkbox/Checkbox";
import { Tooltip } from "@material-ui/core";
import { Fragment } from "react";

export class MadicalCriteriaModal extends Component {
  render() {
    const {
      show,
      onHide,
      onChange,
      parentState,
      // toggleCb,
      toggleTypeButton,
      addNewCriteria,
      handelCreateMadicalStatus,
      deleteEvent,
    } = this.props;
    return (
      <div>
        <Modal show={show} onHide={onHide} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                Create Medical Criteria
              </h5>
              <Tooltip arrow title="Close">
                <button type="button" className="close" onClick={onHide}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tooltip>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="criteriaHeadName"
                  value={parentState.criteriaHeadName}
                  onChange={(e) => onChange(e)}
                />
                {/* <p className="react_validation">{state.protocolNameError}</p> */}
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ borderTop: "none" }}>
                        Name of the criteria
                      </th>
                      {/* <th style={{ borderTop: "none" }}>Type</th> */}
                      {/* <th
                        style={{
                          borderTop: "none",
                        }}
                      >
                        Comment
                      </th> */}
                      <th style={{ borderTop: "none" }}></th>
                      {/* <th style={{ borderTop: "none" }}></th> */}
                    </tr>
                  </thead>

                  <tbody>
                    <tr style={{ borderBottom: "1px solid #dee2e6" }}>
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder=""
                          name="criteriaName"
                          value={parentState.criteriaName}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {parentState.criteriaNameError}
                        </p>
                      </td>
                      {/* 
                      <td>
                        {parentState.visibleTypeBtn === false ? (
                          <button
                            style={{
                              padding: "4px 10px",
                              background: "#C82332",
                              color: "#fff",
                              border: "1px solid #000",
                              fontWeight: "bold",
                              boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => toggleTypeButton("in")}
                          >
                            out
                          </button>
                        ) : (
                          <button
                            style={{
                              padding: "4px 16px",
                              background: "#5CB85C",
                              color: "#fff",
                              border: "1px solid #000",
                              fontWeight: "bold",
                              boxShadow:
                                "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                              borderRadius: "5px",
                              cursor: "pointer",
                            }}
                            onClick={() => toggleTypeButton("out")}
                          >
                            In
                          </button>
                        )}
                      </td> */}

                      {/* <td colSpan="2">
                        <div className="form-inline">
                          <div>
                            <Checkbox
                              style={{ marginLeft: "5px" }}
                              checked={parentState.comments}
                              toggleCb={() => toggleCb()}
                            />
                          </div>
                        </div>
                      </td> */}

                      <td>
                        <div className="custom-control custom-checkbox">
                          <div>
                            <Tooltip arrow title="Add new criteria">
                              <button
                                type="button"
                                className="btn btn-danger add_Check_Button"
                                onClick={() => addNewCriteria()}
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    </tr>

                    {/* this is for input list start */}
                    {parentState.inputList.length !== 0 &&
                      parentState.inputList.map((item, index) => {
                        return (
                          <Fragment key={index}>
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
                                  defaultValue={item?.name}
                                  readOnly
                                />
                              </td>

                              {/* <td>
                                {item?.type === "out" ? (
                                  <button
                                    style={{
                                      padding: "4px 10px",
                                      background: "#C82332",
                                      color: "#fff",
                                      border: "1px solid #000",
                                      fontWeight: "bold",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                                      borderRadius: "5px",
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    out
                                  </button>
                                ) : (
                                  <button
                                    style={{
                                      padding: "4px 16px",
                                      background: "#5CB85C",
                                      color: "#fff",
                                      border: "1px solid #000",
                                      fontWeight: "bold",
                                      boxShadow:
                                        "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                                      borderRadius: "5px",
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    In
                                  </button>
                                )}
                              </td> */}

                              {/* <td colSpan="2" style={{ borderTop: "none" }}>
                                <div className="form-inline">
                                  <div>
                                    <Checkbox
                                      style={{
                                        marginLeft: "5px",
                                        cursor: "not-allowed",
                                      }}
                                      checked={item.comment_allowed}
                                      readOnly
                                    />
                                  </div>
                                </div>
                              </td> */}

                              <td style={{ borderTop: "none" }}>
                                <div className="custom-control custom-checkbox">
                                  <div>
                                    <Tooltip arrow title="Delete criteria">
                                      <button
                                        type="button"
                                        className="btn btn-danger "
                                        onClick={() => deleteEvent(index)}
                                      >
                                        <i className="fa fa-trash"></i>
                                      </button>
                                    </Tooltip>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </Fragment>
                        );
                      })}

                    {/* this is input list ends */}
                  </tbody>
                </table>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <Tooltip arrow title="Save medical criteria">
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => handelCreateMadicalStatus()}
                disabled={parentState.crateCriteriaLoader}
                style={
                  parentState.crateCriteriaLoader
                    ? { cursor: "not-allowed" }
                    : { cursor: "pointer" }
                }
              >
                Save{" "}
                {parentState.crateCriteriaLoader && (
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    style={{
                      color: "#fff",
                      fontSize: "15px",
                    }}
                  />
                )}
              </button>
            </Tooltip>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default MadicalCriteriaModal;
