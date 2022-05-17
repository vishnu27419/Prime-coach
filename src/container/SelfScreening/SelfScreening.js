import React, { Component, useState } from "react";
import InnerHeader from "../../container/PublicLayout/InnerHeader";
import Footer from "../../container/PublicLayout/Footer";
import { Modal } from "react-bootstrap";
import { Redirect } from "react-router";
import $, { data } from "jquery";
import { findDOMNode } from "react-dom";
import { standardPostApi } from "../../container/API/ApiWrapper";
import Checkbox from "../../component/Checkbox/Checkbox";
import AssignedWeek from "../../component/SelfScreen/AssignedWeek";
import WeeklyReport from "../../component/SelfScreen/WeeklyReport";
import WeeklyAverageIntensity from "../../component/SelfScreen/WeeklyAverageIntensity";
import AthleteSectionGraph from "../../component/Charts/AthleteSectionGraph";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../../container/Loader/LoaderWrapper";
import { successToast } from "../../utils/toastMessage";
import { connect } from "react-redux";
import { listAthleteWorkoutRequest } from "../../store/actions";
import { ContactlessOutlined } from "@material-ui/icons";
import black from "Custom/images/black.jpg";
import NoDataFound from "component/lottiLoader/LottiLoader";
import AthleteCoachLibrary from "component/SelfScreen/AthleteCoachLibrary/AthleteCoachLibrary";

