import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Card from "../../components/Card";
import Layout from "../../components/Layout";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { _toast } from "../../constants/Index";
import Loader from "../../components/loader";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import { CeoCardView } from "../../components/CeoCardView";
import { CheckinBox } from "../../components/CheckinBox";
import DateTimePicker from "@react-native-community/datetimepicker";
import Modal from "react-native-modal";
import ResponsiveText from "../../components/RnText";
import Icon from "../../components/Icon";
import { globalPath } from "../../constants/globalPath";
import DropDown from "../../components/DropDown";
import RecordNotFound from "../../components/RecordnotFound";
import moment from "moment";
import { act } from "react-test-renderer";
const CeoScreen = ({ navigation }) => {
  const [user, setuser] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [isVisible, setisVisible] = useState(false);
  const [LookupUser, setLookupUser] = useState(null);
  const [DeprtLookup, setDeprtLookup] = useState(null);
  const [DesignationLookup, setDesignationLookup] = useState(null);
  const [LookupUserId, setLookupUserId] = useState("10");
  const [DeprtLookupId, setDeprtLookupId] = useState(null);
  const [DesignationLookupId, setDesignationLookupId] = useState(null);
  const [activeTab, setActiveTab] = useState(1);
  const [ShowTitle, setAShowTitle] = useState("");

  console.log("ShowTitle", ShowTitle);
  const clrs = {
    1: colors.lightgreen,
    2: colors.blue,
    3: colors.green,
    4: colors.red,
    5: colors.black,
    6: colors.yellow1,
    7: colors.purple,
  };
  const types = {
    1: "All",
    2: "Present",
    3: "Leave",
    4: "Absent",
    5: "Official Duty",
    6: "Late",
    7: "Rest Day",
  };
  const tabsData = [
    { id: 1, title: "All" },
    { id: 2, title: "P" },
    { id: 3, title: "L" },
    { id: 4, title: "A" },
    { id: 5, title: "OD" },
    { id: 6, title: "PL" },
    { id: 7, title: "RD" },
  ];
  const FilterData = () => {
    if (activeTab == 1) {
      return user;
    } else if (activeTab == 2) {
      return user.filter((item) => item.status == "Present");
    } else if (activeTab == 3) {
      return user.filter((item) => item.status == "Leave");
    } else if (activeTab == 4) {
      return user.filter((item) => item.status == "Absent");
    } else if (activeTab == 5) {
      return user.filter((item) => item.status == "Offical Duty");
    } else if (activeTab == 6) {
      return user.filter((item) => item.status == "Late");
    } else if (activeTab == 7) {
      return user.filter((item) => item.status == "Rest Day");
    }
  };
  const toggleModal = () => {
    setisVisible(!isVisible);
  };
  const dateFormat = (incomingdate) => {
    var date = new Date(incomingdate);
    if (date != null) {
      return `${date.getFullYear()}-${date.getMonth() + 1 < 10 ? "0" : ""}${
        date.getMonth() + 1
      }-${date.getDate() < 10 ? "0" : ""}${date.getDate()}`;
    }
  };
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    // setDate2(currentDate)
  };
  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    console.log("currentDate", currentDate);
    setShow1(Platform.OS === "ios");
    // setDate(currentDate);
    setDate2(currentDate);
  };
  const showDAtepicker = () => {
    setShow(true);
    console.log("show", show);
  };
  const showDAtepicker1 = () => {
    setShow1(true);
    console.log("show", show1);
  };
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const someResult = getLoctionUsers();

    // Begin second call and store promise without waiting
    const anotherResult = Submit();
    setLoading(true);
    // Now we await for both results, whose async processes have already been started
    const finalResult = [await someResult, await anotherResult];
    if (finalResult) {
      setLoading(false);
    }
  };
  const Submit = async (id) => {
    const obj = {
      startDate: dateFormat(date),
      endDate: dateFormat(date),
      locId: LookupUserId,
      catgId: DeprtLookupId ? DeprtLookupId : "0",
      desigId: DesignationLookupId ? DesignationLookupId : "0",
    };
    console.log("obj", obj);
    setLoading(true);
    const res = await Api.post(urls.GET_CEO_DATA, obj);
    console.log("GET_CEO_DATA", res);
    if (res && res.success == true) {
      setuser(res.data);
      setLoading(false);
      setDeprtLookupId("");
      setDesignationLookupId("");
      setisVisible(false);
    } else {
      _toast("something went wrong");
      setLoading(false);
    }
  };
  const getLoctionUsers = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_USER_LOOKUP);
      console.log("res user lock up", res);
      if (res && res.success == true) {
        setLookupUser(res.data);
        // setLoading(false);
      } else {
        _toast("something went wrong");
        // setLoading(false);
      }
    } catch (error) {
      // setLoading(false);
    }
  };
  const getdepartLookup = async (id) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_DEPARTMENT_LOOKUP + id);
      console.log("resdepart", res);
      if (res && res.success == true) {
        setDeprtLookup(res.data);

        setLoading(false);
      } else {
        _toast("something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const getdesignationLookup = async (id) => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_DESIGNATION_LOOKUP + id);
      console.log("resDesignation", res);
      if (res && res.success == true) {
        setDesignationLookup(res.data);
        setLoading(false);
      } else {
        _toast("something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
    }
  };
  const update = () => {
    getData();
  };
  return (
    <>
      <Layout
        title={"CEO-DASHBOARD"}
        profileIcon
        FilterIcon
        onPress={toggleModal}
        navigation={navigation}
        titleSize={5}
        Current_date
        date={moment(date).format(" MMM D YYYY")}
        Refresh
        RefreshButton={update}
        Sub_Title
        sub_title={ShowTitle ? ShowTitle : "Head Office"}
      >
        <ScrollView>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{
              marginLeft: wp(5),
              marginBottom: hp(1),
              flexDirection: "row",
            }}
          >
            {tabsData.map((item) => (
              <TouchableOpacity
                style={[
                  styles.Tab,
                  {
                    backgroundColor:
                      item.id == activeTab
                        ? clrs[activeTab]
                        : colors.lighterGrey,
                    // activeTab == item.id ? colors.blue : colors.lighterGrey,
                  },
                ]}
                onPress={() => setActiveTab(item.id)}
              >
                <View style={{ flexDirection: "row" }}>
                  <ResponsiveText
                    textAlign={"center"}
                    size={2.8}
                    margin={[1, 0, 0, 0]}
                    color={item.id == activeTab ? colors.white : colors.black}
                  >
                    {item.title}{" "}
                  </ResponsiveText>
                  {item.id == activeTab ? (
                    <ResponsiveText
                      textAlign={"center"}
                      size={2.8}
                      margin={[1, 0, 0, 0]}
                      color={item.id == activeTab ? colors.white : colors.black}
                    >
                      {FilterData().length}
                    </ResponsiveText>
                  ) : null}
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {FilterData().length > 0 ? (
            FilterData().map((item, index) => (
              <CeoCardView
                title={item.fullName}
                data={item}
                userDesignation={item.designationName}
                source={item.fullPath}
                navigation={navigation}
                status={item.status}
                checkInTime={item.isKothiStaff ? null : item.checkinTime}
                checkOutTime={item.isKothiStaff ? null : item.checkoutDateTime}
                LateReason={item.lateReason}
              />
            ))
          ) : Loading ? null : (
            <View
              style={{
                marginTop: hp(10),
              }}
            >
              <ResponsiveText textAlign={"center"}>
                NO {types[activeTab]}
              </ResponsiveText>
            </View>
          )}
          <View style={{ height: hp(10) }} />
        </ScrollView>
      </Layout>
      {Loading ? <Loader /> : undefined}
      <Modal
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
            alignSelf: "center",
            backgroundColor: colors.white,
          }}
        >
          <View style={{ marginHorizontal: wp(8), marginTop: hp(5) }}>
            <View style={{ flexDirection: "row", margin: 10 }}>
              <CheckinBox
                onPress={showDAtepicker}
                title="Start Date"
                subTitle={dateFormat(date)}
                titleColor={colors.black}
                subTitlecolor={colors.green}
                disabled={false}
              />
              {show && (
                <DateTimePicker
                  timeZoneOffsetInMinutes={0}
                  value={new Date()}
                  mode="date"
                  is24Hour
                  display="default"
                  onChange={onChange}
                  format={"YYYY-MM-DD"}
                  displayFormat={"DD MMM YYYY"}
                  // minimumDate={new Date()}
                />
              )}
            </View>
            <View style={{ marginVertical: hp(1) }}>
              <ResponsiveText size={3.5} margin={[0, 0, 10, 32]}>
                {"Select Location"}
              </ResponsiveText>
              <DropDown
                backgroundColor={colors.lightGrey}
                borderColor={colors.white}
                width={wp(70)}
                // height={hp(5)}
                title={"Select"}
                data={LookupUser?.map((v) => v.name)}
                onSelect={(item) => {
                  var id = LookupUser.find((v) => v.name == item)?.id;
                  // getUser(id)
                  // setselectedUser(id);
                  setAShowTitle(item);
                  console.log("idkkkk", item);
                  setLookupUserId(id);
                  getdepartLookup(id);
                }}
              />
            </View>
            <View style={{ marginVertical: hp(1) }}>
              <ResponsiveText size={3.5} margin={[0, 0, 10, 32]}>
                {"Select Department"}
              </ResponsiveText>
              <DropDown
                backgroundColor={colors.lightGrey}
                borderColor={colors.white}
                width={wp(70)}
                // height={hp(5)}
                title={"Select"}
                data={DeprtLookup?.map((v) => v.name)}
                onSelect={(item) => {
                  var id = DeprtLookup.find((v) => v.name == item)?.id;
                  getdesignationLookup(id);

                  setDeprtLookupId(id), console.log("DeprtLookup", id);
                }}
              />
            </View>
            <View style={{ marginVertical: hp(1) }}>
              <ResponsiveText size={3.5} margin={[0, 0, 10, 32]}>
                {"Select Designation"}
              </ResponsiveText>
              <DropDown
                backgroundColor={colors.lightGrey}
                borderColor={colors.white}
                width={wp(70)}
                // height={hp(5)}
                title={"Select"}
                data={DesignationLookup?.map((v) => v.name)}
                onSelect={(item) => {
                  var id = DesignationLookup.find((v) => v.name == item)?.id;
                  setDesignationLookupId(id),
                    console.log("DesignationLookup", id);
                }}
              />
            </View>
            <View
              style={{
                alignItems: "center",
                justifyContent: "center",
                marginTop: hp(10),
              }}
            >
              <TouchableOpacity onPress={Submit} style={styles.Scan_btn}>
                <ResponsiveText
                  alignItems={"center"}
                  justifyContent={"center"}
                  color={colors.white}
                >
                  Search
                </ResponsiveText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={toggleModal}
              style={{ alignItems: "center", marginTop: hp(5) }}
            >
              <ResponsiveText color={colors.black}>Cancel</ResponsiveText>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default CeoScreen;

const styles = StyleSheet.create({
  Scan_btn: {
    backgroundColor: colors.blue1,
    paddingHorizontal: wp(7),
    paddingVertical: hp(0.5),
    borderRadius: 10,
  },
  Tab: {
    backgroundColor: colors.white,
    width: wp(12),
    height: wp(7),
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: wp(0.2),
  },
});
