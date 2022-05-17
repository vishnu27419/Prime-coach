import CoachHeader from "container/PublicLayout/CoachHeader";
import Footer from "container/PublicLayout/Footer";
import React, { Component } from "react";
import SettingsIcon from "@material-ui/icons/Settings";
import { standardPostApi } from "container/API/ApiWrapper";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserDeleteModal from "../UserDeleteModal";
import ResetPasswordModal from "../ResetPasswordModal";
import NoDataFound from "component/lottiLoader/LottiLoader";

export class UsersSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      emailError: "",
      userSearchDetails: [],
      isLoading: false,
      userDeleteModal: false,
      userId: "",
      deleteLoader: false,
      resetPasswordModal: false,
      userIdForResetPassword: "",
      password: "",
      confirmPassword: "",
      passwordError: "",
      confirmPasswordError: "",
      confirmPasswordLoader: false,
      passwordVisible: false,
      passwordConfirmVisible: false,
      visibleLotty: false,
    };
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    console.log("this is ONCHANGE ", this.state);
  }

  showDeleteModal = async (data) => {
    // console.log("user data ", data);

    await this.setState({
      userId: data.id,
      userDeleteModal: !this.state.userDeleteModal,
    });
  };

  showModal = async (data) => {
    // console.log("userId", data);
    await this.setState({
      resetPasswordModal: !this.state.resetPasswordModal,
      userIdForResetPassword: data.id,
    });
  };

  hideModal = async () => {
    await this.setState({ resetPasswordModal: false });
  };

  hideDeleteModal = async () => {
    await this.setState({ userDeleteModal: false });
  };

  admin_user_search = async () => {
    const isValid = this.validationUserSearch();

    if (isValid) {
      this.setState({ isLoading: true });
      try {
        const res = await standardPostApi(
          "admin_user_search",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            first_name: this.state.firstName,
            last_name: this.state.lastName,
            email: this.state.email,
          },
          true
        );

        if (res.data.code === 301) {
          await this.setState({
            userSearchDetails: [],
            visibleLotty: true,
          });
        }
        if (res.data.code === 200) {
          console.log("res", res.data.data);
          await this.setState({
            userSearchDetails: res?.data?.data,
            // visibleUserDetail: true,
            visibleLotty: false,
          });
          //   console.log("THIS IS RES OF admin_user_search =>", res.data.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ isLoading: false });
      }
    }
  };

  validationUserSearch = () => {
    let emailError = "";
    let emailReg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (!this.state.email) {
      return true;
    } else if (!this.state.email.match(emailReg)) {
      emailError = toast.error("Please Enter Valid Emial Id", {
        autoClose: 2500,
      });
    }

    if (emailError) {
      this.setState({ emailError });
      return false;
    } else {
      return true;
    }
  };

  admin_delete_user = async () => {
    this.setState({ deleteLoader: true });
    try {
      const res = await standardPostApi(
        "admin_delete_user",
        undefined,
        {
          access_token: await localStorage.getItem("access_token"),
          user_id: this.state.userId,
        },
        true
      );
      if (res.data.code === 200) {
        console.log("THIS IS RESPONSE OF DELETE USER", res.data.data);
        toast.success(res.data.message, { autoClose: 2500 });
        await this.hideDeleteModal();
        this.admin_user_search();
      }
    } catch (error) {
      console.log(error);
    } finally {
      this.setState({ deleteLoader: false });
    }
  };

  admin_reset_password = async () => {
    const isValid = this.validationResetPassword();
    if (isValid) {
      this.setState({ confirmPasswordLoader: true });
      try {
        const res = await standardPostApi(
          "admin_reset_password",
          undefined,
          {
            access_token: await localStorage.getItem("access_token"),
            user_id: this.state.userIdForResetPassword,
            password: this.state.password,
          },
          true
        );
        if (res.data.code === 200) {
          console.log("This is res of admin_reset_password", res);
          toast.success(res.data.message, { autoClose: 2500 });
          await this.hideModal();
          this.setState({
            password: "",
            confirmPassword: "",
            passwordError: "",
            confirmPasswordError: "",
          });
          this.admin_user_search();
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.setState({ confirmPasswordLoader: false });
      }
    }
  };

  validationResetPassword = () => {
    let passwordError = "";
    let confirmPasswordError = "";
    let passReg = /^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/;

    if (!this.state.password) {
      passwordError = "New Password Field is Required";
    } else if (!this.state.password.match(passReg)) {
      passwordError =
        "Password must have minimum 8 characters, at least one number, at least one upper case, at least one lower case, at least one special character";
    }

    if (!this.state.confirmPassword) {
      confirmPasswordError = "Confirm New Password Field is Required";
    } else if (!this.state.confirmPassword.match(this.state.password)) {
      confirmPasswordError =
        "The New Password and Confirm New Password do not match.";
    }

    if (passwordError || confirmPasswordError) {
      this.setState({ passwordError, confirmPasswordError });
      return false;
    } else {
      return true;
    }
  };
  toggleShowPassword = () => {
    this.setState({ passwordVisible: !this.state.passwordVisible });
  };
  toggleShowConfirmPassword = () => {
    this.setState({
      passwordConfirmVisible: !this.state.passwordConfirmVisible,
    });
  };

  render() {
    const { firstName, lastName, email, userSearchDetails } = this.state;
    return (
      <div>
        <div className="loader_sec">
          <CoachHeader />
          <div className="dashboard-wrapper">
            <section className="myteams_wrapper">
              <div className="container-fluid">
                <div className="row">
                  <div className="col-md-12">
                    <h2
                      style={{
                        color: "white",
                        fontSize: "38px",
                        textAlign: "center",
                        marginBottom: "5% ",
                      }}
                    >
                      <span style={{ borderBottom: "3px dashed #337AB7" }}>
                        Users
                      </span>
                    </h2>
                    <div className=" home_sc_admin ">
                      <div className="pannel_heading_react  ">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                          className="form-group"
                        >
                          <input
                            type="text"
                            className="form-control"
                            style={{ marginRight: "25px" }}
                            placeholder="First Name"
                            name="firstName"
                            value={firstName}
                            onChange={(e) => this.onChange(e)}
                            onKeyPress={(e) => {
                              if (this.state.isLoading === false) {
                                if (e.key === "Enter") {
                                  this.admin_user_search();
                                }
                              }
                            }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            style={{ marginRight: "25px" }}
                            placeholder="Last Name"
                            name="lastName"
                            value={lastName}
                            onChange={(e) => this.onChange(e)}
                            onKeyPress={(e) => {
                              if (this.state.isLoading === false) {
                                if (e.key === "Enter") {
                                  this.admin_user_search();
                                }
                              }
                            }}
                          />
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Email Address"
                            style={{ marginRight: "25px" }}
                            name="email"
                            value={email}
                            onChange={(e) => this.onChange(e)}
                            onKeyPress={(e) => {
                              if (this.state.isLoading === false) {
                                if (e.key === "Enter") {
                                  this.admin_user_search();
                                }
                              }
                            }}
                          />

                          <button
                            type="button"
                            className="Model_Btn_term"
                            style={{
                              borderRadius: "6px",
                              cursor: "pointer",
                              border: "1px solid #3E3E3E",
                              background: "#3E3E3E",
                            }}
                            onClick={() => this.admin_user_search()}
                          >
                            Search
                          </button>
                        </div>
                      </div>

                      {this.state.visibleLotty && (
                        <>
                          {!this.state.isLoading &&
                            userSearchDetails?.length === 0 && (
                              <div style={{ margin: "20px " }}>
                                <NoDataFound
                                  height={250}
                                  width={250}
                                  text="No user avalable."
                                />
                              </div>
                            )}
                        </>
                      )}

                      {this.state.isLoading ? (
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            marginTop: "20px",
                            marginBottom: "20px",
                          }}
                        >
                          <i
                            className="fa fa-spinner fa-spin fa-3x fa-fw"
                            // className="fa fa-spinner fa-pulse fa-3x fa-fw"
                            style={{
                              color: "var(--appBlue2)",
                              fontSize: "50px",
                              marginBottom: "50px",
                            }}
                          />
                        </div>
                      ) : (
                        <div className="panel-body">
                          <div className="table-responsive exercise_group_table">
                            <table className="table table-condensed table-bordered ">
                              <thead className="exercise_group_table_thead">
                                {userSearchDetails.length !== 0 && (
                                  <tr>
                                    <th>
                                      <span
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        First Name
                                      </span>
                                    </th>
                                    <th>
                                      <span
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        Last Name
                                      </span>
                                    </th>
                                    <th>
                                      <span
                                        style={{
                                          display: "flex",
                                          justifyContent: "center",
                                        }}
                                      >
                                        Email Address{" "}
                                      </span>
                                    </th>

                                    <th></th>
                                  </tr>
                                )}
                              </thead>
                              <tbody style={{ color: "black" }}>
                                {userSearchDetails.length !== 0 &&
                                  userSearchDetails.map((item) => {
                                    return (
                                      <tr key={item?.id}>
                                        <td>
                                          {/* <input className="col-md-12 form-control exercise-name" /> */}
                                          <span
                                            style={{
                                              color: "#fff",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {item?.first_name}
                                          </span>
                                        </td>
                                        <td>
                                          {/* <input className="col-md-12 form-control exercise-description" /> */}
                                          <span
                                            style={{
                                              color: "#fff",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {item?.last_name}
                                          </span>
                                        </td>
                                        <td>
                                          {/* <input className="col-md-12 form-control exercise-video-link" /> */}
                                          <span
                                            style={{
                                              color: "#fff",
                                              display: "flex",
                                              justifyContent: "center",
                                              alignItems: "center",
                                            }}
                                          >
                                            {item?.email}
                                          </span>
                                        </td>

                                        <td>
                                          <span
                                            style={{
                                              display: "flex",
                                              justifyContent: "space-around",
                                            }}
                                          >
                                            <button
                                              className="btn admin_button"
                                              style={{ background: "#337AB7" }}
                                            >
                                              <span
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  fontWeight: "bold ",
                                                }}
                                                onClick={() =>
                                                  this.showModal(item)
                                                }
                                              >
                                                Reset Password &nbsp;&nbsp;
                                                {/* <i className="fa fa-eye"></i> */}
                                                <SettingsIcon />
                                              </span>
                                            </button>
                                            <button
                                              className="btn admin_button"
                                              style={{ background: "#337AB7" }}
                                            >
                                              <span
                                                style={{
                                                  display: "flex",
                                                  justifyContent: "center",
                                                  alignItems: "center",
                                                  fontWeight: "bold ",
                                                }}
                                                onClick={() =>
                                                  this.showDeleteModal(item)
                                                }
                                              >
                                                Delete User &nbsp;&nbsp;{" "}
                                                <i
                                                  className="fa fa-trash"
                                                  style={{ fontSize: "21px" }}
                                                ></i>
                                              </span>
                                            </button>
                                            {/* <Link to={item?.video}> */}
                                            {/* </Link> */}
                                          </span>
                                        </td>
                                      </tr>
                                    );
                                  })}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
          <Footer />
        </div>
        <UserDeleteModal
          show={this.state.userDeleteModal}
          onHide={this.hideDeleteModal}
          admin_delete_user={() => this.admin_delete_user()}
          deleteLoader={this.state.deleteLoader}
        />

        <ResetPasswordModal
          show={this.state.resetPasswordModal}
          onHide={this.hideModal}
          admin_reset_password={() => this.admin_reset_password()}
          value={(this.state.password, this.state.confirmPassword)}
          onChange={(e) => this.onChange(e)}
          passwordError={this.state.passwordError}
          confirmPasswordError={this.state.confirmPasswordError}
          confirmPasswordLoader={this.state.confirmPasswordLoader}
          toggleShowPassword={this.toggleShowPassword}
          passwordVisible={this.state.passwordVisible}
          passwordConfirmVisible={this.state.passwordConfirmVisible}
          toggleShowConfirmPassword={this.toggleShowConfirmPassword}
        />
      </div>
    );
  }
}

export default UsersSection;