function getId(url) {
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

function SelfScreeningModel(props) {
  const url = props.modalVideo;
  const urlId = getId(url);
  // const [loading, setLoading] = useState(true);

  // console.log("urlID", urlId);

  return (
    <Modal
      show={props.showModal}
      onHide={props.onHidePress}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      // size="lg"
    >
      <Modal.Body>
        <div className="modal-header">
          <h5 className="modal-title" id="videopopupTitle">
            {/* Back to wall shoulder */}
            {props.modalName}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHidePress}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <iframe
              // onLoad={() => setLoading(false)}
              // placeholder="abcccc"
              width="100%"
              title="video"
              height="345"
              src={`https://www.youtube.com/embed/${urlId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            <div className="col-md-12">
              <table className="table">
                <thead>
                  <tr>
                    <th>Dysfunction</th>
                    <th>Applies?</th>
                  </tr>
                </thead>
                {props.modalDysfunctionArray &&
                  props.modalDysfunctionArray.map((item, index) => {
                    return (
                      <tbody key={item.name}>
                        <tr>
                          <td>
                            <div className="dysfunction-tile">
                              <div className="dysfunction-tile-title">
                                {item.name}
                              </div>

                              <img
                                className="dysfunction-tile-body"
                                src={item.image}
                                alt={item.image}
                              />
                            </div>
                          </td>
                          <td>
                            <Checkbox
                              toggleCb={() => props.toggleCb(index, item.id)}
                              checked={item.checked}
                              value={item.id}
                            />
                          </td>
                        </tr>
                      </tbody>
                    );
                  })}
              </table>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="Model_btn pull-right"
          data-dismiss="modal"
          onClick={props.onButtonClick}
        >
          Save
        </button>
      </Modal.Body>
    </Modal>
  );
}

function ExercisesModal(props) {
  const viedioUrl = props.exerciseModalvideo;
  const urlId = getId(viedioUrl);
  return (
    <Modal
      show={props.showCorrectiveExercises}
      onHide={props.onHidePressExercises}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body>
        <div className="modal-header">
          <h5 className="modal-title" id="videopopupTitle">
            {/* Modal title */}
            {props.exerciseModalName}
          </h5>
          <button
            type="button"
            className="close"
            data-dismiss="modal"
            aria-label="Close"
            onClick={props.onHidePressExercises}
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <div>
            <iframe
              title="video"
              width="100%"
              height="315"
              src={`https://www.youtube.com/embed/${urlId}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen=""
            ></iframe>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

class SelfScreening extends Component {
  userData;
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      show: false,
      signupPage: true,
      selfScreening: [],
      modalName: "",
      modalVideo: "",
      modalDysfunction: [],
      correctiveExercises: [],
      CorrectiveExercisesModal: false,
      exerciseModalName: "",
      exerciseModalvideo: "",
      checkedItems: new Map(),
      dysfunction: [],
      selfScreeningItem: null,
      selfScreeningItemArray: [],
      isChecked: false,
      checkboxes: [],
      visibleWeeklyTopGraph: false,
      visibleAssignedWeek: false,
      visibleWeeklyReport: false,
      visibleWeeklyAverageIntensity: false,
      visibleCorrectiveExercises: true,
      viewWorkoutModalArray: {},
      startWorkoutArray: {},
      RESULT: {},
      user_id: "",
      WEEK_RESULT: {},
      date: new Date(),
      endDate: new Date(),
      graphLabels: [],
      graphData: [],
      indexFromGraph: "",
      selectedDysfunctions: [],
      visibleNeedAnalysis: false,
      viewMore: false,
      trainingSessionReport: "",
      fullArray: {},
      sportAnalysesLoader: false,
      // WEEK_INDEX: 0,
    };
    !localStorage.getItem("access_token") && this.props.history.push("/");
    this.checkLoginUrl();
    this.deleteEvent = this.deleteEvent.bind(this);
  }

  checkLoginUrl = async () => {
    const token = await localStorage.getItem("access_token");
    const role = await localStorage.getItem("access_role");
    if (token == null && role == null) {
      this.setState({ signupPage: false });
    }
  };

  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date });
  };

  endDateChange = async (endDate) => {
    await this.setState({ endDate: endDate });
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  // handleToggle = () => {
  //   const el = findDOMNode(this.refs.toggle);
  //   // $(el).toggle("#toggle");
  //   $(el).show();
  //   // $(el).hide("#commonInjury");
  // };
  // handleToggleInjuries = () => {
  //   const el = findDOMNode(this.refs.toggle);
  //   // $(el).toggle("#toggleinjury");
  //   $(el).hide();
  // };

  showModal = async (item) => {
    await this.setState({
      show: !this.state.show,
      modalName: item.name,
      modalVideo: item.video,
      modalDysfunction: item.dysfunction,
      selfScreeningItem: item,
      selfScreeningItemArray: item.dysfunction,
    });
    this.initiateDysFunctionsArray();
  };

  hideModal = async (item) => {
    await this.setState({ show: false, selectedDysfunctions: [] });
  };

  showCorrectiveExercises = async (data) => {
    await this.setState({
      CorrectiveExercisesModal: !this.state.CorrectiveExercisesModal,
      exerciseModalName: data.name,
      exerciseModalvideo: data.video,
    });
  };

  hideCorrectiveExercises = async (data) => {
    await this.setState({ CorrectiveExercisesModal: false });
  };

  componentDidMount() {
    this.fetchSelfScreeningData();
    this.list_athlete_workout();
    this.user_profile();
    this.weekly_assigned_intensity_Wethout_Data();
    this.sport_need_analysis();
  }

  fetchSelfScreeningData = async () => {
    try {
      const res = await standardPostApi(
        "list_self_screening",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log(
        //   "this is Response of list_self_screening--->",
        //   res.data.data
        // );
        this.fetchCorrectiveExercises();
        this.setState({ selfScreening: res.data.data, loading: false });
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  fetchCorrectiveExercises = async () => {
    try {
      const res = await standardPostApi(
        "list_corrective_exercises",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        // console.log(
        //   "this is Response of list_corrective_exercises--->",
        //   res.data.data
        // );
        this.setState({ correctiveExercises: res.data.data, loading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  deleteEvent = (index) => {
    const copyPostArray = Object.assign([], this.state.selfScreening);
    copyPostArray.splice(index, 1);
    this.setState({
      selfScreening: copyPostArray,
      show: false,
    });
  };

  initiateDysFunctionsArray = async () => {
    const { selectedDysfunctions, selfScreeningItem } = this.state;
    for (let i = 0; i < selfScreeningItem.dysfunction.length; i++) {
      selectedDysfunctions.push({
        id: selfScreeningItem.dysfunction[i].id,
        status: 0,
      });
    }
  };

  toggleCheckBox = async (index, id) => {
    const { selectedDysfunctions, selfScreeningItem } = this.state;
    console.log(
      "This is selectedDysfunctions-->",
      selectedDysfunctions,
      "This is selfScreeningItem",
      selfScreeningItem
    );
    const changedCheckbox = selfScreeningItem.dysfunction.find(
      (cb) => cb.id === id
    );
    changedCheckbox.checked = !changedCheckbox.checked;
    if (changedCheckbox.checked === true) {
      selectedDysfunctions[index].status = 1;
    } else if (changedCheckbox.checked === false) {
      selectedDysfunctions[index].status = 0;
    }
    console.log("selectedDysfunctions ", selectedDysfunctions);
    const checkboxes = Object.assign(
      {},
      selfScreeningItem.dysfunction,
      changedCheckbox
    );
    this.setState({ checkboxes });
  };

  checkIfAllFalse = () => {
    const { selfScreening } = this.state;
    let new_array = [];
    selfScreening.forEach((item) => {
      if (item.saved_for_user === true) {
        new_array.push(item);
      }
    });
    if (selfScreening.length === new_array.length) {
      return false;
    } else {
      return true;
    }
  };

  saveSelfScreening = async () => {
    const { selfScreeningItem, selectedDysfunctions } = this.state;
    try {
      const res = await standardPostApi(
        "save_self_screening",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          screening_id: selfScreeningItem.id,
          dysfunctions: JSON.stringify(selectedDysfunctions),
        },
        true
      );
      if (res.data.code === 200) {
        this.fetchSelfScreeningData();
        this.setState({
          show: false,
          selectedDysfunctions: [],
        });
        console.log("save self ", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // *********************These Are Athlete Dashboard Apis*********************
  list_athlete_workout = async () => {
    try {
      const res = await standardPostApi(
        "list_athlete_workout",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code == 301) {
        toast.error(res.data.message);
      }
      if (res.data.code === 200) {
        // console.log("This is Overall Response--->", res.data.data);
        this.setState({ fullArray: res.data.data });
        this.props.listAthleteWorkoutRequest(res.data.data);
        const resultFirst = res.data.data.find(
          (data) => data.annual_program_completed === false
        );

        if (resultFirst) {
          this.setState({ RESULT: resultFirst });
        } else {
          this.setState({ RESULT: res.data.data[res.data.data.length - 1] });
        }

        const weekResult = this.state.RESULT.weeks.find(
          (item) => item.week_completed === false
        );
        if (weekResult) {
          this.setState({ WEEK_RESULT: weekResult });
        } else {
          this.setState({
            WEEK_RESULT:
              this.state.RESULT.weeks[this.state.RESULT.weeks.length - 1],
          });
        }
        // const weekIndex = this.state.RESULT.weeks.findIndex(
        //   (item) => item.week_completed === false
        // );
        // if (weekIndex !== -1) {
        //   this.setState({ WEEK_INDEX: weekIndex });
        // } else {
        //   this.setState({
        //     WEEK_INDEX: 0,
        //   });
        // }

        await this.setState({
          loading: false,
          visibleWeeklyTopGraph: true,
          visibleAssignedWeek: true,
          visibleWeeklyReport: true,
          visibleWeeklyAverageIntensity: true,
          visibleCorrectiveExercises: true,
          visibleNeedAnalysis: true,
          viewWorkoutModalArray: this.state.WEEK_RESULT,
          startWorkoutArray: this.state.RESULT,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  user_profile = async () => {
    try {
      const res = await standardPostApi(
        "user_profile",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        await this.setState({ user_id: res.data.data.id });
        // console.log("THIS IS A USER PROFILE---->", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // ******************************For Graph********************************************************

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
        let graphLabels = [];
        let graphData = [];

        res.data.data.forEach((item) => {
          graphLabels.push(item.week_number);
        });

        res.data.data.forEach((item) => {
          graphData.push(item.average_intensity);
        });

        await this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
        });
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
          access_user_id: this.state.user_id,
          week_start_date: start_date,
          week_end_date: end_date,
        },
        true
      );
      if (res.data.code === 200) {
        let graphLabels = [];
        let graphData = [];

        res.data.data.forEach((item) => {
          graphLabels.push(item.week_number);
        });

        res.data.data.forEach((item) => {
          graphData.push(item.average_intensity);
        });

        await this.setState({
          graphLabels: graphLabels,
          graphData: graphData,
        });
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  sport_need_analysis = async () => {
    this.setState({ sportAnalysesLoader: true });
    try {
      const res = await standardPostApi(
        "sport_need_analysis",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true,
        false
      );
      if (res.data.code === 200) {
        // console.log("THIS IS A sport_need_analysis->", res.data.data);
        await this.setState({ SportAnalysis: res.data.data });
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ sportAnalysesLoader: false });
    }
  };

  NeedsAnalysisViewMore = async () => {
    const { viewMore } = this.state;
    await this.setState({ viewMore: !viewMore });
  };

  trainingSessionSpecificReportApi = async (week) => {
    const days = week.days.find((data) => data);
    // console.log("This is Week data --->", week);
    // console.log("annual_training_program_id", week.annual_training_program_id);
    // console.log("annual_training_program_week_id", week.id);
    // console.log("annual_training_program_week_day_id", days?.id);

    try {
      const res = await standardPostApi(
        "training_session_specific_report",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          annual_training_program_id: week?.annual_training_program_id,
          annual_training_program_week_id: week?.id,
          annual_training_program_week_day_id: days?.id,
          access_user_id: this.state.user_id,
        },
        true,
        false
      );
      if (res.data.code === 200) {
        console.log("response of athlete tranning report", res.data.data);
        this.setState({ trainingSessionReport: res.data.data });
      }
    } catch (err) {
      console.error(err);
    }
  };

  nextWeek = async () => {
    const { viewWorkoutModalArray, startWorkoutArray } = this.state;

    const week_index = startWorkoutArray?.weeks?.findIndex(
      (x) => x.id === viewWorkoutModalArray?.id
    );
    if (week_index !== -1) {
      if (week_index < startWorkoutArray?.weeks?.length - 1) {
        this.setState({
          viewWorkoutModalArray: startWorkoutArray?.weeks?.[week_index + 1],
        });
      }
    }
  };
  prevWeek = async () => {
    const { viewWorkoutModalArray, startWorkoutArray } = this.state;

    const week_index = startWorkoutArray?.weeks?.findIndex(
      (x) => x.id === viewWorkoutModalArray?.id
    );
    if (week_index !== -1) {
      if (week_index > 0) {
        this.setState({
          viewWorkoutModalArray: startWorkoutArray?.weeks?.[week_index - 1],
        });
      }
    }
  };

  render() {
    if (this.state.signupPage === false) {
      return <Redirect to="/" />;
    }

    // console.log("this is fullArray", this.state.fullArray);

    // console.log("This responser", this.state.viewWorkoutModalArray);
    const {
      selfScreening,
      correctiveExercises,
      selfScreeningItemArray,
      selfScreeningItem,
      viewMore,
      trainingSessionReport,
      sportAnalysesLoader,
      SportAnalysis,
    } = this.state;

    var result;
    result =
      selfScreeningItem &&
      selfScreeningItem.dysfunction.map(function (el) {
        var o = Object.assign({}, el);
        o.checked = false;
        return o;
      });

    // console.log("START WORK OUT ARRAY", this.state.startWorkoutArray);
    // console.log(
    //   "this.props.viewWorkoutModalArray",
    //   this.state.viewWorkoutModalArray
    // );

    return (
      <div
        className="loader_sec"
        style={{ display: "flex", flex: 1, flexDirection: "column" }}
      >
        <InnerHeader />
        {this.state.loading ? (
          //
          <span style={{ height: "100vh" }}>
            <Loader />
          </span>
        ) : (
          <div>
            {this.state.visibleWeeklyTopGraph && (
              <div>
                <div className="dashboard-wrapper">
                  <section className="assigned-pagewrapper">
                    <div className="container">
                      <div className="weekassigned-wrapper week_section">
                        <div className="row">
                          <div className="col-lg-7 col-md-6">
                            <div className="d-lg-flex justify-content-between">
                              <select name="" className="form-control">
                                <option value="">Select Data</option>
                                <option value="">
                                  Assigned Intensity Average
                                </option>
                                <option value="">
                                  Assigned Intensity Average
                                </option>
                              </select>
                              <select name="" className="form-control">
                                <option value="">Workout Location</option>
                                <option value="">Home</option>
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
                                {/* Graph Range Start Date */}
                                <DatePicker
                                  selected={this.state.date}
                                  onChange={this.handleDateChange}
                                  name="DateOfBirth"
                                  className="lable_graph"
                                  dateFormat="dd-MM-yyyy"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  // isClearable
                                  placeholderText="Start Date"
                                  withPortal
                                />
                              </label>
                              <label
                                style={{
                                  marginRight: "10px",
                                  marginLeft: "10px",
                                  display: "flex",
                                  justifyContent: "flex-start",
                                  alignItems: "flex-start",
                                  flexDirection: "column",
                                }}
                              >
                                {/* Graph Range End Date */}
                                <DatePicker
                                  selected={this.state.endDate}
                                  onChange={this.endDateChange}
                                  name="DateOfBirth"
                                  className="lable_graph"
                                  dateFormat="dd-MM-yyyy"
                                  showMonthDropdown
                                  showYearDropdown
                                  dropdownMode="select"
                                  // isClearable
                                  placeholderText="End Date"
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
                            onPointClick={async (e, element) => {
                              if (element.length > 0) {
                                var ind = element[0]._index;
                                this.setState({
                                  // WEEK_RESULT: this.state.RESULT.weeks[ind],
                                  viewWorkoutModalArray:
                                    this.state.RESULT.weeks[ind],
                                });
                                this.trainingSessionSpecificReportApi(
                                  this.state.viewWorkoutModalArray
                                );

                                successToast(
                                  `${this.state.viewWorkoutModalArray.week_number} Switched Successfully`
                                );
                              }
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </section>
                </div>
              </div>
            )}

            {selfScreening.length > 0 && this.checkIfAllFalse() && (
              <div className="self_screening">
                <div className="container">
                  <div className="week_section_react">
                    <div className="heading">
                      <h3>Self Screening</h3>
                    </div>
                    <SelfScreeningModel
                      onHidePress={() => this.hideModal()}
                      showModal={this.state.show}
                      modalName={this.state.modalName}
                      modalVideo={this.state.modalVideo}
                      modalDysfunctionArray={
                        selfScreeningItem && selfScreeningItem.dysfunction
                      }
                      onButtonClick={() => {
                        this.saveSelfScreening();
                      }}
                      toggleCb={(index, id) => this.toggleCheckBox(index, id)}
                    />
                    <div className="week_section_react_table">
                      {/* <table className="table mb-0 "> */}
                      <table className=" mb-0 react_selfScreen_Table">
                        <thead>
                          <tr>
                            <td style={{ fontWeight: "bold" }}>Exercise</td>
                          </tr>
                        </thead>

                        {selfScreening &&
                          selfScreening.map((item) => {
                            return (
                              item.saved_for_user === false && (
                                <tbody
                                  key={item.name}
                                  className="react_selfScreen_Table_hr"
                                >
                                  <tr>
                                    <td
                                      className="react_selfScreen_Table_td"
                                      // style={{
                                      //   display: "flex",
                                      //   justifyContent: "space-between",
                                      //   alignItems: "center",
                                      // }}
                                    >
                                      {item.name}
                                      {/* <button
                                        key={item.name}
                                        className="btn btn-primary self_screening_button"
                                        onClick={(e) => {
                                          this.showModal(item);
                                        }}
                                      >
                                        start Screening
                                      </button> */}
                                    </td>
                                    <td
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        alignItems: "center",
                                        marginTop: "5px",
                                      }}
                                    >
                                      <button
                                        style={{ fontSize: "12px" }}
                                        key={item.name}
                                        className="btn btn-primary "
                                        onClick={(e) => {
                                          this.showModal(item);
                                        }}
                                      >
                                        Start Screening
                                      </button>
                                    </td>
                                  </tr>
                                </tbody>
                              )
                            );
                          })}
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {this.state.visibleAssignedWeek && (
              <div>
                <AssignedWeek
                  viewWorkoutModalArray={this.state.viewWorkoutModalArray}
                  startWorkoutArray={this.state.startWorkoutArray}
                  trainingSessionSpecificReportApi={
                    this.trainingSessionSpecificReportApi
                  }
                  trainingSessionReport={trainingSessionReport}
                  prevWeek={this.prevWeek}
                  nextWeek={this.nextWeek}
                  hideNext={
                    this.state.startWorkoutArray?.weeks?.findIndex(
                      (x) => x.id === this.state.viewWorkoutModalArray?.id
                    ) ===
                    this.state.startWorkoutArray?.weeks?.length - 1
                  }
                  hidePrev={
                    this.state.startWorkoutArray?.weeks?.findIndex(
                      (x) => x.id === this.state.viewWorkoutModalArray?.id
                    ) === 0
                  }
                  userId={this.state.user_id}
                />
              </div>
            )}

            {!this.checkIfAllFalse() && !this.state.visibleAssignedWeek && (
              <div className="self_screening" id="corrective-exercises">
                <div className="container">
                  <div className="week_section_react_Corrective_Exercises">
                    <div className="heading" style={{ textAlign: "center" }}>
                      <h3>No exercise assign yet.</h3>
                    </div>
                    <NoDataFound
                      height={250}
                      width={250}
                      // text="No exercise assign yet."
                    />
                  </div>
                </div>
              </div>
            )}

            {this.state.correctiveExercises.length > 0 && (
              <div className="self_screening" id="corrective-exercises">
                <div className="container">
                  <div className="week_section_react_Corrective_Exercises">
                    <div className="heading">
                      <h3>Corrective Exercises</h3>
                    </div>
                    <ExercisesModal
                      onHidePressExercises={() =>
                        this.hideCorrectiveExercises()
                      }
                      showCorrectiveExercises={
                        this.state.CorrectiveExercisesModal
                      }
                      exerciseModalName={this.state.exerciseModalName}
                      exerciseModalvideo={this.state.exerciseModalvideo}
                    />
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <td>Exercise</td>
                          <td>Video</td>
                        </tr>
                      </thead>
                      {correctiveExercises &&
                        correctiveExercises.map((data) => {
                          return (
                            <tbody key={data.name}>
                              <tr>
                                <td>{data.name}</td>
                                <td>
                                  <button
                                    href="javaScript;"
                                    data-toggle="modal"
                                    data-target="#videopopup"
                                    className="Video_Model"
                                    onClick={(e) => {
                                      this.showCorrectiveExercises(data);
                                    }}
                                  >
                                    <i
                                      className="fa fa-play"
                                      aria-hidden="true"
                                    ></i>
                                  </button>
                                </td>
                              </tr>
                            </tbody>
                          );
                        })}
                    </table>
                  </div>
                </div>
              </div>
            )}

            {this.state.visibleWeeklyReport && (
              <div>
                <AthleteCoachLibrary />
              </div>
            )}

            {this.state.visibleWeeklyReport && (
              <div>
                <WeeklyReport
                  startWorkoutArray={this.state.startWorkoutArray}
                />
              </div>
            )}

            {this.state.visibleNeedAnalysis && (
              <div className="dashboard-wrapper" id="need-analysis">
                <section className="athlete_dasboard">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-12 week_section">
                        <div
                          className={`${
                            viewMore === true
                              ? "needs-analysis-view-more-add"
                              : "basketball_box  needs-analysis-view-more"
                          }`}
                          style={{ cursor: "pointer" }}
                        >
                          <div
                            // className="basketball_box  needs-analysis-view-more"

                            // style={{ backgroundColor: "red" }}
                            dangerouslySetInnerHTML={{
                              __html: this.state.SportAnalysis,
                            }}
                          ></div>

                          {sportAnalysesLoader && (
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <i
                                className="fa fa-spinner fa-spin fa-3x fa-fw"
                                style={{
                                  color: "var(--appBlue2)",
                                  fontSize: "40px",
                                }}
                              />
                            </div>
                          )}
                          {!sportAnalysesLoader &&
                            this.state.SportAnalysis === undefined && (
                              <NoDataFound
                                height={250}
                                width={250}
                                text="No need analysis available yet"
                              />
                            )}
                        </div>
                        {this.state.SportAnalysis && (
                          <button
                            style={{ float: "right" }}
                            className="btn-primary-after-react"
                            onClick={this.NeedsAnalysisViewMore}
                          >
                            {viewMore === true ? "View Less" : "View More"}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </section>
              </div>
            )}

            {this.state.visibleWeeklyAverageIntensity && (
              <div>
                <WeeklyAverageIntensity user_id={this.state.user_id} />
              </div>
            )}

            {/* <div className="self_screening">
          <div className="container">
            <div className="col-md-12">
              <div className="self_screening_panel_need_Analyses">
                <h2 className="self_screening_panel_heading">Needs Analysis</h2>
                <div className="panel_body_nav">
                  <ul className="nav_pills">
                    <li className="common_active ">
                      <button
                        href="#4a"
                        onClick={this.handleToggle}
                        className="common_active_btn"
                      >
                        Description
                      </button>
                    </li>
                    <li className="common_injuries">
                      <button
                        className="common_injuries_btn"
                        href="#5a"
                        id="#injuries"
                        onClick={this.handleToggleInjuries}
                      >
                        Common Injuries
                      </button>
                    </li>
                  </ul>
                  <div
                    className="tab-content_clearfix"
                    style={{
                      marginTop: "20px",
                      padding: "15px",
                      position: "relative",
                      left: "18%",
                      width: "60%",
                    }}
                  >
                    <div
                      className="tab-pane tab-text"
                      ref="toggle"
                      id="discription"
                    >
                      <p
                        style={{
                          textAlign: "justify",
                          textIndent: "18.0pt",
                          lineHeight: "150%",
                        }}
                      >
                        <span style={{ fontFamily: "'Arial',sans-serif" }}>
                          Netball is a ball sport that is played by two opposing
                          teams of seven players, each player having their own
                          specific role in the team. The aim is to score the
                          most goals within the four 15-minute quarters. Goals
                          are scored by passing a ball through the opposing
                          teams goal ring. Common netball actions include:
                          jumping, repeated sprints, shuffling, running, jogging
                          and walking in multiple directions. The demands on the
                          body during netball stress the aerobic and anaerobic
                          energy systems whilst players can strategically use
                          agility and speed development to help gain positional
                          advantages over the opponents. Technical ball skills
                          and jumping ability also play important roles for
                          netball performance.{" "}
                        </span>
                      </p>
                    </div>
                    <div
                      className="tab-pane tab-text active"
                      // id="5a"
                      ref="toggleinjury"
                      id="commonInjury"
                    >
                      <ul>
                        <li>
                          <span style={{ fontFamily: "'Arial',sans-serif" }}>
                            Most common mechanism of injury is incorrect landing
                            technique (57,2%){" "}
                          </span>
                        </li>
                        <li>
                          <span style={{ fontFamily: "'Arial',sans-serif" }}>
                            Most frequently injured joint: ankle (39,1%), knee
                            (28,2%), cervical region (8,7%)
                          </span>
                        </li>
                        <li>
                          <span style={{ fontFamily: "'Arial',sans-serif" }}>
                            Incorrect biomechanics is considered as a potential
                            cause of overuse injuries.{" "}
                          </span>
                        </li>
                        <li>
                          <span style={{ fontFamily: "'Arial',sans-serif" }}>
                            Excessive rear foot pronation has been defined as
                            one of the most common causes of the overuse
                            injuries in netball
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div> */}
          </div>
        )}
        <Footer />
      </div>
    );
  }
}

// export default SelfScreening;

const mapDispatchToProps = (dispatch) => {
  return {
    listAthleteWorkoutRequest: (data) =>
      dispatch(listAthleteWorkoutRequest(data)),
  };
};
export default connect(null, mapDispatchToProps)(SelfScreening);
