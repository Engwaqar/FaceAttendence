import React, { version } from "react";
import { StyleSheet, View, Image,TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import moment from 'moment'
const TextProfile = (props) => {
  return (
      <ResponsiveText
        color={props.color}
        weight={props.weight}
        size={props.size}
        margin={props.margin}
        flex={props.flex}
        justifyContent={props.justifyContent}
      >
        {props.Title}
      </ResponsiveText>

    
  );
};
export { TextProfile };
const styles = StyleSheet.create({

  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    height:hp(9),
    // width:wp(40),
    shadowOffset: {
      width: 0,
      height: 0,
    },
    
  },
});
