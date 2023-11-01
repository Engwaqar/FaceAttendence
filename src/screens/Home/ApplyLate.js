import { View, Text } from "react-native";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { hp, wp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";
import ResponsiveText from "../../components/RnText";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Loader from "../../components/loader";
import AsyncStorage from "@react-native-community/async-storage";
import RadioButton from "../../components/RadioButton";
const ApplyLate = ({ navigation, route }) => {
  const user = route?.params;
  const [text, setText] = useState("");
  const [Loading, setLoading] = useState(false);
  const [Islate, setIslate] = useState(3);
  console.log("Islate", Islate);
  const AddReason = async (status) => {
    const userId = await AsyncStorage.getItem("@userId");
    const obj = {
      userId: user ? user.id : userId,
      late: true,
      lateReason: text,
      NetworkId: 1,
      status: Islate,
    };
    console.log("reason", obj);
    if (text == "") {
      _toast("Enter reason");
      return false;
    }
    setLoading(true);

    const res = await Api.post(urls.ADD_REASON_OF_LATE, obj);
    console.log("res", res);
    if (res && res.success == true) {
      setText("");
      setLoading(false);
      _toast("submit successfully");
      setLoading(false);
      setTimeout(() => {
        navigation.goBack();
      }, 1000);
    } else {
      setLoading(false);
      _toast("something went wrong");
    }
  };
  return (
    <>
      <Layout
        titleSize={6}
        navigation={navigation}
        backbutton
        title={"Apply for Late"}
      >
        <View style={{ marginTop: wp(8), marginHorizontal: wp(4) }}>
          <View
            style={{  }}
          >
            <RadioButton
              checked={Islate == 3}
              text={"Late"}
              onPress={() => setIslate(3)}
            />
            <RadioButton
              checked={Islate == 7}
              text={"Official Duty"}
              onPress={() => setIslate(7)}
            />
            <RadioButton
              checked={Islate == 5}
              text={"Short_Leave"}
              onPress={() => setIslate(5)}
            />
          </View>
        </View>
        <View>
          <View
            style={{
              // shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 0,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,
              elevation: 5,
              borderRadius: 20,
              marginTop: 15,
              // shadowOffset: 0, well done saniya why are u doing this type of errors
              backgroundColor: colors.white,
              marginHorizontal: 5,
            }}
          >
            <Input
              placeholder={"Type here.."}
              width={wp(90)}
              height={hp(18)}
              inputHeight={hp(15)}
              padding={[0, 0, 0, 25]}
              margin={[0, 0, 0, 0]}
              multiline={true}
              // onChangeText={(text) => setText(text)}
              onChnageText={(text) => setText(text)}
              value={text}
            />
          </View>

          <View style={{ marginHorizontal: 20 }}>
            <RnButton
            titleSize={5}
              onPress={() => AddReason()}
              margin={[50, 0, 0, 0]}
              title={"Submit"}
            />
          </View>
        </View>
        {false ? <Loader /> : undefined}
      </Layout>
    </>
  );
};

export default ApplyLate;
