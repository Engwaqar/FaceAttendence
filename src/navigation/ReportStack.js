import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import AttendenceDetails from "../screens/Home/AttendenceDetails";
import Users from "../screens/Home/Users";
import EmployeProfile from "../screens/Home/EmployeProfile";


const Stack = createNativeStackNavigator();

function ReportStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.USERS}
    >
      <Stack.Screen name={routeName.USERS} component={Users} />
      <Stack.Screen name={routeName.ATTENDENCE_DETAIL}component={AttendenceDetails}/>
      <Stack.Screen name={routeName.EMPLOYEE_PROFILE}component={EmployeProfile}/>
    </Stack.Navigator>
  );
}

export default ReportStack;
