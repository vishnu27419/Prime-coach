import React from "react";
import AthleteSectionGraph from "../../component/Charts/AthleteSectionGraph";
import { standardPostApi } from "../../container/API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default class WeeklyTopGraph extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // userDetail: this.props.userDetail,
      user_id: this.props.user_id,
      date: new Date(),
      endDate: new Date(),
      graphLabels: [],
      graphData: [],
      // access_user_id: "",
    };
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
    this.weekly_assigned_intensity_Wethout_Data();
  }

  weekly_assigned_intensity = async () => {
    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    // console.log("start_date", start_date);

    const end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    try {
      const res = await standardPostApi(
        "weekly_assigned_intensity",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.state.user_id,
          week_start_date: start_date,
          week_end_date: end_date,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log(
        //   "THIS IS RESPONSE OF weekly_assigned_intensity->",
        //   res.data.data
        // );
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
        });
        // toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  weekly_assigned_intensity_Wethout_Data = async () => {
    try {
      const res = await standardPostApi(
        "weekly_assigned_intensity",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          access_user_id: this.state.user_id,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        console.log(
          "THIS IS RESPONSE OF weekly_assigned_intensity->",
          res.data.data
        );
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
        });
        // toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  render() {
    // console.log("This is FOr Player Details", this.state.user_id);
    return (
      // <div className="self_screening">
      //   <div className="week_section_react">
      <div className="dashboard-wrapper">
        <section className="assigned-pagewrapper">
          <div className="container">
            <div className="weekassigned-wrapper week_section">
              <div className="row">
                <div className="col-lg-5 col-md-6">
                  <div className="d-lg-flex justify-content-between">
                    <select name="" className="form-control">
                      <option value="">Select Data</option>
                      <option value="">Assigned Intensity Average</option>
                      <option value="">Assigned Intensity Average</option>
                    </select>
                    <select name="" className="form-control">
                      <option value="">Workout Location</option>
                      <option value="">Home</option>
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
                    <label style={{ marginRight: "10px", marginLeft: "10px" }}>
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
                      onClick={this.weekly_assigned_intensity}
                    >
                      Submit Dates
                    </button>
                  </div>
                </div>
              </div>
              <div>
                {" "}
                <br />
                <AthleteSectionGraph
                  graphLabels={this.state.graphLabels}
                  graphData={this.state.graphData}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
      //   </div>
      // </div>
    );
  }
}
