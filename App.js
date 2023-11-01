import React, { useEffect } from "react";
import { LogBox, StatusBar } from "react-native";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Router from "./src/navigation/Router";
import { persistor, store } from "./src/redux/store";
import FlashMessage from "react-native-flash-message";
import { SafeAreaProvider } from "react-native-safe-area-context";
// import PushNotification from "react-native-push-notification";
import AsyncStorage from "@react-native-community/async-storage";

const App = () => {
  // useEffect(() => {
  //   PushNotification.configure({
  //     // (optional) Called when Token is generated (iOS and Android)
  //     onRegister: function(token) {
  //       console.log("TOKEN:", token.token);
  //       AsyncStorage.setItem('@fcmToken',token.token)
  //     },
    
  //     // (required) Called when a remote or local notification is opened or received
  //     onNotification: function(notification) {
  //       console.log("NOTIFICATION:", notification);
    
  //       // process the notification here
    
  //       // required on iOS only 
  //       // notification.finish(PushNotificationIOS.FetchResult.NoData);
  //     },
  //     // Android only
  //     senderID: "781461991523",
  //     // iOS only
  //     permissions: {
  //       alert: true,
  //       badge: true,
  //       sound: true
  //     },
  //     popInitialNotification: true,
  //     requestPermissions: true
  //   });
  // }, [])
  
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {/* <StatusBar hidden />  */}
          <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent={true}
          />
          <Router />
        </PersistGate>
        <FlashMessage position="top" icon="auto" />
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;

// console.disableYellowBox = true;
// YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader', 'RNDeviceInfo', 'Warning: An update']);


LogBox.ignoreLogs([
  "Warning: VirtualizedList should",
  "Warning: Each child",
  "Warning: Each child in a",
  "Warning: Failed prop type",
  'Remote debugger',
  'Require cycle:',
  'Non-serializable values were found in the navigation state',
]);
