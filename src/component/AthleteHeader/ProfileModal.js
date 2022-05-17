import React, { Component } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
// datepicker in react
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Calander from "Custom/images/celender.jpg";

class ProfileModal extends Component {
  render() {
    const {
      show,
      onHide,
      state,
      onChange,
      isInputNumber,
      isHeightNumber,
      updateUserProfile,
    } = this.props;

    return (
      <div>
        <Modal show={show} onHide={onHide}>
          <Modal.Body>
            <div className="modal-header">
              <h5 className="modal-title" id="coachprofileTitle">
                Update Personal Details
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={onHide}
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="firstName"
                  value={state.firstName}
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation">{state?.firstNameError}</p>
              </div>
              <div className="form-group">
                <label>Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  value={state.lastName}
                  name="lastName"
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation">{state.lastNameError}</p>
              </div>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  className="form-control"
                  value={state.email}
                  // name="email"
                  // onChange={(e) => onChange(e)}
                  disabled
                  style={{ cursor: "not-allowed" }}
                  title="Your email cannot be updated after sign-up."
                />
              </div>
              <div className="form-group">
                <label>Date of Birth</label>
                <DatePicker
                  selected={state?.date}
                  onChange={this.props.handleDateChange}
                  name="dateOfBirth"
                  value={state.date}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                  showMonthDropdown
                  showYearDropdown
                  placeholderText="DD/MM/YYYY"
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
                <p className="react_validation">{state.DateOfBirthError}</p>
              </div>

              <div className="form-group">
                <label>Phone Number</label>
                <input
                  type="text"
                  className="form-control"
                  value={state.phoneNumber}
                  name="phoneNumber"
                  onChange={(e) => onChange(e)}
                  onKeyPress={isInputNumber}
                  maxLength={10}
                />
                <p className="react_validation">{state.phoneError}</p>
              </div>

              <div className="form-group">
                <label>Address</label>
                <input
                  type="text"
                  className="form-control"
                  value={state?.address}
                  name="address"
                  onChange={(e) => onChange(e)}
                />
                <p className="react_validation">{state.addressError}</p>
              </div>

              <div className="form-group">
                <label htmlFor="">Gender</label>
                <select
                  className="form-control"
                  value={state.gender}
                  name="gender"
                  onChange={(e) => onChange(e)}
                >
                  <option value="">Select a Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                <p className="react_validation">{state.genderError}</p>
              </div>

              <div className="form-group ">
                <label htmlFor="">
                  Body Weight <span className="react-span">(in lbs)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="bodyweight"
                  aria-describedby="bodyweight"
                  // placeholder="Weight"
                  name="BodyWeight"
                  value={state.BodyWeight}
                  onChange={(e) => onChange(e)}
                  onKeyPress={isHeightNumber}
                  maxLength={6}
                />
                <p className="react_validation">{state.BodyWeightError}</p>
              </div>

              <div className="form-group ">
                <label htmlFor="">
                  Height <span className="react-span">(in cms)</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="height"
                  aria-describedby="height"
                  // placeholder="Height"
                  name="height"
                  value={state.height}
                  onChange={(e) => onChange(e)}
                  onKeyPress={isHeightNumber}
                  maxLength={6}
                />
                <p className="react_validation">{state.heightError}</p>
              </div>
            </div>
          </Modal.Body>
          <ModalFooter>
            <button
              type="button"
              className="Model_btn"
              data-dismiss="modal"
              onClick={(e) => {
                updateUserProfile();
              }}
            >
              Save
            </button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default ProfileModal;
