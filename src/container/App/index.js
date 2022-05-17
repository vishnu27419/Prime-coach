// importing Styles
import "../../Custom/css2/bootstrap.min.css";
import "../../Custom/css2/style.css";

import "../../../node_modules/font-awesome/css/font-awesome.min.css";

// for scroll page on the top in React after navigate to another page
import ScrollToTop from "react-router-scroll-top";
import { ToastContainer, Slide } from "react-toastify";

import React, { useEffect } from "react";

// const AsyncLoginPageWrapper = lazy(() => import("../Login/LoginPageWrapper"));
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomePage from "../HomePage";
import ForAthletes from "../ForAthletes";
import ForCoach from "../ForCoach";
import SportSection from "../SportSection";
import MembershipSection from "../MembershipSection/MembershipPageWrapper";
import SelectionWrapper from "../LoginSection/SelectionWrapper";

import LoginPageWrapper from "../Login/LoginPageWrapper";
import PlayerReports from "../PlayerReports";
import PrivacyPolicy from "../Privacy Policy/PrivacyPolicy";
import CookiePolicy from "../Cookie Policy/CookiePolicy";
import TermsAndConditions from "../Terms & Conditions/TermsAndConditions";
import Faqs from "../FAQs/Faqs";
import AnnualTrainingPlan from "../Annual Training Plan/AnnualTrainingPlan";
import MyTeamWrapper from "../Coach After Login/MyTeamWrapper";
import MyPlayers from "../Coach After Login/MyPlayers";
import CoachPlayerInner from "../Coach After Login/CoachPlayerInner";
import AnnualProgramInner from "../Annual Training Plan/AnnualProgramInner";
import AnnualInSession from "../Annual Training Plan/AnnualInSession";

import TranningPlan from "../Coach After Login/TranningPlan";
import ProgramView from "../Coach After Login/ProgramView";
import TestingResults from "../Coach After Login/TestingResults";
import PlayerReport from "../Coach After Login/PlayerReport";
import SignupWrapper from "../SignupForAthletes/SignupWrapper";
import Logout from "../Logout/LogoutSection";
import SelfScreening from "../SelfScreening/SelfScreening";
import PlayerTesting from "../Testing/PlayerTesting";
import Reports from "../MyTeamReports/Report";
import ExerciseSetting from "../AdminPanel/ExerciseSettings";
import Users from "../AdminPanel/Users";
import PasswordConfirmation from "../ForgotPassword/PasswordConfirmation";
import TranningPlanWeek from "../../component/TranningPlan/TranningPlanWeek";
import TranningPlanDay from "../../component/TranningPlan/TranningPlanDay";
import { createBrowserHistory } from "history";
import AlternativeExercise from "../Pages/alternativeExercise/AlternativeExercise";
import CoachList from "container/Pages/coach/CoachList";
import AssignMultipleCoach from "container/Pages/coach/assignMultipleCoach/AssignMultipleCoaches";
import ScreeningProtocol from "container/Pages/screeningProtocol/ScreeningProtocol";
import CoachAddEvent from "container/Events/CoachAddEvent";
import TeamPlayerEvent from "container/Events/AssignPlayerEvents/TeamPlayerEvent";
import EmailWrapper from "container/ForgotPassword/EmailWrapper";
import UpdateNewPassword from "container/ForgotPassword/UpdateNewPassword";
import AnalyseWorkoutCoachSide from "container/Pages/analyseWorkout/AnalyseWorkoutCoachSide";
import AnalyseWorkoutAthleteSide from "container/Pages/analyseWorkout/AnalyseWorkoutAthleteSide/AnalyseWorkoutAthleteSide";
import AthleteEvent from "container/Events/athleteEvent/AthleteEvent";
import { errorToast } from "utils/toastMessage";
import CreateAwards from "container/Pages/awards/admin/CreateAwards";
import MadicalRoom from "container/MadicalRoom/MadicalRoom";
import CoachAward from "container/Pages/awards/Coach/CoachAward";
import AwardListBoard from "container/Pages/awards/All/AwardListBoard";
import CoachStatistic from "container/Pages/Statistic/CoachStatistic";
import CoachLibrary from "container/Pages/CoachLibrary/CoachLibrary";
import Attandance from "container/Pages/Attandance/Attandance";
import ThankyouResponse from "container/Pages/ThankyouResponse.js/ThankyouResponse";
import CoachAlternativeExercise from "container/Pages/alternativeExercise/CoachAlternativeExercise";
import ExerciseSettingForCoach from "container/AdminPanel/exerciseSettingForCoach/ExerciseSettingForCoach";
import AwardBoardForPlayer from "container/Pages/awards/awardBoardForPlayer/AwardBoardForPlayer";
import UsersSection from "container/AdminPanel/users/UsersSection";
// import RUF from "../../component/RUF";

