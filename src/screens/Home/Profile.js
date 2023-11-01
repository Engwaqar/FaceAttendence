import { StyleSheet, Text, View, Alert } from "react-native";
import React, { useEffect } from "react";
import Layout from "../../components/Layout";
import ResponsiveText from "../../components/RnText";
import { AttendenceCard } from "../../components/cardView";
import { CheckinBox } from "../../components/CheckinBox";
import TabIcon from "../../components/TabIcon";
import { globalPath } from "../../constants/globalPath";
import { colors } from "../../constants/colorsPallet";
import Responsiveness, { hp, wp } from "../../helpers/Responsiveness";
import { useDispatch, useSelector } from "react-redux";
import { routeName } from "../../constants/routeName";
import {
  getUserAttendanceRecord,
  getUserProfile,
  logoutUser,
} from "../../redux/actions/user.actions";
import Loader from "../../components/loader";
import { PreView } from "../../constants/Index";
import { _toast } from "../../constants/Index";
import AsyncStorage from "@react-native-community/async-storage";
import { StackActions } from "@react-navigation/native";
import Card from "../../components/Card";
import { ScrollView } from "react-native-gesture-handler";
import RecordNotFound from "../../components/RecordnotFound";
import { useState } from "react";
import MonthCard from "../../components/MonthCard";
const Profile = (props) => {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const ProfileData = useSelector(
    (state) => state.userReducers.getProfileData.data
  );
  const Loading = useSelector(
    (state) => state.userReducers.getProfileData.refreshing
  );
  const AttendanceRecord = useSelector(
    (state) => state.userReducers.getAttendanceRecord.data
  );
  console.log("profile", ProfileData);
  console.log("AttendanceRecord", AttendanceRecord);
  useEffect(() => {
    var month = new Date().getMonth() + 1;

    dispatch(getUserProfile());
    getmonthData(month);
  }, []);
  const getmonthData = (month) => {
    dispatch(getUserAttendanceRecord(month));
  };
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
          // await AsyncStorage.removeItem('@token');
          // await AsyncStorage.removeItem('cartData');
          // await AsyncStorage.removeItem('@userId');
          await AsyncStorage.clear();
          dispatch(logoutUser());

          props.navigation.dispatch(StackActions.replace("Auth"));
        },
      },
    ]);
  };
  const openResume = () => {
    if (ProfileData.resumeFilePath != null) {
      PreView(setisLoading);
    } else {
      _toast("Resume not found");
    }
  };
  return (
    <>
      <Layout
        navigation={props.navigation}
        backbutton
        userimg={ProfileData.fullPath}
        camera={globalPath.Camera}
        Field={ProfileData.designationName}
        username={ProfileData.fullName}
        title={"Profile"}
        profile
        titleSize={5}
        // source={globalPath.checkin}
        disabled={false}
        // onPress={logout}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ flexDirection: "row", margin: 10 }}>
            <CheckinBox
              subTitle="Resume"
              onPress={() => openResume()}
              disabled={false}
              tintColor={colors.yellow1}
              source={globalPath.report}
            />

            <CheckinBox
              onPress={() =>
                props.navigation.navigate(
                  routeName.EMPLOYEE_PROFILE,
                  ProfileData
                )
              }
              subTitle="Emoplyee card"
              tintColor={colors.blue1}
              disabled={false}
              source={globalPath.report}
            />
          </View>
          <MonthCard action={getmonthData} />

          <Card flexDirection={"row"}>
            <TabIcon
              title="Present"
              CircleText={AttendanceRecord.presentCount}
              CircleColor={colors.green}
              titleSize={3.4}
            />
            <TabIcon
              title="Absent"
              titleSize={3.4}
              CircleText={AttendanceRecord.absentCount}
              CircleColor={colors.red}
            />
            <TabIcon
              title="Late"
              titleSize={3.4}
              CircleText={AttendanceRecord.lateCount}
              CircleColor={colors.blue1}
            />
            <TabIcon
              title="Leave"
              titleSize={3.4}
              CircleText={AttendanceRecord.leaveCount}
              CircleColor={colors.yellow3}
            />
          </Card>
          <Card>
            {Object.keys(AttendanceRecord).length > 0 ? (
              AttendanceRecord.countDetail.map((item, index) => (
                <AttendenceCard
                  userimg={ProfileData.fullPath}
                  checkTime={item.createdDateTime}
                  checkoutTime={item.checkoutDateTime}
                  status={item.status}
                  datetime={item.createdDateTime}
                />
              ))
            ) : (
              <RecordNotFound />
            )}
            <View style={{ height: hp(60) }}></View>
          </Card>
        </ScrollView>
      </Layout>
      {isLoading || Loading ? <Loader /> : undefined}
    </>
  );
};
export default Profile;
const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowOpacity: 0.1,
    padding: 5,
    margin: 5,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
  },
});
