import CoachHeader from "container/PublicLayout/CoachHeader";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "Custom/images/celender.jpg";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import Footer from "container/PublicLayout/Footer";
import CreateCoachLibrary from "./CreateCoachLIbrary";
import { ContactsOutlined } from "@material-ui/icons";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
import ViewActivityModal from "./ViewActivityModal";
import NoDataFound from "component/lottiLoader/LottiLoader";

export class CoachLibrary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      createModal: false,
      activityName: "",
      videoName: "",
      // teamName: "",
      description: "",
      tips: "",
      inputList: [],
      tipsError: "",
      createLibraryLoader: false,
      coachLibraryList: [],
      pickerLoader: false,
      coachLibraryPickerId: "",
      selectPickerObject: {},
      assignToTeamLoader: false,
      isAssignToAllTeam: false,
      playerList: [],
      activityDetails: {},
      viewActivityModal: false,
      reseltSetLoader: false,
      sentPlayerLoader: false,
      activePlayerId: "",
      selectPicker: "active",
      enableDiableLoader: false,
    };
  }

  componentDidMount() {
    this.fetchCoachLibrary();
  }

  toggleCreateModal = () => {
    this.setState({
      createModal: !this.state.createModal,
      activityName: "",
      description: "",
      videoName: "",
      tips: "",
      inputList: [],
      tipsError: "",
    });
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("state", this.state);
  };

  onSelectChange = (e) => {
    this.setState({ selectPicker: e.target.value });
    // this.fetchAssignaedCoachLibraryForCoach(this.state.coachLibraryPickerId);
    this.fetchCoachLibrary();
  };
  addNewTips = async () => {
    const { inputList, tips } = this.state;
    const isValid = this.addNewTipsValidation();

    if (isValid) {
      inputList.push({
        tip: tips,
        id: Math.random(),
      });

      await this.setState({
        inputList,
        tips: "",
        tipsError: "",
      });
    }
  };

  addNewTipsValidation = () => {
    if (!this.state.tips) {
      this.setState({
        tipsError: "Tips field is required.",
      });
      return false;
    } else {
      return true;
    }
  };

  deleteEvent = (index) => {
    const copyPostArray = Object.assign([], this.state.inputList);
    copyPostArray.splice(index, 1);
    this.setState({
      inputList: copyPostArray,
    });
  };

  hendelAddCoachLibrary = async () => {
    let tipsList = [];

    this.state.inputList.map((item) => {
      tipsList.push({ tip: item.tip });
    });

    // console.log("tipsList", tipsList);

    let data = {
      access_token: await localStorage.getItem("access_token"),
      activity_name: this.state.activityName,
      description: this.state.description,
      youtube_link: this.state.videoName,
      team_id: this.props.match.params.id,
      tips: tipsList,
    };

    const isValid = this.createCoachLibraryValidation();

    if (isValid) {
      this.setState({ createLibraryLoader: true });
      try {
        const res = await standardPostApiJsonBased(
          "add_coach_library",
          undefined,
          data,
          true
        );
        if (res.data.code === 200) {
          console.log("Response of Add coach library", res.data.data);
          successToast(res.data.message);
          // this.setState({
          //   activityName: "",
          //   description: "",
          //   videoName: "",
          //   tips: "",
          //   inputList: [],
          // });
          this.fetchCoachLibrary();
          this.toggleCreateModal();
        }
      } catch (error) {
        console.error("error of handel Add Coach library", error);
      } finally {
        this.setState({ createLibraryLoader: false });
      }
    }
  };

  createCoachLibraryValidation = () => {
    let regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=|\?v=)([^#\&\?]*).*/;
    if (!this.state.activityName) {
      errorToast("Activity name field is required.");
      return false;
    } else if (!this.state.description) {
      errorToast("Description field is required.");
      return false;
    } else if (!this.state.videoName) {
      errorToast("video link field is required.");
      return false;
    } else if (!this.state.videoName.match(regExp)) {
      errorToast("Please enter valid video url.");
      return false;
    } else if (this.state.inputList.length === 0) {
      errorToast("Plaese add atleast one Tip");
    } else {
      return true;
    }
  };

  fetchCoachLibrary = async () => {
    this.setState({ pickerLoader: true });
    try {
      const res = await standardPostApi(
        "get_coach_library",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("response of coach library", res.data.data.coach_library);

        const temp = res.data.data.coach_library.filter(
          (x) => x?.is_enabled === this.state.selectPicker
        );

        console.log("temp", temp);

        // console.log("temp", temp.length);

        // temp.length === 0 ? alert("0000") : alert("111");

        if (temp.length === 0) {
          this.setState({
            coachLibraryList: [],
            coachLibraryPickerId: "",
            selectPickerObject: {},
            isAssignToAllTeam: false,
            playerList: [],
            activityDetails: {},
          });
        } else {
          this.setState({
            coachLibraryList: temp,
            // coachLibraryPickerId: res.data?.data?.coach_library[0].id,
            // selectPickerObject: res.data?.data?.coach_library[0],
            coachLibraryPickerId: temp[0].id,
            selectPickerObject: temp[0],
          });
        }
        temp.length !== 0 &&
          this.fetchAssignaedCoachLibraryForCoach(
            this.state.coachLibraryPickerId
          );
      }
    } catch (error) {
      console.error("error of coach libraey", error);
    } finally {
      this.setState({ pickerLoader: false });
    }
  };

  onHandel = (e) => {
    let selectPickerObject = {};

    this.state.coachLibraryList.map((item) => {
      if (e.target.value == item.id) {
        selectPickerObject = item;
      }
    });

    this.setState({
      coachLibraryPickerId: e.target.value,
      selectPickerObject: selectPickerObject,
    });

    this.fetchAssignaedCoachLibraryForCoach(e.target.value);
  };

  handelAssignCoachLibraryToTeam = async (item, roll) => {
    roll === "player" && this.setState({ activePlayerId: item.id });

    const data =
      roll === "player"
        ? {
            access_token: await localStorage.getItem("access_token"),
            team_id: this.props.match.params.id,
            activity_id: this.state.coachLibraryPickerId,
            player_id: item.user_id,
          }
        : {
            access_token: await localStorage.getItem("access_token"),
            team_id: this.props.match.params.id,
            activity_id: this.state.coachLibraryPickerId,
          };

    roll === "player"
      ? this.setState({ sentPlayerLoader: true })
      : this.setState({ assignToTeamLoader: true });

    try {
      const res = await standardPostApi(
        "assign_coach_library",
        undefined,
        data,
        true
      );
      if (res.data.code === 200) {
        console.log("Response of assign to coach", res.data.data);
        successToast(res.data.message);
        this.fetchAssignaedCoachLibraryForCoach(
          this.state.coachLibraryPickerId
        );
      }
    } catch (error) {
      console.error("error of assign coach library", error);
    } finally {
      roll === "player"
        ? this.setState({ sentPlayerLoader: false })
        : this.setState({ assignToTeamLoader: false });
    }
  };

  fetchAssignaedCoachLibraryForCoach = async (activityId) => {
    this.setState({ reseltSetLoader: true });
    try {
      const res = await standardPostApi(
        "get_assigned_coach_library_for_coach",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props?.match?.params?.id,
          activity_id: activityId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("response of result set", res.data.data);
        this.setState({
          isAssignToAllTeam: res.data?.data?.is_assigned_to_all_team,
          playerList: res?.data?.data?.players,
          activityDetails: res?.data?.data?.coach_library_activity,
        });
      }
    } catch (error) {
      console.log("error of fetch result set", error);
    } finally {
      this.setState({ reseltSetLoader: false });
    }
  };

  toggleViewActivityModal = () => {
    this.setState({ viewActivityModal: !this.state.viewActivityModal });
  };

  handelEnableDiableCoachLibrary = async () => {
    this.setState({ enableDiableLoader: true });
    try {
      const res = await standardPostApi(
        "enable_disable_coach_library",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          coach_library_id: this.state.coachLibraryPickerId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Response of enable disable Coach library", res.data);
        successToast(res.data.message);
        // this.setState({ selectPicker: "active" });
        this.fetchCoachLibrary();

        // await window.location.reload();
      }
    } catch (error) {
      console.error("error od enable disable coach library", error);
    } finally {
      this.setState({ enableDiableLoader: false });
    }
  };

  render() {
    const { coachLibraryList, selectPickerObject, selectPicker } = this.state;

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                <div className="d-md-flex align-items-center ">
                  <ol className="breadcrumb mb-4 mb-lg-0">
                    <li className="breadcrumb-item">
                      <Link
                        to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                      >
                        <Tooltip arrow title={`Back to  my players page`}>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <i
                              className="fa fa-chevron-circle-left"
                              aria-hidden="true"
                              style={{
                                color: "#2F84CA",
                                fontSize: "30px",

                                marginRight: "10px",
                              }}
                            ></i>
                            <span style={{ fontSize: "20px" }}>
                              {this.props.match.params.teamname}
                            </span>
                          </span>
                        </Tooltip>
                      </Link>
                    </li>
                  </ol>
                </div>
                <h4>
                  Coach Library {">"}
                  <span style={{ marginLeft: "5px" }}>
                    {selectPickerObject?.activity_name}
                  </span>
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          className="btn protocol_btn dropdown-toggle w-100"
                          name="coachLibraryPickerId"
                          value={this.state.coachLibraryPickerId}
                          onChange={(e) => this.onHandel(e)}
                        >
                          {!this.state.pickerLoader &&
                            this.state.coachLibraryList.length === 0 && (
                              <option value="">
                                Sorry! no coach libraay available
                              </option>
                            )}

                          {coachLibraryList.length !== 0 &&
                            coachLibraryList
                              .filter(
                                (x) => x.is_enabled === this.state.selectPicker
                              )
                              .map((item) => {
                                return (
                                  <option
                                    className="dropdown-item dropdown-menu react_select_menu"
                                    key={item.id}
                                    value={item.id}
                                  >
                                    {item?.activity_name}
                                  </option>
                                );
                              })}
                        </select>

                        {this.state.pickerLoader && (
                          <span style={{ position: "relative" }}>
                            <i
                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                              style={{
                                color: "var(--appBlue2)",
                                fontSize: "29px",
                                marginTop: "20px",
                                position: "absolute",
                                right: "37px",
                                top: "-22px",
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </div>

                    <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                      <li>
                        <button
                          className="Create_btn"
                          style={{ cursor: "pointer" }}
                          onClick={this.toggleCreateModal}
                        >
                          Create
                        </button>
                      </li>{" "}
                      &nbsp;
                      <li>
                        {selectPickerObject?.is_enabled === "inactive" ? (
                          <button
                            className="Edit_btn"
                            style={
                              this.state.enableDiableLoader
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            onClick={() =>
                              this.handelEnableDiableCoachLibrary()
                            }
                            disabled={this.state.enableDiableLoader}
                          >
                            Set As Active{" "}
                            {this.state.enableDiableLoader && (
                              <i
                                className="fa fa-spinner fa-spin fa-3x fa-fw"
                                style={{
                                  color: "#fff",
                                  fontSize: "15px",
                                }}
                              />
                            )}
                          </button>
                        ) : selectPickerObject?.is_enabled === "active" ? (
                          <button
                            className="testing_protocol_delete"
                            style={
                              this.state.enableDiableLoader
                                ? { cursor: "not-allowed" }
                                : { cursor: "pointer" }
                            }
                            onClick={() =>
                              this.handelEnableDiableCoachLibrary()
                            }
                            disabled={this.state.enableDiableLoader}
                          >
                            Set As Inactive{" "}
                            {this.state.enableDiableLoader && (
                              <i
                                className="fa fa-spinner fa-spin fa-3x fa-fw"
                                style={{
                                  color: "#fff",
                                  fontSize: "15px",
                                }}
                              />
                            )}
                          </button>
                        ) : null}
                      </li>
                      {/* &nbsp;&nbsp;
                      <li>
                        <button className="testing_protocol_delete">
                          Delete
                        </button>
                      </li> */}
                    </ul>
                  </div>

                  <div>
                    <select
                      id=""
                      className="btn protocol_btn dropdown-toggle w-100"
                      name="selectPicker"
                      value={selectPicker}
                      onChange={this.onSelectChange}
                    >
                      <option
                        className="dropdown-item dropdown-menu react_select_menu"
                        value="active"
                      >
                        Active
                      </option>
                      <option
                        className="dropdown-item dropdown-menu react_select_menu"
                        value="inactive"
                      >
                        Inactive
                      </option>
                    </select>
                  </div>

                  <div style={{ width: "15%" }}>
                    <div className="dropdown">
                      <div className="form-group">
                        {!this.state.reseltSetLoader &&
                          coachLibraryList.length !== 0 && (
                            <>
                              {this.state.isAssignToAllTeam ? (
                                <button
                                  style={{
                                    padding: "8px 57px",
                                    backgroundColor: "gray",
                                    border: "1px solid gray",
                                    borderRadius: "8px",
                                    color: "#fff",
                                    cursor: "not-allowed",
                                  }}
                                >
                                  <span style={{ display: "flex" }}>
                                    Assign To Team
                                  </span>
                                </button>
                              ) : (
                                <button
                                  style={
                                    this.state.assignToTeamLoader
                                      ? {
                                          padding: "8px 57px",
                                          backgroundColor: "#F1B019",
                                          border: "1px solid #F1B019",
                                          borderRadius: "8px",
                                          color: "#fff",
                                          cursor: "wait",
                                        }
                                      : {
                                          padding: "8px 57px",
                                          backgroundColor: "#F1B019",
                                          border: "1px solid #F1B019",
                                          borderRadius: "8px",
                                          color: "#fff",
                                          cursor: "pointer",
                                        }
                                  }
                                  onClick={() =>
                                    this.handelAssignCoachLibraryToTeam()
                                  }
                                  disabled={this.state.assignToTeamLoader}
                                >
                                  <span style={{ display: "flex" }}>
                                    Assign To Team{" "}
                                    {this.state.assignToTeamLoader && (
                                      <i
                                        className="fa fa-spinner fa-spin fa-3x fa-fw"
                                        style={{
                                          color: "#fff",
                                          fontSize: "15px",
                                        }}
                                      />
                                    )}
                                  </span>
                                </button>
                              )}
                            </>
                          )}
                      </div>
                    </div>
                  </div>
                </div>
                {!this.state.pickerLoader &&
                  !this.state.reseltSetLoader &&
                  this.state.playerList.length === 0 && (
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No coach library  avalable yet"
                    />
                  )}

                {this.state.reseltSetLoader ? (
                  <div
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
                        fontSize: "50px",

                        // marginTop: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <div className="table-responsive mt-5 table_react_cursor">
                    <table className="table ">
                      <thead>
                        <tr className="react_Testing_Table">
                          {this.state.playerList.length !== 0 && (
                            <>
                              <th>Player Name</th>
                              <th style={{ width: "320px" }}>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {this.state?.activityDetails?.activity_name}
                                </span>
                              </th>
                            </>
                          )}
                        </tr>
                      </thead>

                      <tbody>
                        {this.state.playerList.length !== 0 &&
                          this.state.playerList.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>
                                  {item?.user_first_name} {item?.user_last_name}
                                </td>
                                {/* <td>
                                <button className="screening_protocol_view_button">
                                  View
                                </button>
                              </td> */}
                                <td>
                                  <span
                                    style={{
                                      marginLeft: "39px",
                                      color: "#2f84ca",
                                      fontSize: "20px",
                                      display: "flex",
                                      justifyContent: "space-around",
                                    }}
                                  >
                                    <button
                                      style={{
                                        padding: "2px 20px",
                                        background: "#2A84CA",
                                        fontSize: "17px",
                                        border: "1px solid #2A84CA",
                                        borderRadius: "5px",
                                        color: "#fff",
                                      }}
                                      onClick={() =>
                                        this.toggleViewActivityModal()
                                      }
                                    >
                                      View
                                    </button>

                                    {item.is_coach_lib_assigned === false ? (
                                      <button
                                        style={
                                          this.state.sentPlayerLoader &&
                                          item.id === this.state.activePlayerId
                                            ? {
                                                padding: "2px 20px",
                                                background: "#F1B019",
                                                fontSize: "17px",
                                                border: "1px solid #F1B019",
                                                borderRadius: "5px",
                                                color: "#fff",
                                                cursor: "wait",
                                              }
                                            : {
                                                padding: "2px 20px",
                                                background: "#F1B019",
                                                fontSize: "17px",
                                                border: "1px solid #F1B019",
                                                borderRadius: "5px",
                                                color: "#fff",
                                              }
                                        }
                                        onClick={() =>
                                          this.handelAssignCoachLibraryToTeam(
                                            item,
                                            "player"
                                          )
                                        }
                                        disabled={
                                          this.state.sentPlayerLoader &&
                                          item.id === this.state.activePlayerId
                                        }
                                      >
                                        Assign{" "}
                                        {this.state.sentPlayerLoader &&
                                          item.id ===
                                            this.state.activePlayerId && (
                                            <i
                                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                                              style={{
                                                color: "#fff",
                                                fontSize: "15px",
                                                marginLeft: "5px",
                                              }}
                                            />
                                          )}
                                      </button>
                                    ) : (
                                      <button
                                        style={{
                                          padding: "2px 20px",
                                          background: "gray",
                                          fontSize: "17px",
                                          border: "1px solid gray",
                                          borderRadius: "5px",
                                          color: "#fff",
                                          cursor: "not-allowed",
                                        }}
                                      >
                                        Assign
                                      </button>
                                    )}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <CreateCoachLibrary
          onHide={this.toggleCreateModal}
          show={this.state.createModal}
          parentState={this.state}
          onChange={this.onChange}
          addNewTips={this.addNewTips}
          hendelAddCoachLibrary={this.hendelAddCoachLibrary}
          currentTeamName={this.props.match.params.teamname}
          deleteEvent={this.deleteEvent}
        />

        <ViewActivityModal
          onHide={this.toggleViewActivityModal}
          show={this.state.viewActivityModal}
          activityDetails={this.state.activityDetails}
          currentTeamName={this.props.match.params.teamname}
        />
      </div>
    );
  }
}

export default CoachLibrary;
