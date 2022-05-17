import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
// import Checkbox from "component/Checkbox/Checkbox";
import sportImg from "Custom/images/body-transformation-img.png";
import { faFileExcel } from "@fortawesome/free-solid-svg-icons";
import Checkbox from "../../smallChackBox/Checkbox/Checkbox";
import Image from "component/ImageComponent/Image";

class AssignTeamModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // confermatonMessage: false,
    };
  }

  // confirmModal = async () => {
  //   await this.setState({ confermatonMessage: !this.state.confermatonMessage });
  // };

  render() {
    const {
      show,
      onHide,
      coachInfo,
      teamList,
      assignCoachToTeam,
      toggleChackbox,
      loadingAssinCoachModal,
    } = this.props;

    return (
      <Modal
        show={show}
        onHide={onHide}
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // size="lg"
      >
        <Modal.Body>
          <div className="modal-header">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flex: "1",
              }}
            >
              <h5 className="modal-title" id="videopopupTitle">
                Assign team to {coachInfo.first_name} {coachInfo.last_name}
              </h5>
              <button type="button" className="close" onClick={onHide}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginLeft: "20px",
              marginTop: "10px",
              marginBottom: "5px",
              borderBottom: "1px solid #E0E0E0",
            }}
          >
            <p
              style={{
                flex: 1,
                marginBottom: "0px",
                paddingBottom: "10px",
                fontWeight: "400",
              }}
            >
              Team Name
            </p>
            <p style={{ marginBottom: "0px", fontWeight: "400" }}> Assign</p>
          </div>
          {/* {Array(5)
            .fill("")
            .map((x) => ( */}

          {loadingAssinCoachModal ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <i
                className="fa fa-spinner fa-spin fa-3x fa-fw"
                // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                style={{
                  color: "var(--appBlue2)",
                  fontSize: "40px",
                  marginTop: "50px",
                }}
              />
            </div>
          ) : (
            <>
              {teamList &&
                teamList.length !== 0 &&
                teamList.map((item, index) => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginLeft: "20px",
                        //   paddingBottom: "1px",
                        paddingTop: "3px",
                        borderBottom: "1px solid #E0E0E0",
                      }}
                      key={item.id}
                    >
                      <div
                        style={{
                          flex: 1,
                          display: "flex",
                          marginBottom: "5px",
                        }}
                      >
                        {/* <img
                      src={sportImg}
                      alt="No_Img_Avalable"
                      style={{ width: "55px", height: "55px" }}
                    /> */}
                        <Image
                          image={item.sport_image}
                          className="assign-coach-img "
                        />
                        <div
                          style={{
                            alignItems: "center",
                            paddingLeft: "10px",
                            display: "flex",
                          }}
                        >
                          {item.team_name}
                        </div>
                      </div>
                      <div
                        style={{
                          alignItems: "center",

                          display: "flex",
                        }}
                      >
                        <Checkbox
                          checked={item.is_checked}
                          toggleCb={() => toggleChackbox(item, index)}
                        />
                      </div>
                    </div>
                  );
                })}
            </>
          )}
          {/* ))} */}

          <button
            type="button"
            className="Model_btn pull-right"
            style={{ marginTop: "32px" }}
            onClick={() => assignCoachToTeam()}
          >
            Save
          </button>
        </Modal.Body>
      </Modal>
    );
  }
}
export default AssignTeamModal;
