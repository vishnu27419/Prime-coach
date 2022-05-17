import React, { Component } from "react";
import "../Coach After Login/MyTeamWrapper.css";
import { Link, Redirect } from "react-router-dom";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import cricketImg from "../../Custom/images/cricket-img.png";
import hockeyImg from "../../Custom/images/hockey-img.png";
import { Modal, Form } from "react-bootstrap";
import { standardPostApi } from "../../container/API/ApiWrapper";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderWrapper from "../Loader/LoaderWrapper";
import Image from "component/ImageComponent/Image";
import noTeamAssign from "Custom/images/noTeamAvalable.png";
import NoDataFound from "component/lottiLoader/LottiLoader";

function AddNewTeamModal(props) {
  const { teamName, sportList } = props.value;
  return (
    <Modal show={props.showModal} onHide={props.onHidePress} centered>
      <Modal.Body>
        <div className="modal-header">
          <h5 className="modal-title" id="teamcreate">
            Add New Team
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            // onClick={(e) => {
            //   this.hideModal();
            // }}
            onClick={props.onHidePress}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {/* <Form action="#" method=""> */}
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Team Name"
              name="teamName"
              value={teamName}
              onChange={props.onChange}
            ></input>
            <p className="react_validation">{props.teamNameError}</p>
          </div>
          <div className="form-group">
            <select
              name="sportList"
              value={sportList}
              onChange={props.onChange}
              className="form-control"
              placeholder="Athlete"
            >
              <option value=""> Select Sport</option>
              {props.sports &&
                props.sports.map((item) => {
                  return (
                    <option value={item.id} key={item.id}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
            <p className="react_validation">{props.selectSportError}</p>
          </div>
          <button
            type="button"
            className="Model_btn "
            data-dismiss="modal"
            onClick={props.addNewTeam}
          >
            Save
          </button>
          {/* </Form> */}
        </div>
      </Modal.Body>
    </Modal>
  );
}

class MyTeamWrapper extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      show: false,
      login: true,
      preCreateNewTeame: [],
      teamName: "",
      sportList: "",
      teamNameError: "",
      showAllTeam: [],
      selectSportError: "",
      createTeam: {},
      // teamDetail: {},
    };
  }

  checkLoginUrl = async () => {
    const token = await localStorage.getItem("access_token");
    const role = await localStorage.getItem("access_role");

    if (token == null && role == null) {
      this.setState({ login: false });
    }
  };

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("onCHange", this.state);
  }

  componentDidMount() {
    this.fetchPreCreateNewTeam();
    this.fetchShowAllTeams();
    this.checkLoginUrl();
  }

  fetchPreCreateNewTeam = async () => {
    try {
      const res = await standardPostApi(
        "pre_create_new_team",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        this.setState({ preCreateNewTeame: res.data.data.Sports.pickerArray });
        // console.log("This is res of Pre Create New Team =>", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  createNewTeaam = async () => {
    const isValid = this.validation();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "create_new_team",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            name: this.state.teamName,
            sport: this.state.sportList,
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({
            showAllTeam: [...this.state.showAllTeam, res.data?.data],
          });
          console.log("this is res of create new team", res.data.data);
          await this.hideModal();
          toast.success(res.data.message);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  validation = () => {
    let teamNameError = "";
    let selectSportError = "";

    if (!this.state.teamName) {
      teamNameError = "This field is required";
    }

    if (!this.state.sportList) {
      selectSportError = "Choose Sport Field";
    }

    if (teamNameError || selectSportError) {
      this.setState({ teamNameError, selectSportError });
      return false;
    } else {
      return true;
    }
  };

  fetchShowAllTeams = async () => {
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
        this.setState({ showAllTeam: res.data.data, loading: false });
      }
    } catch (error) {
      console.log(error);
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

  // isInputAlphabet = (event) => {
  //   var char = String.fromCharCode(event.which);
  //   if (!/^[a-zA-Z ]+$/.test(char)) {
  //     event.preventDefault();
  //   }
  // };

  render() {
    if (this.state.login === false) {
      return <Redirect to="/" />;
    }

    const ShowTeam = this.state.showAllTeam;

    const coachRole = localStorage.getItem("access_role");
    // console.log("createTeam====>>>", ShowTeam);

    return (
      <div className="loader_sec">
        <CoachHeader />
        {this.state.loading ? (
          <LoaderWrapper />
        ) : (
          <div className="dashboard-wrapper">
            <section className="myteams_wrapper">
              <div className="container-fluid pr-0">
                <div className="inner_teamsection">
                  <div className="d-lg-flex justify-content-between align-items-center">
                    <div className="heading">my teams</div>
                    <AddNewTeamModal
                      showModal={this.state.show}
                      onHidePress={() => this.hideModal()}
                      sports={this.state.preCreateNewTeame}
                      onChange={(e) => this.onChange(e)}
                      value={(this.state.teamName, this.state.sportList)}
                      addNewTeam={() => this.createNewTeaam()}
                      teamNameError={this.state.teamNameError}
                      selectSportError={this.state.selectSportError}
                      isInputAlphabet={this.isInputAlphabet}
                    />
                    {coachRole === "S&C Coach" ? null : coachRole ===
                      "Assistant Coach" ? null : (
                      <div className="text-right">
                        <button
                          className="Model_Btn_term"
                          onClick={(e) => {
                            this.showModal();
                          }}
                        >
                          Add New Team{" "}
                          <i className="fa fa-plus" aria-hidden="true"></i>
                        </button>
                      </div>
                    )}
                  </div>

                  <div
                    className="row mt-5 "
                    style={
                      ShowTeam.length === 0
                        ? { display: "flex", justifyContent: "center" }
                        : {}
                    }
                  >
                    {ShowTeam?.length === 0 ? (
                      <div>
                        {/* <img
                          src={noTeamAssign}
                          alt=""
                          style={{
                            width: "249px",
                            height: "249px",
                          }}
                        />
                        <p
                          style={{ display: "flex", justifyContent: "center" }}
                        >
                          No team avalable yet
                        </p> */}
                        <NoDataFound
                          height={250}
                          width={250}
                          text="No team available yet."
                        />
                      </div>
                    ) : (
                      <>
                        {ShowTeam &&
                          ShowTeam.map((team) => {
                            return (
                              <div
                                className="col-lg-2 col-12 col-md-3 text-center team_list_react"
                                key={team.id}
                              >
                                <Link
                                  to={`/myplayers/${team.id}/${team.team_name}`}
                                >
                                  {/* <div
                                    className="team_name"
                                    title={team.team_name}
                                  >
                                    {team.team_name}
                                  </div> */}
                                  <div
                                    // className="team_name"
                                    title={team.team_name}
                                    style={{
                                      wordBreak: "break-all",
                                      color: "#fff",
                                      fontSize: "16px",

                                      marginBottom: "52px",
                                      display: "-webkit-box",
                                      maxWidth: "100%",
                                      maxHeight: "20px",
                                      WebkitLineClamp: "3",
                                      WebkitBoxOrient: "vertical",
                                    }}
                                  >
                                    {team.team_name}
                                  </div>
                                  <figure>
                                    {/* <img
                                  src={team.sport_image}
                                  className="img-fluid_game"
                                  alt={cricketImg}
                                  // onError={(e) => {
                                  //   e.target.onerror = null;
                                  //   e.target.src =
                                  //     // "https://www.rfppl.co.in/subscription/upload_journal_img/1548238937davao-properties-for-sale-18042018040100no-photo.png";
                                  //     "https://image.makewebeasy.net/makeweb/0/8gPLercsu/Document/EKD_007A_EN.pdf";
                                  // }}
                                /> */}
                                    <Image
                                      image={team.sport_image}
                                      className="img-fluid_game"
                                    />
                                  </figure>
                                </Link>
                              </div>
                            );
                          })}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

export default MyTeamWrapper;
