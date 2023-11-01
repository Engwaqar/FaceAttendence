import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { routeName } from "../constants/routeName";
import AdminUsers from "../screens/Admin/AdminUsers";
import Login from "../screens/Auth/Login/Login";
import Splash from "../screens/Auth/splash/Splash";
import BottomTabs from "./BottomTabs";
import AdminProfile from "../screens/Admin/AdminProfile";
import ApplyLate from "../screens/Home/ApplyLate";
import ApplyLeaves from "../screens/Home/ApplyLeaves";
import AdminBottomTabs from "./AdminBottomTabs";
import CeoScreen from "../screens/CEO/CeoScreen";

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={routeName.SPLASH}
    >
      <Stack.Screen name={routeName.SPLASH} component={Splash} />
      <Stack.Screen name={routeName.LOGIN} component={Login} />
      <Stack.Screen name={routeName.BOTTOM_TABS} component={BottomTabs} />
      <Stack.Screen
        name={routeName.ADMIN_BOTTOM_TABS}
        component={AdminBottomTabs}
      />
      <Stack.Screen name={routeName.ADMIN_USERS} component={AdminUsers} />
      <Stack.Screen name={routeName.ADMIN_PROFILE} component={AdminProfile} />
      <Stack.Screen name={routeName.APPLY_LATE} component={ApplyLate} />
      <Stack.Screen name={routeName.APPLYLEAVES} component={ApplyLeaves} />
      <Stack.Screen name={routeName.CEO_SCREEN} component={CeoScreen} />
    </Stack.Navigator>
  );
}
export default AuthStack;
