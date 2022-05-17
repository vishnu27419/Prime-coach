import React, { Component } from "react";
import "../Annual Training Plan/AnnualProgramInner.css";
import { Link, Redirect } from "react-router-dom";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
import { Modal } from "react-bootstrap";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AssignTeams from "../../component/AssignTeamsAndUsers/AssignTeams";

class AnnualProgramInner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAnnualTraningPlan: this.props.location.state,
      WorkoutLocation: [],
      date: new Date(`${this.props.location.state.start_date}`),
      endDate: new Date(`${this.props.location.state.end_date}`),
      hasSetDate: false,
      hasSetEndDate: false,
      location: "",
      name: `${this.props.location.state.name}`,
      nameError: "",
      startDateError: "",
      endDateError: "",
      workoutLocationError: "",
      show: false,
      deleteAnnualTranningPage: false,
      userAssignAnnualTestingProgram: [],
      assignTeamDetailArray: [],
      in_season: this.props.match.params.in_season,
      pre_season: this.props.match.params.pre_season,
      transition: this.props.match.params.transition,
      off_season: this.props.match.params.off_season,
      callUserItem: {},
      visiblePreAssignTeamUser: true,
      visibleUpdateAssignTeamUser: false,
      team_id: "",
      selectedTeam: "",
      locationSelectPicker: `${this.props.location.state.location}`,
      teamPlayerLoader: false,
    };
    this.onChange = this.onChange.bind(this);
  }

  showModal = async () => {
    await this.setState({ show: !this.state.show });
  };

  hideModal = async () => {
    await this.setState({ show: false });
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("onChange", this.state);
  }

  onHandelChange = async (e) => {
    await this.setState({ locationSelectPicker: e.target.value });

    // console.log("loacation-->", this.state.locationSelectPicker);
  };

  // showModal=async()=>

  componentDidMount() {
    this.fetch_pre_add_annual_training_program();
    this.pre_user_assign_annual_training_program();
  }

  fetch_pre_add_annual_training_program = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_annual_training_program",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          WorkoutLocation: res.data.data.WorkoutLocation.pickerArray,
        });
        // console.log(
        //   "This is res of pre_add_annual_training_program",
        //   res.data.data.WorkoutLocation
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  update_annual_training_program = async () => {
    const annual_training_program_id = this.state.listAnnualTraningPlan.id;

    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const startDate = start_date;

    const end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const endDate = end_date;

    const isValid = this.updateValidation();

    if (isValid) {
      try {
        const res = await standardPostApi(
          "update_annual_training_program",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: annual_training_program_id,
            name: this.state.name,
            start_date: startDate,
            end_date: endDate,
            location: this.state.locationSelectPicker,
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({ workoutLocationError: " " });
          // console.log("This is res of Update annual tranning", res.data.data);
          toast.success(res.data.message, { autoClose: false });
          this.props.history.push("/annualtrainingplan");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  updateValidation = () => {
    let nameError = "";
    let startDateError = "";
    let endDateError = "";
    let workoutLocationError = "";

    if (!this.state.name) {
      nameError = "This field is required";
    }

    if (!this.state.date) {
      startDateError = "This field is required";
    }

    if (!this.state.endDate) {
      endDateError = "This field is required";
    }

    if (!this.state.locationSelectPicker) {
      workoutLocationError = "Choose Location";
    }

    if (nameError || startDateError || endDateError || workoutLocationError) {
      this.setState({
        nameError,
        startDateError,
        endDateError,
        workoutLocationError,
      });
      return false;
    } else {
      return true;
    }
  };

  deleteAnnualTranningPlan = async () => {
    const annual_training_program_id = this.state.listAnnualTraningPlan.id;
    try {
      const res = await standardPostApi(
        "delete_annual_training_program",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
        },
        true
      );
      // console.log("This is res of delete annual plan", res.data.data);
      // alert(res.data.message);
      this.setState({ deleteAnnualTranningPage: true });
    } catch (error) {
      console.log(error);
    }
  };

  pre_user_assign_annual_training_program = async () => {
    const annual_training_program_id = this.state.listAnnualTraningPlan.id;
    try {
      const res = await standardPostApi(
        "pre_user_assign_annual_training_program",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: annual_training_program_id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "this is res of user assign testing program =>:",
        //   res.data.data.Teams.pickerArray
        // );
        const selectedPicker = res.data.data.Teams.pickerArray[0];

        this.setState({
          userAssignAnnualTestingProgram: res.data.data.Teams.pickerArray,
          selectedTeam: selectedPicker.id,
        });
        await this.pre_user_assign_annual_training_program_with_user_id(
          selectedPicker.id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  onHandel = async (e) => {
    // console.log("THIS IS VALUE--->", e.target.value);
    this.setState({ selectedTeam: e.target.value });

    this.pre_user_assign_annual_training_program_with_user_id(e.target.value);
  };

  pre_user_assign_annual_training_program_with_user_id = async (id) => {
    this.setState({ teamPlayerLoader: true });
    try {
      const res = await standardPostApi(
        "pre_user_assign_annual_training_program",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.listAnnualTraningPlan.id,
          team_id: id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("response--->", res.data.data);
        this.setState({
          assignTeamDetailArray: res.data.data.TeamPlayers,
          callUserItem: id,
        });
        // console.log("this is user Detail==>:", res.data.data.TeamPlayers);
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ teamPlayerLoader: false });
    }
  };

  user_assign_annual_training_program = async (userId) => {
    try {
      const res = await standardPostApi(
        "user_assign_annual_training_program",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: this.state.listAnnualTraningPlan.id,
          user_id: userId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "this is res of user assign Annual training program",
        //   res.data.data
        // );
        await this.pre_user_assign_annual_training_program_with_user_id(
          this.state.callUserItem
        );
        await this.setState({
          visiblePreAssignTeamUser: false,
          visibleUpdateAssignTeamUser: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date, hasSetDate: true });
    // console.log("The start date selected is ", this.state.date);
  };

  endDateChange = async (endDate) => {
    await this.setState({ endDate: endDate, hasSetEndDate: true });
    // console.log("The end  date .... is ", this.state.endDate);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  render() {
    if (this.state.deleteAnnualTranningPage) {
      return <Redirect to="/annualtrainingplan" />;
    }

    const annualPlan = this.state.listAnnualTraningPlan;

    const { location, name } = this.state;

    const assignTeam = this.state.userAssignAnnualTestingProgram;

    const in_season = this.state.in_season;
    const pre_season = this.state.pre_season;
    const transition = this.state.transition;
    const off_season = this.state.off_season;

    const annual_training_program_id = annualPlan.id;

    console.log("Parent", this.state.selectedTeam);

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection">
                <div className="d-lg-flex justify-content-between align-items-center">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/annualtrainingplan">Annual Programs</Link>
                    </li>
                    <li className="breadcrumb-item active" aria-current="page">
                      {/* Netball Home Phase 2 */}
                      {annualPlan.name}
                    </li>
                  </ol>

                  <button
                    className="delete_program_react"
                    onClick={() => {
                      this.showModal();
                    }}
                  >
                    Delete Program &nbsp;&nbsp;
                    <i className="fa fa-trash" aria-hidden="true"></i>
                  </button>
                </div>

                <div className="row mt-5">
                  <div className="col-lg-4 col-md-6">
                    <div className="">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control w-100"
                          name="name"
                          defaultValue={(name, annualPlan.name)}
                          onChange={(e) => this.onChange(e)}
                        />
                        <p className="react_validation">
                          {this.state.nameError}
                        </p>
                      </div>

                      <div className="form-group">
                        <DatePicker
                          selected={this.state.date}
                          onChange={this.handleDateChange}
                          name="DateOfBirth"
                          className="form-control"
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          ref={(ref) => (this.accordionContent = ref)}
                        />
                        <img
                          className="celender_img "
                          src={Calander}
                          alt={Calander}
                          onClick={() => this.accordionContent.onInputClick()}
                          style={{ cursor: "pointer" }}
                        />
                        <p className="react_validation ">
                          {this.state.startDateError}
                        </p>
                      </div>

                      <div className="form-group">
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={this.endDateChange}
                          name="endDate"
                          className="form-control"
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          ref={(ref) => (this.accordionEndContent = ref)}
                        />
                        <img
                          className="celender_img "
                          src={Calander}
                          alt={Calander}
                          onClick={() =>
                            this.accordionEndContent.onInputClick()
                          }
                          style={{ cursor: "pointer" }}
                        />
                        <p className="react_validation ">
                          {this.state.endDateError}
                        </p>
                      </div>

                      <div className="form-group">
                        {/* <select
                          name="location"
                          className="form-control w-100"
                          onChange={(e) => this.onChange(e)}
                          value={location}
                        >
                          <option value="">Select Location</option>

                          {this.state.WorkoutLocation &&
                            this.state.WorkoutLocation.map((item) => {
                              return (
                                <option value={item.value} key={item.id}>
                                  {item.label}
                                </option>
                              );
                            })}
                        </select> */}

                        <select
                          name="location"
                          className="form-control w-100"
                          onChange={this.onHandelChange}
                          value={(location, this.state.locationSelectPicker)}
                        >
                          <option value="">Select Location</option>

                          {this.state.WorkoutLocation &&
                            this.state.WorkoutLocation.map((item) => {
                              return (
                                <option value={item.value} key={item.id}>
                                  {item.label}
                                </option>
                              );
                            })}
                        </select>
                        <p className="react_validation">
                          {this.state.workoutLocationError}
                        </p>
                      </div>

                      <button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => this.update_annual_training_program()}
                      >
                        Update Program
                      </button>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6">
                    <div className="asign_team_right">
                      <ul className="list-inline season_btn">
                        <li>
                          <Link
                            to={{
                              pathname: `/annualinsession/${annual_training_program_id}/${in_season}`,
                              state: annualPlan,
                            }}
                          >
                            in season
                          </Link>
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: `/annualinsession/${annual_training_program_id}/${off_season}`,
                              state: annualPlan,
                            }}
                          >
                            off season
                          </Link>

                          {/* <Link to="/annualoffsession">off season</Link> */}
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: `/annualinsession/${annual_training_program_id}/${pre_season}`,
                              state: annualPlan,
                            }}
                          >
                            pre season
                          </Link>
                          {/* <a href="#">pre season</a> */}
                        </li>
                        <li>
                          <Link
                            to={{
                              pathname: `/annualinsession/${annual_training_program_id}/${transition}`,
                              state: annualPlan,
                            }}
                          >
                            transition
                          </Link>
                          {/* <a href="#">transition</a> */}
                        </li>
                      </ul>
                      <AssignTeams
                        assignTeam={assignTeam}
                        pre_user_assign_annual_training_program_with_user_id={(
                          item
                        ) =>
                          this.pre_user_assign_annual_training_program_with_user_id(
                            item
                          )
                        }
                        assignTeamUser={this.state.assignTeamDetailArray}
                        user_assign_annual_training_program={(userId) =>
                          this.user_assign_annual_training_program(userId)
                        }
                        visiblePreAssignTeamUser={
                          this.state.visiblePreAssignTeamUser
                        }
                        visibleUpdateAssignTeamUser={
                          this.state.visibleUpdateAssignTeamUser
                        }
                        team_id={this.state.team_id}
                        onHandel={(e) => this.onHandel(e)}
                        selectedTeam={this.state.selectedTeam}
                        teamPlayerLoader={this.state.teamPlayerLoader}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        <Modal show={this.state.show} onHide={this.hideModal} animation={true}>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete Program
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.hideModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="delete_modal_react">
              Are you sure you want to delete this program, this cannot be
              undone?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              onClick={() => {
                this.deleteAnnualTranningPlan();
              }}
            >
              OK
            </button>
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              onClick={() => {
                this.hideModal();
              }}
            >
              Cancel
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default AnnualProgramInner;
