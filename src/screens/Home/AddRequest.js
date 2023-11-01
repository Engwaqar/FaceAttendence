import { View, Text } from "react-native";
import React, { useState } from "react";
import Layout from "../../components/Layout";
import Input from "../../components/Input";
import { hp, wp } from "../../helpers/Responsiveness";
import RnButton from "../../components/RnButton";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";
import urls from "../../redux/lib/urls";
import Api from "../../redux/lib/api";
import Loader from "../../components/loader";
const AddRequests = ({ navigation ,route}) => {
  const [text, setText] = useState("");
  const [Loading, setLoading] = useState("");
  const [Title, setTitle] = useState("");

  const submit = async (id) => {

    const obj = {
      title: Title,
      description: text,
    };
    console.log("reason", obj);
    if (text == "" || Title=="") {
      _toast("All fields are required");
      return false;
    }
    setLoading(true);
    const res = await Api.post(urls.ADD_REQUEST, obj);
    console.log("res", res);
    if (res && res.success == true) {
      
      setText("");
      _toast("submit successfully");
      setLoading(false);
      route.params()
      navigation.goBack();
    } else {
      setLoading(false);
      _toast("something went wrong");
    }
  };
  return (
    <>
    <Layout titleSize={6} navigation={navigation} backbutton title={"Add Request"}>
      <View style={{ marginTop: hp(0) }}>
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
            marginRight: 7,
            marginLeft: 5,
          }}
        >
          <Input
            placeholder={"Request title"}
            width={wp(90)}
            height={hp(6.5)}
            padding={[0, 0, 0, 25]}
            margin={[0, 0, 0, 5]}
            onChnageText={(text) => setTitle(text)}
            value={Title}
            //   leftIcon={globalPath.Email}
            // backgroundColor={colors.green}
            // shadowColor={colors.green}
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
            marginTop: 10,
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
            onPress={() => submit()}
            backgroundColor={colors.blue}
            margin={[50, 0, 0, 0]}
            title={"Submit"}
          />
        </View>
      </View>
    </Layout>
    {Loading?
      <Loader/>
        :
        undefined
     }
     </>
  );
};

export default AddRequests;
