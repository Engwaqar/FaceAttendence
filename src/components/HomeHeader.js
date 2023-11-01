import {
    Alert,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from "react-native";
  import React from "react";
  import Icon from "./Icon";
  import ResponsiveText from "./RnText";
  import { globalPath } from "../constants/globalPath";
  import { colors } from "../constants/colorsPallet";
  import { wp } from "../helpers/Responsiveness";
  import { routeName } from "../constants/routeName";
  import AsyncStorage from "@react-native-community/async-storage";
  import { useDispatch, useSelector } from "react-redux";
  import { logoutUser } from "../redux/actions/user.actions";
  
  export default function HomeHeader({ navigation, homelogo,logo, logoutt, search,onClickSearch }) {
    const dispatch = useDispatch();
    const ProfileData = useSelector((state) => state.userReducers.getProfileData.data);
  console.log('ProfileData', ProfileData)
    const logout = () => {
      Alert.alert("Logout", "Confirm Logout", [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            await AsyncStorage.removeItem("@token");
            await AsyncStorage.clear();
            dispatch(logoutUser());
            navigation.replace(routeName.SPLASH);
          },
        },
      ]);
    };
  
    return (
      <View style={styles.container}>
        {homelogo ? (
          <Image
            style={{ width: 100, height: 60, resizeMode: "contain" }}
            source={logo?{uri:logo}:globalPath.pizza21}
          />
        ) : (
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Icon source={globalPath.backArrow} />
          </TouchableOpacity>
        )}
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          {search ? (
            <TouchableOpacity onPress={onClickSearch} >
              <Icon
                size={30}
                resizeMode={"contain"}
                source={globalPath.search}
                margin={[0, 10, 0, 0]}
  
              />
            </TouchableOpacity>
          ) : null}
          {logoutt ? (
            <TouchableOpacity onPress={() => logout()} style={{ margin: 5 }}>
              <Icon
                size={25}
                tintColor={colors.white}
                resizeMode={"contain"}
                source={globalPath.checkin}
              />
            </TouchableOpacity>
          ) : Object.keys(profileData).length > 0 ? (
            <TouchableOpacity
              onPress={() => navigation.navigate(routeName.PROFILE)}
              style={{ margin: 5 }}
            >
              <Icon
                size={40}
                borderRadius={45}
                backgroundColor={colors.white}
                // tintColor={colors.white}
                resizeMode={"contain"}
                defaultSource={globalPath.UserLogo}
                source={{ uri: profileData.fullPath }}
              />
            </TouchableOpacity>
          ) : undefined}
          {/* <View style={styles.badge}>
            <ResponsiveText color={colors.white} size={2.4}>
              {" "}
              3
            </ResponsiveText>
          </View> */}
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      marginHorizontal: wp(3),
    },
    badge: {
      backgroundColor: colors.black,
      position: "absolute",
      right: -5,
      top: -5,
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 75,
      padding: 4,
      paddingHorizontal: 6,
    },
  });
  