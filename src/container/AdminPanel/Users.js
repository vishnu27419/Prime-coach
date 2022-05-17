import React, { Fragment } from "react";
import CoachHeader from "../PublicLayout/CoachHeader";
import Footer from "../PublicLayout/Footer";
import ResetPasswordModal from "./ResetPasswordModal";
import UserDeleteModal from "./UserDeleteModal";
import { standardPostApi } from "../API/ApiWrapper";
// react toast
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resetPasswordModal: false,
      userDeleteModal: false,
      firstName: "",
      lastName: "",
      email: "",
      firstNameError: "",
      lastNameError: "",
      emailError: "",
      userSearchDetails: [],
      userId: "",
      userIdForResetPassword: "",
      password: "",
      confirmPassword: "",
      passwordError: "",
      confirmPasswordError: "",
      visibleUserDetail: true,
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log("this is ONCHANGE ", this.state);
  }

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

  showDeleteModal = async (data) => {
    // console.log("user data ", data);
    await this.setState({
      userDeleteModal: !this.state.userDeleteModal,
      userId: data.id,
    });
  };

  hideDeleteModal = async () => {
    await this.setState({ userDeleteModal: false });
  };

  admin_user_search = async () => {
    const isValid = this.validationUserSearch();

    if (isValid) {
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
        if (res.data.code === 200) {
          await this.setState({
            userSearchDetails: res.data.data,
            visibleUserDetail: true,
          });
          console.log("THIS IS RES OF admin_user_search =>", res.data.data);
        }
      } catch (error) {
        console.log(error);
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

  admin_reset_password = async () => {
    const isValid = this.validationResetPassword();
    if (isValid) {
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
        }
      } catch (error) {
        console.log(error);
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

  admin_delete_user = async () => {
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
        this.setState({ visibleUserDetail: false });
        console.log("THIS IS RESPONSE OF DELETE USER", res.data.data);
        toast.success(res.data.message, { autoClose: 2500 });
        await this.hideDeleteModal();
      }
    } catch (error) {
      console.log(error);
    }
    console.log("dsd", this.state.userId);
  };

  render() {
    const { firstName, lastName, email } = this.state;
    // console.log("this is only try for new system ");

    return (
      <div className="loader_sec">
        <CoachHeader />
        <div className="dashboard-wrapper">
          <section className="myteams_wrapper">
            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <div style={{ marginTop: "5%", marginBottom: " 5%" }}>
                    <div className="row">
                      <div className="col-sm-1"></div>
                      <div className="col-sm-10 col-xs-12">
                        <form className="table-responsive">
                          <table
                            className="table table-condensed"
                            style={{ color: "whitesmoke" }}
                          >
                            <thead>
                              <tr>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>E-mail</th>
                                <th></th>
                              </tr>
                            </thead>

                            <tbody>
                              <tr>
                                <td>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control w-100"
                                      name="firstName"
                                      value={firstName}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control w-100"
                                      name="lastName"
                                      value={lastName}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </td>
                                <td>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      className="form-control w-100"
                                      name="email"
                                      value={email}
                                      onChange={this.onChange}
                                    />
                                  </div>
                                </td>

                                <td>
                                  <button
                                    type="button"
                                    className="Model_Btn_term"
                                    style={{
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => this.admin_user_search()}
                                  >
                                    Search
                                  </button>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  {/* <button
                                    type="button"
                                    className="Model_Btn_term"
                                    style={{
                                      borderRadius: "6px",
                                      cursor: "pointer",
                                    }}
                                    onClick={() => this.admin_user_search()}
                                  >
                                    Search
                                  </button> */}
                                </td>
                                <td></td>
                                <td></td>
                                <td></td>
                              </tr>
                              {this.state.visibleUserDetail && (
                                <>
                                  {this.state.userSearchDetails.map(
                                    (data, index) => {
                                      return (
                                        <Fragment key={index}>
                                          <tr>
                                            <td style={{ padding: "5px" }}>
                                              {data.first_name}
                                            </td>
                                            <td style={{ padding: "5px" }}>
                                              {data.last_name}
                                            </td>
                                            <td style={{ padding: "5px" }}>
                                              {data.email}
                                            </td>
                                            <td></td>
                                          </tr>
                                          {/* </span> */}

                                          <tr>
                                            <td colSpan="3">
                                              <button
                                                type="button"
                                                className="admin_reset_password_button"
                                                onClick={() =>
                                                  this.showModal(data)
                                                }
                                              >
                                                Reset Password
                                              </button>
                                              <button
                                                type="button"
                                                className="admin_user_delete_button"
                                                onClick={() =>
                                                  this.showDeleteModal(data)
                                                }
                                              >
                                                Delete
                                              </button>
                                            </td>
                                            <td></td>
                                          </tr>
                                        </Fragment>
                                      );
                                    }
                                  )}
                                </>
                              )}
                            </tbody>
                          </table>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
        {/* Reset Password Modal */}
        <ResetPasswordModal
          show={this.state.resetPasswordModal}
          onHide={this.hideModal}
          admin_reset_password={() => this.admin_reset_password()}
          value={(this.state.password, this.state.confirmPassword)}
          onChange={this.onChange}
          passwordError={this.state.passwordError}
          confirmPasswordError={this.state.confirmPasswordError}
        />

        {/* User Delete Modal */}
        <UserDeleteModal
          show={this.state.userDeleteModal}
          onHide={this.hideDeleteModal}
          admin_delete_user={() => this.admin_delete_user()}
        />
      </div>
    );
  }
}

export default Users;
