import React from "react";
import { standardPostApi } from "../../container/API/ApiWrapper";
import AthleteSectionSecondGraph from "../Charts/AthleteSectionSecondGraph";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

class WeeklyAverageIntensity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user_id: this.props.user_id,
      date: "",
      endDate: "",
      reportSelectPicker: [],
      graphLabels: [],
      graphData: [],
      workoutLocation: "",
      reportTypeId: "",
      isLoading: false,
    };
  }

  async onChange(e) {
    await this.setState({ [e.target.name]: e.target.value });
    // console.log("this is update state", this.state);
  }

  componentDidMount() {
    // this.athlete_workout_activity_report();
    this.athleteWorkoutActivityReportForSelectPicker();
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

  // onHandel = async (e) => {
  //   console.log("this is Event==>", e.target.value);

  //   this.state.reportSelectPicker.forEach((item) => {
  //     if (e.target.value == item.id) {
  //       this.setState({ pickerName: item.label });
  //     }
  //   });
  //   console.log("this is name =====>>", this.state.pickerName);
  //   this.athlete_workout_activity_report(e.target.value);
  // };

  // athlete_workout_activity_report = async (report_type_id) => {
  //   const start_date = moment(this.toTimestamp(this.state.date) * 1000)
  //     .format("YYYY-MM-DD")
  //     .toString();

  //   const end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
  //     .format("YYYY-MM-DD")
  //     .toString();

  //   try {
  //     const res = await standardPostApi(
  //       "athlete_workout_activity_report",
  //       undefined,
  //       {
  //         access_token: await localStorage.getItem("access_token"),
  //         report_type_id: report_type_id,
  //         access_user_id: this.state.user_id,
  //         week_start: start_date,
  //         week_end: end_date,
  //       },
  //       true
  //     );
  //     if ((res.data.code = 200)) {
  //       console.log(
  //         "RESPONSE OF athlete_workout_activity_report",
  //         res.data?.data?.ReportTypeSelect?.pickerArray
  //       );

  //       res.data.data.WeekDetails.forEach((item) => {
  //         this.setState({
  //           workoutLocation: item.annual_training_program_location,
  //         });
  //       });

  //       let graphLabels = [];
  //       let graphData = [];

  //       res.data.data.WeekDetails.forEach((item) => {
  //         graphLabels.push(item.week_number);
  //       });

  //       res.data.data.WeekDetails.forEach((item) => {
  //         graphData.push(item.final_result);
  //       });

  //       await this.setState({
  //         reportSelectPicker: res.data?.data?.ReportTypeSelect?.pickerArray,
  //         graphLabels: graphLabels,
  //         graphData: graphData,
  //         pickerName: res.data?.data?.ReportTypeSelect?.pickerArray[12]?.id,
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  athleteWorkoutActivityReportForSelectPicker = async () => {
    const start_date = moment(this.state.date).format("YYYY-MM-DD");

    const end_date = moment(this.state.endDate).format("YYYY-MM-DD");
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "athlete_workout_activity_report",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.state.user_id,
          // week_start_date: start_date,
          // week_end_date: end_date,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "Response athleteWorkoutActivityReportForSelectPicker",
        //   res.data?.data?.ReportTypeSelect?.pickerArray[12]
        // );

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

        this.setState({
          reportSelectPicker: res.data?.data?.ReportTypeSelect?.pickerArray,
          pickerName: res.data?.data?.ReportTypeSelect?.pickerArray[12]?.id,
          graphLabels: graphLabels,
          graphData: graphData,
        });
      }
    } catch (error) {
      console.error(
        "error of athleteWorkoutActivityReportForSelectPicker",
        error
      );
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandel = async (e) => {
    console.log("this is Event==>", e.target.value);
    this.setState({ pickerName: e.target.value, date: "", endDate: "" });
    this.athleteWorkoutActivityReportAtOnchange(e.target.value);
  };

  athleteWorkoutActivityReportAtOnchange = async (report_type_id) => {
    const start_date = moment(this.state.date).format("YYYY-MM-DD");

    const end_date = moment(this.state.endDate).format("YYYY-MM-DD");
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "athlete_workout_activity_report",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.state.user_id,
          report_type_id: report_type_id,
          // week_start_date: start_date,
          // week_end_date: end_date,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "Res athleteWorkoutActivityReportAtOnchange",
        //   res.data?.data
        // );

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

        this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
        });
      }
    } catch (error) {
      console.error("error of athleteWorkoutActivityReportForSelectPicker");
    } finally {
      this.setState({ isLoading: false });
    }
  };

  athleteWorkoutActivityReportWithDate = async () => {
    const start_date = moment(this.state.date).format("YYYY-MM-DD");

    const end_date = moment(this.state.endDate).format("YYYY-MM-DD");
    this.setState({ isLoading: true });
    try {
      const res = await standardPostApi(
        "athlete_workout_activity_report",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.state.user_id,
          report_type_id: this.state.pickerName,
          week_start_date: start_date,
          week_end_date: end_date,
        },
        true
      );
      if (res.data.code === 200) {
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

        this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
        });
      }
    } catch (error) {
      console.error("error of athleteWorkoutActivityReportWithDate", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    return (
      <div className="dashboard-wrapper">
        <section className="average-pagewrapper pb-5" id="average-pagewrapper">
          <div className="container">
            <div className="weekassigned-wrapper week_section">
              <div className="row">
                <div className="col-lg-7 col-md-6">
                  <div className="d-lg-flex justify-content-between">
                    <select
                      className="form-control"
                      value={this.state.pickerName}
                      onChange={this.onHandel}
                    >
                      <option value="">Report Type Select</option>
                      {this.state.reportSelectPicker &&
                        this.state.reportSelectPicker.map((item) => {
                          return (
                            <option value={item.id} key={item.id}>
                              {item.label}
                            </option>
                          );
                        })}
                    </select>

                    <select
                      name=""
                      className="form-control"
                      defaultValue={this.state.workoutLocation}
                      selected
                      onChange={this.handelChange}
                    >
                      <option value="">Workout Location</option>
                      <option value="Home">Home</option>
                      <option value="Gym">Gym</option>
                    </select>
                  </div>
                </div>
                <div className="col-lg-5 col-md-6">
                  <div className="d-lg-flex justify-content-around align-items-center">
                    <label
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      {/* Start Date */}
                      <DatePicker
                        selected={this.state.date}
                        onChange={this.handleDateChange}
                        name="DateOfBirth"
                        className="lable_graph"
                        dateFormat="dd-MM-yyyy"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        placeholderText="Start Date"
                        // isClearable
                        // onKeyDown={() => alert("asdddas")}
                      />
                    </label>
                    <label
                      style={{
                        marginRight: "20px",
                        marginLeft: "20px",
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      {/* End Date */}
                      <DatePicker
                        selected={this.state.endDate}
                        onChange={this.endDateChange}
                        name="DateOfBirth"
                        className="lable_graph"
                        dateFormat="dd-MM-yyyy"
                        showMonthDropdown
                        showYearDropdown
                        dropdownMode="select"
                        autoComplete="off"
                        placeholderText="End Date"

                        // isClearable
                      />
                    </label>
                    <div>
                      <button
                        type="button"
                        className="btn-primary-after-react "
                        // onClick={() => this.athlete_workout_activity_report()}
                        onClick={() =>
                          this.athleteWorkoutActivityReportWithDate()
                        }
                      >
                        Sumbit Dates
                        {/* <i className="fa fa-check" aria-hidden="true"></i> */}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {this.state.isLoading && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <i
                    className="fa fa-spinner fa-spin fa-3x fa-fw"
                    // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                    style={{
                      color: "var(--appBlue2)",
                      fontSize: "29px",
                    }}
                  />
                </div>
              )}

              <div className="chart">
                <br />
                <AthleteSectionSecondGraph
                  graphLabels={this.state.graphLabels}
                  graphData={this.state.graphData}
                  workoutLocation={this.state.workoutLocation}
                  isLoading={this.state.isLoading}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: "40px",
                  // marginBottom: "70px",
                }}
              >
                <Link
                  to="/selfscreening/analyseworkoutathlete"
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
    );
  }
}

export default WeeklyAverageIntensity;
