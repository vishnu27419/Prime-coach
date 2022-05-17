import * as types from "../../types";

export function listAthleteWorkoutRequest(data) {
  return {
    type: types.LIST_ATHLETE_WORKOUT,
    payload: data,
  };
}

export function FORGOT_PASSWORD_EMAIL(data) {
  return {
    type: types.FORGOT_PASSWORD_EMAIL,
    payload: data,
  };
}
