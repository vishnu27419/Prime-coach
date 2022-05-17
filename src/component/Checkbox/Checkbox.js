import React from "react";
import IconCheck from "../Checkbox/IconCheck";
import IconUnchecked from "../Checkbox/IconUncheck";

export default class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    let checkBoxStyles = Object.assign(
      {},
      Styles.button,
      this.props && this.props.style
    );
    return (
      <button style={checkBoxStyles} onClick={this.props.toggleCb}>
        <div style={Styles.check}>
          {this.props.checked ? <IconCheck /> : <IconUnchecked />}
        </div>

        <div style={Styles.content}>{this.props.children}</div>
      </button>
    );
  }
}

const Styles = {
  button: {
    background: "transparent",
    border: "0",
    // marginBottom: "0.5rem",
    fontSize: "1rem",
    display: "flex",
    outline: "0",
    color: "#9B9B9B",
    marginRight: "0.5rem",
    cursor: "pointer",
    textAlign: "left",
  },

  check: {
    marginRight: "1rem",
  },

  content: {
    paddingTop: "0.2rem",
    fontSize: "0.9rem",
    fontWeight: "100",
    lineHeight: "1.25rem",
  },
};
