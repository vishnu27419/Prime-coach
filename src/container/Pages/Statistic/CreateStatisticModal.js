import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Checkbox from "component/Checkbox/Checkbox";
import { Tooltip } from "@material-ui/core";
import { Fragment } from "react";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import AddAwayTeamModal from "./addAwayTeamModal";

export class CreateStatisticModal extends Component {
  render() {
    const {
      show,
      onHide,
      onChange,
      parentState,
      homeTeamName,
      addNewStatistic,
      deleteEvent,
      handelCreateStatistics,
      toggleAwayTeamAddModal,
      handelAddAwayTeam,
    } = this.props;

    return (
      <div>
        <Modal show={show} onHide={() => false} centered size="lg">
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="protocol">
                Create Statistic
              </h5>
              <Tooltip arrow title="Close">
                <button
                  type="button"
                  className="close"
                  onClick={onHide}
                  disabled={parentState.disableCloaseButton}
                  style={
                    parentState.disableCloaseButton
                      ? { cursor: "not-allowed" }
                      : {}
                  }
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </Tooltip>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Name Of Statistic
                </label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Name"
                  name="statisticName"
                  value={parentState.statisticName}
                  onChange={(e) => onChange(e)}
                />
                {/* <p className="react_validation">{state.protocolNameError}</p> */}
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between ",
                  alignItems: "center",
                }}
              >
                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Home Team
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Team Name"
                    defaultValue={homeTeamName}
                    style={{ cursor: "not-allowed" }}
                    readOnly
                  />
                  {/* <p className="react_validation">{state.protocolNameError}</p> */}
                </div>
                <div className="form-group">
                  <label htmlFor="" style={{ fontWeight: "bold" }}>
                    Away Team
                  </label>
                  {/* <input
                    type="text"
                    className="form-control"
                    placeholder="Team Name"
                    name="awayTeam"
                    value={parentState.awayTeam}
                    onChange={(e) => onChange(e)}
                  /> */}
                  <select
                    className="form-control"
                    style={{ width: "200px" }}
                    name="awayTeam"
                    value={parentState.awayTeam}
                    onChange={(e) => onChange(e)}
                  >
                    <option value="">Select Away Team</option>
                    {parentState.awayTeamList.map((item) => {
                      return (
                        <option value={item?.id} key={item?.id}>
                          {item?.name}
                        </option>
                      );
                    })}
                  </select>
                  {/* <p className="react_validation">{state.protocolNameError}</p> */}
                </div>
                <div className="form-group" style={{ marginBottom: "0px" }}>
                  <div>
                    <Tooltip arrow title="Add away team ">
                      <button
                        type="button"
                        className="btn btn-danger"
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          marginTop: "15px",
                          background: "#5CB85C",
                          borderColor: "#5CB85C",
                        }}
                        onClick={() => toggleAwayTeamAddModal()}
                      >
                        <AddCircleOutlineIcon />
                      </button>
                    </Tooltip>
                  </div>
                </div>
              </div>
              <div className="table-responsive">
                <table className="table">
                  <thead>
                    <tr>
                      <th style={{ borderTop: "none" }}>Criteria</th>

                      {/* <th style={{ borderTop: "none" }}></th> */}
                      <th style={{ borderTop: "none" }}></th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr
                      style={
                        parentState?.inputList.length
                          ? {
                              borderBottom: "3px solid #338AB7",
                            }
                          : {}
                      }
                    >
                      <td>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Criteria Name"
                          style={{ width: "100%" }}
                          name="criteria"
                          value={parentState.criteria}
                          onChange={(e) => onChange(e)}
                        />
                        <p className="react_validation">
                          {parentState.criteriaError}
                        </p>
                      </td>

                      <td>
                        <div className="custom-control custom-checkbox">
                          <div>
                            <Tooltip arrow title="Add new Criteria">
                              <button
                                type="button"
                                className="btn btn-danger add_Check_Button"
                                onClick={() => addNewStatistic()}
                              >
                                <i className="fa fa-check"></i>
                              </button>
                            </Tooltip>
                          </div>
                        </div>
                      </td>
                    </tr>
                    {/* this is for input list start */}
                    {parentState?.inputList.map((item, index) => {
                      return (
                        <Fragment key={item.id}>
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
                                defaultValue={item.name}
                                readOnly
                              />
                            </td>

                            <td style={{ borderTop: "none" }}>
                              <div className="custom-control custom-checkbox">
                                <div>
                                  <Tooltip arrow title="Delete test">
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
            <Tooltip arrow title="Save Statistic">
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => handelCreateStatistics()}
                disabled={parentState.createLoader}
                style={
                  parentState.createLoader ? { cursor: "not-allowed" } : {}
                }
              >
                Save{" "}
                {parentState.createLoader && (
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

        <AddAwayTeamModal
          onHide={toggleAwayTeamAddModal}
          show={parentState.awayTeamAddModal}
          onChange={onChange}
          parentState={parentState}
          handelAddAwayTeam={handelAddAwayTeam}
        />
      </div>
    );
  }
}

export default CreateStatisticModal;
