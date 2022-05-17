import React from "react";
import "../Coach After Login/TranningPlan.css";
import { Link } from "react-router-dom";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import TranningPlanGraph from "../../component/Charts/TranningPlanGraph";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
class TranningPlan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      endDate: new Date(),
      graphLabels: [],
      graphData: [],
      weeklyIntensityArray: [],
      selectData: 1,
      workoutLocation: "",
    };
  }

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date });
    // console.log("The start date selected is ", this.state.date);
  };

  endDateChange = async (endDate) => {
    await this.setState({ endDate: endDate });
    // console.log("The end  date .... is ", this.state.endDate);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  componentDidMount() {
    this.weekly_assigned_intensity_wethout_date();
  }

  handelChange = () => {
    // console.log("this is Working");
    this.weekly_assigned_intensity_wethout_date();
  };

  weekly_assigned_intensity_wethout_date = async () => {
    try {
      const res = await standardPostApi(
        "weekly_assigned_intensity",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),

          access_user_id: this.props.match.params.playerId,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        console.log("RESPONSE OF weekly_assigned_intensity ->", res.data.data);

        let graphLabels = [];
        let graphData = [];

        res.data.data.forEach((item) => {
          graphLabels.push(item.week_number);
        });
        // console.log("labels", graphLabels);

        res.data.data.forEach((item) => {
          graphData.push(item.average_intensity);
        });
        // console.log("graphData", graphData);

        res.data.data.forEach((item) => {
          this.setState({
            workoutLocation: item.annual_training_program_location,
          });
        });

        await this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
          weeklyIntensityArray: res.data.data,
        });
        // toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  weekly_assigned_intensity = async () => {
    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    const end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    try {
      const res = await standardPostApi(
        "weekly_assigned_intensity",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          week_start_date: start_date,
          week_end_date: end_date,
          access_user_id: this.props.match.params.playerId,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log("RESPONSE OF weekly_assigned_intensity ->", res.data.data);

        let graphLabels = [];
        let graphData = [];

        res.data.data.forEach((item) => {
          graphLabels.push(item.week_number);
        });
        // console.log("labels", graphLabels);

        res.data.data.forEach((item) => {
          graphData.push(item.average_intensity);
        });
        // console.log("graphData", graphData);

        await this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
          weeklyIntensityArray: res.data.data,
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log("this is From Location-->", this.props.location.state);
    console.log("this is workoutLocation", this.state.workoutLocation);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className=" myteams_wrapper">
            <div className="container">
              <div className="weekassigned-wrapper week_section">
                <div className="row">
                  <div className="col-lg-12 pr-0">
                    <div className="d-flex justify-content-between align-items-center">
                      <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                          <Link
                            to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                          >
                            {this.props.match.params.teamname}
                          </Link>
                        </li>
                        <li className="breadcrumb-item">
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
                          Training Plan
                        </li>
                      </ol>
                    </div>
                    <div
                      style={{
                        borderBottom: "1px solid #fff",
                        marginBottom: "6%",
                      }}
                      className="col-md-12"
                    >
                      <hr style={{ marginTop: "none", borderTop: "none" }} />
                    </div>
                  </div>

                  <div className="col-lg-5 col-md-6">
                    <div className="d-lg-flex justify-content-between">
                      <select
                        className="form-control"
                        onChange={this.handelChange}
                        defaultValue={this.state.selectData}
                      >
                        <option value="">Select Data</option>
                        <option value={this.state.selectData}>
                          Assigned Intensity Average
                        </option>
                      </select>

                      <select
                        name=""
                        className="form-control"
                        value={this.state.workoutLocation}
                        selected
                        onChange={this.handelChange}
                      >
                        <option value="">Workout Location</option>
                        <option value="Home">Home</option>
                        <option value="Gym">Gym</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6">
                    <div className="d-lg-flex justify-content-around align-items-center">
                      <label htmlFor="">
                        Graph Range Start Date
                        {/* <div className="lable_graph"> */}
                        <DatePicker
                          selected={this.state.date}
                          onChange={this.handleDateChange}
                          name="DateOfBirth"
                          className="lable_graph"
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                        {/* </div> */}
                      </label>
                      <label
                        htmlFor=""
                        style={{ marginRight: "10px", marginLeft: "10px" }}
                      >
                        Graph Range End Date
                        <DatePicker
                          selected={this.state.endDate}
                          onChange={this.endDateChange}
                          name="DateOfBirth"
                          className="lable_graph"
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                        />
                      </label>
                      <button
                        type="button"
                        className="btn-primary-after-react"
                        onClick={() => this.weekly_assigned_intensity()}
                      >
                        Submit Dates
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {" "}
                  <br />
                  <TranningPlanGraph
                    graphLabels={this.state.graphLabels}
                    graphData={this.state.graphData}
                    workoutLocation={this.state.workoutLocation}
                  />
                </div>
              </div>
              <div className="weekassigned-wrapper week_section  ">
                <div className="col-lg-12  " style={{ textAlign: "center" }}>
                  <div className="asign_team_right">
                    <ul className="list-inline season_btn">
                      <li>
                        {/* to={{
                              pathname: `/annualinsession/${annual_training_program_id}/${in_season}`,
                              state: annualPlan,
                            }} */}
                        <Link
                          to={{
                            pathname: `/tranningplanweek/${
                              this.props.match.params.id
                            }/${this.props.match.params.playerId}/${
                              this.props.match.params.teamname
                            }/${"in_season"}`,
                            state: this.props.location.state,
                          }}
                          // to="/tranningplanweek"
                          style={{ textDecoration: "none" }}
                        >
                          in season
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: `/tranningplanweek/${
                              this.props.match.params.id
                            }/${this.props.match.params.playerId}/${
                              this.props.match.params.teamname
                            }/${"off_season"}`,
                            state: this.props.location.state,
                          }}
                          // to="/tranningplanweek"
                          style={{ textDecoration: "none" }}
                        >
                          off season
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: `/tranningplanweek/${
                              this.props.match.params.id
                            }/${this.props.match.params.playerId}/${
                              this.props.match.params.teamname
                            }/${"pre_season"}`,
                            state: this.props.location.state,
                          }}
                          // to="/tranningplanweek"
                          style={{ textDecoration: "none" }}
                        >
                          pre season
                        </Link>
                      </li>
                      <li>
                        <Link
                          to={{
                            pathname: `/tranningplanweek/${
                              this.props.match.params.id
                            }/${this.props.match.params.playerId}/${
                              this.props.match.params.teamname
                            }/${"transition"}`,
                            state: this.props.location.state,
                          }}
                          // to="/tranningplanweek"
                          style={{ textDecoration: "none" }}
                        >
                          transition
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default TranningPlan;
