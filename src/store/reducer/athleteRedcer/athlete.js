import * as types from "../../types";

const initialState = {
  //   toggleSidemenu: false,
  //   isAuthenticated: false,
  //   token: "",
  weekDetail: [],
  forgotPasswordEmail: "",
};

const AthleteReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LIST_ATHLETE_WORKOUT:
      return {
        ...state,
        weekDetail: action.payload,
      };

    case types.FORGOT_PASSWORD_EMAIL:
      return {
        ...state,
        forgotPasswordEmail: action.payload,
      };
    default:
      return state;
  }
};

export default AthleteReducer;
