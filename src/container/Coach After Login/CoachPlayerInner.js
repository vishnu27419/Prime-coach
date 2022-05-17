import React, { useState, Component } from "react";
import "../Coach After Login/CoachPlayerInner.css";
import { Link, Redirect } from "react-router-dom";
import maleIcon from "../../Custom/images/male-icon.png";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Modal, Form } from "react-bootstrap";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Calander from "../../Custom/images/celender.jpg";
import { toast } from "react-toastify";
// moment and timestamp in react js
import moment from "moment";
import CoachTranningSessionRepostModal from "../../component/SelfScreen/tranningSessionSpacificReport/CoachTranningSessionRepostModal";
import { connect } from "react-redux";
import EventIcon from "@material-ui/icons/Event";
import { IconButton } from "@material-ui/core";
import { errorToast } from "utils/toastMessage";
import ViewSpacificReportModal from "./modal/viewSpacificReportModal";

class CoachPlayerInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      playerId: this.props.match.params.playerId,
      deletePlayerPage: false,
      playerDetails: this.props.location.state.player,
      date: new Date(`${this.props.location.state.player.dob}`),
      sportPosition: [],
      playerFirstName: this.props.location.state.player.first_name,
      playerLastName: this.props.location.state.player.last_name,
      playerEmail: this.props.location.state.player.email,
      playerAddress: this.props.location.state.player.address,
      playerSportPosition: "",
      sportPositions: [],
      defaultSportPosition: "",
      CoachTranningModal: false,
      viewSpacificReportModal: false,
    };
  }

  deletePlayerFromTeam = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this team, this cannot be undone?"
      )
    ) {
      try {
        const res = await standardPostApi(
          "delete_player_from_team",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            player: this.state.playerId,
          },
          true
        );
        // console.log("This is a Res of delete player from Team", res);
        alert(res.data.message);
        this.setState({ deletePlayerPage: true });
      } catch (error) {
        console.log(error);
      }
    }
  };

  showModal = async (item) => {
    await this.setState({
      show: !this.state.show,
    });
  };

  hideModal = async (item) => {
    await this.setState({ show: false });
  };

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date });
    // console.log("The start date selected is ", this.state.date);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
    // console.log("THIS IS ONCHANGE", this.state);
  }

  componentDidMount() {
    this.playerSportPosition();
    this.pre_add_coach_player_in_team();
    // this.list_athlete_workout_Api();
  }

  playerSportPosition = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_coach_player_in_team",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("THIS IS RESPONSE OF SPORT POSITION", res.data.data);
        this.setState({
          sportPosition: res.data.data.SportPositions.pickerArray,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  update_user_profile = async () => {
    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    try {
      const res = await standardPostApi(
        "update_user_profile",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          first_name: this.state.playerFirstName,
          last_name: this.state.playerLastName,
          dob: start_date,
          address: this.state.playerAddress,
          access_user_id: this.props.match.params.playerId,
          access_sport_position: this.state.playerSportPosition,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("This is Reasponse of update_user_profile", res.data.data);
        toast.success(res.data.message, { autoClose: 2500 });
        await this.props.location.state;
        await this.hideModal();
        await this.setState({
          playerDetails: res.data.data,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  pre_add_coach_player_in_team = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_coach_player_in_team",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "THIS IS RESPONSE OF modal Select Picker",
        //   res.data.data.SportPositions.pickerArray
        // );

        res.data.data.SportPositions.pickerArray.forEach((item) => {
          if (item.label === this.props.location.state.player.sport_position) {
            this.setState({ defaultSportPosition: item.value });
          }
        });
        // console.log("THIS IS ==>", this.state.defaultSportPosition);

        await this.setState({
          sportPositions: res.data.data.SportPositions.pickerArray,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  CoachTranningSessionRepostToggle = async () => {
    await this.setState({ CoachTranningModal: !this.state.CoachTranningModal });
  };

  // training_session_specific_report = async () => {
  //   try {
  //     const res = await standardPostApi(
  //       "training_session_specific_report",
  //       undefined,
  //       {
  //         access_token: await localStorage.getItem("access_token"),
  //         annual_training_program_id: "",
  //         annual_training_program_week_id: "",
  //         annual_training_program_week_day_id: "",
  //         access_user_id: "",
  //       },
  //       true
  //     );
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  toggleViewSpacificReportModal = () => {
    this.setState({
      viewSpacificReportModal: !this.state.viewSpacificReportModal,
    });
  };

  render() {
    if (this.state.deletePlayerPage) {
      return (
        <Redirect
          to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
        />
      );
    }

    console.log("THIS IS atpDetails--->", this.props.atpDetails);

    // console.log(
    //   "this.props.match.params.teamname",
    //   this.props.match.params.teamname
    // );
    console.log(
      "This this.props.location.state0----->",
      this.props.location.state
    );

    const {
      playerFirstName,
      playerLastName,
      playerEmail,
      playerSportPosition,
      playerAddress,
    } = this.state;

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="remove_palyer d-flex justify-content-between align-items-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link
                            to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          >
                            {this.props.match.params.teamname}
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          {this.props.location.state.player.first_name}{" "}
                          {this.props.location.state.player.last_name}
                        </li>
                      </ol>
                      <div>
                        <Link
                          to={{
                            pathname: `/teamPlayerEvent/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                            state: this.props.location.state,
                          }}
                        >
                          <IconButton
                            style={{
                              border: "1px dashed #3F3F3F",
                              backgroundColor: "rgb(18 102 128)",
                              height: "50px",
                              width: "52px",
                              marginRight: "20px",
                            }}
                          >
                            <EventIcon style={{ color: "#000000" }} />
                          </IconButton>
                        </Link>

                        <button
                          className="Model_Btn_term_Delete_Team"
                          onClick={() => {
                            this.deletePlayerFromTeam();
                          }}
                        >
                          Remove Player <i className="fa fa-trash"></i>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4">
                    <figure
                      className="mb-0 player_img text-center"
                      style={{
                        display: "flex",
                        justifyContent: "space-evenly",
                        alignItems: "center",
                      }}
                    >
                      <img
                        src={maleIcon}
                        className="img-fluid"
                        alt={maleIcon}
                      />
                    </figure>
                  </div>
                  <div className="col-lg-4 col-md-4">
                    <ul className="list-inline player_info">
                      <li>
                        <Link
                          to={{
                            pathname: `/tranningplan/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                            state: this.props.location.state,
                          }}
                        >
                          Training Plan
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: `/programview/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                            state: this.props.location.state,
                          }}
                        >
                          Program View
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: `/testingresults/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                            state: this.props.location.state,
                          }}
                        >
                          Testing Result
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: `/playerreport/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                            state: this.props.location.state,
                          }}
                        >
                          Reports
                        </Link>
                      </li>
                      <li>
                        <button
                          href=""
                          className="Model_Btn_term_Edit_User_Details"
                          data-toggle="modal"
                          data-target="#userdetail"
                          onClick={(e) => {
                            this.showModal();
                          }}
                        >
                          Edit User Details
                        </button>
                      </li>
                      <li>
                        <span>
                          To view athlete's tranning session specific report,
                          <br />
                          click the button below.
                        </span>
                        <button
                          className="Model_Btn_term_Edit_User_Details"
                          onClick={() => this.toggleViewSpacificReportModal()}
                        >
                          View
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        {/* ReactJs Model For Edit User Details */}
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="userdetailTitle">
                Update User Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // onClick={handleClose}
                onClick={(e) => {
                  this.hideModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="playerFirstName"
                  defaultValue={
                    (playerFirstName, this.state.playerDetails.first_name)
                  }
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Surname</label>
                <input
                  type="text"
                  className="form-control"
                  name="playerLastName"
                  defaultValue={
                    (playerLastName, this.state.playerDetails.last_name)
                  }
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  name="playerEmail"
                  defaultValue={(playerEmail, this.state.playerDetails.email)}
                  onChange={(e) => this.onChange(e)}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <DatePicker
                  selected={this.state.date}
                  onChange={this.handleDateChange}
                  name="DateOfBirth"
                  className="form-control"
                  dateFormat="dd-MM-yyyy"
                  showMonthDropdown
                  showYearDropdown
                  dropdownMode="select"
                />
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  name="playerAddress"
                  defaultValue={
                    (playerAddress, this.state.playerDetails.address)
                  }
                  onChange={(e) => this.onChange(e)}
                />
              </div>
              <div className="form-group">
                <label>Sport Position</label>
                <select
                  className="form-control"
                  name="playerSportPosition"
                  defaultValue={
                    (playerSportPosition, this.state.defaultSportPosition)
                  }
                  selected
                  onChange={(e) => this.onChange(e)}
                >
                  <option value="">Select Sport Position</option>
                  {this.state.sportPositions &&
                    this.state.sportPositions.map((item) => {
                      return (
                        <option value={item.value} key={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                </select>
              </div>
              <button
                type="button"
                className="Model_btn"
                data-dismiss="modal"
                onClick={() => this.update_user_profile()}
              >
                Save
              </button>
            </div>
          </Modal.Body>
        </Modal>

        <CoachTranningSessionRepostModal
          show={this.state.CoachTranningModal}
          onHide={this.CoachTranningSessionRepostToggle}
        />

        <ViewSpacificReportModal
          show={this.state.viewSpacificReportModal}
          onHide={this.toggleViewSpacificReportModal}
          playerId={this.props.match.params.playerId}
        />
      </div>
    );
  }
}

export default CoachPlayerInner;
// const mapStateToProps = (state) => {
//   return {
//     atpDetails: state.athlete.weekDetail,
//   };
// };

// export default connect(mapStateToProps, null)(CoachPlayerInner);
