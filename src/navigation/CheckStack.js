import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { routeName } from '../constants/routeName';
import Home from '../screens/Home/Home';
import ApplyLeaves from '../screens/Home/ApplyLeaves';
import ApplyLate from '../screens/Home/ApplyLate';
import CeoScreen from '../screens/CEO/CeoScreen';
const Stack = createNativeStackNavigator();


function CheckStack() {
  return (
    <Stack.Navigator
    initialRouteName={routeName.LANDING_SCREEN}

      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={routeName.LANDING_SCREEN} component={Home} />
      <Stack.Screen name={routeName.APPLYLEAVES} component={ApplyLeaves} />
      <Stack.Screen name={routeName.APPLY_LATE} component={ApplyLate} />
      <Stack.Screen name={routeName.CEO_SCREEN} component={CeoScreen} />

     
    </Stack.Navigator>
  );
}

export default CheckStack;
