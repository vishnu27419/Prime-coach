import React, { Component } from "react";

class UpdateSetsRest extends Component {
  render() {
    const { state, updateSets, updateRest } = this.props;

    return (
      <div>
        <div className="edit_WorkoutGroup_Modal_rest_set">
          <div>
            <label htmlFor="">Sets</label>
            <input
              type="text"
              className="form-control"
              name="updateSets"
              defaultValue={
                (updateSets, state.updateWorkoutGroupDetails?.group_sets)
              }
              onChange={(e) => this.props.onChange(e)}
              onKeyPress={this.props.onKeyPress}
            />
            <p className="react_validation">{state.updateSetsError}</p>
          </div>
          <div>
            <label htmlFor="">Rest</label>
            <input
              type="text"
              className="form-control"
              name="updateRest"
              defaultValue={
                (updateRest, state.updateWorkoutGroupDetails?.group_rest)
              }
              onChange={(e) => this.props.onChange(e)}
              onKeyPress={this.props.onKeyPress}
            />
            <p className="react_validation">{state.updateRestError}</p>
          </div>
        </div>
      </div>
    );
  }
}
export default UpdateSetsRest;
