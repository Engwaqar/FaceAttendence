import React, { useEffect, version } from "react";

import { Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import Icon from "../components/Icon";
import ResponsiveText from "../components/RnText";
import { globalPath } from "./globalPath";
import { colors } from "./colorsPallet";
import { routeName } from "./routeName";
import Home from "../screens/Home/Home";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { hp, wp } from "../helpers/Responsiveness";
import FastImage from "react-native-fast-image";
import { useDispatch, useSelector } from "react-redux";
import { getProfileImage } from "../redux/actions/user.actions";
const Tab = createDrawerNavigator();
const All_header = (props) => {
  const dispatch = useDispatch();
  const ProfileImage = useSelector((state) => state.appReducers.profileImage.data)
  const loading = useSelector((state) => state.appReducers.profileImage.loading)
  console.log("DATAA", ProfileImage)

  return (
    <View
      style={{
        // height: 25,
        // backgroundColor: colors.green,
        flexDirection: "row",
        // justifyContent:'space-between'
      }}
    >
      {/* {props.fromMenu ? (
        <TouchableOpacity
          style={{ flex: 1 }}
          onPress={() => props.navigation.openDrawer()}
        >
          <Image
            style={styles.img3}
            source={globalPath.sidebar}
          />
        </TouchableOpacity>
      ) : ( */}
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => props.navigation.goBack()}
      >
        <Image style={styles.img3} source={globalPath.backArrow} />
      </TouchableOpacity>

      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{props.title}</Text>
      </View>
      <View
        style={{ flexDirection: "row", flex: 1, justifyContent: "flex-end" }}
      >
        <TouchableOpacity onPress={() => props.navigation.navigate(routeName.PROFILE)}>
        <Icon
            style={{marginRight:5}}
              borderRadius={30}
              size={props.iconPath ? (wp(10), hp(6)) : 25}
              resizeMode={'cover'}
                        source={ ProfileImage.url
                            ? {uri: ProfileImage.url}
                            :globalPath.profile}
                    />

        </TouchableOpacity>

      </View>
    </View>
  );
};
export default All_header;

const styles = StyleSheet.create({
  name: {
    fontSize: hp(2),
    color: colors.white,
    textAlign: "center",
  },
  img1: {
    // height: 20,
    // width: 20,
    padding:6,
    resizeMode: "center",
    marginRight: 10,
  },
  img2: {
    height: 25,
    width: 30,
    resizeMode: "center",
    borderRadius: 10,
    marginRight: 10,
    overflow: 'hidden'
  },
  profileImage: {
    borderRadius: hp(10),
    top: hp(-4),
    overflow: "hidden",
    borderWidth: hp(0.4),
    borderColor: colors.yellow,
  },
  img3: { height: 15, width: 20, margin: 6, marginLeft: 20 },
});
