import React, { Component } from "react";
import "../PlayerReports/style.css";
import { Modal } from "react-bootstrap";
import AthleteSectionGraph from "../../component/Charts/AthleteSectionGraph";
import AthleteSectionSecondGraph from "../../component/Charts/AthleteSectionSecondGraph";
import { Redirect } from "react-router";

class AssignedPageWrapper extends Component {
  userData;
  constructor(props) {
    super(props);

    this.state = {
      show: false,
      viewWorkOut: false,
      correctiveExercises: false,
      reportEmailRecipients: false,
      // login,
      login: true,
    };
    this.checkLoginUrl();
  }
  checkLoginUrl = async () => {
    const token = await localStorage.getItem("access_token");
    const role = await localStorage.getItem("access_role");
    if (token == null && role == null) {
      this.setState({ login: false });
    }
  };

  showModal = (e) => {
    this.setState({
      show: true,
    });
  };

  hideModal = (e) => {
    this.setState({
      show: false,
    });
  };

  showViewWorkOut = () => {
    this.setState({
      viewWorkOut: true,
    });
  };

  hideViewWorkOut = (e) => {
    this.setState({
      viewWorkOut: false,
    });
  };

  showCorrectiveExercises = (e) => {
    this.setState({
      correctiveExercises: true,
    });
  };

  hideCorrectiveExercises = (e) => {
    this.setState({
      correctiveExercises: false,
    });
  };

  showReportEmailRecipients = (e) => {
    this.setState({
      reportEmailRecipients: true,
    });
  };

  hideReportEmailRecipients = (e) => {
    this.setState({
      reportEmailRecipients: false,
    });
  };

