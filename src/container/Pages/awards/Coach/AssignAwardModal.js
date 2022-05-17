import { Button } from "@material-ui/core";
import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import { Fragment } from "react";
import { data } from "jquery";

export class AssignAwardModal extends Component {
  render() {
    const {
      parentState,
      teamInfo,
      handlePlayerRadio,
      handelCoachRadio,
      handelAsssignAwards,
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
                Assign Award
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
              {parentState?.awardType === "team" ? (
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Assign Award To Team{" "}
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="assignTeamId"
                    value={parentState.assignTeamId}
                    onChange={() => handelCoachRadio()}
                  >
                    <FormControlLabel
                      value={parentState.assignTeamId}
                      control={<Radio />}
                      label={`${teamInfo}`}
                    />
                  </RadioGroup>
                </FormControl>
              ) : (
                <FormControl component="fieldset">
                  <FormLabel component="legend">
                    Assign Award To Player
                  </FormLabel>
                  <RadioGroup
                    aria-label="gender"
                    name="playerId"
                    value={parentState.AssignPlayerId}
                    onChange={(e) => handlePlayerRadio(e)}
                  >
                    {parentState?.athleteList?.map((item) => {
                      return (
                        <Fragment key={item.id}>
                          {item.players.map((data) => {
                            return (
                              <Fragment key={data.key}>
                                <FormControlLabel
                                  value={data.id?.toString()}
                                  control={<Radio />}
                                  label={`${data.first_name} ${data.last_name}`}
                                />
                              </Fragment>
                            );
                          })}
                        </Fragment>
                      );
                    })}
                  </RadioGroup>
                </FormControl>
              )}
            </div>
          </Modal.Body>

          <ModalFooter>
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: "#2F84CA", color: "#fff" }}
              onClick={handelAsssignAwards}
            >
              Assign
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AssignAwardModal;