const hist = createBrowserHistory();
function App() {
  useEffect(() => {
    setupOneSignalTry();
  }, []);

  const setupOneSignalTry = async (userType) => {
    var useragentid = null;
    var OneSignal = window.OneSignal || [];

    // DEbug
    // let ClientAppId = "46b18615-9b70-46a4-99ba-01577079a3bc";
    // let freelancerAppId = "7465c924-c23f-4a57-a069-0f152b4dc64c";
    //     // Live

    // let ClientAppId = "e091b0be-c452-4378-8e8b-afbfc6a281a3";
    // let freelancerAppId = "7391a3f5-f386-47b9-9021-25cfa6a1d161";

    // let safariWebIdClient =
    //   "web.onesignal.auto.3145fc89-5d6b-4727-99ef-e9ab80472582";
    // let safariWebIdFreelancer =
    //   "web.onesignal.auto.6514249a-4cb8-451b-a889-88f5913c9a7f";
    // OneSignal.log.setLevel("trace");
    // OneSignal.log.setLevel("trace");
    await OneSignal.push([
      "init",
      {
        appId: "82e30463-0d83-4576-9fbb-5438eec0cb42",
        // safari_web_id:
        //   userType === "freelancer" ? safariWebIdFreelancer : safariWebIdClient,
        autoRegister: false,
        notifyButton: {
          enable: false,
        },
        persistNotification: false,
        notificationClickHandlerAction: "focus",
        notificationClickHandlerOrigin: "origin",
        notificationClickHandlerMatch: "origin",
      },
    ]);

    //Firstly this will check user id
    await OneSignal.push(() => {
      OneSignal.getUserId().then((userId) => {
        if (userId == null) {
          console.log("userID 1", userId);
        } else {
          useragentid = userId;
          console.log("useragentid", useragentid);
          localStorage.setItem("useragentid", useragentid);

          OneSignal.isPushNotificationsEnabled((isEnabled) => {
            console.log("isPushNotificationsEnabled -->", isEnabled);
            if (isEnabled) {
              console.log("isPushNotificationsEnabled -->", useragentid);
            } else {
              if (useragentid != null) {
                OneSignal.setSubscription(true);
              } else {
                OneSignal.registerForPushNotifications({
                  modalPrompt: true,
                });
              }
            }
          });
        }
      });
    });

    OneSignal.push(async () => {
      await OneSignal.on(
        "notificationPermissionChange",
        async (permissionChange) => {
          var currentPermission = permissionChange.to;
          console.log("New permission state:", currentPermission);
          if (currentPermission === "granted") {
            // OneSignal.setSubscription(true);
          }
        }
      );

      // This event can be listened to via the on() or once() listener
    });

    //Secondly this will check when subscription changed
    await OneSignal.push(() => {
      OneSignal.on("subscriptionChange", (isSubscribed) => {
        console.log("Subscription", isSubscribed);
        if (isSubscribed === true) {
          OneSignal.getUserId()
            .then((userId) => {
              useragentid = userId;
              console.log("useragentid--", useragentid);
              localStorage.setItem("useragentid", useragentid);
            })
            .then(() => {
              console.log("useragentid", useragentid);
              localStorage.setItem("useragentid", useragentid);
            });
        } else if (isSubscribed === false) {
          OneSignal.getUserId().then(function (userId) {
            useragentid = userId;
          });
        } else {
          console.log("Unable to process the request");
        }
      });
    });

    await OneSignal.push(() => {
      OneSignal.on("notificationDisplay", (event) => {
        console.warn("OneSignal notification displayed:", event);
      });
    });

    await OneSignal.push([
      "addListenerForNotificationOpened",
      function (data) {
        console.log("addListenerForNotificationOpened");
        console.log("addListenerForNotificationOpened", data);
      },
    ]);
  };
  return (
    <div className="App">
      <Router basename="/" history={hist}>
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover={false}
          transition={Slide}
        />

        <ScrollToTop>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/forathletes" component={ForAthletes} />
          <Route exact path="/forcoach" component={ForCoach} />
          <Route exact path="/sportsection" component={SportSection} />
          <Route exact path="/membership/:id" component={MembershipSection} />
          {/* <Route exact path="/loginsection" component={LoginSection} /> */}
          <Route
            exact
            path="/loginsection/:athlete/:coach"
            component={SelectionWrapper}
          />
          <Route exact path={`/login/:person`} component={LoginPageWrapper} />
          <Route exact path="/forgotpassword" component={EmailWrapper} />
          <Route
            exact
            path="/signupathletes/:id/:planId"
            component={SignupWrapper}
          />
          <Route exact path="/playerreports" component={PlayerReports} />
          <Route exact path="/privacypolicy" component={PrivacyPolicy} />
          <Route exact path="/cookiepolicy" component={CookiePolicy} />
          <Route
            exact
            path="/termsandconditions"
            component={TermsAndConditions}
          />
          <Route exact path="/faqs" component={Faqs} />
          <Route
            exact
            path="/annualtrainingplan"
            component={AnnualTrainingPlan}
          />
          <Route
            exact
            path="/annualprograminner/:in_season/:off_season/:pre_season/:transition"
            component={AnnualProgramInner}
          />
          <Route
            exact
            path="/annualinsession/:id/:in_season"
            component={AnnualInSession}
          />
          <Route exact path="/myteamwrapper" component={MyTeamWrapper} />
          <Route exact path="/myplayers/:id/:teamname" component={MyPlayers} />
          <Route
            exact
            path="/coachplayerinner/:id/:playerId/:teamname"
            component={CoachPlayerInner}
          />
          <Route
            exact
            path="/tranningplan/:id/:playerId/:teamname"
            component={TranningPlan}
          />
          <Route
            exact
            path="/programview/:id/:playerId/:teamname"
            component={ProgramView}
          />
          <Route
            exact
            path="/testingresults/:id/:playerId/:teamname"
            component={TestingResults}
          />
          <Route
            exact
            path="/playerreport/:id/:playerId/:teamname"
            component={PlayerReport}
          />
          <Route exact path="/logout" component={Logout} />
          <Route exact path="/selfscreening" component={SelfScreening} />
          <Route
            exact
            path="/testing/:id/:teamname"
            component={PlayerTesting}
          />
          <Route exact path="/reports/:id/:teamname" component={Reports} />
          <Route exact path="/exercisesettings" component={ExerciseSetting} />
          <Route
            exact
            path="/exercisesetting"
            component={ExerciseSettingForCoach}
          />
          <Route exact path="/users" component={Users} />
          <Route exact path="/userssection" component={UsersSection} />

          <Route
            exact
            path="/passwordconfirmation"
            component={PasswordConfirmation}
          />
          <Route
            exact
            path="/tranningplanweek/:id/:playerId/:teamname/:tranningType"
            component={TranningPlanWeek}
          />
          <Route
            exact
            path="/tranningplanday/:id/:playerId/:teamname"
            component={TranningPlanDay}
          />
          {/* <Route exact path="/ruf" component={RUF} /> */}
          <Route
            exact
            path="/alternativeExercise"
            component={AlternativeExercise}
          />
          <Route
            exact
            path="/coachalternativeExercise"
            component={CoachAlternativeExercise}
          />
          <Route exact path="/coachList" component={CoachList} />
          <Route
            exact
            path="/assignMultipleCoach"
            component={AssignMultipleCoach}
          />
          <Route
            exact
            path="/screeningProtocol/:id/:teamname"
            component={ScreeningProtocol}
          />
          <Route
            exact
            path="/coachAddEvent/:id/:teamname"
            component={CoachAddEvent}
          />
          <Route
            exact
            path="/teamPlayerEvent/:id/:playerId/:teamname"
            component={TeamPlayerEvent}
          />
          <Route
            exact
            path="/updatenewpassword"
            component={UpdateNewPassword}
          />
          <Route
            exact
            // path="/analyseworkoutcoach"
            path="/analyseworkoutcoach/:id/:playerId/:teamname"
            component={AnalyseWorkoutCoachSide}
          />
          <Route
            exact
            path="/selfscreening/analyseworkoutathlete"
            component={AnalyseWorkoutAthleteSide}
          />
          <Route exact path="/athleteEvent" component={AthleteEvent} />
          <Route exact path="/createAwards" component={CreateAwards} />
          <Route
            exact
            path="/madicalRoom/:id/:teamname"
            component={MadicalRoom}
          />
          <Route
            exact
            path="/coachAward/:id/:teamname"
            component={CoachAward}
          />
          <Route
            exact
            path="/awardsBoard/:id/:teamname"
            component={AwardListBoard}
          />
          <Route
            exact
            path="/coachstatistic/:id/:teamname"
            component={CoachStatistic}
          />
          <Route
            exact
            path="/coachLibrary/:id/:teamname"
            component={CoachLibrary}
          />
          <Route
            exact
            path="/attendance/:id/:teamname"
            component={Attandance}
          />
          <Route
            exact
            path="/awardbordforathlete"
            component={AwardBoardForPlayer}
          />
          <Route exact path="/thankyou" component={ThankyouResponse} />
        </ScrollToTop>
      </Router>
      {/* </Suspense> */}
    </div>
  );
}

export default App;
