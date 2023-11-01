import types from "../actions/types";

//Get site data from url reducer
const initialState = {
  status: null,
  message: null,
  error: false,
  loginScreen: {
    refreshing: false,
    data: {
      loggedInUserId: null,
      loggedInUserName: "",
      loggedInUserTypeId: "",
      message: null,
    },
  },
  presentTeam: {
    refreshing: false,
    data: [],
  },
  getLeaves:{
    refreshing:false,
    data:[]
  },
  getRequestData:{
    refreshing:false,
    data:[]
  },
  getAttendenceCount: {
    refreshing: false,
    data: {},
  },
  getProfileData:{
    refreshing: false,
    data: [],
  },
  getAttendanceRecord:{
    refreshing: false,
    data: [],
  },
  getLateUser:{
    refreshing: false,
    data: [],
  },
};

export const userReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.LOGIN_USER_REQUEST:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: true,
        },
      };

    case types.LOGIN_USER_SUCCESS:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.LOGIN_USER_FAILURE:
      console.log(action, "action in reducer");
      return {
        ...state,
        loginScreen: {
          ...state.loginScreen,
          refreshing: false,
          data: action.payload,
          errorMsg: action.error,
        },
      };
      case types.LOGIN_LOGOUT_REQUEST:
      // console.log(action, "action in reducer");
      return state;
      case types.LOGIN_LOGOUT_SUCCESS:
      // console.log(action, "action in reducer");
      return initialState;
//get profile data
case types.GET_USER_PROFILE_REQUEST:
  return {
    ...state,
    getProfileData: {
      ...state.getProfileData,
      refreshing: true,
    },
  };

case types.GET_USER_PROFILE_SUCCESS:
  return {
    ...state,
    getProfileData: {
      ...state.getProfileData,
      data: action.payload,
      refreshing: false,
    },
  };
case types.GET_USER_PROFILE_FAILURE:
  return {
    ...state,
    getProfileData: {
      ...state.getProfileData,
      refreshing: false,
    },
  };

//presentTeam
    case types.PRESENT_TEAM_REQUEST:
      return {
        ...state,
        presentTeam: {
          ...state.presentTeam,
          refreshing: true,
        },
      };

    case types.PRESENT_TEAM_SUCCESS:
      return {
        ...state,
        presentTeam: {
          ...state.presentTeam,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.PRESENT_TEAM_FAILURE:
      return {
        ...state,
        presentTeam: {
          ...state.presentTeam,
          refreshing: false,
          errorMsg: action.error,
          data: action.payload,
        },
      };
      //Get attendance record
      case types.GET_MOTHLY_ATTENDANCE_OF_USER_REQUEST:
        return {
          ...state,
          getAttendanceRecord: {
            ...state.getAttendanceRecord,
            refreshing: true,
          },
        };
  
      case types.GET_MOTHLY_ATTENDANCE_OF_USER_SUCCESS:
        return {
          ...state,
          getAttendanceRecord: {
            ...state.getAttendanceRecord,
            data: action.payload,
            refreshing: false,
          },
        };
      case types.GET_MOTHLY_ATTENDANCE_OF_USER_FAILURE:
        return {
          ...state,
          getAttendanceRecord: {
            ...state.getAttendanceRecord,
            refreshing: false,
            data: action.payload,
            errorMsg: action.error,
          },
        };
//get Leaves Data
case types.GET_LEAVES_REQUEST:
      return {
        ...state,
        getLeaves: {
          ...state.getLeaves,
          refreshing: true,
        },
      };

    case types.GET_LEAVES_SUCCESS:
      return {
        ...state,
        getLeaves: {
          ...state.getLeaves,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_LEAVES_FAILURE:
      return {
        ...state,
        getLeaves: {
          ...state.getLeaves,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
      //Get request data
      case types.GET_REQUEST:
      return {
        ...state,
        getRequestData: {
          ...state.getRequestData,
          refreshing: true,
        },
      };

    case types.GET_SUCCESS:
      return {
        ...state,
        getRequestData: {
          ...state.getRequestData,
          data: action.payload,
          refreshing: false,
        },
      };
    case types.GET_FAILURE:
      return {
        ...state,
        getRequestData: {
          ...state.getRequestData,
          refreshing: false,
          // data: action.payload,
          errorMsg: action.error,
        },
      };
//GetAttendenceCountsAll
case types.GET_ATDNCE_COUNTSALL_REQUEST:
  return {
    ...state,
    getAttendenceCount: {
      ...state.getAttendenceCount,
      refreshing: true,
    },
  };

case types.GET_ATDNCE_COUNTSALL_SUCCESS:
  return {
    ...state,
    getAttendenceCount: {
      ...state.getAttendenceCount,
      data: action.payload,
      refreshing: false,
    },
  };
case types.GET_ATDNCE_COUNTSALL_FAILURE:
  return {
    ...state,
    getAttendenceCount: {
      ...state.getAttendenceCount,
      refreshing: false,
      // data: action.payload,
      errorMsg: action.error,
    },
  };
 //get late user
case types.GET_LATE_USER_REQUEST:
  return {
    ...state,
    getLateUser: {
      ...state.getLateUser,
      refreshing: true,
    },
  };

case types.GET_LATE_USER_SUCCESS:
  return {
    ...state,
    getLateUser: {
      ...state.getLateUser,
      data: action.payload,
      refreshing: false,
    },
  };
case types.GET_LATE_USER_FAILURE:
  return {
    ...state,
    getLateUser: {
      ...state.getLateUser,
      refreshing: false,
      // data: action.payload,
      errorMsg: action.error,
    },
  };
    default:
      return state;
  }
};
