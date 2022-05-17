import { all } from "redux-saga/effects";

// import { ProfileWatcher } from "./profileSaga";

// import {
//   OrganisationWatcher,
//   OrganisationProjectWatcher,
//   OrgDetailsWatcher,
// } from "./OrganisationSaga";
// import { UserWatcher } from "./userSaga";

export function* rootSaga() {
  yield all([
    // ProfileWatcher(),
    // OrganisationWatcher(),
    // OrganisationProjectWatcher(),
    // OrgDetailsWatcher(),
    // UserWatcher()
  ]);
}
