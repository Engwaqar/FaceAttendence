import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  StatusBar,
  Image,
  Text,
} from "react-native";
import { CommonActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
// import Screen from "../../../components/Screen";
import { colors } from "../../../constants/colorsPallet";
import { routeName } from "../../../constants/routeName";
import { globalPath } from "../../../constants/globalPath";
import { hp, wp } from "../../../helpers/Responsiveness";
import Fonts from "../../../helpers/Fonts";
import RnText from "../../../components/RnText";

// import Icon from "../../../components/Icon";
import { useDispatch } from "react-redux";
import ResponsiveText from "../../../components/RnText";
// import { getBfaPartners } from "../../../redux/actions/user.actions";

const Splash = ({ navigation }) => {
  //Validation Login
  const [Token, setToken] = React.useState(null);
  const [logo, setLogo] = React.useState(false);
  const [text, setText] = React.useState(false);
  const dispatch = useDispatch();

  const fetchAndSetUser = async () => {
    const token = await AsyncStorage.getItem("@token");
    const id = await AsyncStorage.getItem("@userId");
    const role = await AsyncStorage.getItem("@loggedInUserTypeId");
    console.log("user Id: ", role);
    console.log(token, "token");
    setToken(token);
    if (token === null) {
      setTimeout(() => {
        setLogo(true);
        setTimeout(() => {
          setLogo(false);
          setText(true);
          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: routeName.LOGIN }],
              })
            );
          }, 2000);
        }, 2000);
      }, 0);
    } else {
      // navigation.dispatch(StackActions.replace(routeName.LANDING_SCREEN));
      // const jwtPayload = JSON.parse(window.atob(token.split('.')[1]))
      // console.log('jwtPayload.exp', jwtPayload.exp * 1000 < new Date().getTime());
      // if (jwtPayload.exp * 1000 < new Date().getTime()) {
      //   clearStorage()
      //   navigation.dispatch(
      //     CommonActions.reset({
      //       index: 0,
      //       routes: [{ name: routeName.LOGIN }],
      //     }),
      //   );
      // } else {
      // navigation.replace(routeName.BOTTOM_TABS,role);
      // }

      if (role == "3") {
        navigation.replace(routeName.BOTTOM_TABS, role);
      } else if (role == "2") {
        navigation.replace(routeName.ADMIN_BOTTOM_TABS);
      } else if (role == "1") {
        navigation.replace(routeName.ADMIN_USERS);
      } else if (role == "4") {
        navigation.replace(routeName.CEO_SCREEN);
      }
    }
  };
  const clearStorage = async () => {
    await AsyncStorage.clear();
  };
  React.useEffect(() => {
    // clearStorage()
    fetchAndSetUser();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        source={globalPath.splashBackgroung}
        resizeMode={"cover"}
        style={styles.image}
      >
        <Image style={styles.logo} source={globalPath.logo} />
        <View style={styles.footerContainer}>
          <RnText color={colors.black} fontFamily={Fonts.LightItalic}>
            Powered by{" "}
          </RnText>
          <Image style={styles.poweredLogo} source={globalPath.CompanyLogo} />
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: hp(20),
    width: wp(40),
    resizeMode: "contain",
    flex: 1,
  },
  poweredLogo: {
    height: hp(15),
    width: wp(15),
    resizeMode: "contain",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
export default Splash;
