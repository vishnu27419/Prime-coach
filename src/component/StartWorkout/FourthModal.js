import React from "react";
import { Form } from "react-bootstrap";

export default class FourthModal extends React.Component {
  state = { weightType: 0, weight: "pounds" };

  render() {
    const { bodyWeight, sleep_level, water_level } = this.props.value;
    const { weightType, weight } = this.state;
    return (
      <div className="row">
        <div className="col-md-12 ">
          <Form>
            <div className="form-group">
              <label htmlFor="">What is your Body Weight?</label>
              <div style={{ display: "flex" }}>
                <input
                  type="text"
                  className="form-control"
                  placeholder={`in ${weight}`}
                  name="bodyWeight"
                  value={bodyWeight}
                  onChange={this.props.onChange}
                  onKeyPress={this.props.onKeyPress}
                  maxLength={5}
                  style={{ width: "85%" }}
                />
                <div>
                  <button
                    type="button"
                    style={
                      weightType === 0
                        ? {
                            padding: "6px 12px",
                            color: "rgb(255, 255, 255)",
                            border: "1px solid #2F84CA",
                            marginLeft: "5px",
                            backgroundColor: "#28a745",
                            fontWeight: "bold",
                            borderTopLeftRadius: "5px",
                            borderBottomLeftRadius: "5px",
                            cursor: "pointer",
                            boxShadow:
                              " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                          }
                        : {
                            padding: "6px 12px",
                            color: "#000",
                            border: "1px solid #2F84CA",
                            marginLeft: "5px",
                            // backgroundColor: "#28a745",
                            fontWeight: "bold",
                            borderTopLeftRadius: "5px",
                            cursor: "pointer",
                            borderBottomLeftRadius: "5px",
                            boxShadow:
                              " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                          }
                    }
                    onClick={() => {
                      this.setState({ weightType: 0, weight: "pounds" });
                    }}
                  >
                    lbs
                  </button>
                  <button
                    type="button"
                    style={
                      weightType === 1
                        ? {
                            padding: "6px 12px",
                            color: "rgb(255, 255, 255)",
                            border: "1px solid #2F84CA",
                            backgroundColor: "#28a745",
                            fontWeight: "bold",
                            borderTopRightRadius: "5px",
                            cursor: "pointer",
                            borderBottomRightRadius: "5px",
                            boxShadow:
                              " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                          }
                        : {
                            padding: "6px 12px",
                            color: "#000",
                            border: "1px solid #2F84CA",
                            // backgroundColor: "#28a745",
                            fontWeight: "bold",
                            borderTopRightRadius: "5px",
                            cursor: "pointer",
                            borderBottomRightRadius: "5px",
                            boxShadow:
                              " rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset",
                          }
                    }
                    onClick={() => {
                      this.setState({ weightType: 1, weight: "kg" });
                    }}
                  >
                    kg
                  </button>
                </div>
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="">How many hours did you sleep?</label>
              <input
                type="text"
                className="form-control"
                placeholder="in hours"
                name="sleep_level"
                value={sleep_level}
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
                maxLength={2}
              />
            </div>
            <div className="form-group">
              <label htmlFor="">How much water have you intake? </label>
              <input
                type="text"
                className="form-control"
                placeholder="in liters"
                name="water_level"
                value={water_level}
                onChange={this.props.onChange}
                onKeyPress={this.props.onKeyPress}
                maxLength={2}
              />
            </div>
            <div className="col-md-12">
              <button
                type="button"
                id="exercise-input-btn-save"
                className="btn btn-success col-md-2 col-md-offset-2"
                // onClick={() => this.props.fourthModalfunction()}
                onClick={() => this.props.workout_sleep_water_level(weightType)}
                style={{
                  marginTop: "3%",
                  margin: "0 38%",
                }}
              >
                Submit
              </button>
            </div>
          </Form>
        </div>
      </div>
    );
  }
}
