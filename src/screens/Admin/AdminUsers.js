import {
  PermissionsAndroid,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { CardView } from "../../components/cardView";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { _toast } from "../../constants/Index";
import Loader from "../../components/loader";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "../../helpers/Responsiveness";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import ResponsiveText from "../../components/RnText";
import { colors } from "../../constants/colorsPallet";
import WifiManager from "react-native-wifi-reborn";
import RNAndroidLocationEnabler from "react-native-android-location-enabler";
import NetInfo, { useNetInfo } from "@react-native-community/netinfo";
import FaceSDK, {
  Enum,
  FaceCaptureResponse,
  LivenessResponse,
  MatchFacesResponse,
  MatchFacesRequest,
  Image as FaceImage,
} from "@regulaforensics/react-native-face-api-beta";
import Input from "../../components/Input";
import AsyncStorage from "@react-native-community/async-storage";
import RnButton from "../../components/RnButton";
import { routeName } from "../../constants/routeName";
import RNFetchBlob from "rn-fetch-blob";
import { getUserProfile } from "../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import { isImage } from "../../constants/Index";
import FastImage from "react-native-fast-image";
var image1 = new FaceImage();
var image2 = new FaceImage();
const AdminUsers = ({ navigation }) => {
  const [user, setuser] = useState([]);
  const [role, setRole] = useState(null);
  const [Loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [data, setdata] = useState([]);
  const ProfileData = useSelector(
    (state) => state.userReducers.getProfileData.data
  );
  // console.log('ProfileData', ProfileData)
  const dispatch = useDispatch();
  var indexGlobal = 1;
  useEffect(() => {
    // dispatch(getUser());
    getUser(indexGlobal, 20);
  }, []);

  const getUser = async (index, length) => {
    const role = await AsyncStorage.getItem("@loggedInUserTypeId");
    console.log("role", role);
    setRole(role);
    setLoading(true);
    const res = await Api.get(
      role == "2"
        ? urls.GET_SITE_USERS
        : `${
            urls.GET_ALL_USERS
          }?page=${index}&PageSize=${length}&isMoblie=${true}`
    );
    console.log("firstttt", res);
    if (res && res.success == true) {
      setuser([...[], ...res.data]);
      if (role == "1") {
        indexGlobal = indexGlobal + 1;
        getUser2(indexGlobal, 20, res.data);
      }
      setLoading(false);
    } else {
      _toast("something went wrong");
      setLoading(false);
    }
  };
  const getUser2 = async (index, length, preData) => {
    const role = await AsyncStorage.getItem("@loggedInUserTypeId");
    setRole(role);
    // setLoading(true);
    const res = await Api.get(
      role == "2"
        ? urls.GET_SITE_USERS
        : `${
            urls.GET_ALL_USERS
          }?page=${index}&PageSize=${length}&isMoblie=${true}`
    );
    console.log("firstttt", res);
    if (res && res.success == true) {
      setuser([...new Set([...preData, ...res.data])]);
      if (res.data.length > 0) {
        indexGlobal = indexGlobal + 1;
        getUser2(indexGlobal, 20, [...new Set([...preData, ...res.data])]);
      }
      setLoading(false);
    } else {
      _toast("something went wrong");
      setLoading(false);
    }
  };
  const update = () => {
    getUser(1, 20);
    dispatch(getUserProfile());
  };
  const getSSDid = async (item, ischeckIn) => {
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
                    // setSSID(ssid);
                    if (ischeckIn == "checkin") {
                      pickImage(item, ssid);
                    } else {
                      CheckedOut(item, ssid);
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

  const pickImage = async (item, ssid) => {
    FaceSDK.presentFaceCaptureActivity(
      (result) => {
        console.log("result", JSON.parse(result));

        //   image1.bitmap =  FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap;

        // image1.imageType = Enum.ImageType.IMAGE_TYPE_LIVE;
        if (FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap) {
          if (role == "2") {
            matchFace(
              FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
              item,
              ssid
            );
          } else {
            addFaceUser(
              FaceCaptureResponse.fromJson(JSON.parse(result)).image.bitmap,
              item
            );
          }
        }
      },
      (e) => {}
    );
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
  const matchFace = async (base64, item, ssid) => {
    if (item.base64_FullPath == "" || item.base64_FullPath == null) {
      _toast("please Contact to Admin for face registeration!");
      return false;
    }
    setLoading(true);

    const base64toUrl = await encodedImage(item.base64_FullPath);
    // console.log('base64toUrl644444444', base64toUrl)
    image1.bitmap = base64;
    image1.imageType = 3;
    image2.bitmap = base64toUrl;
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
          CheckedIn(item, ssid);
        } else {
          _toast("Your Face not Recognize ");
          setLoading(false);
        }
      },
      (e) => {
        // this.setState({ similarity: e });
      }
    );
  };
  const CheckedIn = async (item, ssid) => {
    var obj = {
      is_TimeIn: true,
      is_TimeOut: false,
      userId: item.id,
      networkId: 1,
      isAllReadyCheckIn: true,
      wifiName: ssid,
      ipAddress: "",
      // CompanySSID: 'FabIntel',
      // CompanySSID: ssid,
      // IpAddress: IpAddress
    };
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_ATTENDENCE, obj);
      console.log("res", res);
      if (res && res.success == true) {
        // setLoading(false);
        // setData(res.data);
        // dispatch(getpresentTeam());
        // getUser();
        getUser(indexGlobal, 20);

        _toast("Checked In");
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      // setErrorString(error.toString());
      setLoading(false);
    }
  };
  const CheckedOut = async (item, ssid) => {
    // var id = data?.find((v) => v.userId == userid)?.id;
    var obj = {
      is_TimeIn: false,
      is_TimeOut: true,
      userId: item.id,
      networkId: 1,
      isAllReadyCheckIn: false,
      wifiName: ssid,
      ipAddress: "",
      // CompanySSID: 'FabIntel',
      // CompanySSID: ssid,
      // IpAddress: IpAddress
    };
    try {
      setLoading(true);
      const res = await Api.post(urls.ADD_ATTENDENCE, obj);
      setLoading(true);
      console.log("res", res);
      if (res && res.success == true) {
        setLoading(false);
        // getUser();
        getUser(indexGlobal, 20);

        _toast("Checked Out");
      } else {
        setLoading(false);
        _toast(res.message);
      }
    } catch (error) {
      // setErrorString(error.toString());
      setLoading(false);
    }
  };

  const addFaceUser = async (base64, item) => {
    const role = await AsyncStorage.getItem("@loggedInUserTypeId");

    if (role == "2") {
      matchFace(base64, item);
      return false;
    }
    var obj = {
      userId: item.id,
      base64: base64,
      isFirstTime: true,
    };
    setLoading(true);
    const res = await Api.post(urls.EDIT_FACE, obj);

    console.log("firstttt", res);
    if (res && res.success == true) {
      //   setuser(res.data);
      setLoading(false);
      // getUser();
      getUser(indexGlobal, 20);

      _toast("Your Face added Successfully");
    } else {
      _toast("something went wrong");
      setLoading(false);
    }
  };
  useEffect(() => {
    setFilteredData(user);
    setdata(user);
    dispatch(getUserProfile());
  }, [user]);
  const searchFilterFunction = (text) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.fullName
          ? item.fullName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };
  return (
    <>
      <Layout
        title={ProfileData.fullName}
        profileIcon
        Refresh
        RefreshButton={update}
        navigation={navigation}
        titleSize={5}
      >
        <ScrollView>
          <View style={{ alignItems: "center", marginBottom: hp(2) }}>
            <Input
              placeholder={"User Search"}
              width={wp(70)}
              backgroundColor={colors.grey}
              searchBox
              onChnageText={(text) => searchFilterFunction(text)}
            />
          </View>
          {filteredData.length > 0
            ? filteredData.map((item, index) => (
                <>
                  <View
                    style={{
                      padding: 15,
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      backgroundColor: colors.white,
                      borderRadius: 10,
                      margin: 5,
                      elevation: 9,
                      shadowColor: colors.green,
                      shadowOpacity: 0.2,
                      // padding: 5,
                      shadowOffset: {
                        width: 0,
                        height: 0,
                      },
                    }}
                  >
                    <View style={{ alignItems: "flex-end" }}>
                      <FastImage
                        source={
                          isImage
                            ? {
                                uri: item.fullPath,
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
                    {/* <Icon
                      size={wp(12)}
                      borderRadius={wp(4)}
                      source={
                        item.fullPath ? { uri: item.fullPath } : globalPath.user
                      }
                    /> */}
                    <View style={{ flex: 1, marginLeft: 10 }}>
                      <ResponsiveText>{item.fullName}</ResponsiveText>
                      <ResponsiveText color={colors.grey1}>
                        {item.designationName}
                      </ResponsiveText>
                      {item.isKothiStaff && item.isAllReadyCheckIn ? (
                        <ResponsiveText
                          weight={"bold"}
                          size={4}
                          margin={[0, 40, 0, 0]}
                          color={colors.grey1}
                        >
                          {"حاضری لگ گئی ہے"}
                        </ResponsiveText>
                      ) : null}
                    </View>
                    <TouchableOpacity
                      // disabled={role=='2'}
                      style={{ marginRight: 10 }}
                      onPress={() => {
                        if (role == "2") {
                          _toast(
                            "please Contact to Admin for face registeration!"
                          );
                          return false;
                        } else {
                          pickImage(item);
                        }
                      }}
                    >
                      <Icon
                        size={30}
                        source={globalPath.faceScane}
                        tintColor={
                          item.base64_FullPath ? colors.lightgreen : colors.blue
                        }
                      />
                    </TouchableOpacity>
                    {/* <TouchableOpacity>
                    <Icon size={30} source={globalPath.faceScane} tintColor={colors.blue} />
                    </TouchableOpacity> */}
                  </View>
                  {role == "2" ? (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        padding: 10,
                      }}
                    >
                      <RnButton
                        height={hp(4)}
                        title="Apply Late"
                        titleSize={2.5}
                        width={wp(25)}
                        // margin={[0, 10, 0, 0]}
                        onPress={() =>
                          navigation.navigate(routeName.APPLY_LATE, item)
                        }
                      />
                      <RnButton
                        height={hp(4)}
                        titleSize={2.5}
                        title="Apply Leave"
                        width={wp(25)}
                        onPress={() =>
                          navigation.navigate(routeName.APPLYLEAVES, item)
                        }
                      />
                      <RnButton
                        disabled={item.isKothiStaff && item.isAllReadyCheckIn}
                        height={hp(4)}
                        titleSize={2.7}
                        backgroundColor={
                          item.isAllReadyCheckIn
                            ? item.isKothiStaff && item.isAllReadyCheckIn
                              ? colors.skyblue1
                              : colors.yellow
                            : colors.green
                        }
                        title={
                          item.isAllReadyCheckIn ? "Check Out" : "Check In"
                        }
                        width={wp(30)}
                        onPress={() =>
                          item.isAllReadyCheckIn
                            ? getSSDid(item, "checkout")
                            : getSSDid(item, "checkin")
                        }
                      />
                    </View>
                  ) : null}
                </>
              ))
            : null}
          <View style={{ height: hp(10) }} />
        </ScrollView>
      </Layout>
      {Loading ? <Loader /> : undefined}
    </>
  );
};

export default AdminUsers;

const styles = StyleSheet.create({});
