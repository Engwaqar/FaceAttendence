import React, { useEffect, version } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Icon from "../components/Icon";
import ResponsiveText from "../components/RnText";
import { globalPath } from "./globalPath";
import { colors } from "./colorsPallet";
import { routeName } from "./routeName";
import {
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { hp, wp } from "../helpers/Responsiveness";
import FastImage from "react-native-fast-image";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getProfileImage } from "../redux/actions/user.actions";
import AsyncStorage from "@react-native-community/async-storage";
const Tab = createDrawerNavigator();
const home_Header = (props) => {
  const [School, setSetSchool] = React.useState('');

  const dispatch = useDispatch();
  const ProfileImage = useSelector(
    (state) => state.appReducers.profileImage.data
  );
  const loading = useSelector(
    (state) => state.appReducers.profileImage.loading
  );
  console.log("DATAA", ProfileImage);
  React.useEffect(async()  => {
  const schoolName=  await AsyncStorage.getItem("@schoolName");
  setSetSchool(schoolName)

    dispatch(getProfileImage());
  }, []);
  const navigation = useNavigation();
  console.log("naviiiiiī", navigation);
  return (
    <View style={{ height: 25, flexDirection: "row" }}>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => navigation.openDrawer()}
      >
        <Image
          style={{ height: 15, width: 18, margin: 10 }}
          source={globalPath.sidebar}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{School}</Text>
      <TouchableOpacity  style={{ paddingRight: wp(5), marginTop: 6 }}    onPress={() => props.navigation.navigate(routeName.Messages)}>
        <Icon
          size={props.iconPath ? (wp(10), hp(6)) : 20}
          style={{
            height: hp(2),
            width: wp(5),
            resizeMode: "center",
            // margin: 6,
          }}
          source={globalPath.email}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(routeName.NOTIFICATIONS)}
        style={{ paddingRight: wp(5), marginTop: 6 }}
      >
        <Icon
          size={props.iconPath ? (wp(10), hp(6)) : 20}
          style={{ resizeMode: "center"}}
          source={globalPath.notification}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate(routeName.PROFILE)}
      >
        <Icon
          style={{ marginTop: 4 }}
          borderRadius={30}
          size={props.iconPath ? (wp(10), hp(6)) : 25}
          resizeMode={"cover"}
          source={
            ProfileImage.url ? { uri: ProfileImage.url } : globalPath.profile
          }
        />
      </TouchableOpacity>
    </View>
  );
};
export default home_Header;

const styles = StyleSheet.create({
  name: {
    fontWeight:'900',
    letterSpacing:1.3,
    alignSelf: "center",
    alignItems: "center",
    flex:1,
    fontSize: hp(2.1),
    color: colors.white,
  },
});
