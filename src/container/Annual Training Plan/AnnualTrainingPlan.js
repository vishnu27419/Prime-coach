import React, { Component } from "react";
import "../Annual Training Plan/AnnualTrainingPlan.css";
import { Link } from "react-router-dom";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import { Modal, Form } from "react-bootstrap";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "../../Custom/images/celender.jpg";
// moment and timestamp in react js
import moment from "moment";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { standardPostApi } from "../API/ApiWrapper";

import LoaderWrapper from "../Loader/LoaderWrapper";
import Image from "component/ImageComponent/Image";
import NoDataFound from "component/lottiLoader/LottiLoader";

toast.configure();
class AnnualTrainingPlan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      show: false,
      date: null,
      hasSetDate: false,
      endDate: null,
      hasSetEndDate: false,
      WorkoutLocation: [],
      name: "",
      locationChange: "",
      nameError: "",
      startDateError: "",
      endDateError: "",
      locationError: "",
      listAnnualTrainingPlan: [],
      addProgram: {},
      planSearchTxt: "",
      // userData: {},
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
    // console.log("onChange", this.state);
  }

  componentDidMount() {
    this.fetch_pre_add_annual_training_program();
    this.fetch_list_annual_training_program();
  }

  fetch_pre_add_annual_training_program = async () => {
    try {
      const res = await standardPostApi(
        "pre_add_annual_training_program",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          WorkoutLocation: res.data.data.WorkoutLocation.pickerArray,
        });
        // console.log(
        //   "This is res of pre_add_annual_training_program",
        //   res.data.data.WorkoutLocation
        // );
      }
    } catch (error) {
      console.log(error);
    }
  };

  add_annual_training_program = async () => {
    const start_date = moment(this.toTimestamp(this.state.date) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    const end_date = moment(this.toTimestamp(this.state.endDate) * 1000)
      .format("YYYY-MM-DD")
      .toString();

    const isValid = this.validationAddTranningPlan();

    if (isValid) {
      try {
        const res = await standardPostApi(
          "add_annual_training_program",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            name: this.state.name,
            start_date: start_date,
            end_date: end_date,
            location: this.state.locationChange,
          },
          true
        );
        if (res.data.code === 200) {
          await this.setState({ addProgram: res.data.data });
          // console.log(
          //   "This is res of Add Annual Tranning Plan ",
          //   res.data.data
          // );
          await this.setState({
            name: "",
            locationChange: "",
            date: "",
            endDate: "",
          });
          await this.hideModal();
          toast.success(res.data.message);
          await this.fetch_list_annual_training_program();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  fetch_list_annual_training_program = async () => {
    try {
      const res = await standardPostApi(
        "list_annual_training_program",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        this.setState({
          listAnnualTrainingPlan: res.data.data,
          loading: false,
        });
        console.log("This is res list_annual_training_program", res.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  validationAddTranningPlan = () => {
    let nameError = "";
    let startDateError = "";
    let endDateError = "";
    let locationError = "";

    if (!this.state.name) {
      nameError = "This field is required";
    }
    if (!this.state.hasSetDate) {
      startDateError = "This field is required";
    }

    if (!this.state.hasSetEndDate) {
      endDateError = "This field is required";
    }

    if (!this.state.locationChange) {
      locationError = "Choose Location";
    }

    if (nameError || startDateError || endDateError || locationError) {
      this.setState({ nameError, startDateError, endDateError, locationError });
      return false;
    } else {
      return true;
    }
  };

  showModal = async () => {
    await this.setState({ show: !this.state.show });
  };

  hideModal = async () => {
    await this.setState({ show: false });
  };
  //  date picker
  handleDateChange = async (date, moment) => {
    await this.setState({ date: date, hasSetDate: true });
    // console.log("The start date selected is ", this.state.date);
  };

  endDateChange = async (endDate) => {
    await this.setState({ endDate: endDate, hasSetEndDate: true });
    // console.log("The end  date .... is ", this.state.endDate);
  };

  toTimestamp = (strDate) => {
    var datum = Date.parse(strDate);
    return datum / 1000;
  };
  //  end date picker

  render() {
    // console.log("WorkoutLocation", this.state.WorkoutLocation);
    const location = this.state.WorkoutLocation;
    const { name, locationChange, planSearchTxt } = this.state;
    const annualPrograms = this.state.listAnnualTrainingPlan;
    const item = this.state.addProgram;

    return (
      <div className="loader_sec">
        <CoachHeader />
        {this.state.loading ? (
          <LoaderWrapper />
        ) : (
          <div className="dashboard-wrapper">
            <section className="myteams_wrapper">
              <div className="container-fluid pr-0">
                <div
                  className="inner_teamsection"
                  style={{ padding: "41px ​30p" }}
                >
                  <div className="d-lg-flex justify-content-between align-items-center">
                    <div className="heading">
                      My Annual Programs
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search Program"
                          name="planSearchTxt"
                          value={planSearchTxt}
                          onChange={(e) => this.onChange(e)}
                        />
                      </div>
                    </div>

                    <button
                      className="Model_Btn_term"
                      href="javascript;"
                      data-toggle="modal"
                      data-target="#programcreate"
                      onClick={() => {
                        this.showModal();
                      }}
                    >
                      Add New Program{" "}
                      <i className="fa fa-plus" aria-hidden="true"></i>
                      {/* </a> */}
                    </button>
                  </div>
                  {annualPrograms.length === 0 && (
                    // <div>No annual traning program avalable yet</div>
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No annual traning program available yet."
                    />
                  )}

                  <div className="row mt-5">
                    {annualPrograms &&
                      annualPrograms.map((item) => {
                        if (planSearchTxt != null || planSearchTxt != "") {
                          let mainTerm = item.name;
                          let subTerm = planSearchTxt;
                          let searchRegex = new RegExp(subTerm, "i");
                          let res = mainTerm.match(searchRegex);
                          let isMatch = res != null && res.length > 0;
                          if (isMatch == false) {
                            if (item?.users?.length) {
                              for (var i = 0; item?.users?.length > i; i++) {
                                let Name =
                                  item?.users[i]?.first_name +
                                  " " +
                                  item?.users[i]?.last_name;
                                let subTermName = planSearchTxt;
                                let searchName = new RegExp(subTermName, "i");
                                let resName = Name.match(searchName);
                                let searchEmail = new RegExp(subTermName, "i");
                                let resEmail =
                                  item?.users[i]?.email.match(searchEmail);
                                let isMatchPlayer =
                                  (resName != null && resName.length > 0) ||
                                  (resEmail != null && resEmail.length > 0);
                                if (isMatchPlayer) {
                                  break;
                                } else if (i == item?.users?.length - 1) {
                                  return null;
                                }
                              }
                            } else {
                              return null;
                            }
                          }
                        }
                        // if (planSearchTxt != null || planSearchTxt != "") {
                        //   const mainTerm = item.name;
                        //   const subTerm = planSearchTxt;
                        //   const searchRegex = new RegExp(subTerm, "i");
                        //   const res = mainTerm.match(searchRegex);
                        //   const isMatch = res != null && res.length > 0;
                        //   if (isMatch == false) return null;
                        // }

                        console.log("itemmmmmmmmmmmm", item);
                        return (
                          <div className="col-lg-3 col-md-4" key={item.id}>
                            <div className="program_schadual">
                              <Link
                                to={{
                                  pathname: `/annualprograminner/${"in_season"}/${"off_season"}/${"pre_season"}/${"transition"}`,
                                  state: item,
                                }}
                              >
                                <div className="program_name">{item.name}</div>
                                <figure className="">
                                  <Image
                                    image={item.image}
                                    className="img-fluid"
                                  />
                                </figure>
                              </Link>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}
        <Footer />
        {/* ReactJs Model For this page */}
        <Modal show={this.state.show} onHide={() => this.hideModal()} centered>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="programcreate">
                Add Annual Training Plan
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  this.hideModal();
                }}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Form action="" method="">
                <div className="form-group">
                  <label htmlFor="">ATP Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="ATP"
                    name="name"
                    value={name}
                    onChange={(e) => this.onChange(e)}
                  />
                  <p className="react_validation">
                    {this.state.nameError}
                    {this.state.nameErrorNull}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="">Start Date</label>

                  <DatePicker
                    selected={this.state.date}
                    onChange={this.handleDateChange}
                    name="DateOfBirth"
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    // maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="DD/MM/YYYY"
                    autoComplete={"off"}
                    ref={(ref) => (this.accordionContent = ref)}
                  />
                  <img
                    className="celender_img "
                    src={Calander}
                    alt={Calander}
                    onClick={() => this.accordionContent.onInputClick()}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="react_validation ">
                    {this.state.startDateError}
                  </p>
                </div>
                <div className="form-group">
                  <label htmlFor="">End Date</label>

                  <DatePicker
                    selected={this.state.endDate}
                    onChange={this.endDateChange}
                    name="endDate"
                    className="form-control"
                    dateFormat="dd/MM/yyyy"
                    // maxDate={new Date()}
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    placeholderText="DD/MM/YYYY"
                    autoComplete={"off"}
                    ref={(ref) => (this.accordionEndContent = ref)}
                  />
                  <img
                    className="celender_img "
                    src={Calander}
                    alt={Calander}
                    onClick={() => this.accordionEndContent.onInputClick()}
                    style={{ cursor: "pointer" }}
                  />
                  <p className="react_validation ">{this.state.endDateError}</p>
                </div>

                <div className="form-group">
                  <label htmlFor="">Location</label>
                  <select
                    className="form-control"
                    name="locationChange"
                    value={locationChange}
                    onChange={(e) => this.onChange(e)}
                  >
                    <option value="">Select Location</option>
                    {location &&
                      location.map((location) => {
                        return (
                          <option value={location.value} key={location.id}>
                            {location.label}
                          </option>
                        );
                      })}
                  </select>
                  <p className="react_validation">{this.state.locationError}</p>
                </div>

                <button
                  type="button"
                  className="Model_btn"
                  data-dismiss="modal"
                  onClick={() => this.add_annual_training_program()}
                >
                  Save
                </button>
              </Form>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default AnnualTrainingPlan;
