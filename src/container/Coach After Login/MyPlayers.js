import React, { Component } from "react";
import "../Coach After Login/MyPlayers.css";
import { Link, Redirect } from "react-router-dom";
import maleIcon from "../../Custom/images/male-icon.png";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Modal, Form, Alert } from "react-bootstrap";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
import { toast } from "react-toastify";
import LoaderWrapper from "../Loader/LoaderWrapper";
import show from "../../Custom/images/show.png";
import hide from "../../Custom/images/hide.png";
import noTeamAssign from "Custom/images/noTeamAvalable.png";
import NoDataFound from "component/lottiLoader/LottiLoader";
import { LinearProgress } from "@material-ui/core";
import AnimationsLoading from "utils/Skeleton";
import MyPlayerSkeleton from "skeletons/myPlayerSkeleton";
import MyPlayerSquarSkeleton from "skeletons/MyPlayerSquar";
import { errorToast } from "utils/toastMessage";
// import AnimationsLoading from "utils/Skeleton";

class MyPlayers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      CratedByMe: false,
      showTeamLoader: false,
      show: false,
      addCoach: false,
      date: null,
      hasSetDate: false,
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      surname: "",
      SportPosition: "",
      teamId: this.props.match.params.id,
      preSportPosition: [],
      emailError: "",
      emailRequiredError: "",
      passwordError: "",
      passwordRequiredError: "",
      confirmPasswordError: "",
      firstNameError: "",
      surnameError: "",
      dateOfBirthError: "",
      ageLimitError: "",
      SportPositionError: "",
      coachEmail: "",
      coachPassword: "",
      coachConfirmPassword: "",
      coachFirstName: "",
      coachSurname: "",
      coachSpecialisation: "",
      coachRole: "",
      preCoachSpecialisation: [],
      coachEmailError: "",
      CoachEmailRequiredError: "",
      coachPasswordError: "",
      coachPasswordRequiredError: "",
      coachConfirmPasswordError: "",
      coachFirstNameError: "",
      coachSurnameError: "",
      coachDateOfBirthError: "",
      coachAgeLimitError: "",
      coachSpecialisationError: "",
      coachRoleError: "",
      listTeamPlayer: [],
      deleteTeamPage: false,
      deleteTeamModal: false,
      addCoachData: {},
      visibleUpdatePlayerData: false,
      loading: true,
      playerPasswordToggle: false,
      playerConfirmPasswordToggle: false,
      coachPasswordToggle: false,
      coachConfirmPasswordToggle: false,
    };
  }

  // refreshPage = async () => {
  //   await window.location.reload(false);
  // };

  onHandle(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("this is update state", this.state);
  }

  addPlayerInTeam = async () => {
    const DOB = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const dateOfBirth = DOB;

    // console.log("THIS IS SPORT POSTION ISSUE -->", this.state.SportPosition);

    const isValid = this.validation();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "add_coach_player_in_team",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            first_name: this.state.firstName,
            last_name: this.state.surname,
            email: this.state.email,
            password: this.state.password,
            dob: dateOfBirth,
            team: this.state.teamId,
            sport_position: this.state.SportPosition,
            role: "2",
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({
            addCoachData: res.data.data,
            visibleUpdatePlayerData: true,
          });
          await this.fetchListTeamPlayer();
          await this.hideModal();
          // toast.success(res.data.message);
          toast.success("Player successfully Created!");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  onHandleCoach(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("this is update state", this.state);
  }

  addCoachInTeam = async () => {
    const DOB = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();
    const dateOfBirth = DOB;

    const isValid = this.addCoachValidation();

    if (isValid) {
      try {
        const res = await standardPostApi(
          "add_coach_player_in_team",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            first_name: this.state.coachFirstName,
            last_name: this.state.coachSurname,
            email: this.state.coachEmail,
            password: this.state.coachPassword,
            dob: dateOfBirth,
            specialization: this.state.coachSpecialisation,
            team: this.state.teamId,
            role: this.state.coachRole,
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("This is res of Register Coach", res.data.data);
          await this.fetchListTeamPlayer();
          await this.hideCoachModal();
          // toast.success(res.data.message);
          const message =
            this.state.coachRole === "3"
              ? "Coach successfully Created!"
              : this.state.coachRole === "5"
              ? "Assistent Coach Created Sucessfully"
              : this.state.coachRole === "4"
              ? "S&C Coach Created Sucessfully"
              : "";

          toast.success(message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  deleteTeamWithModal = async () => {
    try {
      const res = await standardPostApi(
        "delete_team",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.state.teamId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("This is response of delete Team ", res);
        toast.success(res.data.message);
        // alert(res.data.message);
        this.setState({ deleteTeamPage: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  validation = () => {
    let emailError = "";
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let emailRequiredError = "";
    let passwordError = "";
    let passReg =
      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/;
    let confirmPasswordError = "";
    let firstNameError = "";
    let surnameError = "";
    let dateOfBirthError = "";
    let ageLimitError = "";
    const dob = new Date(this.state.date);
    const today = new Date();
    let SportPositionError = "";
    let passwordRequiredError = "";

    if (!this.state.email) {
      emailRequiredError = "The Email field is required.";
    } else if (!this.state.email.match(emailReg)) {
      emailError = "The Email field is not a valid e-mail address.";
    }

    if (!this.state.password) {
      passwordRequiredError = "The Password field is required.";
    } else if (!this.state.password.match(passReg)) {
      passwordError =
        "Password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }

    if (!this.state.confirmPassword.match(this.state.password)) {
      confirmPasswordError =
        "The password and confirmation password do not match.";
    }
    if (!this.state.firstName) {
      firstNameError = "The First Name field is required.";
    }
    if (!this.state.surname) {
      surnameError = "The Surname field is required.";
    }

    if (!this.state.hasSetDate) {
      dateOfBirthError = "Please select a Date of Birth.";
    } else if (today.getFullYear() - dob.getFullYear() < 16) {
      ageLimitError = "You must be at least 16 year old, in order to sign up.";
    }

    // if (!this.state.SportPosition) {
    //   SportPositionError = "Choose Sport Position Field";
    // }

    if (
      emailError ||
      emailRequiredError ||
      passwordError ||
      passwordRequiredError ||
      confirmPasswordError ||
      firstNameError ||
      surnameError ||
      dateOfBirthError ||
      ageLimitError
      // SportPositionError
    ) {
      this.setState({
        emailError,
        emailRequiredError,
        passwordError,
        passwordRequiredError,
        confirmPasswordError,
        firstNameError,
        surnameError,
        dateOfBirthError,
        ageLimitError,
        // SportPositionError,
      });
      return false;
    } else {
      return true;
    }
  };

  addCoachValidation = () => {
    let coachEmailError = "";
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let CoachEmailRequiredError = "";
    let coachPasswordError = "";
    let passReg =
      /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&!^*]).*$/;
    let coachPasswordRequiredError = "";
    let coachConfirmPasswordError = "";
    let coachFirstNameError = "";
    let coachSurnameError = "";
    let coachDateOfBirthError = "";
    let coachAgeLimitError = "";
    const dob = new Date(this.state.date);
    const today = new Date();
    let coachSpecialisationError = "";
    let coachRoleError = "";

    if (!this.state.coachEmail) {
      coachEmailError = "The Email field is required.";
    } else if (!this.state.coachEmail.match(emailReg)) {
      CoachEmailRequiredError =
        "The Email field is not a valid e-mail address.";
    }

    if (!this.state.coachPassword) {
      coachPasswordError = "The Password field is required.";
    } else if (!this.state.coachPassword.match(passReg)) {
      coachPasswordRequiredError =
        "Password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }

    if (!this.state.coachConfirmPassword.match(this.state.coachPassword)) {
      coachConfirmPasswordError =
        "The password and confirmation password do not match.";
    }

    if (!this.state.coachFirstName) {
      coachFirstNameError = "The First Name field is required.";
    }

    if (!this.state.coachSurname) {
      coachSurnameError = "The Surname field is required.";
    }

    if (!this.state.hasSetDate) {
      coachDateOfBirthError = "Please select a Date of Birth.";
    } else if (today.getFullYear() - dob.getFullYear() < 16) {
      coachAgeLimitError =
        "You must be at least 16 year old, in order to sign up.";
    }

    if (!this.state.coachSpecialisation) {
      coachSpecialisationError = "Choose Coach Specialisation Field";
    }

    if (!this.state.coachRole) {
      coachRoleError = "Choose Role Field";
    }

    if (
      coachEmailError ||
      CoachEmailRequiredError ||
      coachPasswordError ||
      coachPasswordRequiredError ||
      coachConfirmPasswordError ||
      coachFirstNameError ||
      coachSurnameError ||
      coachDateOfBirthError ||
      coachAgeLimitError ||
      coachSpecialisationError ||
      coachRoleError
    ) {
      this.setState({
        coachEmailError,
        CoachEmailRequiredError,
        coachPasswordError,
        coachPasswordRequiredError,
        coachConfirmPasswordError,
        coachFirstNameError,
        coachSurnameError,
        coachDateOfBirthError,
        coachAgeLimitError,
        coachSpecialisationError,
        coachRoleError,
      });
      return false;
    } else {
      return true;
    }
  };

  componentDidMount() {
    this.fetchShowAllTeams();
    this.fetchPlayerSportPosition();
    this.fetchPreCoachPlayerInTeamSpecialisation();
    this.fetchListTeamPlayer();
  }

  fetchPlayerSportPosition = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_coach_player_in_team",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.state.teamId,
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          preSportPosition: res.data.data.SportPositions.pickerArray,
        });
        // console.log(
        //   "This is res of Player Sport Position =>",
        //   res.data.data.SportPositions.pickerArray
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchPreCoachPlayerInTeamSpecialisation = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_coach_player_in_team",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.state.teamId,
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          preCoachSpecialisation: res.data.data.CoachSpecialization.pickerArray,
        });
        // console.log(
        //   "This is res of  Coach Specialisation ",
        //   res.data.data.CoachSpecialization.pickerArray
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchListTeamPlayer = async () => {
    try {
      const res = await standardPostApi(
        "list_team_players",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.state.teamId,
        },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          listTeamPlayer: res.data.data.Athelete,
          loading: false,
        });
        console.log("This is res of List Team Player =>", res.data.data);
        // console.log("listTeamPlayer in Function", this.state.listTeamPlayer);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date, hasSetDate: true });
    // console.log("The date selected is ", this.state.date);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  showModal = async (item) => {
    await this.setState({
      show: !this.state.show,
    });
  };

  hideModal = async (item) => {
    await this.setState({ show: false });
  };

  ShowCoachModal = async (item) => {
    await this.setState({
      addCoach: !this.state.addCoach,
    });
  };

  hideCoachModal = async (item) => {
    await this.setState({ addCoach: false });
  };

  showDeleteTeamModal = async () => {
    await this.setState({ deleteTeamModal: !this.state.deleteTeamModal });
  };

  hideDeleteTeamModal = async () => {
    await this.setState({ deleteTeamModal: false });
  };

  togglePassword = async () => {
    await this.setState({
      playerPasswordToggle: !this.state.playerPasswordToggle,
    });
  };

  togglePlayerConfirmPass = async () => {
    await this.setState({
      playerConfirmPasswordToggle: !this.state.playerConfirmPasswordToggle,
    });
  };

  toggleCoachPass = async () => {
    const { coachPasswordToggle } = this.state;
    await this.setState({ coachPasswordToggle: !coachPasswordToggle });
  };

  toggleCoachConfirmPass = async () => {
    const { coachConfirmPasswordToggle } = this.state;
    await this.setState({
      coachConfirmPasswordToggle: !coachConfirmPasswordToggle,
    });
  };

  fetchShowAllTeams = async () => {
    this.setState({ showTeamLoader: true });
    try {
      const res = await standardPostApi(
        "show_all_teams",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        console.log("This is res of Show All Team =>", res.data.data);
        console.log("this.props.match.params.id", this.props.match.params.id);
        // res.data.data.map((item) => {
        //   if (item.id === this.props.match.params.id) {
        //     temp = item;
        //   }
        // });

        const temp = res.data.data.find(
          (x) => x.id == this.props.match.params.id
        );

        console.log("TEam ye hai ", temp);

        this.setState({ CratedByMe: temp?.created_by_me });

        // this.setState({ showAllTeam: res.data.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ showTeamLoader: false });
    }
  };

  render() {
    if (this.state.deleteTeamPage) {
      return <Redirect to="/myteamwrapper" />;
    }
    const {
      email,
      password,
      confirmPassword,
      firstName,
      surname,
      SportPosition,
      coachEmail,
      coachPassword,
      coachConfirmPassword,
      coachFirstName,
      coachSurname,
      coachSpecialisation,
      coachRole,
      playerConfirmPasswordToggle,
      coachPasswordToggle,
      coachConfirmPasswordToggle,
    } = this.state;

    const sports = this.state.preSportPosition;
    const Specialisation = this.state.preCoachSpecialisation;

    const { listTeamPlayer } = this.state;

    const coachRoles = localStorage.getItem("access_role");

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid">
              <div className="inner_teamsection">
                <div className="d-lg-flex justify-content-between align-items-center">
                  <div className="heading">my Players</div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-md-12 m-auto">
                    {this.state.showTeamLoader ? (
                      // <>
                      //   {Array(1)
                      //     .fill("")
                      //     .map((item) => {
                      //       return (
                      //         <LinearProgress
                      //           style={{
                      //             color: "#434343",
                      //             height: "29px",
                      //             backgroundColor: "#343434",
                      //             marginBottom: "20px",
                      //           }}
                      //           className="LinearProgress"
                      //         />
                      //       );
                      //     })}
                      // </>
                      <>
                        <div
                          style={{
                            display: "flex",
                            justifyItems: "space-around",
                          }}
                        >
                          {Array(10)
                            .fill("")
                            .map((item) => {
                              return (
                                <div style={{ marginRight: "20px" }}>
                                  <MyPlayerSkeleton />
                                </div>
                              );
                            })}
                        </div>
                        <MyPlayerSquarSkeleton />
                      </>
                    ) : (
                      // <div className="w-100 d-lg-flex justify-content-around text-center">
                      <div className="w-100  justify-content-around text-center">
                        {coachRoles === "S&C Coach" ? (
                          <button
                            className="Model_Btn_term_Add_Player mt-3 mt-sm-0 mb-15"
                            href=""
                            data-toggle="modal"
                            data-target="#playeradd"
                            onClick={(e) => {
                              this.showModal();
                            }}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          >
                            Add Player
                          </button>
                        ) : coachRoles === "Assistant Coach" ? null : (
                          <button
                            className="Model_Btn_term_Add_Player mt-3 mt-sm-0 mb-15"
                            href=""
                            data-toggle="modal"
                            data-target="#playeradd"
                            onClick={(e) => {
                              this.showModal();
                            }}
                            // onClick={() => {
                            //   coachRoles === "S&C Coach"
                            //     ? errorToast(
                            //         "You are not allowed to perform this task."
                            //       )
                            //     : coachRoles === "Assistant Coach"
                            //     ? errorToast(
                            //         "You are not allowed to perform this task."
                            //       )
                            //     : this.showModal();
                            // }}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          >
                            Add Player
                          </button>
                        )}
                        {coachRoles === "S&C Coach" ? null : coachRoles ===
                          "Assistant Coach" ? null : (
                          <button
                            className="Model_Btn_term_Add_Coach mt-3 mt-sm-0 mb-15"
                            href=""
                            data-toggle="modal"
                            data-target="#coachadd"
                            onClick={(e) => {
                              this.ShowCoachModal();
                            }}
                            // onClick={() => {
                            //   coachRoles === "S&C Coach"
                            //     ? errorToast(
                            //         "You are not allowed to perform this task."
                            //       )
                            //     : coachRoles === "Assistant Coach"
                            //     ? errorToast(
                            //         "You are not allowed to perform this task."
                            //       )
                            //     : this.ShowCoachModal();
                            // }}
                            style={{ cursor: "pointer", marginRight: "10px" }}
                          >
                            Add Coach
                          </button>
                        )}
                        {/* to={`/coachplayerinner/${this.props.match.params.id}/${player.id}`} */}

                        <Link
                          to={`/coachAddEvent/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          className="add_teams mt-3 mt-sm-0"
                        >
                          Add Event
                        </Link>

                        <Link
                          to={`/testing/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          className="add_teams mt-3 mt-sm-0"
                        >
                          Testing
                        </Link>

                        <Link
                          to={`/screeningProtocol/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          className="add_teams mt-3 mt-sm-0"
                        >
                          Screening
                        </Link>

                        {this.state.CratedByMe && (
                          <Link
                            to={`/madicalRoom/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                            className="add_teams mt-3 mt-sm-0"
                          >
                            Medical
                          </Link>
                        )}

                        {this.state.CratedByMe && (
                          <Link
                            to={`/coachAward/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                            className="add_teams mt-3 mt-sm-0"
                          >
                            Award
                          </Link>
                        )}
                        {this.state.CratedByMe && (
                          <Link
                            to={`/coachstatistic/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                            className="add_teams mt-3 mt-sm-0"
                          >
                            Statistic
                          </Link>
                        )}
                        {/* #b435ee */}

                        {this.state.CratedByMe && (
                          <Link
                            to={`/coachLibrary/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                            className="add_teams mt-3 mt-sm-0"
                          >
                            Coach Library
                          </Link>
                        )}

                        {this.state.CratedByMe && (
                          <Link
                            to={`/attendance/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                            className="add_teams mt-3 mt-sm-0"
                          >
                            Attendance
                          </Link>
                        )}

                        <Link
                          to={`/reports/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          className="add_teams mt-3 mt-sm-0"
                        >
                          Reports
                        </Link>

                        {/* <a className="add_teams" href="#">
                        Delete Team
                      </a> */}
                        <button
                          className="Model_Btn_term_Delete_Team"
                          // onClick={() => {
                          //   this.showDeleteTeamModal();
                          // }}

                          onClick={() => {
                            coachRoles === "S&C Coach"
                              ? errorToast(
                                  "You are not authorized to perform this operation."
                                )
                              : coachRoles === "Assistant Coach"
                              ? errorToast(
                                  "You are not authorized to perform this operation."
                                )
                              : this.showDeleteTeamModal();
                          }}
                          style={{ cursor: "pointer" }}
                        >
                          Delete Team
                        </button>
                      </div>
                    )}
                  </div>
                </div>
                {this.state.loading ? (
                  <div style={{ marginTop: "5%" }}>
                    {/* <LoaderWrapper /> */}
                    {/* <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginBottom: "20px",
                      }}
                    >
                      <i
                        className="fa fa-spinner fa-spin fa-3x fa-fw"
                        // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                        style={{
                          color: "var(--appBlue2)",
                          fontSize: "40px",
                        }}
                      />
                    </div> */}
                  </div>
                ) : (
                  <>
                    {listTeamPlayer?.length === 0 ||
                    listTeamPlayer === undefined ? (
                      <>
                        {/* <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            position: "relative",
                            marginTop: "40px",
                          }}
                        >
                          <img
                            src={noTeamAssign}
                            alt=""
                            style={{
                              width: "249px",
                              height: "249px",
                            }}
                          />
                          <p
                            // style={{ display: "flex", justifyContent: "center" }}
                            style={{ position: "absolute", top: "240px" }}
                          >
                            No player avalable yet
                          </p>
                        </div> */}

                        <NoDataFound
                          height={250}
                          width={250}
                          text="   No player available yet"
                        />
                      </>
                    ) : (
                      <>
                        {listTeamPlayer &&
                          listTeamPlayer.map((item) => {
                            return (
                              <div className="row" key={item.position}>
                                <div className="col-lg-12">
                                  <div className="heading_backs">
                                    {item.position}
                                  </div>
                                </div>
                                {item.players.map((player) => {
                                  return (
                                    <div className="col-lg-3" key={player.id}>
                                      <Link
                                        // to="/coachplayerinner"
                                        // to={`/coachplayerinner/${this.props.match.params.id}/${player.id}`}
                                        to={{
                                          pathname: `/coachplayerinner/${this.props.match.params.id}/${player.id}/${this.props.match.params.teamname}`,
                                          state: { player },
                                        }}
                                        className="player_page"
                                      >
                                        <div className="player_name">
                                          {/* {string.length > 10} */}
                                          {player.first_name} {player.last_name}
                                        </div>
                                        <figure className="mb-0 player_img text-center">
                                          <img
                                            src={maleIcon}
                                            className="img-fluid"
                                            alt={maleIcon}
                                          />
                                        </figure>
                                      </Link>
                                    </div>
                                  );
                                })}
                              </div>
                            );
                          })}
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />
        {/* this  is add Player Modal */}
        <Modal show={this.state.show} onHide={this.hideModal}>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="playeraddTitle">
                Add New Player
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  this.hideModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form action="" className="create_newteam">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={email}
                    onChange={(e) => this.onHandle(e)}
                  />
                  <p className="react_validation">
                    {this.state.emailError}
                    {this.state.emailRequiredError}
                  </p>
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label>Password</label>
                  <input
                    // type="password"
                    type={
                      this.state.playerPasswordToggle === false
                        ? "password"
                        : "text"
                    }
                    className="form-control"
                    name="password"
                    value={password}
                    onChange={(e) => this.onHandle(e)}
                  />
                  <p className="react_validation">
                    {this.state.passwordError}
                    {this.state.passwordRequiredError}
                  </p>
                  {this.state.playerPasswordToggle === false ? (
                    <img
                      src={show}
                      alt="show"
                      className="addPlayer-pass-hide"
                      onClick={() => this.togglePassword()}
                    />
                  ) : (
                    <img
                      className="addPlayer-pass-hide"
                      onClick={() => this.togglePassword()}
                      src={hide}
                      alt="hide"
                    />
                  )}
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label>Confirm password</label>
                  <input
                    // type="password"
                    type={
                      playerConfirmPasswordToggle === false
                        ? "password"
                        : "text"
                    }
                    className="form-control"
                    name="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => this.onHandle(e)}
                  />
                  <p className="react_validation">
                    {this.state.confirmPasswordError}
                  </p>

                  {playerConfirmPasswordToggle === false ? (
                    <img
                      src={show}
                      alt="show"
                      className="addPlayer-pass-hide"
                      onClick={() => this.togglePlayerConfirmPass()}
                    />
                  ) : (
                    <img
                      className="addPlayer-pass-hide"
                      onClick={() => this.togglePlayerConfirmPass()}
                      src={hide}
                      alt="hide"
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="firstName"
                    value={firstName}
                    onChange={(e) => this.onHandle(e)}
                  />
                  <p className="react_validation">
                    {this.state.firstNameError}
                  </p>
                </div>

                <div className="form-group">
                  <label>Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="surname"
                    value={surname}
                    onChange={(e) => this.onHandle(e)}
                  />
                  <p className="react_validation">{this.state.surnameError}</p>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>

                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    name="DateOfBirth"
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    ref={(ref) => (this.accordionEndContent = ref)}
                  />
                  <img
                    className="celender_img "
                    src={Calander}
                    alt={Calander}
                    onClick={() => this.accordionEndContent.onInputClick()}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="react_validation ">
                    {this.state.dateOfBirthError}
                    {this.state.ageLimitError}
                  </p>
                </div>

                {sports.length !== 0 && (
                  <div className="form-group">
                    <label>Sport Position</label>
                    <select
                      className="form-control"
                      name="SportPosition"
                      value={SportPosition}
                      onChange={(e) => this.onHandle(e)}
                    >
                      <option value="">
                        {sports.length !== 0
                          ? "Select Sport Position"
                          : "No Sport Position Avalable"}
                      </option>
                      {/* {console.log("this is SPORT POSITION ISSUE", sports)} */}
                      {sports &&
                        sports.map((item) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>
                    <p className="react_validation">
                      {this.state.SportPositionError}
                    </p>
                  </div>
                )}
                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={() => {
                    this.addPlayerInTeam();
                  }}
                >
                  Save
                </button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
        {/* this is a add coach Modal */}
        <Modal show={this.state.addCoach} onHide={this.hideCoachModal}>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="playeraddTitle">
                Add New Coach
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.hideCoachModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form action="" className="create_newteam">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="coachEmail"
                    value={coachEmail}
                    onChange={(e) => this.onHandleCoach(e)}
                  />
                  <p className="react_validation">
                    {this.state.coachEmailError}
                    {this.state.CoachEmailRequiredError}
                  </p>
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label>Password</label>
                  <input
                    // type="password"
                    type={coachPasswordToggle === false ? "password" : "type"}
                    className="form-control"
                    name="coachPassword"
                    value={coachPassword}
                    onChange={(e) => this.onHandleCoach(e)}
                  />
                  <p className="react_validation">
                    {this.state.coachPasswordError}
                    {this.state.coachPasswordRequiredError}
                  </p>
                  {coachPasswordToggle === false ? (
                    <img
                      className="addPlayer-pass-hide"
                      onClick={() => this.toggleCoachPass()}
                      src={hide}
                      alt="hide"
                    />
                  ) : (
                    <img
                      src={show}
                      alt="show"
                      className="addPlayer-pass-hide"
                      onClick={() => this.toggleCoachPass()}
                    />
                  )}
                </div>

                <div className="form-group" style={{ position: "relative" }}>
                  <label>Confirm password</label>
                  <input
                    // type="password"
                    type={
                      coachConfirmPasswordToggle === false ? "password" : "text"
                    }
                    className="form-control"
                    name="coachConfirmPassword"
                    value={coachConfirmPassword}
                    onChange={(e) => this.onHandleCoach(e)}
                  />
                  <p className="react_validation">
                    {this.state.coachConfirmPasswordError}
                  </p>
                  {coachConfirmPasswordToggle === false ? (
                    <img
                      className="addPlayer-pass-hide"
                      onClick={() => this.toggleCoachConfirmPass()}
                      src={hide}
                      alt="hide"
                    />
                  ) : (
                    <img
                      src={show}
                      alt="show"
                      className="addPlayer-pass-hide"
                      onClick={() => this.toggleCoachConfirmPass()}
                    />
                  )}
                </div>

                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="coachFirstName"
                    value={coachFirstName}
                    onChange={(e) => this.onHandleCoach(e)}
                  />
                  <p className="react_validation">
                    {this.state.coachFirstNameError}
                  </p>
                </div>

                <div className="form-group">
                  <label>Surname</label>
                  <input
                    type="text"
                    className="form-control"
                    name="coachSurname"
                    value={coachSurname}
                    onChange={(e) => this.onHandleCoach(e)}
                  />
                  <p className="react_validation">
                    {this.state.coachSurnameError}
                  </p>
                </div>

                <div className="form-group">
                  <label>Date of Birth</label>

                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    name="DateOfBirth"
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    placeholderText="dd/MM/yyyy"
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
                    {this.state.coachDateOfBirthError}
                    {this.state.coachAgeLimitError}
                  </p>
                </div>

                <div className="form-group">
                  <label>Coach Specialisation</label>
                  <select
                    className="form-control"
                    name="coachSpecialisation"
                    value={coachSpecialisation}
                    onChange={(e) => this.onHandleCoach(e)}
                  >
                    <option value="">Select Coach Specialisation</option>
                    {Specialisation &&
                      Specialisation.map((item) => {
                        return (
                          <option value={item.id} key={item.id}>
                            {item.label}
                          </option>
                        );
                      })}
                  </select>
                  <p className="react_validation">
                    {this.state.coachSpecialisationError}
                  </p>
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <select
                    className="form-control"
                    name="coachRole"
                    value={coachRole}
                    onChange={(e) => this.onHandleCoach(e)}
                  >
                    <option value="">Select Role</option>
                    {/* <option value="">Admin</option> */}
                    <option value="3">Coach</option>
                    <option value="4">S&C Coach</option>
                    <option value="5">Assistant Coach</option>
                  </select>
                  <p className="react_validation">
                    {this.state.coachRoleError}
                  </p>
                </div>

                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={() => {
                    this.addCoachInTeam();
                  }}
                >
                  Save
                </button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
        {/* this is delete team modal */}
        <Modal
          show={this.state.deleteTeamModal}
          onHide={this.hideDeleteTeamModal}
          animation={true}
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="teamcreate">
                Delete Team
              </h5>
              <button
                type="button"
                className="close "
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.hideDeleteTeamModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="delete_modal_react">
              Are you sure you want to delete this team, this cannot be undone?
            </div>
          </Modal.Body>
          <Modal.Footer>
            <button
              type="button"
              className="Model_btn_Cancel "
              data-dismiss="modal"
              onClick={() => {
                this.hideDeleteTeamModal();
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="Model_btn_ok "
              data-dismiss="modal"
              // onClick={() => {
              //   this.deleteTeam();
              // }}
              onClick={() => {
                this.deleteTeamWithModal();
              }}
              style={{ padding: "6px 43px" }}
            >
              OK
            </button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default MyPlayers;
