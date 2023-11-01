import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ImageBackground,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { globalPath } from "../../constants/globalPath";
import { routeName } from "../../constants/routeName";
import Loader from "../../components/loader";
import { colors } from "../../constants/colorsPallet";
import { wp, hp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import ResponsiveText from "../../components/RnText";
import { useDispatch, useSelector } from "react-redux";
import { getUserProfile } from "../../redux/actions/user.actions";
import Layout from "../../components/Layout";
import HomeHeader from "../../components/HomeHeader";

const AdminProfile = ({ navigation }) => {
  // const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();
  const ProfileData = useSelector(
    (state) => state.userReducers.getProfileData.data
  );
  const Loading = useSelector(
    (state) => state.userReducers.getProfileData.refreshing
  );
  console.log("profile", ProfileData);

  useEffect(() => {
    dispatch(getUserProfile());
  }, []);

  return (
    <SafeAreaView
      style={{ backgroundColor: colors.blue3, flex: 1 }}
      edges={["top", "left", "right"]}
    >
      <View style={{ backgroundColor: colors.grey, flex: 1, marginTop: 25 }}>
        <ImageBackground
          style={{ height: hp(25), width: wp(100), padding: 10 }}
          imageStyle={{ resizeMode: "stretch" }}
          source={globalPath.background}
        >
          <HomeHeader logoutt navigation={navigation} />
          <View style={styles.advertisementBanner}>
            <Image
              style={{
                height: wp(25),
                width: wp(25),
                borderRadius: 75,
                borderWidth: 3,
                borderColor: colors.white,
                backgroundColor: colors.white,
                marginBottom: 10,
                resizeMode: "contain",
              }}
              defaultSource={globalPath.user}
              source={{ uri: ProfileData.fullPath }}
            />
            {/* <TouchableOpacity
                            onPress={() => navigation.navigate(routeName.EDIT_PROFILE)}
                            style={styles.editbtn}
                        >
                            <Icon
                                size={18}
                                tintColor={colors.black}
                                source={globalPath.Camera}
                            />
                        </TouchableOpacity> */}
          </View>
          <ResponsiveText color={colors.white} textAlign={"center"} size={4}>
            {ProfileData.fullName}
          </ResponsiveText>
        </ImageBackground>
        <ScrollView>
          <View
            style={{
              margin: 5,
              backgroundColor: "#cfc6c7",
              padding: 10,
            }}
          >
            <View style={styles.cardView}>
              <Icon
                tintColor={colors.black}
                size={22}
                source={globalPath.user}
              />
              <View style={styles.innercard}>
                <ResponsiveText>User Name</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {ProfileData.fullName}
                </ResponsiveText>
              </View>
            </View>

            <View style={styles.cardView}>
              <Icon
                size={22}
                tintColor={colors.black}
                source={globalPath.Email}
              />
              <View style={styles.innercard}>
                <ResponsiveText>Email</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {ProfileData.email ? ProfileData.email : "abc@gmail.com"}
                </ResponsiveText>
              </View>
            </View>

            <View style={styles.cardView}>
              <Icon size={25} source={globalPath.PhoneIcon} />
              <View style={styles.innercard}>
                <ResponsiveText>Phone</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {ProfileData.contactNumber}
                </ResponsiveText>
              </View>
            </View>
            <View style={[styles.cardView]}>
              <Icon
                size={25}
                margin={[0, 0, 15, 0]}
                source={globalPath.AddressIcon}
              />
              <View style={styles.innercard}>
                <ResponsiveText>Address</ResponsiveText>
                <ResponsiveText size={3} color={colors.grey1}>
                  {ProfileData.address == "" || ProfileData.address == null
                    ? ProfileData.address == "" || ProfileData.address == null
                    : "H8V9+32G, Data Nagar Badami Bagh, Lahore, Punjab 54000"}
                </ResponsiveText>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
      {/* {Loading ? <Loader /> : undefined} */}
    </SafeAreaView>
  );
};

export default AdminProfile;

const styles = StyleSheet.create({
  advertisementBanner: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
  },
  btn: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 3,
    borderRadius: 15,
    height: 20,
  },
  cardView: {
    flexDirection: "row",
    backgroundColor: colors.white,
    alignItems: "center",
    padding: 17,
    // paddingVertical:20,
    borderBottomWidth: 0.2,
  },
  innercard: {
    marginLeft: 15,
  },
  editbtn: {
    backgroundColor: colors.white,
    borderRadius: 45,
    padding: 4,
    left: -15,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});
