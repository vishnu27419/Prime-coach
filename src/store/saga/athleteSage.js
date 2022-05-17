import { put, takeLatest, takeEvery, all, call } from "redux-saga/effects";
import * as types from "../types";
import { apiGetOrganisationUsers } from "../../../api/api";
import { AxiosError } from "../../admin/ContentComponent/Common/AxiosError";

// function* userDetailsWorker(action) {
//   try {
//     yield put({ type: types.USER_DETAILS_LOADING });
//     // console.log('=== in userDetails saga ===:', action)
//     const response = yield apiGetOrganisationUsers(action.payload.orgID);

//     if (
//       response.status >= 200 &&
//       response.status < 300 &&
//       response.data !== null
//     ) {
//       const data = yield response.data;
//       console.log("=== userDetailsWorker saga data ===", response.data);

//       yield put({ type: types.USER_DETAILS_SUCCESS, payload: data });
//     } else {
//       throw response;
//     }
//   } catch (error) {
//     console.log("err:", error);
//     yield put({ type: types.USER_DETAILS_FAILURE });

//     AxiosError(error, "userDetailsWorker");
//   }
// }

function* UserWatcher() {
  // console.log('*** UserWatcher *** ', UserWatcher)
  //   yield takeLatest(types.USER_DETAILS_REQUEST, userDetailsWorker);
}
export { UserWatcher };
