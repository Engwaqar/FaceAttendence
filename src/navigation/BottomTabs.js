import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  Animated,
  Image,
  Keyboard,
  Platform,
  StyleSheet,
  Text,
  View,
} from "react-native";
import "react-native-gesture-handler";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRef } from "react";
import { globalPath } from "../constants/globalPath";
import { colors } from "../constants/colorsPallet";
import { wp } from "../helpers/Responsiveness";
import HomeStack from "./HomeStack";
import CheckStack from "./CheckStack";
import ReportStack from "./ReportStack";
import AllEmpData from "../screens/Admin/AllEmpData";
const Tab = createBottomTabNavigator();

// Hiding Tab Names...
export default function BottomTabs(props) {
  // Animated Tab Indicator...
  const tabOffsetValue = useRef(new Animated.Value(0)).current;
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true); // or some other action
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false); // or some other action
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        style={{ marginHorizontal: 10 }}
        // sceneContainerStyle={{marginHorizontal:20,backgroundColor:'red'}}
        screenOptions={{
          tabBarHideOnKeyboard: true,
          headerShown: false,
          tabBarShowLabel: false,
          tabBarActiveTintColor: colors.red,
          tabBarInactiveTintColor: colors.white,

          // Floating Tab Bar...
          tabBarLabelStyle: {
            fontSize: 10,
            fontWeight: "bold",
          },
          tabBarStyle: {
            backgroundColor: colors.blue1,
            height: 55,
            borderRadius: 10,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            // Shadow...
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 40,
              height: 90,
            },
            marginBottom: isKeyboardVisible ? -40 : 20,
            paddingHorizontal: 20,
            marginHorizontal: wp(8),
            position: "absolute",
            // justifyContent:'center',
            paddingTop: Platform.OS == "ios" ? 20 : 0,
          },
          //  }
        }}
      >
        <Tab.Screen
          name={"CheckStack"}
          component={CheckStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.TouchableTab : {}}>
                <View style={focused ? styles.ActiveTab : styles.inActiveTab}>
                  <Image
                    source={globalPath.checkin}
                    resizeMode={"contain"}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name={"HomeStack"}
          component={HomeStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.TouchableTab : {}}>
                <View style={focused ? styles.ActiveTab : styles.inActiveTab}>
                  <Image
                    source={globalPath.dashboard}
                    resizeMode={"contain"}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        ></Tab.Screen>
        {/* <Tab.Screen
          name={"ReportStack"}
          component={ReportStack}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.TouchableTab : {}}>
                <View style={focused ? styles.ActiveTab : styles.inActiveTab}>
                  <Image
                    source={globalPath.report}
                    resizeMode={"contain"}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        ></Tab.Screen> */}
        {props.route.params == "1" ? (
          <Tab.Screen
            name={"Report"}
            component={AllEmpData}
            options={{
              tabBarIcon: ({ focused }) => (
                <View style={focused ? styles.TouchableTab : {}}>
                  <View style={focused ? styles.ActiveTab : styles.inActiveTab}>
                    <Image
                      source={globalPath.payslip}
                      resizeMode={"contain"}
                      style={{
                        width: 22,
                        height: 22,
                        tintColor: "white",
                      }}
                    ></Image>
                  </View>
                </View>
              ),
            }}
          ></Tab.Screen>
        ) : null}

        {/* <Tab.Screen
          name={"Notifications"}
          component={PresentTeam}
          options={{
            tabBarIcon: ({ focused }) => (
              <View style={focused ? styles.TouchableTab : {}}>
                <View style={focused ? styles.ActiveTab : styles.inActiveTab}>
                  <Image
                    source={globalPath.history}
                    resizeMode={"contain"}
                    style={{
                      width: 22,
                      height: 22,
                      tintColor: "white",
                    }}
                  ></Image>
                </View>
              </View>
            ),
          }}
        ></Tab.Screen> */}
      </Tab.Navigator>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  ActiveTab: {
    width: 60,
    height: 60,
    backgroundColor: colors.blue1,
    borderRadius: 30,
    borderWidth: 4,
    borderColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    // marginBottom:30
    // marginBottom: Platform.OS == "android" ?80 : 30
  },
  inActiveTab: {},
  TouchableTab: {
    backgroundColor: "white",
    padding: 2,
    width: 65,
    bottom: 20,
    height: 65,
    borderRadius: 30,
    alignItems: "center",
  },
});
