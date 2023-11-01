import AsyncStorage from "@react-native-community/async-storage";
import { takeLatest, put, select } from "redux-saga/effects";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";

// import { parseCats } from "../../helpers/cat.helpers";
import types from "../actions/types";
import Api from "../lib/api";
import urls from "../lib/urls";
import { StackActions } from "@react-navigation/native";
//LOGIN
export function* loginUserSaga() {
  console.log("saga function Works");
  yield takeLatest(types.LOGIN_USER_REQUEST, loginUserApi);
}
function* loginUserApi(data, response) {
  console.log(data, "action in saga");
  let { params, navigation } = data.data;
  try {
    const response = yield Api.post(urls.LOGIN, params);
    console.log(response, "response");
    if (response && response.data != null) {
      // if (response.data.loggedInUserTypeId == "4") {
      //   _toast("Please login from web portal!");
      //   yield put({ type: types.LOGIN_USER_FAILURE, payload: response });

      //   return false;
      // }
      yield AsyncStorage.setItem("@token", response.data.token);
      yield AsyncStorage.setItem(
        "@loggedInUserTypeId",
        response.data.loggedInUserTypeId
      );
      yield AsyncStorage.setItem("@userId", response.data.loggedInUserId);
      // yield AsyncStorage.setItem("@companyId", response.data.companyId);
      yield AsyncStorage.setItem("@userName", response.data.loggedInUserName);
      yield put({ type: types.LOGIN_USER_SUCCESS, payload: response });
      if (response.data.loggedInUserTypeId == "3") {
        navigation.replace(
          routeName.BOTTOM_TABS,
          response.data.loggedInUserTypeId
        );
      } else if (response.data.loggedInUserTypeId == "2") {
        navigation.replace(routeName.ADMIN_BOTTOM_TABS);
      } else if (response.data.loggedInUserTypeId == "1") {
        navigation.replace(routeName.ADMIN_USERS);
      }else if (response.data.loggedInUserTypeId == "4") {
        navigation.replace(routeName.CEO_SCREEN);
      }
    } else {
      yield put({ type: types.LOGIN_USER_FAILURE, payload: response });
    }
  } catch (error) {
    console.log("error", error);
    yield put({ type: types.LOGIN_USER_FAILURE, error: error });
  }
}
export function* logoutUserSaga() {
  yield takeLatest(types.LOGIN_LOGOUT_REQUEST, logoutUserApi);
}
function* logoutUserApi(data, response) {
  // let { params, navigation } = data.data;
  yield put({ type: types.LOGIN_LOGOUT_SUCCESS });
}
//present team
export function* presentTeamSaga() {
  yield takeLatest(types.PRESENT_TEAM_REQUEST, presentTeamApi);
}
function* presentTeamApi(data) {
  // let { params, navigation } = data.data;
  try {
    const response = yield Api.get(urls.GET_ALL_ATTENDENCE);
    console.log(response, "online res");
    if (response && response.success == true) {
      yield put({ type: types.PRESENT_TEAM_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.PRESENT_TEAM_FAILURE, payload: [] });
    }
  } catch (error) {
    yield put({ type: types.PRESENT_TEAM_FAILURE, payload: [], error: error });
  }
}
//Get leaves
export function* getLeaves() {
  yield takeLatest(types.GET_LEAVES_REQUEST, getLeavesApi);
}
function* getLeavesApi(data) {
  try {
    const response = yield Api.get(urls.GET_LEAVES);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_LEAVES_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_LEAVES_FAILURE, payload: response.data });
    }
  } catch (error) {
    yield put({ type: types.GET_LEAVES_FAILURE, error: error });
  }
}
//get request
export function* getRequestData() {
  yield takeLatest(types.GET_REQUEST, getRequestDataApi);
}
function* getRequestDataApi(data) {
  // let { params, navigation } = data.data;
  try {
    const response = yield Api.get(urls.GET_LEAVES);
    console.log(response, "response");
    if (response && response.data != null) {
      yield put({ type: types.GET_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_FAILURE, payload: response.data });
    }
  } catch (error) {
    yield put({ type: types.GET_FAILURE, error: error });
  }
}
//get user profile
export function* getUserProfile() {
  yield takeLatest(types.GET_USER_PROFILE_REQUEST, getUserProfileApi);
}
function* getUserProfileApi(data) {
  const profileId = yield AsyncStorage.getItem("@userId");
  console.log("profileId", profileId);

  try {
    const response = yield Api.get(urls.GET_USER_PROFILE + profileId);
    if (response && response.data != null) {
      yield put({
        type: types.GET_USER_PROFILE_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: types.GET_USER_PROFILE_FAILURE,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_USER_PROFILE_FAILURE, error: error });
  }
}
//get user attendance record
export function* getUserAttendanceRecord() {
  yield takeLatest(
    types.GET_MOTHLY_ATTENDANCE_OF_USER_REQUEST,
    getUserAttendanceRecordApi
  );
}
function* getUserAttendanceRecordApi(data) {
  console.log("data", data);
  const profileId = yield AsyncStorage.getItem("@userId");

  try {
    const response = yield Api.get(
      urls.GET_MONTHLY_ATTENDANCE_OF_USER + data.data + "/" + profileId
    );
    if (response && response.data != null) {
      yield put({
        type: types.GET_MOTHLY_ATTENDANCE_OF_USER_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: types.GET_MOTHLY_ATTENDANCE_OF_USER_FAILURE,
        payload: [],
      });
    }
  } catch (error) {
    yield put({
      type: types.GET_MOTHLY_ATTENDANCE_OF_USER_FAILURE,
      payload: [],
      error: error,
    });
  }
}
//GetAttendenceCountsAll
export function* getAttendenceCount() {
  yield takeLatest(types.GET_ATDNCE_COUNTSALL_REQUEST, getAttendenceCountApi);
}
function* getAttendenceCountApi(data) {
  // let { params, navigation } = data.data;
  try {
    const response = yield Api.get(urls.GET_ATDNCE_COUNTSALL);
    console.log(response, "GET_ATDNCE_COUNTSALL");
    if (response && response.data != null) {
      yield put({
        type: types.GET_ATDNCE_COUNTSALL_SUCCESS,
        payload: response.data,
      });
    } else {
      yield put({
        type: types.GET_ATDNCE_COUNTSALL_FAILURE,
        payload: response.data,
      });
    }
  } catch (error) {
    yield put({ type: types.GET_ATDNCE_COUNTSALL_FAILURE, error: error });
  }
}
//get late user'
export function* getLateUser() {
  yield takeLatest(types.GET_LATE_USER_REQUEST, getLateUserApi);
}
function* getLateUserApi(data) {
  // const userid= yield AsyncStorage.getItem("@userId");
  try {
    const response = yield Api.get(urls.LATE_USERS);
    console.log(response, "GET_ATDNCE_COUNTSALL");
    if (response && response.data != null) {
      yield put({ type: types.GET_LATE_USER_SUCCESS, payload: response.data });
    } else {
      yield put({ type: types.GET_LATE_USER_FAILURE, payload: response.data });
    }
  } catch (error) {
    yield put({ type: types.GET_LATE_USER_FAILURE, error: error });
  }
}
