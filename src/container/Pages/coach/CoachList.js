import React, { Component } from "react";
import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import "./CoachList.css";
import { Link } from "react-router-dom";
import { standardPostApi } from "container/API/ApiWrapper";
import { successToast } from "utils/toastMessage";

class CoachList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coachDetails: [],
      loading: false,
      loaderActiveInactive: false,
      activeInde: "",
      selectPicker: "active",
    };
  }
  componentDidMount() {
    this.getAllCoaches();
  }

  getAllCoaches = async (message) => {
    this.setState({
      loading: message === "activeDeactive" ? false : true,
      loaderActiveInactive: message === "activeDeactive" ? true : false,
    });
    try {
      const res = await standardPostApi(
        "coaches",
        undefined,
        { access_token: await localStorage.getItem("access_token") },
        true
      );
      if (res.data.code === 200) {
        console.log("This is Response of GetAllCoaches--->", res.data.data);

        // console.log("select picker", this.state.selectPicker);
        this.setState({
          coachDetails: res?.data?.data?.coaches,
          loading: false,
          loaderActiveInactive: false,
        });
      }
    } catch (error) {
      this.setState({ loading: false, loaderActiveInactive: false });
      console.log(error);
    }
  };

  coachActiveDeactiveApi = async (item, index) => {
    this.setState({ activeInde: index });
    const coachId = item.id;
    this.setState({ loaderActiveInactive: true });
    try {
      const res = await standardPostApi(
        "coach/action",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          coach_id: coachId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("Response of Active Inactive", res.data.data);
        this.setState({ loaderActiveInactive: false });
        this.getAllCoaches("activeDeactive");
        successToast(res.data.message);
      }
    } catch (error) {
      console.log(error);
      this.setState({ loaderActiveInactive: false });
    }
  };

  onChange = (e) => {
    this.setState({ selectPicker: e.target.value });
  };

  render() {
    const {
      coachDetails,
      loading,
      loaderActiveInactive,
      activeInde,
      selectPicker,
    } = this.state;
    // console.log("This is is coaches List --->", this.state.coachDetails);
    // console.log("coachDetails", coachDetails);
    console.log("selectPicker", this.state.selectPicker);
    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid pr-0">
              <div className="inner_teamsection ">
                <div
                  className="d-lg-flex justify-content-between align-items-center "
                  style={{ marginBottom: "3px" }}
                >
                  <div
                    className="heading"
                    style={{ marginBottom: "20px", fontWeight: "bold" }}
                  >
                    Coaches
                  </div>

                  <div className=" protocole d-md-flex">
                    <div className="dropdown">
                      <div>
                        <select
                          id=""
                          className="btn protocol_btn dropdown-toggle w-100"
                          name="selectPicker"
                          value={selectPicker}
                          onChange={this.onChange}
                        >
                          <option
                            className="dropdown-item dropdown-menu react_select_menu"
                            value="active"
                          >
                            Active
                          </option>
                          <option
                            className="dropdown-item dropdown-menu react_select_menu"
                            value="inactive"
                          >
                            Inactive
                          </option>
                        </select>
                        <span className="caret_Select_exercise">
                          {/* <i className="fa fa-sort-desc "></i> */}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="coaches-scroll">
                  {loading ? (
                    <span
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
                          fontSize: "60px",
                          marginTop: "50px",
                        }}
                      />
                    </span>
                  ) : (
                    <table className="table table-condensed coachList-table">
                      <tr style={{ fontSize: "16px" }}>
                        <th style={{ padding: "0.78rem 0.76rem" }}>
                          Coach Name
                        </th>
                        <th style={{ padding: "0.78rem 0.76rem" }}>
                          No. of Assigned Team
                        </th>
                        <th
                          style={{
                            padding: "0.78rem 0.76rem",
                            textAlign: "center",
                          }}
                        >
                          View
                        </th>
                        <th style={{ padding: "0.78rem 0.76rem" }}>
                          Active / Inactive
                        </th>
                      </tr>

                      <>
                        {coachDetails &&
                          coachDetails.length !== 0 &&
                          coachDetails
                            .filter((x) => x.status === this.state.selectPicker)
                            .map((item, index) => (
                              <tr key={item.id}>
                                <td style={{ padding: "0.78rem 0.76rem" }}>
                                  {item.first_name} {item.last_name}
                                </td>
                                <td
                                  style={{
                                    padding: "0.78rem 0.76rem",
                                    paddingLeft: "5rem",
                                  }}
                                >
                                  {item.team_count}
                                </td>
                                <td
                                  style={{ padding: "0.78rem 0.76rem" }}
                                  className="table-last-td"
                                >
                                  <Link
                                    to={{
                                      pathname: "/assignMultipleCoach",
                                      state: { item },
                                    }}
                                  >
                                    <button
                                      title="Save"
                                      className="btn btn-md btn-primary workout-builder-save-workout-exercise Model_Btn_term "
                                      style={{ padding: "3px 25px" }}
                                      // style={{
                                      //   padding: "4px 20px",
                                      //   border: "2px #2e6da4 solid",
                                      //   textTransform: "capitalize",
                                      //   borderRadius: "7px",
                                      // }}
                                    >
                                      view{" "}
                                      <i
                                        className="fa fa-eye"
                                        style={{
                                          marginLeft: "3px",
                                          fontSize: "17px",
                                        }}
                                      ></i>
                                    </button>
                                  </Link>
                                </td>

                                <td style={{ padding: "0.78rem 0.76rem" }}>
                                  {item.status === "active" ? (
                                    <button
                                      className="assign_Team_Assign_React_button"
                                      style={{
                                        border: "1px #2e6da4 solid",
                                        padding: "3px 25px",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                      }}
                                      onClick={() =>
                                        this.coachActiveDeactiveApi(item, index)
                                      }
                                    >
                                      Active{" "}
                                      <i
                                        class="fa fa-check"
                                        style={{
                                          marginLeft: "3px",
                                          fontSize: "17px",
                                        }}
                                      ></i>
                                      {loaderActiveInactive &&
                                        activeInde === index && (
                                          <i
                                            className="fa fa-spinner fa-spin fa-3x fa-fw"
                                            style={{
                                              color: "#fff",
                                              fontSize: "20px",
                                              // marginTop: "50px",
                                            }}
                                          ></i>
                                        )}
                                    </button>
                                  ) : (
                                    <button
                                      className="assign_Team_Assign_React_button"
                                      style={{
                                        border: "1px #d43f3a solid",
                                        padding: "3px 25px",
                                        borderRadius: "10px",
                                        fontSize: "18px",
                                        backgroundColor: "#d43f3a",
                                      }}
                                      onClick={() =>
                                        this.coachActiveDeactiveApi(item, index)
                                      }
                                    >
                                      Inactive{" "}
                                      <i
                                        class="fa fa-times"
                                        style={{
                                          marginLeft: "3px",
                                          fontSize: "17px",
                                        }}
                                      ></i>
                                      {loaderActiveInactive &&
                                        activeInde === index && (
                                          <i
                                            className="fa fa-spinner fa-spin fa-3x fa-fw"
                                            style={{
                                              color: "#fff",
                                              fontSize: "20px",
                                              // marginTop: "50px",
                                            }}
                                          ></i>
                                        )}
                                    </button>
                                  )}
                                </td>
                              </tr>
                            ))}
                      </>
                    </table>
                  )}
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
export default CoachList;
