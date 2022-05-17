import React from "react";

class TryRadio extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selectedOption: "" };
    this.onValueChange = this.onValueChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  onValueChange(event) {
    this.setState({
      selectedOption: event.target.value,
    });
    console.log("this is state", this.state.selectedOption);
  }

  formSubmit(event) {
    event.preventDefault();
    console.log("jggvkgv", this.state.selectedOption);
  }

  render() {
    return (
      <div>
        <form onSubmit={this.formSubmit}>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Male"
                checked={this.state.selectedOption === "Male"}
                onChange={this.onValueChange}
              />
              Male
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Female"
                checked={this.state.selectedOption === "Female"}
                onChange={this.onValueChange}
              />
              Female
            </label>
          </div>
          <div className="radio">
            <label>
              <input
                type="radio"
                value="Other"
                checked={this.state.selectedOption === "Other"}
                onChange={this.onValueChange}
              />
              Other
            </label>
          </div>
          <div>Selected option is : {this.state.selectedOption}</div>
          <button className="btn btn-default" type="submit">
            Submit
          </button>
        </form>
      </div>
    );
  }
}

export default TryRadio;
