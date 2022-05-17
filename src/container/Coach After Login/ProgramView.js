import React from "react";
import "../Coach After Login/ProgramView";
import { Link } from "react-router-dom";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import ProgramViewBarChart from "../../component/Charts/ProgramViewBarChart";
import { standardPostApi } from "../API/ApiWrapper";
import NoDataFound from "component/lottiLoader/LottiLoader";
import ViewTeamPlayerWorkout from "container/Events/AssignPlayerEvents/modal/ViewTeamPlayerWorkout";

class ProgramView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      graphLabels: [],
      graphData: [],
      currentWeek: null,
      weekData: [],
      isLoading: false,
      viewWorkoutModal: "",
    };
  }

  componentDidMount() {
    this.athlete_program_view();
  }

  athlete_program_view = async () => {
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "athlete_program_view",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.props.match.params.playerId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log(
          "THIS IS RESPONSE OF athlete_program_view--",
          res.data.data
        );
        let graphLabels = [];
        let graphData = [];

        res.data.data.forEach((item) => {
          graphLabels.push(item.week_number);
        });

        res.data.data.forEach((item) => {
          graphData.push(item.week_total_volume);
        });

        await this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
          weekData: res.data.data,
          currentWeek: res.data.data[0],
        });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  toggleViewModal = (item) => {
    this.setState({ viewWorkoutModal: !this.state.viewWorkoutModal });
    // this.viewCalenerWorkout(item.id);
  };

  // viewCalenerWorkout = async () => {
  //   const { selectedWorkout } = this.state;
  //   console.log("selectedWorkout", selectedWorkout[0]);
  //   if (selectedWorkout !== 0) {
  //     try {
  //       const res = await standardPostApi(
  //         "export_workout_to_pdf",
  //         undefined,
  //         {
  //           access_token: await localStorage.getItem("access_token"),
  //           annual_training_program_id: selectedWorkout[0]?.atp_id,
  //           annual_training_program_week_id: selectedWorkout[0]?.atp_week_id,
  //           annual_training_program_day_id: selectedWorkout[0].atp_day_id,
  //         },
  //         true
  //       );
  //       if (res.data.code === 200) {
  //         console.log("Res of View Data", res.data);
  //         this.setState({ viewWorrkoutList: res?.data?.data });
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  // };

  render() {
    const { currentWeek, isLoading } = this.state;

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection player-page">
                <div className="row">
                  <div className="col-lg-12 pr-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          {/* <Link to="/myplayers">Robin</Link> */}
                          <Link
                            to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          >
                            {this.props.match.params.teamname}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
                          {/* <Link to="/coachplayerinner">Rohit</Link> */}
                          <Link
                            // to={`/coachplayerinner/${this.props.match.params.id}/${this.props.match.params.playerId}`}
                            to={{
                              pathname: `/coachplayerinner/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                              state: this.props.location.state,
                            }}
                          >
                            {this.props.location.state.player.first_name}{" "}
                            {this.props.location.state.player.last_name}
                          </Link>
                        </li>
                        <li
                          className="breadcrumb-item active"
                          aria-current="page"
                        >
                          Program View
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12">
                    <ProgramViewBarChart
                      isLoading={isLoading}
                      graphLabels={this.state.graphLabels}
                      graphData={this.state.graphData}
                      onBarClick={async (e, element) => {
                        if (element.length > 0) {
                          var ind = element[0]._index;
                          // console.log("the element ", element);
                          await this.setState({
                            currentWeek: this.state.weekData[ind],
                          });
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="row" style={{ marginTop: "10%" }}>
                  <div className="col-lg-12">
                    <div className="week_section">
                      {/* here */}
                      {/* <WeekComponent
                        WEEK_RESULT_OBJECT={this.state.WEEK_RESULT_OBJECT}
                      /> */}
                      <div>
                        <div className="heading">
                          <h3>{currentWeek && currentWeek.week_number}</h3>
                        </div>
                        {this.state.currentWeek &&
                          this.state.currentWeek.days.map((item) => {
                            return (
                              <div className="row" key={item.id}>
                                <div className="col-lg-3 ">
                                  <div
                                    className="day_one"
                                    style={{ backgroundColor: "#616161" }}
                                  >
                                    <span>
                                      {item.day_number}
                                      {item.day_workout_complete === true && (
                                        <i
                                          className="fa fa-check"
                                          aria-hidden="true"
                                        ></i>
                                      )}
                                    </span>
                                    <ul
                                      className="list-inline"
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                      }}
                                    >
                                      {/* <li>
                                        <button
                                          className="Start_Workout"
                                          onClick={() => alert("Coming soon")}
                                        >
                                          Start workout
                                        </button>
                                      </li> */}
                                      <li>
                                        <button
                                          className="Start_Workout"
                                          // onClick={() =>
                                          //   this.toggleViewModal(item)
                                          // }
                                          onClick={() => alert("coming soon")}
                                        >
                                          View workout
                                        </button>
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        {isLoading && (
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
                                fontSize: "40px",

                                // marginTop: "50px",
                              }}
                            />
                          </div>
                        )}
                        {!isLoading && this.state?.currentWeek === null && (
                          <NoDataFound
                            height={250}
                            width={250}
                            text="No Programs assigned yet."
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />

        <ViewTeamPlayerWorkout
          show={this.state.viewWorkoutModal}
          onHide={this.toggleViewWorkoutModal}
          // viewWorrkoutList={this.state.viewWorrkoutList}
        />
      </div>
    );
  }
}

export default ProgramView;
