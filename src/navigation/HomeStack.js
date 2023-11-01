import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import Dashboard from "../screens/Home/Dashboard";
import Notification from "../screens/Home/Notification";
import PresentTeam from "../screens/Home/PresentTeam";
import AttendenceDetails from "../screens/Home/AttendenceDetails";
import Profile from "../screens/Home/Profile";
import Leaves from "../screens/Home/Leaves";
import Request from "../screens/Home/Request";
import AddRequests from "../screens/Home/AddRequest";
import EmployeProfile from "../screens/Home/EmployeProfile";
import LateComer from "../screens/Home/LateComer";
import AllEmpData from "../screens/Admin/AllEmpData";
import SendNotifications from "../screens/Home/SendNotifications";
import ChangePassword from "../screens/Auth/ChangePassword/ChangePassword";
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.DASHBOARD}
    >
      <Stack.Screen name={routeName.DASHBOARD} component={Dashboard} />
      <Stack.Screen name={routeName.PRESENT_TEAM} component={PresentTeam} />
      <Stack.Screen name={routeName.NOTIFICATION} component={Notification} />
      <Stack.Screen name={routeName.ATTENDENCE_DETAIL}component={AttendenceDetails}/>
      <Stack.Screen name={routeName.LEAVES} component={Leaves} />
      <Stack.Screen name={routeName.REQUEST} component={Request} />
      <Stack.Screen name={routeName.ADDREQUEST} component={AddRequests} />
      <Stack.Screen name={routeName.EMPLOYEE_PROFILE}component={EmployeProfile}/>
      <Stack.Screen name={routeName.PROFILE} component={Profile} />
      <Stack.Screen name={routeName.LATECOMER} component={LateComer} />
      <Stack.Screen name={routeName.ALL_EMP_DATA} component={AllEmpData} />
      <Stack.Screen name={routeName.SEND_NOTIFICATIONS} component={SendNotifications} />
      <Stack.Screen name={routeName.CHANGE_PASSWORD} component={ChangePassword} />
      


    </Stack.Navigator>
  );
}

export default HomeStack;
