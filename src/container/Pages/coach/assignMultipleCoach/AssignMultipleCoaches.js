import React, { Component } from "react";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import sportImg from "Custom/images/body-transformation-img.png";
import AssignTeamModal from "../assignTeamModal/AssignTeamModal";
import Image from "component/ImageComponent/Image";
import { standardPostApi } from "container/API/ApiWrapper";
import { errorToast, successToast } from "utils/toastMessage";
import noTeamAssign from "Custom/images/noTeamAvalable.png";

class AssignMultipleCoach extends Component {
  constructor(props) {
    super(props);
    this.state = {
      assignTeamModal: false,
      teamList: [],
      coachId: "",
      team_ids: [],
      loadingAssinCoachModal: false,
      coachInfo: {},
    };
  }
  componentDidMount() {
    this.showAllTeamsApi();
    this.setState({
      coachId: this.props?.location?.state?.item.id,
      coachInfo: this.props?.location?.state?.item,
    });
  }

  toggleAssignTeamModal = async () => {
    await this.setState({ assignTeamModal: !this.state.assignTeamModal });
    this.showAllTeamsApi();
  };

  showAllTeamsApi = async () => {
    this.setState({ loadingAssinCoachModal: true });
    try {
      const res = await standardPostApi(
        "show_all_teams",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        console.log("This is Response show all teams ", res?.data?.data);

        this.setState({
          teamList: res?.data?.data,
          loadingAssinCoachModal: false,
        });
      }
    } catch (error) {
      this.setState({
        loadingAssinCoachModal: false,
      });
      console.log(error);
    }
  };

  assignCoachToTeam = async () => {
    const { coachInfo, coachId } = this.state;
    // console.log("coachId", coachId);
    // console.log("team_ids-->", JSON.stringify(this.state.team_ids));

    const isValid = this.validationCoachAssignToTeam();

    if (isValid) {
      if (
        window.confirm(
          `Are you sure you want to assign this Team to ${coachInfo.first_name} ${coachInfo.last_name}? You will not be able to change coach for these teams. Would you like to continue?`
        )
      ) {
        try {
          const res = await standardPostApi(
            "assign_coach_to_teams",
            undefined,
            {
              access_token: await localStorage.getItem("access_token"),
              coach_id: coachId,
              team_ids: JSON.stringify(this.state.team_ids),
            },
            true
          );
          if (res.data.code === 200) {
            console.log(
              "This is response of Assign Coach To Team",
              res.data.data
            );
            this.setState({ assignTeamModal: false });
            this.props.history.push("/coachList");
            this.showAllTeamsApi();
            successToast(res.data.message);
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
  };

  validationCoachAssignToTeam = () => {
    if (this.state.team_ids.length === 0) {
      errorToast("Please Select Team");
      return false;
    } else {
      return true;
    }
  };

  toggleChackbox = async (item, index) => {
    let temp = [...this.state.teamList];

    temp[index].is_checked = item.is_checked === false ? true : false;
    // console.log("temp", temp);

    let teamId = [];
    this.state.teamList.map((item) => {
      if (item.is_checked === true) {
        teamId.push(item.id);
      }
    });
    // console.log("1233 ****teamid***", teamId);

    this.setState({ teamList: [...temp], team_ids: teamId });
  };

  render() {
    // console.log("THIS IS FROM LOCATION", this.props.location.state.item);
    const { teamList, loadingAssinCoachModal } = this.state;

    // console.log("teamList-->", this.state.team_ids);
    // console.log(
    //   "this.props?.location?.state?.item",
    //   this.props?.location?.state?.item?.team_count
    // );
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection">
                <div className="d-lg-flex justify-content-between align-items-center">
                  <div
                    className="heading"
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                  >
                    {this.props?.location?.state?.item?.first_name}{" "}
                    {this.props?.location?.state?.item.last_name}
                  </div>
                  <button
                    className="Model_Btn_term"
                    onClick={this.toggleAssignTeamModal}
                  >
                    Assign New Team{" "}
                    <i className="fa fa-plus" aria-hidden="true"></i>
                  </button>
                </div>

                <div
                  className="row mt-5 "
                  style={
                    this.props?.location?.state?.item?.team_count === "0"
                      ? { display: "flex", justifyContent: "center" }
                      : {}
                  }
                >
                  {/* {Array(5)
                    .fill("")
                    .map((x) => ( */}

                  {this.props?.location?.state?.item?.team_count === "0" ? (
                    // <img
                    //   src="https://i.pinimg.com/originals/c9/22/68/c92268d92cf2dbf96e3195683d9e14fb.png"
                    //   alt=""
                    // />
                    <div>
                      <img
                        src={noTeamAssign}
                        alt=""
                        style={{ width: "249px", height: "249px" }}
                      />
                      <p style={{ display: "flex", justifyContent: "center" }}>
                        No team avalable yet
                      </p>
                    </div>
                  ) : (
                    <>
                      {this.props?.location?.state?.item?.teams &&
                        this.props?.location?.state?.item?.teams?.map(
                          (item) => {
                            return (
                              <div
                                className="col-lg-2 col-12 col-md-3 text-center team_list_react"
                                key={item.id}
                                // style={{ cursor: "not-allowed" }}
                              >
                                <div className="team_name">
                                  {item.team_name}
                                </div>
                                <figure>
                                  {/* <img
                              src={sportImg}
                              alt="No_Image_Avalable"
                              className="img-fluid_game"
                            /> */}
                                  <Image
                                    image={item.sport.sport_image}
                                    className="img-fluid_game"
                                    style={{
                                      cursor: "not-allowed",
                                      boxShadow: "none",
                                    }}
                                  />
                                </figure>
                              </div>
                            );
                          }
                        )}
                    </>
                  )}
                  {/* ))} */}
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <AssignTeamModal
          show={this.state.assignTeamModal}
          onHide={this.toggleAssignTeamModal}
          coachInfo={this.props?.location?.state?.item}
          teamList={teamList}
          assignCoachToTeam={this.assignCoachToTeam}
          toggleChackbox={this.toggleChackbox}
          loadingAssinCoachModal={loadingAssinCoachModal}
        />
      </div>
    );
  }
}
export default AssignMultipleCoach;
