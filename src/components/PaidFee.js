import React, { useEffect, version } from "react";
import {
  StyleSheet,
  Text,
  View,
} from "react-native";
import ResponsiveText from "./RnText";
import Responsiveness, { hp, wp } from "../helpers/Responsiveness";
import { colors } from "../constants/colorsPallet";
import Icon from "./Icon";
import { globalPath } from "../constants/globalPath";

const PaidFee = (props) => {
  return (
    <View style={styles.container}>
      <View style={{ margin: 5, flexDirection: "row" }}>
        <Icon
          size={70}
          borderRadius={10}
          source={globalPath.profile}
        />
        <View style={{ flex: 1 }}>
          <ResponsiveText
            weight={"bold"}
            margin={[0, 0, 0, 10]}
            size={3.5}
            color={colors.green}
          >
            {props.item.fullName}
          </ResponsiveText>
          <ResponsiveText margin={[0, 0, 0, 10]} size={3} color={colors.black}>
            {props.item.id}
          </ResponsiveText>
          <ResponsiveText
            margin={[0, 0, 0, 10]}
            size={2.4}
            color={props.item.paid ? colors.grey1 : colors.red}
          >
            {props.item.paid ? "Paid" : "UnPaid"}
          </ResponsiveText>
        </View>
        <View
          style={{
            backgroundColor: colors.green1,
            borderRadius: 3,
            height: hp(2.4),
            width: wp(15),
            right: 2,
          }}
        >
          <ResponsiveText
            weight={"bold"}
            color={colors.white}
            size={3}
            margin={[1, 0, 0, 0]}
            textAlign={"center"}
          >
            {props.item.paid ? "Paid" : "UnPaid"}
          </ResponsiveText>
        </View>
      </View>
    </View>
  );
};
export default PaidFee;
const styles = StyleSheet.create({
  container: {
    margin: 2,
    borderRadius: 5,
    backgroundColor: colors.white,
  },
});
