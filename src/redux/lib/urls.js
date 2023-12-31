// live hosts

export default urls = {
  HOST: "https://timetracker.egreatminds.com/WebApi",
  BASE_URL: "https://timetracker.egreatminds.com/WebApi",
  //Login
  LOGIN: "/api/Auth/Login",
  REGISTER: "/api/Auth/Register",
  ADD_ATTENDENCE: "/api/Attendance/AddAttendance",
  CHECKOUT: "/api/Attendence/Checkout/",
  UPDATE_ATTENDENCE: "/api/Attendence/UpdateAttendence/9",
  GET_ALL_ATTENDENCE: "/api/Attendence/GetAttendenceAll",
  ADD_COMPANY: "/api/Company/AddCompany",
  GET_ALL_COMPANIES: "/api/Company/GetCompaniesAll",
  APPLY_LEAVE: "/api/Leave/AddLeave",
  GET_LEAVES: "/api/Leave/GetUserLeavesAll",
  GET_ATDNCE_COUNTSALL: "/api/Attendence/GetAttendenceCountsAll",
  ADD_REASON_OF_LATE: "/api/Attendance/LateAttendence",
  ADD_APPLY_LEAVE: "/api/Leave/AddLeave",
  GET_ALL_USERS: "/api/Users/GetAllUsers",
  GET_SITE_USERS: "/api/Users/GetAllSiteAdminUsersLocWise",
  GET_LOCTION_USERS: "/api/Users/GetUser/",
  GET_CEO_DATA: "/api/Users/GetAttendenceMonthlyAllCEO",
  GET_USER_PROFILE: "/api/Users/GetUser/",
  // GET_ALL_USERS: "/api/Users/GetUsers",
  ADD_PROFILE_PIC: "/api/Auth/EditUserImagebyApp/",
  GET_MONTHLY_ATTENDANCE_OF_USER: "/api/Attendence/GetMonthlyAttendenceById/",
  GET_REQUESTS: "/api/RequestItems/GetRequestItemsAll",
  ADD_REQUEST: "/api/RequestItems/AddRequestItems",
  LATE_USERS: "/api/Attendence/GetLateUserById",
  GetAttendenceAllADminsideApp: "/api/Attendence/GetAttendenceAllADminsideApp/",
  EDIT_FACE: "/api/Users/EditUserFaceUpdate",
  CHANGE_PASSWORD: "/api/Users/ChangePassword",
  GET_USER_LOOKUP: "/api/Lookup/GetLocation",
  GET_DEPARTMENT_LOOKUP:'/api/Lookup/GetDepartmentById/',
  GET_DESIGNATION_LOOKUP:'/api/Lookup/GetDesignationById/',

};
