import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { hp, wp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { colors } from "../../constants/colorsPallet";
import { CheckinBox } from "../../components/CheckinBox";
import DateTimePicker from "@react-native-community/datetimepicker";
import { _toast } from "../../constants/Index";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import { Grid } from "react-native-animated-spinkit";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-community/async-storage";

const ApplyLeaves = (props) => {
  const user=props?.route?.params

  const [date, setDate] = useState(new Date());
  const [date2, setDate2] = useState(new Date());
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [Title, setTitle] = useState("");
  const [Message, setMessage] = useState(false);
  const [Loading, setLoading] = useState("");
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    // setDate2(currentDate)
  };
  const dateFormat = (incomingdate) => {
    var date = new Date(incomingdate);
    if (date != null) {
      return `${date.getFullYear()}-${date.getMonth() + 1<10?'0':''}${date.getMonth() + 1}-${date.getDate()<10?'0':''}${date.getDate()}`;
    }
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
  const Submit = async (id) => {
    const userId=await AsyncStorage.getItem('@userId')

    const obj = {
      userId:user?user.id: userId,
      reason: Title,
      startDate: dateFormat(date),
      endDate: dateFormat(date2),
      description: Message,
      // status: "Pending",
    };
    console.log("reason", obj);
    if (Title == "") {
      _toast("Type Leave Title");
      return false;
    } else if (Message == "") {
      _toast("Type Message");
      return false;
    }

    setLoading(true);
    const res = await Api.post(urls.ADD_APPLY_LEAVE, obj);
    console.log("res", res);
    if (res && res.success == true) {
      // setText("");
      _toast("submit successfully");
      setLoading(false);
      props.navigation.goBack();
      //   setTimeout(() => {
      //     // navigation.goBack();
      //   }, 1000);
    } else {
      setLoading(false);
      _toast("something went wrong");
    }
  };
  return (
    <>
      <Layout titleSize={6} navigation={props.navigation} backbutton title={"Apply Leaves"}>
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
            //         <DateTimePicker
            //           // testID="dateTimePicker"
            //           value={new Date()}
            //           mode={'date'}
            //           // is24Hour={true}
            //           display="default"
            //           // format="YYYY-MM-DD HH:mm"
            //           onChange={onChange}
            //           format={"YYYY-MM-DD"}
            // displayFormat={"DD MMM YYYY"}
            //         />
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode="date"
              is24Hour
              display="default"
              onChange={onChange}
              format={"YYYY-MM-DD"}
              displayFormat={"DD MMM YYYY"}
              minimumDate={new Date()}
            />
          )}
          {show1 && (
            //         <DateTimePicker
            //           // testID="dateTimePicker"
            //           value={new Date()}
            //           mode={'date'}
            //           // is24Hour={true}
            //           display="default"
            //           // format="YYYY-MM-DD HH:mm"
            //           onChange={onChange}
            //           format={"YYYY-MM-DD"}
            // displayFormat={"DD MMM YYYY"}
            //         />
            <DateTimePicker
              timeZoneOffsetInMinutes={0}
              value={new Date()}
              mode="date"
              // is24Hour
              display="default"
              onChange={onChange1}
              format={"YYYY-MM-DD"}
              displayFormat={"DD MMM YYYY"}
              minimumDate={new Date()}
            />
          )}
          <CheckinBox
            onPress={showDAtepicker1}
            title="End Date"
            subTitle={dateFormat(date2)}
            titleColor={colors.black}
            subTitlecolor={colors.red}
            disabled={false}
          />
        </View>

        <View style={{ marginTop: hp(0) ,alignItems:'center'}}>
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 3,
              borderRadius: 20,
              marginTop: 10,
            }}
          >
            <Input
              placeholder={"Leave Title"}
              width={wp(90)}
              height={hp(6.5)}
              padding={[0, 0, 0, 25]}
              // margin={[0, 0, 0, 5]}
              onChnageText={(text) => setTitle(text)}
              value={Title}
              //   leftIcon={globalPath.Email}
              // backgroundColor={colors.green}
              // shadowColor={colors.green}
            />
          </View>
          <View
            style={{
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 3,
              borderRadius: 20,
              marginTop: 10,
            }}
          >
            <Input
              placeholder={"Message"}
              width={wp(90)}
              height={hp(18)}
              inputHeight={hp(15)}
              padding={[0, 0, 0, 25]}
              // margin={[0, 0, 0, 0]}
              // backgroundColor={colors.red}
              multiline={true}
              // secureTextEntry
              onChnageText={(text) => setMessage(text)}
              value={Message}
              //   leftIcon={globalPath.Lock}
            />
          </View>
          {/* <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText> */}
            <RnButton
              onPress={() => Submit()}
              backgroundColor={colors.blue}
              margin={[50, 0, 0, 0]}
              title={"Submit"}
              //   onPress={() => Validation()}
            />
        </View>
      </Layout>
      {Loading ? <Loader /> : undefined}
    </>
  );
};

export default ApplyLeaves;