  render() {
    if (this.state.login === false) {
      return <Redirect to="/" />;
    }

    // console.log("this is after log in page><", this.userData);
    return (
      <div className="loader_sec">
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
                      <label htmlFor="">
                        Graph Range Start Date
                        <input
                          id="datepicker"
                          width="200"
                          className="lable_graph"
                        />
                      </label>
                      <label htmlFor="">
                        Graph Range End Date
                        <input
                          id="datepicker1"
                          width="200"
                          className="lable_graph"
                        />
                      </label>
                      <button type="button" className="btn-primary-after-react">
                        Submit Dates
                      </button>
                    </div>
                  </div>
                </div>
                <div>
                  {" "}
                  <br />
                  <AthleteSectionGraph />
                </div>

                {/* <div className="chart">
                <canvas id="canvasone"></canvas>
              </div> */}
              </div>
            </div>
          </section>
          {/* <!------------assigned-pagewrapper-------------> */}
          <section className="athlete_dasboard">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="week_section">
                    <div className="heading">
                      <h3>Week 3</h3>
                    </div>
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="day_one">
                          <span>
                            Day 1 &nbsp;&nbsp;{" "}
                            <i className="fa fa-check" aria-hidden="true"></i>
                          </span>
                          <ul className="list-inline">
                            <li>
                              <button
                                href="javaScript;"
                                data-toggle="modal"
                                data-target="#workout-sheet"
                                // onClick={handleShow}
                                onClick={(e) => {
                                  this.showModal();
                                }}
                                className="Start_Workout"
                              >
                                start workout
                              </button>
                            </li>
                            <li>
                              <button
                                href="JavaScript;"
                                data-toggle="modal"
                                data-target="#view-workout"
                                // onClick={handleShowViewWorkout}
                                onClick={(e) => {
                                  this.showViewWorkOut();
                                }}
                                className="Start_Workout"
                              >
                                view workout
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="col-lg-4">
                        <div className="day_one">
                          <span>Day 2</span>
                          <ul className="list-inline">
                            <li>
                              <button
                                href="javaScript;"
                                data-toggle="modal"
                                data-target="#workout-sheet"
                                // onClick={handleShow}
                                onClick={(e) => {
                                  this.showModal();
                                }}
                                className="Start_Workout"
                              >
                                start workout
                              </button>
                            </li>
                            <li>
                              <button
                                href="JavaScript;"
                                data-toggle="modal"
                                data-target="#view-workout"
                                // onClick={handleShowViewWorkout}
                                onClick={(e) => {
                                  this.showViewWorkOut();
                                }}
                                className="Start_Workout"
                              >
                                view workout
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-----------dashboard-wrapper END------------> */}
          <section className="corrective-wrapper" id="Corrective-exercises">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="week_section">
                    <div className="heading">
                      <h3>Corrective Exercises</h3>
                    </div>
                    <table className="table mb-0">
                      <thead>
                        <tr>
                          <td>Exercise</td>
                          <td>Video</td>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Quadruped lats stretch</td>
                          <td>
                            <button
                              href="javaScript;"
                              data-toggle="modal"
                              data-target="#videopopup"
                              // onClick={handleShowCorrectiveExercises}
                              onClick={(e) => {
                                this.showCorrectiveExercises();
                              }}
                              className="Video_Model"
                            >
                              <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Adductor rock back stretch</td>
                          <td>
                            <button
                              href="javaScript;"
                              data-toggle="modal"
                              data-target="#videopopup"
                              // onClick={handleShowCorrectiveExercises}
                              onClick={(e) => {
                                this.showCorrectiveExercises();
                              }}
                              className="Video_Model"
                            >
                              <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Clams</td>
                          <td>
                            <button
                              href="javaScript;"
                              data-toggle="modal"
                              data-target="#videopopup"
                              // onClick={handleShowCorrectiveExercises}
                              onClick={(e) => {
                                this.showCorrectiveExercises();
                              }}
                              className="Video_Model"
                            >
                              <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Half bird dog</td>
                          <td>
                            <button
                              href="javaScript;"
                              data-toggle="modal"
                              data-target="#videopopup"
                              // onClick={handleShowCorrectiveExercises}
                              onClick={(e) => {
                                this.showCorrectiveExercises();
                              }}
                              className="Video_Model"
                            >
                              <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                        <tr>
                          <td>Resisted ankle eversion with elastic band</td>
                          <td>
                            <button
                              href="javaScript;"
                              data-toggle="modal"
                              data-target="#videopopup"
                              // onClick={handleShowCorrectiveExercises}
                              onClick={(e) => {
                                this.showCorrectiveExercises();
                              }}
                              className="Video_Model"
                            >
                              <i className="fa fa-play" aria-hidden="true"></i>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-----------corrective-wrapper END------------> */}
          <section className="report-wrapper">
            <div className="container">
              <div className="row">
                <div className="col-lg-12">
                  <div className="week_section">
                    <div className="heading mb-4 d-lg-flex justify-content-between">
                      <h3>Weekly Report</h3>
                      <div className="">
                        <button
                          href="javaScript;"
                          className="manage_btn_react"
                          data-toggle="modal"
                          data-target="#managerecipients"
                          // onClick={handleShowReportEmailRecipients}
                          onClick={(e) => {
                            this.showReportEmailRecipients();
                          }}
                        >
                          Manage Recipients
                        </button>
                        <a href="#" className="manage_btn">
                          Send Report
                        </a>
                      </div>
                    </div>
                    <div className="table-responsive">
                      <table className="table mb-0">
                        <thead>
                          <tr>
                            <th>S&C Total</th>
                            <th>S&C Average Intensity</th>
                            <th>Football Activities Completed</th>
                            <th>Football Activities Duration</th>
                            <th>Other Activities Completed</th>
                            <th>Other Activities Duration</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>1</td>
                            <td>10</td>
                            <td>1</td>
                            <td>1 mins</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <!-----------corrective-wrapper END------------> */}
          <section
            className="average-pagewrapper pb-5"
            id="average-pagewrapper"
          >
            <div className="container">
              <div className="weekassigned-wrapper week_section">
                <div className="row">
                  <div className="col-lg-5 col-md-6">
                    <div className="d-lg-flex justify-content-between">
                      <select name="" className="form-control">
                        <option value="">Report Type Select</option>
                        <option value="">Sets Total</option>
                        <option value="">Reps Total</option>
                        <option value="">Sets Total</option>
                        <option value="">Reps Total</option>
                      </select>
                      <select name="" className="form-control">
                        <option value="">Workout Location</option>
                        <option value="">Home</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-7 col-md-6">
                    <div className="d-lg-flex justify-content-around align-items-center">
                      <label htmlFor="">
                        Graph Range Start Date
                        <input
                          id="datepicker3"
                          width="200"
                          className="lable_graph"
                        />
                      </label>
                      <label htmlFor="">
                        Graph Range End Date
                        <input
                          id="datepicker4"
                          width="200"
                          className="lable_graph"
                        />
                      </label>
                      <button
                        type="button"
                        className="btn-primary-after-react "
                      >
                        Sumbit Dates
                      </button>
                    </div>
                  </div>
                </div>
                <div className="chart">
                  <br />
                  {/* <canvas id="canvastwo"></canvas> */}
                  <AthleteSectionSecondGraph />
                </div>
              </div>
            </div>
          </section>
          {/* <!------------assigned-pagewrapper-------------> */}
        </div>
        {/* <!------------Well Being Questionnaire Model------------> */}
        <Modal
          show={this.state.show}
          // onHide={handleClose}
          onClose={this.hideModal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="workout-sheetTitle">
                Well Being Questionnaire
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // onClick={handleClose}
                onClick={(e) => {
                  this.hideModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-center">
              <form action="" id="main_worksheet">
                <div>
                  <div className="popup_heading">How Fresh Do You Feel?</div>
                  <ul className="d-flex justify-content-around">
                    <li>not fresh</li>
                    <li>fresh</li>
                    <li>very fresh</li>
                  </ul>
                  <div className="middle">
                    <label>
                      <input type="radio" name="radio" />
                      <div className="front-end box">
                        <span>1</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>2</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>3</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>4</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>5</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>6</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>7</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>8</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>9</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>10</span>
                      </div>
                    </label>
                  </div>
                </div>
                <div>
                  <div className="popup_heading">How Sore Are You?</div>
                  <ul className="d-flex justify-content-around">
                    <li>not fresh</li>
                    <li>fresh</li>
                    <li>very fresh</li>
                  </ul>
                  <div className="middle">
                    <label>
                      <input type="radio" name="radio" />
                      <div className="front-end box">
                        <span>1</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>2</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>3</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>4</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>5</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>6</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>7</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>8</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>9</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>10</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="popup_heading">Fatigue Level</div>
                  <ul className="d-flex justify-content-around">
                    <li>not fresh</li>
                    <li>fresh</li>
                    <li>very fresh</li>
                  </ul>
                  <div className="middle">
                    <label>
                      <input type="radio" name="radio" />
                      <div className="front-end box">
                        <span>1</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>2</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>3</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>4</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>5</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>6</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>7</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>8</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>9</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>10</span>
                      </div>
                    </label>
                  </div>
                </div>

                <div>
                  <div className="popup_heading">How Did You Sleep?</div>
                  <ul className="d-flex justify-content-around">
                    <li>not fresh</li>
                    <li>fresh</li>
                    <li>very fresh</li>
                  </ul>
                  <div className="middle">
                    <label>
                      <input type="radio" name="radio" />
                      <div className="front-end box">
                        <span>1</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>2</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>3</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>4</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>5</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>6</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>7</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>8</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>9</span>
                      </div>
                    </label>
                    &nbsp;
                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>10</span>
                      </div>
                    </label>
                  </div>
                </div>
                <button type="button" id="newtab" className="btn btn-success">
                  Submit
                </button>
              </form>
              <div className="work_complete" id="complete_sheet">
                <div className="work_heading">Workout Completed</div>
                <div>
                  <div className="popup_heading">
                    Please estimate the workout intensity
                  </div>
                  <ul className="d-flex justify-content-around">
                    <li>low</li>
                    <li>medium</li>
                    <li>high</li>
                  </ul>
                  <div className="middle">
                    <label>
                      <input type="radio" name="radio" />
                      <div className="front-end box">
                        <span>1</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>2</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>3</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>4</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>5</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>6</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>7</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>8</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>9</span>
                      </div>
                    </label>

                    <label>
                      <input type="radio" name="radio" />
                      <div className="back-end box">
                        <span>10</span>
                      </div>
                    </label>
                    <button
                      type="type"
                      id="next_btn"
                      className="btn btn-default"
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="modal-footer next_footer showhide text-right"
              id="show"
            >
              <button type="type" id="next_btn" className="btn btn-default">
                Next
              </button>
            </div>
          </Modal.Body>
        </Modal>
        {/* <!------------View WorkOut Day 1 Model------------> */}
        <Modal
          show={this.state.viewWorkOut}
          onHide={this.hideViewWorkOut}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="view-workoutTitle">
                Day 1
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={(e) => {
                  this.hideViewWorkOut();
                }}
                // onClick={handleCloseViewWorkout}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body text-left">
              <button type="button" className="Model_btn">
                Export to PDF
              </button>
              <div className="text-center">Foamrolling - Procedural</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Sets</th>
                    <th>Rest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Calfs</td>
                    <td>30 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Foamrolling ITB</td>
                    <td>30 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Quadriceps</td>
                    <td>30 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Upper Back</td>
                    <td>30 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">Mobility - Procedural</div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Sets</th>
                    <th>Rest</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Groiner with rotation</td>
                    <td>30 seconds</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Qudruped Tx rotation threading the needle</td>
                    <td>15 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Adductor rock back stretch</td>
                    <td>15 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                Plyometrics - Super set - REST 40 secs
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Hop Forward Rebounds</td>
                    <td>8 repetitions ES</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Jump Forward Rebounds</td>
                    <td>10 repetitions</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                Strength A: - Super set - REST 40 secs
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Press ups</td>
                    <td>10 repetitions</td>
                    <td>3</td>
                  </tr>
                  <tr>
                    <td>Bodyweight single leg squat to box</td>
                    <td>10 repetitions ES</td>
                    <td>3</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                Strength B: - Super set - REST 45 secs
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Exercise</th>
                    <th>Reps</th>
                    <th>Sets</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Side plank with knee flexion</td>
                    <td>10 repetitions ES</td>
                    <td>2</td>
                  </tr>
                  <tr>
                    <td>Plank Leg Lift Off</td>
                    <td>30 seconds ES</td>
                    <td>1</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>Body weight 3 point cone touch</td>
                    <td>15 repetitions ES</td>
                    <td>2</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal>
        {/* <!------------Corrective Exercises Viedios Model------------> */}
        <Modal
          show={this.state.correctiveExercises}
          onHide={this.hideCorrectiveExercises}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="videopopupTitle">
                Modal title
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // onClick={handleCloseCorrectiveExercises}
                onClick={(e) => {
                  this.hideCorrectiveExercises();
                }}
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
                  src="https://www.youtube.com/embed/sE7Y03lyXpo"
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  allowFullScreen=""
                ></iframe>
              </div>
            </div>
          </Modal.Body>
        </Modal>
        {/* <!------------Report Email Recipients Model------------> */}
        <Modal
          show={this.state.reportEmailRecipients}
          onHide={this.hideReportEmailRecipients}
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="managerecipientsTitle">
                Report Email Recipients
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                // onClick={handleCloseReportEmailRecipients}
                onClick={(e) => {
                  this.hideReportEmailRecipients();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th colspan="2">Email Address</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>vibha@pairroxz.com</td>
                    <td>
                      <a href="#" className="btn btn-danger">
                        Delete -
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <input type="text" className="form-control" />
                    </td>
                    <td>
                      <a href="#" className="btn btn-success">
                        Add New +
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AssignedPageWrapper;
