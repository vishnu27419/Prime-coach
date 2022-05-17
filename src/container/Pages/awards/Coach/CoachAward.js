import { Tooltip } from "@material-ui/core";
import { standardPostApi } from "container/API/ApiWrapper";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import { errorToast, successToast } from "utils/toastMessage";
import CreateCoachAwairdsTable from "./CreateCoachAwardTable";
import { Link } from "react-router-dom";

export class CoachAward extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listAward: [],
      viewModal: false,
      isLoading: false,
      assignTo: "",
      awardName: "",
      awardNameError: "",
      assignToError: "",
      createAwardLoader: false,
      updateModal: false,
      updateModalId: "",
      updateAwardName: "",
      updateAssignTo: "",
      updateAwardNameError: "",
      updateAssgnToError: "",
      updateLoader: false,
      assignModal: false,
      awardType: "",
      athleteList: [],
      AssignPlayerId: "",
      assignTeamId: this.props.match.params.id,
      awardIds: "",
    };
  }

  componentDidMount() {
    this.getListAwards();
    this.fetchListPlayer();
  }

  toggleModal = () => {
    this.setState({ viewModal: !this.state.viewModal });
  };

  onChange = (e) => {
    this.setState({ awardName: e.target.value });
  };

  getListAwards = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "awards",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("response", res.data?.data?.awards);
        this.setState({ listAward: res.data?.data?.awards });
      }
    } catch (error) {
      console.log("get award error", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleAssignTo = (type) => {
    this.setState({ assignTo: type });
  };

  handelCreateAward = async () => {
    const isValid = this.validationCreateAward();

    if (isValid) {
      this.setState({ createAwardLoader: true });
      try {
        const res = await standardPostApi(
          "create_award",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            name: this.state.awardName,
            award_type: this.state.assignTo,
            team_id: this.props.match.params.id,
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("Response of Create Awards", res.data);
          successToast(res.data.message);
          this.setState({
            viewModal: false,
            awardNameError: "",
            assignToError: "",
            awardName: "",
            assignTo: "",
          });
          this.getListAwards();
        }
      } catch (error) {
        console.error("create award", error);
      } finally {
        this.setState({ createAwardLoader: false });
      }
    }
  };

  validationCreateAward = () => {
    let awardNameError = "";
    let assignToError = "";

    if (!this.state.awardName) {
      awardNameError = "Award name field is required.";
    }

    if (!this.state.assignTo) {
      assignToError = "Choose assign award field.";
    }

    if (awardNameError || assignToError) {
      this.setState({ awardNameError, assignToError });
      return false;
    } else {
      return true;
    }
  };

  toggleUpdateAwardModal = (item) => {
    console.log("itemmmmm", item);
    this.setState({
      updateModal: !this.state.updateModal,
      updateModalId: item?.id,
      updateAwardName: item?.name,
      updateAssignTo: item?.award_type,
    });
  };

  updateChange = (e) => {
    this.setState({ updateAwardName: e.target.value });
  };

  toggleUpdateAssignTo = (type) => {
    this.setState({ updateAssignTo: type });
  };

  handelUpdateAwards = async () => {
    const isValid = this.validationUpdateAwards();

    if (isValid) {
      this.setState({ updateLoader: true });
      try {
        const res = await standardPostApi(
          "create_award",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            name: this.state.updateAwardName,
            award_type: this.state.updateAssignTo,
            team_id: this.props.match.params.id,
            id: this.state.updateModalId,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("response of update awards");
          successToast(res.data.message);
          this.setState({
            updateModal: false,
            updateAwardNameError: "",
            updateAssgnToError: "",
            updateAwardName: "",
            updateAssignTo: "",
          });
          this.getListAwards();
        }
      } catch (error) {
        console.error("update award error", error);
      } finally {
        this.setState({ updateLoader: false });
      }
    }
  };

  validationUpdateAwards = () => {
    let updateAwardNameError = "";
    let updateAssgnToError = "";

    if (!this.state.updateAwardName) {
      updateAwardNameError = "Award name field is required.";
    }
    if (!this.state.updateAssignTo) {
      updateAssgnToError = "Choose assign award field.";
    }

    if (updateAwardNameError || updateAssgnToError) {
      this.setState({ updateAwardNameError, updateAssgnToError });
      return false;
    } else {
      return true;
    }
  };

  toggleAssignModal = (item) => {
    this.setState({
      assignModal: true,
      awardType: item?.award_type,
      awardIds: item?.id,
    });
  };

  closeAssignModal = () => {
    this.setState({
      assignModal: false,
    });
  };

  fetchListPlayer = async () => {
    try {
      const res = await standardPostApi(
        "list_team_players",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("Response of List Player", res.data.data.Athelete);
        this.setState({ athleteList: res.data?.data?.Athelete });
      }
    } catch (error) {
      console.error("list player error", error);
    }
  };

  handlePlayerRadio = (e) => {
    this.setState({ AssignPlayerId: e.target.value });
  };

  handelCoachRadio = (e) => {
    this.setState({ assignTeamId: e.target.value });
  };

  handelAsssignAwards = async () => {
    const isValid = this.validationAssignAward();

    if (isValid) {
      try {
        const res = await standardPostApi(
          "assign_award",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            player_id: this.state.AssignPlayerId,
            team_id: this.state.assignTeamId,
            award_id: this.state.awardIds,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("Response of assign award", res.data.data);
          this.setState({ AssignPlayerId: "" });
          this.closeAssignModal();
          this.getListAwards();
          successToast(res.data.message);
        }
      } catch (error) {
        console.error("assign Awards", error);
      }
    }
  };

  validationAssignAward = () => {
    if (this.state.awardType === "individual") {
      if (!this.state.AssignPlayerId) {
        errorToast("Please Choose Player");
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  };

  render() {
    const { listAward } = this.state;
    console.log("awardType", this.state.awardType);
    return (
      <div>
        <CoachHeader />
        <div className="loader_sec">
          <div className="dashboard-wrapper">
            <section
              className="myteams_wrapper"
              style={{ padding: "0 0 128px" }}
            >
              <div className="container-fluid pr-0">
                <div className="inner_teamsection">
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
                  <div className="d-lg-flex justify-content-between align-items-center mb-4">
                    <div className="heading" style={{ fontWeight: "bold" }}>
                      {" "}
                      Awards
                    </div>

                    <div className="text-center">
                      <Link
                        to={`/awardsBoard/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                        style={{ textDecoration: "none" }}
                      >
                        <button
                          className="Model_Btn_term"
                          style={{ cursor: "pointer" }}
                        >
                          Award's Board
                        </button>
                      </Link>
                    </div>

                    <div className="text-right">
                      <button
                        className="Model_Btn_term"
                        onClick={() => this.toggleModal()}
                        style={{ cursor: "pointer" }}
                      >
                        Add New Award{" "}
                        <i className="fa fa-plus" aria-hidden="true"></i>
                      </button>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-lg-12">
                      <div>
                        <CreateCoachAwairdsTable
                          listAward={listAward}
                          toggleModal={this.toggleModal}
                          parentState={this.state}
                          toggleAssignTo={this.toggleAssignTo}
                          onChange={(e) => this.onChange(e)}
                          handelCreateAward={this.handelCreateAward}
                          toggleUpdateAwardModal={this.toggleUpdateAwardModal}
                          updateChange={this.updateChange}
                          toggleUpdateAssignTo={this.toggleUpdateAssignTo}
                          handelUpdateAwards={this.handelUpdateAwards}
                          toggleAssignModal={this.toggleAssignModal}
                          teamInfo={this.props.match.params.teamname}
                          handlePlayerRadio={this.handlePlayerRadio}
                          handelCoachRadio={this.handelCoachRadio}
                          closeAssignModal={this.closeAssignModal}
                          handelAsssignAwards={this.handelAsssignAwards}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default CoachAward;
