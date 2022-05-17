import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";

export class AddResultSetModal extends Component {
  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };

  render() {
    const {
      show,
      onHide,
      homeTeamObj,
      awayTeamObj,
      parentState,
      onChange,
      handelCrateStatisticResult,
      onSelectChange,
    } = this.props;

    // console.log("playerList", parentState.playerList);
    return (
      <div>
        <Modal
          show={show}
          onHide={() => onHide()}
          aria-labelledby="contained-modal-title-vcenter"
          centered
          size="lg"
          //   contentClassName="videoModal"
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Create Criteria Value For Home And Away Team
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
              {/* <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  {homeTeamObj?.team_name} Value
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="homeTeamValue"
                  value={parentState.homeTeamValue}
                  onChange={(e) => onChange(e)}
                  onKeyPress={this.isInputNumber}
                />
                <p className="react_validation" style={{ fontWeight: "bold" }}>
                  {parentState.homeTeamPlayerValueError}
                </p>
              </div> */}

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Player Name{" "}
                  {homeTeamObj?.team_name && `(${homeTeamObj?.team_name})`}
                </label>
                <select
                  className="form-control"
                  name="playerPicker"
                  value={parentState?.playerPicker}
                  onChange={(e) => onSelectChange(e)}
                >
                  {/* <option value="">Select Player</option> */}
                  {parentState?.playerList.map((item) => {
                    return (
                      <option value={item.user_id} key={item.id}>
                        {item?.user_first_name} {item?.user_last_name}
                      </option>
                    );
                  })}
                </select>
                {/* <p className="react_validation" style={{ fontWeight: "bold" }}>
                  {parentState.playerPickerError}
                </p> */}
              </div>

              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  Player Value
                </label>

                <input
                  type="text"
                  className="form-control"
                  name="playerResultValue"
                  value={
                    parentState?.playerResultValue === undefined
                      ? 0
                      : parentState?.playerResultValue
                  }
                  onChange={(e) => onChange(e)}
                  onKeyPress={this.isInputNumber}
                  maxLength={4}
                />
                {/* <p className="react_validation" style={{ fontWeight: "bold" }}>
                  {parentState.homeTeamPlayerValueError}
                </p> */}
              </div>
              <div className="form-group">
                <label htmlFor="" style={{ fontWeight: "bold" }}>
                  {awayTeamObj?.name} Value
                </label>
                <input
                  type="text"
                  className="form-control"
                  name="awayTeamValue"
                  value={parentState.awayTeamValue}
                  onChange={(e) => onChange(e)}
                  maxLength={4}
                  onKeyPress={this.isInputNumber}
                />
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
                onClick={handelCrateStatisticResult}
                disabled={parentState.crateStatisticResultLoader}
                style={
                  parentState.crateStatisticResultLoader
                    ? { cursor: "not-allowed" }
                    : {}
                }
              >
                Save{" "}
                {parentState.crateStatisticResultLoader && (
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

export default AddResultSetModal;
