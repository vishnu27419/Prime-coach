import React from "react";
import "../Coach After Login/PlayerReport.css";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Link } from "react-router-dom";
import PlayerReportGraph from "../../component/Charts/PlayerReportGraph";
import { standardPostApi } from "../API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class PlayerReport extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
      endDate: new Date(),
      reportSelectPicker: [],
      graphLabels: [],
      graphData: [],
      pickerName: "",
      workoutLocation: "",
    };
  }

  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
    console.log("this is update state", this.state);
  }

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date });
    console.log("The start date selected is ", this.state.date);
  };

  endDateChange = async (endDate) => {
    await this.setState({ endDate: endDate });
    console.log("The end  date .... is ", this.state.endDate);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  componentDidMount() {
    this.athlete_workout_activity_report();
  }

  onHandel = async (e) => {
    this.state.reportSelectPicker.map((item) => {
      if (e.target.value == item.value) {
        this.setState({ pickerName: item.label });
      }
    });
    await this.athlete_workout_activity_report(e.target.value);
  };

  handelChange = () => {
    // console.log("this is Working");
    this.athlete_workout_activity_report();
  };

  athlete_workout_activity_report = async (report_type_id) => {
    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    const end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    try {
      const res = await standardPostApi(
        "athlete_workout_activity_report",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          report_type_id: report_type_id,
          access_user_id: this.props.match.params.playerId,
          week_start: start_date,
          week_end: end_date,
        },
        true
      );
      if (res.data.code === 200) {
        console.log(
          "This is RESPONSE OF athlete_workout_activity_report->",
          res.data.data
        );

        res.data.data.WeekDetails.forEach((item) => {
          this.setState({
            workoutLocation: item.annual_training_program_location,
          });
        });

        let graphLabels = [];
        let graphData = [];

        res.data.data.WeekDetails.forEach((item) => {
          graphLabels.push(item.week_number);
        });

        res.data.data.WeekDetails.forEach((item) => {
          graphData.push(item.final_result);
        });

        await this.setState({
          reportSelectPicker: res.data.data.ReportTypeSelect.pickerArray,
          graphLabels: graphLabels,
          graphData: graphData,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log("This is New Workout Location--->", this.state.workoutLocation);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="reports-wrapper">
          <section className="assigned-pagewrapper">
            <div className="container-fluid pr-0">
              <div className="weekassigned-wrapper week_section">
                <div className="row" style={{ marginBottom: "3%" }}>
                  <div className="col-lg-12">
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
                          Reports
                        </li>
                      </ol>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="d-lg-flex justify-content-between">
                      <select
                        className="form-control"
                        defaultValue={this.state.pickerName}
                        onChange={this.onHandel}
                      >
                        <option value="">Report Type Select</option>
                        {this.state.reportSelectPicker &&
                          this.state.reportSelectPicker.map((item) => {
                            return (
                              <option value={item.value} key={item.id}>
                                {item.label}
                              </option>
                            );
                          })}
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
                      <label>
                        Graph Range Start Date
                        <DatePicker
                          selected={this.state.date}
                          onChange={this.handleDateChange}
                          name="DateOfBirth"
                          className="lable_graph"
                          dateFormat="dd-MM-yyyy"
                          showMonthDropdown
                          showYearDropdown
                          dropdownMode="select"
                          isClearable
                          withPortal
                        />
                      </label>
                      <label
                        style={{ marginRight: "20px", marginLeft: "20px" }}
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
                          isClearable
                          withPortal
                        />
                      </label>
                      <button
                        type="button"
                        className="btn-primary-after-react"
                        onClick={() => this.athlete_workout_activity_report()}
                      >
                        Submit Dates
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  <br />
                  <PlayerReportGraph
                    graphLabels={this.state.graphLabels}
                    graphData={this.state.graphData}
                    workoutLocation={this.state.workoutLocation}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "70px",
                    marginBottom: "70px",
                  }}
                >
                  <Link
                    to={{
                      pathname: `/analyseworkoutcoach/${this.props.match.params.id}/${this.props.match.params.playerId}/${this.props.match.params.teamname}`,
                      state: this.props.location.state,
                    }}
                    style={{ textDecoration: "none" }}
                  >
                    {/* <div onClick={() => alert("Coming soon!")}> */}
                    <button
                      // type="submit"
                      className="btn btn-default forgot_Password_Email_button"
                      style={{ padding: "6px 52px" }}
                    >
                      Analyse Workout
                    </button>
                    {/* </div> */}
                  </Link>
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

export default PlayerReport;
