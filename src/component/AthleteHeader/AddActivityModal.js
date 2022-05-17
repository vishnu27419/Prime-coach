import React from "react";
import { Modal } from "react-bootstrap";
import { standardPostApi } from "../../container/API/ApiWrapper";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";

// moment and timestamp in react js
import moment from "moment";

// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { errorToast } from "utils/toastMessage";

export default class AddActivityModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      preAddUserActivity: [],
      date: new Date(),
      intensity: "",
      activityType: "",
      duration: "",
      activityTypeError: "",
      durationError: "",
      dateError: "",
      IntensityError: "",
    };
    this.onValueChange = this.onValueChange.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onValueChange(event) {
    this.setState({
      intensity: event.target.value,
    });
    // console.log("this is state", this.state.intensity);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("onChange", this.state.activityType, this.state.duration);
  }

  componentDidMount() {
    this.pre_add_user_activity();
  }

  pre_add_user_activity = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_user_activity",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        this.setState({ preAddUserActivity: res.data.data.pickerArray });
        // console.log(
        //   "this is res of pre_add_user_activity*",
        //   res.data.data.pickerArray
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  add_user_activity = async () => {
    const weekId = this.props?.athleteList?.weeks?.find((data) => data);
    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    const isValid = this.validationAddUserActivity();
    if (isValid) {
      try {
        const res = await standardPostApi(
          "add_user_activity",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            annual_training_program_id: this.props.athleteList.id,
            annual_training_program_week_id: weekId.id,
            activity_type: this.state.activityType,
            activity_duration: this.state.duration,
            activity_date: start_date,
            activity_intensity: this.state.intensity,
          },
          true
        );
        if (res.data.code === 200) {
          // console.log("This is Res of add_user_activity=>", res.data.data);
          toast.success(res.data.message);
          this.setState({
            date: new Date(),
            intensity: "",
            activityType: "",
            duration: "",
            activityTypeError: "",
            durationError: "",
            dateError: "",
            IntensityError: "",
          });
          await this.props.onHide();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  validationAddUserActivity = () => {
    let activityTypeError = "";
    let durationError = "";
    let dateError = "";
    let IntensityError = "";

    if (!this.state.activityType) {
      activityTypeError = "Please Select Activity Type";
    }

    if (!this.state.duration) {
      durationError = "Duration field is required.";
    }

    if (!this.state.date) {
      dateError = "Date field is required.";
    }
    if (!this.state.intensity) {
      IntensityError = "The field Intensity must be between 1 and 10.";
    }

    if (activityTypeError || durationError || dateError || IntensityError) {
      this.setState({
        activityTypeError,
        durationError,
        dateError,
        IntensityError,
      });
      return false;
    } else {
      return true;
    }
  };

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date, hasSetDate: true });
    console.log("The start date selected is ", this.state.date);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  isInputNumber = (event) => {
    var char = String.fromCharCode(event.which);
    if (!/[0-9]/.test(char)) {
      event.preventDefault();
    }
  };
  showTostNotAssign = () => {
    errorToast("No workout assigned to athlete yet");
  };

  render() {
    const { activityType, duration } = this.state;
    const { noWrkoutAssignAddActivity } = this.props;
    // console.log("this.props.athleteList", this.props.athleteList);

    // console.log(this.props.athleteList);
    return (
      <div>
        <Modal
          show={this.props.show}
          onHide={this.props.onHide}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="add_activityTitle">
                Add Activity
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.props.onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <form action="">
                <div className="form-group">
                  <label htmlFor="">Activity Type</label>
                  <select
                    className="form-control"
                    name="activityType"
                    value={activityType}
                    onChange={this.onChange}
                  >
                    <option value="">Select Activity Type</option>
                    {this.state.preAddUserActivity.map((item) => {
                      return (
                        <option value={item.value} key={item.id}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                  <p className="react_validation ">
                    {this.state.activityTypeError}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="">Duration (in minutes)</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="0"
                    onKeyPress={this.isInputNumber}
                    name="duration"
                    value={duration}
                    onChange={this.onChange}
                  />
                  <p className="react_validation ">
                    {this.state.durationError}
                  </p>
                </div>

                <div className="form-group">
                  <label htmlFor="">Date</label>

                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    name="DateOfBirth"
                    className="form-control"
                    dateFormat="dd-MM-yyyy"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                  />
                  <img
                    className="celender_img "
                    src={Calander}
                    alt={Calander}
                  />
                  <p className="react_validation ">{this.state.dateError}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="">Intensity</label>
                  <div className="middle">
                    {/* {Array.from(Array(10).keys()).map((index) => ( */}
                    {Array.from(Array(10).keys()).map((index) => (
                      <span key={index}>
                        <label>
                          <input
                            type="radio"
                            name="radio"
                            value={index + 1}
                            onChange={this.onValueChange}
                          />
                          <div className="front-end box">
                            <span>{index + 1}</span>
                          </div>
                        </label>
                        &nbsp;
                      </span>
                    ))}
                  </div>
                  <p className="react_validation ">
                    {this.state.IntensityError}
                  </p>
                </div>

                <div className="text-right">
                  {noWrkoutAssignAddActivity ? (
                    <button
                      type="button"
                      className="Model_btn"
                      onClick={this.add_user_activity}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="Model_btn"
                      onClick={() => this.showTostNotAssign()}
                    >
                      Save
                    </button>
                  )}
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
