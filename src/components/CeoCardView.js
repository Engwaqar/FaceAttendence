import React, { version } from "react";
import { StyleSheet, View, Image, TouchableOpacity } from "react-native";
import { colors } from "../constants/colorsPallet";
import { globalPath } from "../constants/globalPath";
import { hp, wp } from "../helpers/Responsiveness";
import ResponsiveText from "./RnText";
import Card from "./Card";
import { routeName } from "../constants/routeName";
import { isImage } from "../constants/Index";
import { formatAMPM } from "../redux/actions/user.actions";
import FastImage from "react-native-fast-image";

const CeoCardView = (props) => {
  const data = props.data;
  // console.log("dataggggg", data);
  return (
    <Card margin={5}>
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center", padding: 10 }}
      >
        <View style={{ alignItems: "flex-end" }}>
          <FastImage
            source={
              isImage(props.source)
                ? {
                    uri: props.source,
                    priority: FastImage.priority.high,
                  }
                : globalPath.user
            }
            style={{
              borderRadius: 10,
              height: wp(15),
              width: wp(15),
              resizeMode: "contain",
            }}
          />
        </View>
        <View style={{ flex: 1, paddingHorizontal: 10 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <ResponsiveText
              color={colors.black}
              weight={"bold"}
              flex={1}
              size={3.5}
            >
              {props.title}
            </ResponsiveText>
            {data.status == "" ? null : (
              <View
                style={[
                  styles.Boxstyle,

                  {
                    backgroundColor:
                      props.status == "Approve"
                        ? colors.lightgreen
                        : props.status == "Leave"
                        ? colors.green
                        : props.status == "Present"
                        ? colors.blue
                        : props.status == "Rest_Day"
                        ? colors.purple
                        : props.status == "Offical Duty"
                        ? colors.black
                        : props.status == "Late"
                        ? colors.yellow1
                        : props.status == "Absent"
                        ? colors.red
                        : colors.lightgreen,
                  },
                ]}
              >
                <ResponsiveText size={3} color={colors.white}>
                  {props.status}
                </ResponsiveText>
              </View>
            )}
          </View>
          <ResponsiveText size={2.7} color={colors.black}>
            {props.userDesignation}
          </ResponsiveText>
          {data.isKothiStaff || data.checkinTime == "" ? null : (
            <View style={{ flexDirection: "row" }}>
              <View style={{ flexDirection: "row" }}>
                <ResponsiveText color={colors.black} size={3.2}>
                  {"IN:"}
                </ResponsiveText>
                <ResponsiveText
                  margin={[0, 0, 0, 5]}
                  weight={"bold"}
                  color={colors.green}
                  size={3}
                >
                  {props.checkInTime}
                </ResponsiveText>
              </View>

              <View style={{ flexDirection: "row" }}>
                <ResponsiveText
                  margin={[0, 0, 0, 5]}
                  color={colors.black}
                  size={3.2}
                >
                  {"OUT: "}
                </ResponsiveText>
                <ResponsiveText
                  margin={[0, 0, 0, 5]}
                  color={colors.red}
                  weight={"bold"}
                  size={3}
                >
                  {props.checkOutTime}
                </ResponsiveText>
              </View>
            </View>
          )}
          {data.isKothiStaff && data.isAllReadyCheckIn ? (
            <ResponsiveText
              weight={"bold"}
              size={4}
              margin={[0, 40, 0, 0]}
              color={colors.grey1}
            >
              {"حاضری لگ گئی ہے"}
            </ResponsiveText>
          ) : null}
          {data.lateReason == "" || data.lateReason == null ? null : (
            <View style={{ flexDirection: "row" }}>
              <ResponsiveText color={colors.black} weight={"bold"} size={3}>
                {"REMARKS: "}
              </ResponsiveText>
              <ResponsiveText flex={1} color={colors.grey1} size={3}>
                {props.LateReason}
              </ResponsiveText>
            </View>
          )}
        </View>

        {/* {props.checkInTime ? (
          <View style={styles.timestyle}>
            <ResponsiveText color={colors.black} size={2.8}>
              {formatAMPM(props.checkInTime)}
            </ResponsiveText>
          </View>
        ) : null} */}
      </TouchableOpacity>
    </Card>
  );
};

export { CeoCardView };
const styles = StyleSheet.create({
  timestyle: {
    backgroundColor: colors.green10,
    borderRadius: 5,
    justifyContent: "center",
    height: 25,
    paddingHorizontal: 8,
    // width: wp(22),
    borderWidth: 1.5,
    borderColor: colors.green11,
    marginTop: 5,
  },
  Boxstyle: {
    backgroundColor: colors.green11,
    // borderWidth: 1.2,
    borderColor: colors.green2,
    borderRadius: 7,
    // width: wp(16),
    alignItems: "center",
    justifyContent: "center",
    height: hp(2.5),
    flex: 0.5,
  },
  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    padding: 25,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    backgroundColor: colors.white,
    marginHorizontal: 15,
    borderRadius: 10,
  },
});
