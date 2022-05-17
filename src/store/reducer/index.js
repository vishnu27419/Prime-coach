import { combineReducers } from "redux";
import adminReducer from "./adminReducer/admin";
import coachReducer from "./coachReducer.js/coach";
import athleteReducer from "./athleteRedcer/athlete";

// import userReducer from "./userReducer";

const appReducer = combineReducers({
  admin: adminReducer,
  athlete: athleteReducer,
  coach: coachReducer,
});

const rootReducer = (state, action) => {
  if (action.type === "LOGOUT") {
    console.log("in logout root reducer 999999 ===");
    // localStorage.removeItem("myStore");

    state = undefined;
    localStorage.removeItem("myStore");
  }
  return appReducer(state, action);
};

export default rootReducer;
