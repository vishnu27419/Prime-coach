import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "Custom/images/celender.jpg";
import { Link } from "react-router-dom";
import { Button, Tooltip } from "@material-ui/core";
import AdjustIcon from "@material-ui/icons/Adjust";
import {
  standardPostApi,
  standardPostApiJsonBased,
} from "container/API/ApiWrapper";
import { successToast } from "utils/toastMessage";
import NoDataFound from "component/lottiLoader/LottiLoader";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CancelIcon from "@material-ui/icons/Cancel";
export class Attandance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      eventList: [],
      isLoading: false,
      EventId: "",
      selectPickerObject: {},
      attendanceDetails: [],
      createAttancanceLoader: false,
      attandanceLoader: false,
      sentPlayerLoader: false,
      activePlayerId: "",
      pickerName: "",
    };
  }

  componentDidMount() {
    this.fetchCalenderEvents();
  }

  fetchCalenderEvents = async (eventId, eventObj, event) => {
    console.log("eventId", eventId, eventObj, event);
    try {
      const res = await standardPostApi(
        "get_calendar_events",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          team_id: this.props.match.params.id,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("res.data?.data?.event", res.data?.data?.event);

        this.setState({
          eventList: res.data?.data?.event,
          EventId: eventId ? eventId : res.data?.data?.event[0].id,
          selectPickerObject: eventObj ? eventObj : res.data?.data?.event[0],
        });
        this.fetchAttandance(this.state.EventId);
      }
    } catch (error) {
      console.log("error of fetch calander Events", error);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandel = (e) => {
    let selectPickerObject = {};

    this.state.eventList.map((item) => {
      if (e.target.value == item.id) {
        selectPickerObject = item;
      }
    });

    this.setState({
      EventId: e.target.value,
      selectPickerObject: selectPickerObject,
      pickerName: selectPickerObject?.event_name,
    });

    this.fetchAttandance(e.target.value);
  };

  fetchAttandance = async (eventId) => {
    this.setState({ attandanceLoader: true });
    try {
      const res = await standardPostApi(
        "get_player_with_attendance",
        undefined,
        {
          access_token: localStorage.getItem("access_token"),
          // team_id: this.props.match.params.id,
          event_id: eventId,
        },
        true
      );
      if (res.data.code === 200) {
        // console.log("Response of fetch attandance", res.data.data);
        this.setState({ attendanceDetails: res.data?.data?.players });
      }
    } catch (error) {
      console.error("Error of Fetch Attandance", error);
    } finally {
      this.setState({ attandanceLoader: false });
    }
  };

  handelCraeteAttandance = async (item, roll) => {
    roll === "player" && this.setState({ activePlayerId: item.id });
    const data =
      roll === "player"
        ? {
            access_token: localStorage.getItem("access_token"),
            event_id: this.state.EventId,
            // team_id: this.props.match.params.id,
            player_id: item.id,
          }
        : {
            access_token: localStorage.getItem("access_token"),
            event_id: this.state.EventId,
            team_id: this.props.match.params.id,
          };

    roll === "player"
      ? this.setState({ sentPlayerLoader: true })
      : this.setState({ createAttancanceLoader: true });

    try {
      const res = await standardPostApi(
        "create_attendance",
        undefined,
        data,
        true
      );
      if (res.data.code === 200) {
        console.log("res of handel create attandance", res.data.data);
        successToast(res.data.message);

        roll === "player"
          ? await this.fetchCalenderEvents(
              this.state.EventId,
              this.state.selectPickerObject
            )
          : await this.fetchCalenderEvents(this.state.EventId, null);

        this.fetchAttandance(this.state.EventId);
      }
    } catch (error) {
      console.error("error of creeate attandance", error);
    } finally {
      roll === "player"
        ? this.setState({ sentPlayerLoader: false })
        : this.setState({ createAttancanceLoader: false });
    }
  };

  render() {
    const { eventList, selectPickerObject, attendanceDetails } = this.state;
    // console.log("EventId", this.state.EventId);

    // console.log("this.state.selectPickerObject", this.state.selectPickerObject);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className=" testing_protocol_react">
                <div className="d-md-flex align-items-center ">
                  <ol className="breadcrumb mb-4 mb-lg-0">
                    <li className="breadcrumb-item">
                      <Link
                        to={`/myplayers/${this.props.match.params.id}/${this.props.match.params.teamname}`}
                      >
                        <Tooltip arrow title={`Back to  my players page`}>
                          <span
                            style={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              marginBottom: "20px",
                            }}
                          >
                            <i
                              className="fa fa-chevron-circle-left"
                              aria-hidden="true"
                              style={{
                                color: "#2F84CA",
                                fontSize: "30px",
                                marginRight: "10px",
                              }}
                            ></i>
                            <span style={{ fontSize: "20px" }}>
                              {" "}
                              {this.props.match.params.teamname}
                            </span>
                          </span>
                        </Tooltip>
                      </Link>
                    </li>
                  </ol>
                </div>
                <h4>
                  Attendance
                  {/* <span style={{ marginLeft: "5px" }}>
                    {selectPickerObject?.event_name}
                  </span> */}
                </h4>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div className="pt-4 protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          className="btn protocol_btn dropdown-toggle w-100"
                          value={this.state.EventId}
                          onChange={this.onHandel}
                        >
                          {!this.state.isLoading &&
                            this.state.eventList.length === 0 && (
                              <option value="">
                                Sorry! no event available
                              </option>
                            )}
                          {eventList?.length !== 0 &&
                            eventList?.map((item) => {
                              return (
                                <option
                                  className="dropdown-item dropdown-menu react_select_menu"
                                  value={item.id}
                                  key={item?.id}
                                >
                                  {item?.event_name}
                                </option>
                              );
                            })}
                        </select>
                        {this.state.isLoading && (
                          <span style={{ position: "relative" }}>
                            <i
                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                              style={{
                                color: "var(--appBlue2)",
                                fontSize: "29px",
                                marginTop: "20px",
                                position: "absolute",
                                right: "37px",
                                top: "-22px",
                              }}
                            />
                          </span>
                        )}
                      </div>
                    </div>

                    {/* {attendanceDetails?.length !== 0 && ( */}
                    <ul className="list-inline ml-md-5 mt-4 mt-md-0">
                      <li>
                        {this.state?.selectPickerObject?.is_mail_sent ===
                        false ? (
                          <Button
                            variant="contained"
                            color="secondary"
                            style={
                              this.state.createAttancanceLoader
                                ? {
                                    marginLeft: "20px",
                                    backgroundColor: "#F1B019",
                                    padding: "12px 25px",
                                    cursor: "wait",
                                  }
                                : {
                                    marginLeft: "20px",
                                    backgroundColor: "#F1B019",
                                    padding: "12px 25px",
                                  }
                            }
                            onClick={() =>
                              this.handelCraeteAttandance(null, null)
                            }
                            disabled={this.state.createAttancanceLoader}
                          >
                            Send Mail to {this.props.match.params.teamname}{" "}
                            {this.state.createAttancanceLoader && (
                              <i
                                className="fa fa-spinner fa-spin fa-3x fa-fw"
                                style={{
                                  color: "#fff",
                                  fontSize: "15px",
                                  marginLeft: "5px",
                                }}
                              />
                            )}
                          </Button>
                        ) : (
                          <span style={{ cursor: "not-allowed" }}>
                            <Button
                              variant="contained"
                              color="secondary"
                              style={{
                                marginLeft: "20px",
                                backgroundColor: "gray",
                                padding: "12px 25px",
                                color: "#fff",
                              }}
                              disabled={true}
                            >
                              Send Mail to {this.props.match.params.teamname}{" "}
                            </Button>
                          </span>
                        )}
                      </li>
                      &nbsp;
                    </ul>
                    {/* )} */}
                  </div>
                  {/* <div style={{ width: "15%" }}>
                    <div className="dropdown">
                      <div className="form-group">
                        <DatePicker
                          selected={new Date()}
                          // onChange={this.handleDateChange}
                          name="DateOfBirth"
                          className="form-control"
                          dateFormat="dd/MM/yyyy"
                          maxDate={new Date()}
                          showMonthDropdown
                          showYearDropdown
                          placeholderText="dd/MM/yyyy"
                          dropdownMode="select"
                          ref={(ref) => (this.accordionContent = ref)}
                        />
                        <img
                          className="celender_img "
                          src={Calander}
                          alt={Calander}
                          onClick={() => this.accordionContent.onInputClick()}
                          style={{ cursor: "pointer" }}
                        />
                      </div>
                    </div>
                  </div> */}
                </div>

                {!this.state.isLoading &&
                  !this.state.attandanceLoader &&
                  this.state.attendanceDetails.length === 0 && (
                    <NoDataFound
                      height={250}
                      width={250}
                      text="No data avalable yet"
                    />
                  )}

                {this.state.attandanceLoader ? (
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
                        fontSize: "50px",

                        // marginTop: "50px",
                      }}
                    />
                  </div>
                ) : (
                  <div className="table-responsive mt-5 table_react_cursor">
                    <table className="table ">
                      {attendanceDetails?.length !== 0 && (
                        <thead>
                          <tr className="react_Testing_Table">
                            <>
                              <th>Player Name</th>{" "}
                              <th>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Status
                                </span>
                              </th>
                              {/* <th>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  Is Mail Sent?
                                </span>
                              </th> */}
                              <th>
                                <span
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  {selectPickerObject?.event_name}
                                </span>
                              </th>
                            </>

                            <th></th>
                          </tr>
                        </thead>
                      )}

                      <tbody>
                        {attendanceDetails?.length !== 0 &&
                          attendanceDetails?.map((item) => {
                            return (
                              <tr key={item.id}>
                                <td>
                                  {item.user_first_name} {item.user_last_name}
                                </td>

                                <td>
                                  {item?.attendance?.is_available === "1" ? (
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        color: "#5CB85C",
                                      }}
                                    >
                                      Accepted
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        color: "#D9535F",
                                      }}
                                    >
                                      Not Accepted
                                    </span>
                                  )}
                                </td>

                                {/* <td>
                                  {item?.attendance?.is_email_send === "1" ? (
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        color: "#5CB85C",
                                      }}
                                    >
                                      Sent{" "}
                                      <CheckCircleIcon
                                        style={{
                                          color: "#5CB85C",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </span>
                                  ) : (
                                    <span
                                      style={{
                                        display: "flex",
                                        justifyContent: "center",
                                        color: "#D9535F",
                                      }}
                                    >
                                      Not Sent{" "}
                                      <CancelIcon
                                        style={{
                                          color: "#D9535F",
                                          marginLeft: "5px",
                                        }}
                                      />
                                    </span>
                                  )}
                                </td> */}
                                <td>
                                  <span
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                    }}
                                  >
                                    {item?.attendance?.is_available === "1" ? (
                                      <AdjustIcon
                                        style={{ color: "#5CB85C" }}
                                      />
                                    ) : (
                                      <AdjustIcon
                                        style={{ color: "#D9535F" }}
                                      />
                                    )}
                                  </span>
                                </td>
                                <td>
                                  <span
                                    style={{
                                      display: "flex",
                                      justifyContent: "center",
                                      cursor: "not-allowed",
                                    }}
                                  >
                                    {item?.attendance?.is_email_send === "1" ? (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{
                                          backgroundColor: "gray",
                                          cursor: "not-allowed",
                                          padding: "5px 40px",
                                        }}
                                        disabled={true}
                                      >
                                        <span style={{ color: "#fff" }}>
                                          sent
                                        </span>
                                      </Button>
                                    ) : (
                                      <Button
                                        variant="contained"
                                        color="secondary"
                                        style={
                                          this.state.sentPlayerLoader &&
                                          item.id === this.state.activePlayerId
                                            ? {
                                                backgroundColor: "#F1B019",
                                                cursor: "wait",
                                              }
                                            : {
                                                backgroundColor: "#F1B019",
                                              }
                                        }
                                        onClick={() =>
                                          this.handelCraeteAttandance(
                                            item,
                                            "player"
                                          )
                                        }
                                        disabled={
                                          this.state.sentPlayerLoader &&
                                          item.id === this.state.activePlayerId
                                        }
                                      >
                                        Send Mail{" "}
                                        {this.state.sentPlayerLoader &&
                                          item.id ===
                                            this.state.activePlayerId && (
                                            <i
                                              className="fa fa-spinner fa-spin fa-3x fa-fw"
                                              style={{
                                                color: "#fff",
                                                fontSize: "15px",
                                                marginLeft: "5px",
                                              }}
                                            />
                                          )}
                                      </Button>
                                    )}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Attandance;
