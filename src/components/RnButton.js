import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { handleMargin, handlePadding } from "../constants/theme";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";

const RnButton = ({
  backgroundColor,
  textColor,
  width,
  padding,
  margin,
  gradColor,
  height,
  borderRadius,
  title,
  titleSize,
  fontFamily,
  onPress,
  position,
  disabled,
  ...props
}) => {
  return (
    <TouchableOpacity
    disabled={disabled}
      onPress={onPress ? onPress : null}
      style={[
        styles.Btn,
        props.btnStyle ? props.btnStyle : undefined,
        margin ? handleMargin(margin) : undefined,
        padding ? handlePadding(padding) : undefined,
        position && { alignSelf: position },
        backgroundColor && { backgroundColor },
        {
          // height: hp(6.5),
          flexDirection: "row",
          width: width ? width : wp(88),
          height: height ? height : hp(6.5),
          borderRadius: borderRadius ? borderRadius : 30,
        },
      ]}
      {...props}
    >
      {title && (
        <ResponsiveText
          size={titleSize?titleSize:3}
          padding={[0, 10]}
          fontFamily={fontFamily ? fontFamily : "Bold"}
          color={textColor ? textColor : colors.white}
        >
          {title}
        </ResponsiveText>
      )}
      {props.children}
    </TouchableOpacity>
  );
};

export default RnButton;

const styles = StyleSheet.create({
  Btn: {
    padding: 3,
    borderRadius: 7,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.blue1,
  },
});
