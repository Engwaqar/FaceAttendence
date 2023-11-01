import React from 'react';
import HomeStack from './HomeStack';
import AuthStack from './AuthStack';
import {NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Router = () => {
  const [Token , setToken]= React.useState('');
  // React.useEffect(() => {
  //   async function fetchAndSetUser() 
  //   {
  //   const token = await AsyncStorage.getItem('@token');
  //   setToken(token);
  //   }
  //   fetchAndSetUser();
  // },[]);

    const Stack=createNativeStackNavigator();
  
  return (
    <NavigationContainer>
       <Stack.Navigator screenOptions={{
        headerShown: false,
      }}>
        <Stack.Screen name="Auth" component={AuthStack} />
        {/* <Stack.Screen name="Home" component={DrawerTab} /> */}
      </Stack.Navigator>
      {/* {Token === '' || Token === null?<AuthStack/> :<HomeStack /> } */}
      
      {/* <DrawerStack/> */}
    </NavigationContainer>
  );
};

export default Router;
