import React, { Component } from "react";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import { Link, Redirect } from "react-router-dom";
import "./AnalyseWorkoutAthleteSide.css";
import { standardPostApi } from "container/API/ApiWrapper";
import moment from "moment";
import { errorToast } from "utils/toastMessage";
import NoDataFound from "component/lottiLoader/LottiLoader";
import Header from "container/PublicLayout/Header";
import InnerHeader from "container/PublicLayout/InnerHeader";

export class AnalyseWorkoutAthleteSide extends Component {
  state = {
    isloading: false,
    report: [],
    selectedDay: undefined,
    weekArray: [],
    pickerArray: [],
    selectedWeek: {},
    selectedPickerValue: "",
  };
  componentDidMount() {
    this.onLoadWeekData();
  }

  onLoadWeekData = async () => {
    this.setState({ isloading: true });
    // const PlayerData = navigation.getParam("player");
    try {
      const res = await standardPostApi(
        "athlete_program_view",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          //   access_user_id: playerId,
        },
        true,
        false
      );
      if (res.data.code === 301) {
        this.setState({
          isloading: false,
        });
        console.log("Error ", JSON.stringify(res.data, null, 2));
      }
      let temp = [];
      res.data.data.map((x, i) => {
        temp.push({
          label: `${x.week_number} (${moment(
            x?.week_start,
            "YYYY-MM-DD"
          ).format("Do MMM")} - ${moment(x?.week_end, "YYYY-MM-DD").format(
            "Do MMM"
          )})`,
          value: x.id,
        });
      });
      if (res.data.code === 200) {
        this.setState({
          weekArray: res.data.data,
          pickerArray: temp,
          selectedPickerValue: temp[0]?.value,
          selectedWeek: res.data.data[0],
          isloading: false,
        });
        if (res.data.data[0]?.days?.length > 0) {
          this.setState({ selectedDay: res.data.data[0]?.days[0].id });
          this.onLoad(res.data.data[0]?.days[0].id);
        }
        // console.log("list Data ", JSON.stringify(res.data.data, null, 2));
      }
    } catch (error) {
      this.setState({ isloading: false });
      console.log(error);
    }
  };
  onLoad = async (dayId) => {
    // errorToast("HUa ");
    this.setState({ isloading: true });

    // const PlayerData = navigation.getParam("player");

    const { selectedWeek } = this.state;
    try {
      const res = await standardPostApi(
        // "training_session_day_wise_report",
        "training_session_day_wise_report_v3",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: selectedWeek?.annual_training_program_id,
          annual_training_program_week_id: selectedWeek?.id,
          annual_training_program_week_day_id: dayId,
        },
        true,
        false
      );
      if (res.data.code === 301) {
        this.setState({
          report: res.data.data,
          isloading: false,
        });
        console.log("Error ", JSON.stringify(res.data, null, 2));
      }
      if (res.data.code === 200) {
        console.log("dattttt", JSON.stringify(res.data.data, null, 2));
        let Temp = res.data.data;
        let Final = [];
        for (var i = 0; Temp.length; i++) {
          let SELECTED = Temp.filter(
            (x) => x.exercise_name === Temp[0]?.exercise_name
          );
          let REMAIN = Temp.filter(
            (x) => x.exercise_name !== Temp[0]?.exercise_name
          );
          Final.push({
            name: SELECTED[0]?.exercise_name,
            totalSet: SELECTED?.length,
            data: SELECTED,
          });
          Temp = REMAIN;
        }
        this.setState({
          report: Final,
          isloading: false,
        });
        console.log("Final", JSON.stringify(Final, null, 2));
      }
    } catch (error) {
      this.setState({ isloading: false });
      console.log(error);
    }
  };
  render() {
    const { pickerArray, report } = this.state;
    // console.log("pickerArray-->", this.state.selectedWeek);
    return (
      <div className="loader_sec">
        {/* <CoachHeader /> */}
        {localStorage.getItem("access_role") === null ? (
          <Header />
        ) : localStorage.getItem("access_role") === "Athlete" ? (
          <InnerHeader />
        ) : (
          <CoachHeader />
        )}

        <div className="reports-wrapper">
          {this.state.isloading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "150px",
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
            <section className="assigned-pagewrapper">
              <div className="container-fluid pr-0">
                <div className="weekassigned-wrapper week_section">
                  <div className="row" style={{ marginBottom: "3%" }}>
                    <div className="col-lg-12">
                      <div className="d-flex justify-content-between align-items-center">
                        {/* <ol className="breadcrumb">
                          <li className="breadcrumb-item">
                            <Link
                              to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                            >
                              {this.props.match.params.teamname}
                            </Link>
                          </li>
                          <li className="breadcrumb-item">
                            <Link
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
                            <Link
                              to={{
                                pathname: `/playerreport/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                                state: this.props.location.state,
                              }}
                            >
                              Reports
                            </Link>
                          </li>
                          <li
                            className="breadcrumb-item active"
                            aria-current="page"
                          >
                            Analyse Workout
                          </li>
                        </ol> */}
                      </div>
                      <div className="pt-4 protocole d-md-flex">
                        {this.state.pickerArray.length === 0 ||
                        this.state?.selectedWeek?.days?.length === 0 ? null : (
                          <div className="dropdown">
                            <div>
                              <select
                                className="btn protocol_btn dropdown-toggle w-100"
                                name="weekPicker"
                                value={this.state.selectedPickerValue}
                                onChange={async (e) => {
                                  let tempWeek = this.state.weekArray?.find(
                                    (x) => x.id === parseInt(e.target.value)
                                  );
                                  await this.setState({
                                    selectedPickerValue: parseInt(
                                      e.target.value
                                    ),
                                    selectedWeek: tempWeek,
                                  });
                                  console.log("hhhhhhh", tempWeek);
                                  if (tempWeek?.days?.length > 0) {
                                    this.setState({
                                      selectedDay: tempWeek?.days[0].id,
                                    });
                                    this.onLoad(tempWeek?.days[0].id);
                                  }
                                  // this.listActivityReport(value);
                                }}
                              >
                                {/* <option value={1}>Testing Protocol Select</option> */}
                                {/* <option className="dropdown-item dropdown-menu react_select_menu">
                                Select Week
                              </option> */}

                                {pickerArray.length !== 0 &&
                                  pickerArray.map((item) => {
                                    return (
                                      <option
                                        className="dropdown-item dropdown-menu react_select_menu"
                                        value={item.value}
                                        key={item.value}
                                      >
                                        {item.label}
                                      </option>
                                    );
                                  })}
                              </select>
                              <span className="caret">
                                {/* <i className="fa fa-sort-desc "></i> */}
                              </span>
                            </div>
                          </div>
                        )}

                        <div className="ml-5">
                          {this.state?.selectedWeek?.days?.map(
                            (data, index) => {
                              return (
                                <button
                                  style={
                                    this.state.selectedDay === data?.id
                                      ? {
                                          backgroundColor: "#376af9",
                                          padding: "5px 14px",
                                          border: "1px solid #376af9",
                                          borderRadius: "5px",
                                          color: "#fff",
                                          fontSize: "14px",
                                          marginRight: "20px",
                                          cursor: "pointer",
                                        }
                                      : {
                                          backgroundColor: "#4A4A4A",
                                          padding: "5px 14px",
                                          border: "1px solid #376af9",
                                          borderRadius: "5px",
                                          color: "#fff",
                                          fontSize: "14px",
                                          marginRight: "20px",
                                          cursor: "pointer",
                                        }
                                  }
                                  onClick={() => {
                                    this.onLoad(data?.id);
                                    this.setState({ selectedDay: data?.id });
                                  }}
                                >
                                  {data.day_number}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {this.state.pickerArray.length === 0 ||
                  this.state?.selectedWeek?.days?.length === 0 ? (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignSelf: "center",
                      }}
                    >
                      <NoDataFound
                        height={250}
                        width={250}
                        text={`No day workout assigned`}
                      />
                    </div>
                  ) : (
                    <div>
                      <div>
                        <p>
                          Workout Report :{" "}
                          <span style={{ fontWeight: "bold" }}>
                            {
                              this.state.selectedWeek?.days?.find(
                                (x) => x.id === this.state.selectedDay
                              )?.day_number
                            }
                          </span>
                        </p>
                        <hr style={{ backgroundColor: "#fff" }} />
                      </div>
                      <div className="row">
                        <div className="col-lg-12 col-md-12">
                          <div className="d-lg-flex flex-wrap justify-content-between">
                            {report.length !== 0 &&
                              report?.map((item) => {
                                return (
                                  <div
                                    style={{
                                      // display: "flex",
                                      width: "23%",
                                      marginRight: "15px",
                                      marginBottom: "30px",
                                      // flexWrap: "wrap",
                                    }}
                                    key={item?.id}
                                  >
                                    <div class="card-analye-workout">
                                      <div class="container-analye-workout ">
                                        <div class="vl-analye-workout">
                                          <p>
                                            <b>{item?.name}</b>
                                          </p>
                                          <p>Sets : {item.totalSet}</p>
                                          {item?.data?.map((data, index) => {
                                            return (
                                              <div
                                                className="analyse-workout-inner"
                                                key={index}
                                              >
                                                <span className="analyse-workout-num-block">
                                                  {index + 1}
                                                </span>
                                                <p style={{ color: "#2F84CA" }}>
                                                  {data?.load_completed} Kg
                                                </p>
                                                <span className="analyse-workout-reps-block">
                                                  {data?.reps_completed} Reps
                                                </span>
                                              </div>
                                            );
                                          })}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                          </div>
                        </div>
                      </div>
                      <div>
                        {report.length === 0 && (
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignSelf: "center",
                            }}
                          >
                            <NoDataFound
                              height={250}
                              width={250}
                              text={`You did not complete
                            ${
                              this.state.selectedWeek?.days?.find(
                                (x) => x.id === this.state.selectedDay
                              )?.day_number
                            }
                            workout`}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </section>
          )}{" "}
        </div>
        <Footer />
      </div>
    );
  }
}

export default AnalyseWorkoutAthleteSide;
