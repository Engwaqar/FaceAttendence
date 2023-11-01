import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../../components/Layout";
import ResponsiveText from "../../components/RnText";
import { AttendenceCard } from "../../components/cardView";
import { CheckinBox } from "../../components/CheckinBox";
import TabIcon from "../../components/TabIcon";
import { colors } from "../../constants/colorsPallet";
import { routeName } from "../../constants/routeName";
import { useState } from "react";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useEffect } from "react";
import { ScrollView } from "react-native-gesture-handler";
import RecordNotFound from "../../components/RecordnotFound";
import { PreView } from "../../constants/Index";
import Loader from "../../components/loader";
import { globalPath } from "../../constants/globalPath";
import MonthCard from "../../components/MonthCard";
import { _toast } from "../../constants/Index";

const AttendenceDetails = (props) => {
  const data = props.route.params;
  const [isLoading, setisLoading] = useState(false);
  const [attendacedata, setData] = useState([]);
  useEffect(() => {
    var mon = new Date().getMonth() + 1;
    getAttendancyById(mon);
  }, []);

  const getAttendancyById = async (month) => {
    setisLoading(true);
    const res = await Api.get(
      urls.GET_MONTHLY_ATTENDANCE_OF_USER + month + "/" + data.id
    );
    console.log("res", res);
    if (res && res.success == true) {
      setisLoading(false);
      setData(res.data);
    } else {
      setisLoading(false);
      setData([]);
    }
  };
  const  openResume=()=>{
    if (data.resumeFilePath!=null) {
      PreView(setisLoading)
    } else {
      _toast('Resume not found')
    }
  }
  return (
    <Layout
      navigation={props.navigation}
      backbutton
      username={data.fullName}
      userimg={data.fullPath}
      title={"Employess Detail"}
      Field={data.userDesignation}
      profile
      titleSize={5}
    >
      <ScrollView>
      <View style={{ flexDirection: "row", marginVertical: 10 }}>
        {/* <CheckinBox
          onPress={() =>
            props.navigation.navigate(
              routeName.EMPLOYEE_PROFILE,
              props.route.params
            )
          }
          title="Check-In"
          subTitle="10:30 AM"
          titleColor={colors.black}
          subTitlecolor={colors.green}
          disabled={false}
        />

        <CheckinBox
          title="Check-Out"
          subTitle="06:30 PM"
          titleColor={colors.black}
          subTitlecolor={colors.red}
        /> */}
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
              props.route.params
            )
          }
          subTitle="Emoplyee card"
          tintColor={colors.blue1}
          disabled={false}
          source={globalPath.report}
        />
      </View>
      <MonthCard action={getAttendancyById} />

      <View style={styles.tabContainer}>
        <TabIcon
          title="Present"
          CircleText={attendacedata.presentCount}
          CircleColor={colors.green}
          titleSize={3.4}
        />
        <TabIcon
          title="Absent"
          titleSize={3.4}
          CircleText={attendacedata.absentCount}
          CircleColor={colors.red}
        />
        <TabIcon
          title="Late"
          titleSize={3.4}
          CircleText={attendacedata.lateCount}
          CircleColor={colors.blue1}
        />
        <TabIcon
          title="Leave"
          titleSize={3.4}
          CircleText={attendacedata.leaveCount}
          CircleColor={colors.yellow3}
        />
      </View>
      <View
        style={{
          backgroundColor: colors.white,
          borderRadius: 10,
          elevation: 10,
          shadowOpacity: 0.2,
          shadowRadius: 10,
          flex: 1,
        }}
      >
          {Object.keys(attendacedata).length > 0 ? (
            attendacedata.countDetail.map((item, index) => {
              return (
                <AttendenceCard
                  data={item}
                  userimg={data.fullPath}
                  checkTime={item.createdDateTime}
                  checkoutTime={item.checkoutDateTime}
                  status={item.status}
                  datetime={item.createdDateTime}
                />
              );
            })
          ) : isLoading ? null : (
            <RecordNotFound />
          )}
      </View>
      {isLoading ? <Loader /> : undefined}
      </ScrollView>
    </Layout>
  );
};

export default AttendenceDetails;

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: colors.white,
    shadowOpacity: 0.1,
    // padding: 5,
    margin: 5,
    marginHorizontal: 10,
    borderRadius: 10,
    shadowOffset: {
      width: 0,
      height: 0.1,
    },
  },
});
