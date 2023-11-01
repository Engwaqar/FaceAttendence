import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
  NativeModule,
  Alert,
} from "react-native";
import { colors } from "../../constants/colorsPallet";
import Checkin from "../../components/Checkin";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import Layout from "../../components/Layout";
import { globalPath } from "../../constants/globalPath";
import { hp, wp } from "../../helpers/Responsiveness";
import ResponsiveText from "../../components/RnText";
import { routeName } from "../../constants/routeName";
import { _toast } from "../../constants/Index";
import {
  formatAMPM,
  getUserProfile,
  getpresentTeam,
  logoutUser,
} from "../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { StackActions } from "@react-navigation/native";
import AsyncStorage from "@react-native-community/async-storage";
import WifiManager from "react-native-wifi-reborn";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import Modal from "react-native-modal";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import Loader from "../../components/loader";
import Icon from "../../components/Icon";
import RnButton from "../../components/RnButton";
import FaceSDK, {
  Enum,
  FaceCaptureResponse,
  LivenessResponse,
  MatchFacesResponse,
  MatchFacesRequest,
  Image as FaceImage,
} from "@regulaforensics/react-native-face-api-beta";
import RNFetchBlob from "rn-fetch-blob";
var image1 = new FaceImage();
var image2 = new FaceImage();
const Home = ({ navigation }) => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.userReducers.presentTeam.data);
  const getProfileData = useSelector(
    (state) => state.userReducers.getProfileData.data
  );
  const ProfileData = useSelector(
    (state) => state.userReducers.getProfileData.refreshing
  );
  console.log("getProfileDatadddd", getProfileData);
  const [CheckinTime, setCheckinTime] = useState("");
  //getProfileData
  const [errorString, setErrorString] = React.useState("");
  const [isVisible, setisVisible] = useState(false);
  const [userid, setUserid] = useState("");
  const [loading, setLoading] = React.useState("");
  const toggleModal = () => {
    setisVisible(!isVisible);
  };
  const [SSID, setSSID] = useState("");
  const [ipAddress, setIpAddress] = useState("");
  useEffect(() => {
    (async () => {
      var id = await AsyncStorage.getItem("@userId");
      // console.log("id", id);
      setUserid(Number(id));
    })();
    setCheckinTime(formatAMPM(new Date()));
    dispatch(getUserProfile());
    // if (Platform.OS == "ios") {
    //   // permissons();
    // } else {
    // getSSDid();
    // }
  }, []);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCheckinTime(formatAMPM(new Date()));
  //   }, 60000);

  //   return () => clearInterval(interval); // This represents the unmount function, in which you need to clear your interval to prevent memory leaks.
  // }, []);

  const verifytocheckout = () => {
    Alert.alert("Check", "Confirm checkout", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => CheckedOut(),
      },
    ]);
  };
  const CheckedIn = async (ssid) => {
    var obj = {
      is_TimeIn: true,
      is_TimeOut: false,
      userId: getProfileData.id,
      networkId: 1,
      isAllReadyCheckIn: true,
      wifiName: ssid,
      ipAddress: ipAddress,
      // CompanySSID: 'FabIntel',
      // CompanySSID: ssid,
      // IpAddress: IpAddress
    };
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_ATTENDENCE, obj);
      console.log("res", res);
      if (res && res.success == true) {
        setLoading(false);
        // setData(res.data);
        // dispatch(getpresentTeam());
        dispatch(getUserProfile());
        _toast("You Have Successfully Checked In");
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setErrorString(error.toString());
      setLoading(false);
    }
  };
  const CheckedOut = async (ssid) => {
    // var id = data?.find((v) => v.userId == userid)?.id;
    var obj = {
      is_TimeIn: false,
      is_TimeOut: true,
      userId: getProfileData.id,
      networkId: 1,
      isAllReadyCheckIn: false,
      wifiName: ssid,
      ipAddress: ipAddress,

      // CompanySSID: 'FabIntel',
      // CompanySSID: ssid,
      // IpAddress: IpAddress
    };
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_ATTENDENCE, obj);
      console.log("res", res);
      if (res && res.success == true) {
        setLoading(false);
        // setData(res.data);
        // dispatch(getpresentTeam());
        dispatch(getUserProfile());
        _toast("Checked Out");
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      setErrorString(error.toString());
      setLoading(false);
    }
  };

  const getSSDid = async (ischeckIn) => {
    // WifiManager.connectToProtectedSSID('FabIntel', 'Fab1nt3l', false).then(
    //   () => {
    //     console.log("Connected successfully!");
    //   },
    //   () => {
    //     console.log("Connection failed!");
    //   }
    // );

    // WifiManager.setEnabled(true);
    // WifiManager.disconnect();

    //WifiManager.forceWifiUsage(true);
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: "",
        message: "",
        buttonNegative: "",
        buttonPositive: "",
      }
    ).then((granted) => {
      console.log(granted);
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("granted");
        RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
          interval: 10000,
          fastInterval: 5000,
        })
          .then((data) => {
            //   WifiManager.connectToProtectedSSID("FabIntel", "Fab1nt3l", false)
            //   .then(
            //     () => {
            //       console.log("connectToProtectedSSID successfully!");
            //         },
            //     (reason) => {
            //     //console.log("connectToProtectedSSID failed!");
            //     //console.log(reason);
            // }
            // );
            // console.log("location enabled");
            NetInfo.fetch().then((state) => {
              // console.log("Connection type", state.type);
              console.log("Is connected?", state);
              //WifiManager.connectToProtectedSSID("", "", false)
              //   1c:5f:2b:05:9d:f0
              if (state.isWifiEnabled == true) {
                WifiManager.getCurrentWifiSSID().then(
                  (ssid) => {
                    NetInfo.fetch().then((state) => {
                      // console.log("Connection type", state.type);
                      // console.log("Is connected?", state);
                    });
                    setSSID(ssid);
                    if (ischeckIn == "checkin") {
                      pickImage(ssid);
                    } else {
                      CheckedOut(ssid);
                    }
                    // CheckedIn(ssid, state.details.ipAddress)
                    // _toast("Your current connected wifi SSID is " + ssid);
                    console.log("Your current connected wifi SSID is " + ssid);
                  },
                  () => {
                    //console.log("Cannot get current SSID!");
                  }
                );
              } else {
                // _toast("You are currently connected with "+state.details.carrier +' '+state.details.cellularGeneration);
                _toast("Not Allowed To CheckIn OutSide of the Paremeter");
                setLoading(false);
              }
            });
          })
          .catch((err) => {
            console.log("not permitted to enable location");
            setLoading(false);
          });
      } else {
        _toast("Permission denied");
        setLoading(false);
      }
    });
  };

  const pickImage = (ssid) => {
    if (
      getProfileData.base64_FullPath == "" ||
      getProfileData.base64_FullPath == null
    ) {
      _toast("Please contact to admin for face registeration");
      return false;
    }
    // Alert.alert(
    //   'Select option',
    //   '',
    //   [
    //     {
    //       text: 'Use gallery',
    //       onPress: () =>
    //         launchImageLibrary({includeBase64: true}, response => {
    //           // console.log(response);
    //           this.setImage(
    //             first,
    //             response.assets[0].base64,
    //             Enum.ImageType.IMAGE_TYPE_PRINTED,
    //           );
    //         }),
    //     },
    //     {
    //       text: 'Use camera',
    //       onPress: () =>
    FaceSDK.presentFaceCaptureActivity(
      (result) => {
        // console.log('result', result)
        // if (type == 1) {
        if (FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap) {
          image1.bitmap = FaceCaptureResponse.fromJson(
            JSON.parse(result)
          ).image.bitmap;
          image1.imageType = Enum.ImageType.IMAGE_TYPE_LIVE;
          matchFace(ssid);
        }
        // } else {
        //   image2.bitmap = FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap;
        //   image2.imageType = Enum.ImageType.IMAGE_TYPE_LIVE;
        // }
        // this.setImage(
        //   first,
        //   FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
        //   Enum.ImageType.IMAGE_TYPE_LIVE,
        // );
      },
      (e) => {}
    );
    //     },
    //   ],
    //   {cancelable: true},
    // );
  };
  const encodedImage = async (url) => {
    return (
      RNFetchBlob.config({
        fileCache: true,
      })
        .fetch("GET", url)
        // the image is now dowloaded to device's storage
        .then((resp) => {
          // the image path you can use it directly with Image component
          // imagePath = resp.path();
          return resp.readFile("base64");
        })
        .then((base64Data) => {
          // here's base64 encoded image
          // console.log(base64Data,'base64Data');
          // this.Arraymatching(index, base64Data, 3, name, id);
          // remove the file from storage
          //BaseImg = base64Data;
          return base64Data;
        })
    );
  };
  const matchFace = async (ssid) => {
    setLoading(true);
    const base64 = await encodedImage(getProfileData.base64_FullPath);
    console.log("base644444444", base64);
    image2.bitmap = base64;
    image2.imageType = 3;
    var request = new MatchFacesRequest();
    request.images = [image1, image2];

    FaceSDK.matchFaces(
      JSON.stringify(request),
      (response) => {
        response = MatchFacesResponse.fromJson(JSON.parse(response));
        console.log(response);
        var matchedFaces = response.matchedFaces;
        console.log("matchedFaces", matchedFaces);
        if (matchedFaces.length > 0) {
          CheckedIn(ssid);
        } else {
          _toast("Your Face not Recognize ");
          setLoading(false);
        }
      },
      (e) => {
        setLoading(false);
        // console.log('e', e)
      }
    );
  };
  const update = () => {
    dispatch(getUserProfile());
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
          // dispatch(logoutUser());

          navigation.dispatch(StackActions.replace("Auth"));
        },
      },
    ]);
  };
  return (
    <Layout
      title={"New khan"}
      Refresh
      RefreshButton={update}
      source
      onPress={logout}
      address
      location={globalPath.location}
      fullName
    >
      <View style={{ marginTop: "10%" }}>
        {/* {data.some((v) => v.userId == userid) ? (
          <ResponsiveText textAlign={"center"}>
            You have checked in at{" "}
            {formatAMPM(data?.find((v) => v.userId == userid)?.createdDateTime)}
          </ResponsiveText>
        ) : null}
        <View style={{ height: wp(5) }} />
        <Checkin
          time={CheckinTime}
          onPress={() =>
            data.some((v) => v.userId == userid) ? verifytocheckout() : getSSDid()
          }
          data={data}
          userid={userid}
        /> */}

        <View style={{ alignSelf: "center", marginTop: 5 }}>
          {getProfileData.isAllReadyCheckIn ? (
            <TouchableOpacity disabled={getProfileData.isKothiStaff} onPress={() => getSSDid("checkout")}>
              <ImageBackground
                style={styles.scan}
                source={globalPath.checkoutbtn}
              >
                <ResponsiveText size={4} color={colors.black}>
                  {"Check Out"}
                </ResponsiveText>
              </ImageBackground>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => getSSDid("checkin")}>
              <ImageBackground
                style={styles.scan}
                source={globalPath.faceCheckIn}
              />
            </TouchableOpacity>
          )}
          {getProfileData.isKothiStaff && getProfileData.isAllReadyCheckIn? (
            <ResponsiveText
              weight={"bold"}
              size={4}
              margin={[15, 40, 0, 0]}
              color={colors.grey1}
            >
              {"حاضری لگ گئی ہے"}
            </ResponsiveText>
          ) : null}
        </View>
        <View
          style={{
            justifyContent: "center",
            flexDirection: "row",
            marginTop: wp(10),
          }}
        >
          <TouchableOpacity
            // disabled={data.some((v) => v.userId == userid)}
            onPress={() => navigation.navigate(routeName.APPLY_LATE)}
          >
            <ImageBackground source={globalPath.latebutton} style={styles.btn}>
              <ResponsiveText color={colors.black}>Late/Short_Leave</ResponsiveText>
            </ImageBackground>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate(routeName.APPLYLEAVES)}
          >
            <ImageBackground source={globalPath.leavebutton} style={styles.btn}>
              <ResponsiveText color={colors.black}>Apply Leave</ResponsiveText>
            </ImageBackground>
          </TouchableOpacity>
        </View>
        
      </View>
      {ProfileData || loading ? <Loader /> : undefined}
      {/* <Modal
        isVisible={isVisible}
        onModalHide={() => setisVisible(false)}
        onBackdropPress={() => setisVisible(false)}
        animationOutTiming={500}
        backdropOpacity={0.76}
      >
        <View
          style={{
            height: hp(100),
            width: wp(100),
            alignSelf: 'center',
            backgroundColor: colors.white,
          }}
        >
          <View style={{ marginHorizontal: wp(8), marginTop: hp(10), }}>
            <ResponsiveText size={5} textAlign={'center'} color={colors.black}>Attendence for the event by{"\n"} scanninng your face</ResponsiveText>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
            <View style={styles.scan}>
              <Icon
                size={70}
                source={globalPath.faceScane}
              />
            </View>
            <TouchableOpacity onPress={() => pickImage(1)} style={styles.Scan_btn}  >
              <ResponsiveText color={colors.white}>Face 1</ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage(2)} style={styles.Scan_btn}  >
              <ResponsiveText color={colors.white}>Face 2</ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity onPress={matchFace} style={styles.Scan_btn}  >
              <ResponsiveText color={colors.white}>Scan face</ResponsiveText>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={toggleModal}
              style={styles.Scan_btn}  >
              <ResponsiveText color={colors.white}>Cancel</ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal> */}
    </Layout>
  );
};
export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue1,
  },
  btn: {
    height: wp(12),
    width: wp(40),
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  Scan_btn: {
    backgroundColor: colors.blue1,
    paddingHorizontal: wp(15),
    paddingVertical: hp(0.5),
    marginTop: hp(5),
    borderRadius: 5,
  },
  scan: {
    height: wp(55),
    width: wp(55),
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});
