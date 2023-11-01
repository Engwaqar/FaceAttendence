import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "./Icon";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { check } from "yargs";
import ResponsiveText from "./RnText";
// import Randomiser from '../screens/Home/BottomTabs/Randomiser/Randomiserrr'

export default function RadioButton({ checked, onPress, text }) {
  // const [checked, setCheck] = useState(props.isCheck);

  return (
    <TouchableOpacity style={{ flexDirection: "row" }} onPress={onPress}>
      <View
        style={{
          backgroundColor: checked ? colors.white : undefined,
          borderRadius: 50,
          borderColor: checked ? colors.blue1 : colors.grey1,
          borderWidth: 2,
          height: 25,
          width: 25,
          alignItems: "center",
          justifyContent: "center",
          padding: 5,
          marginBottom:5
        }}
      >
        {checked ? (
          <Icon
            source={globalPath.radio}
            size={13}
            tintColor={colors.blue1}
          />
        ) : (
          <View></View>
        )}
      </View>
      {text ? (
        <ResponsiveText size={4.5} color={colors.grey1} margin={[0, 0, 0, 10]}>
          {text}
        </ResponsiveText>
      ) : null}
    </TouchableOpacity>
  );
}
