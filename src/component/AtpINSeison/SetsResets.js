import React from "react";

function SetsResets(props) {
  const { setsGroup, restGroup } = props.value;
  return (
    <div>
      <div className="form-group col-md-12">
        <label>Sets</label>
        <input
          className="form-control"
          name="setsGroup"
          value={(setsGroup, props.setsGroup)}
          onChange={props.onChange}
          onKeyPress={props.onKeyPress}
        />
        <p className="react_validation">{props.setsGroupError}</p>
      </div>

      <div className="form-group col-md-12">
        <label>Rest</label>
        <input
          className="form-control"
          name="restGroup"
          value={(restGroup, props.cleanRestGroup)}
          onChange={props.onChange}
          onKeyPress={props.onKeyPress}
        />
        <p className="react_validation">{props.restGroupError}</p>
      </div>
    </div>
  );
}

export default SetsResets;
