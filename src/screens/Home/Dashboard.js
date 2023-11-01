import React, { useEffect } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Responsiveness, { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import { SafeAreaView } from "react-native-safe-area-context";
import { globalPath } from "../../constants/globalPath";
import ResponsiveText from "../../components/RnText";
import Fonts from "../../helpers/Fonts";
import Icon from "../../components/Icon";
import { CardView } from "../../components/cardView";
import TabIcon from "../../components/TabIcon";
import Graph from "../../components/Graph";
import { routeName } from "../../constants/routeName";
import Card from "../../components/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  getpresentTeam,
  getAttendenceCount,
  getUserProfile,
} from "../../redux/actions/user.actions";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/loader";
import RecordNotFound from "../../components/RecordnotFound";
import { isImage } from "../../constants/Index";

const Dashboard = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userReducers.presentTeam.data);
  const Loading = useSelector(
    (state) => state.userReducers.presentTeam.refreshing
  );
  const DashCount = useSelector(
    (state) => state.userReducers.getAttendenceCount.data
  );
  const ProfileData = useSelector(
    (state) => state.userReducers.getProfileData.data
  );
  console.log("DashCount", data);
  console.log("DashCount", DashCount);
  const [loader, setLoader] = React.useState(true);

  useEffect(() => {
    dispatch(getpresentTeam());
    dispatch(getAttendenceCount());
    dispatch(getUserProfile());

  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(getpresentTeam());
    }, 60000);

    return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  }, []);
  return (
    <SafeAreaView style={styles.container} edges={["top", "left", "right"]}>
      <ScrollView style={{ backgroundColor: colors.white, flex: 1 }}>
        <View style={styles.screeninfo}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              margin: wp(5),
              marginBottom: 5,
              marginTop: wp(2),
            }}
          >
            <ResponsiveText
              margin={[0, 0, 0, wp(3)]}
              fontFamily={Fonts.Bold}
              size={8}
              color={colors.white}
            >
              New Khan
            </ResponsiveText>
            <TouchableOpacity
              onPress={() => navigation.navigate(routeName.PROFILE)}
            >
              <Icon
                style={{ backgroundColor: colors.white }}
                borderRadius={20}
                size={35}
                source={
                  isImage(ProfileData.fullPath)
                    ? { uri: ProfileData.fullPath }
                    : globalPath.user
                }
              />
              <View
                style={{
                  backgroundColor: colors.lightgreen,
                  height: 10,
                  width: 10,
                  position: "absolute",
                  borderRadius: 20,
                  marginLeft: wp(6),
                }}
              ></View>
            </TouchableOpacity>
          </View>

          <View style={{ flexDirection: "row" }}>
            <Icon
              size={20}
              margin={[0, 5, 10, 25]}
              source={globalPath.location}
            />
            <ResponsiveText
              margin={[0, 0, 0, 0]}
              fontFamily={Fonts.Bold}
              size={3.5}
              color={colors.white}
            >
            Lahore, pakistan
            </ResponsiveText>
          </View>
        </View>
        <View style={{ backgroundColor: colors.blue1, flex: 1 }}>
          <View style={styles.footer}>
            <View style={styles.container1}>
              <Graph data={DashCount} />
            </View>
            <Card flexDirection={"row"}>
              <TabIcon
                title="Leaves"
                titleColor="#F6B707"
                backgroundColor="#FFF9E6"
                source={globalPath.leaves}
                onPress={() => navigation.navigate(routeName.LEAVES)}
              />
              <TabIcon
                title="Late Reasons"
                titleColor="#5958DA"
                backgroundColor="#F1F5FF"
                source={globalPath.payslip}
                onPress={() => navigation.navigate(routeName.LATECOMER)}
              />
              <TabIcon
                title="Requests"
                titleColor="#0C7E44"
                backgroundColor="#E4FEF1"
                source={globalPath.requests}
                onPress={() => navigation.navigate(routeName.REQUEST)}
              />
              <TabIcon
                title="Notification"
                titleColor="#00AEEF"
                backgroundColor="#E9F9FF"
                source={globalPath.notification}
                onPress={() => navigation.navigate(routeName.NOTIFICATION)}
              />
            </Card>
            <Card>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 10,
                }}
              >
                <ResponsiveText color={colors.blue1}>
                  Present Members
                </ResponsiveText>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(routeName.PRESENT_TEAM, data)
                  }
                >
                  <ResponsiveText color={"#00AEEF"}>View All</ResponsiveText>
                </TouchableOpacity>
              </View>
              <ScrollView showsVerticalScrollIndicator={false}>
                {data.length > 0 ? (
                  data.map((item, index) =>
                    index < 4 ? (
                      <CardView
                        title={item.name}
                        userDesignation={item.userDesignation}
                        checkInTime={item.createdDateTime}
                        navigation={navigation}
                        source={item.fullPath}
                      />
                    ) : null
                  )
                ) : (
                  <RecordNotFound />
                )}
                <View style={{ height: hp(20) }}></View>
              </ScrollView>
            </Card>
          </View>
        </View>
      </ScrollView>
      {/* {Loading && data.length == 0 ? <Loader /> : undefined} */}
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container1: {
    elevation: 9,
    shadowColor: colors.green,
    shadowOpacity: 0.2,
    padding: 20,
    backgroundColor: colors.white,
    top: -20,
    marginHorizontal: 15,
    borderRadius: 10,
  },
  container: {
    flex: 1,
    backgroundColor: colors.blue1,
  },
  footer: {
    flex: 1,
    backgroundColor: colors.white,
    borderTopRightRadius: 30,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  screeninfo: {
    // flex: 0.2,
    justifyContent: "center",
    paddingBottom: 30,
    // alignItems: "center",
    backgroundColor: colors.blue1,
    borderBottomLeftRadius: 35,
  },
  logo: {
    height: hp(20),
    width: wp(40),
    resizeMode: "contain",
    // marginBottom: 20,
    alignItems: "center",
  },
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

// rnfes
