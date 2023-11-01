import { StyleSheet, Text, View } from "react-native";
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
import DropDown from "../../components/DropDown";
import { colors } from "../../constants/colorsPallet";
const Users = ({ navigation }) => {
  const [user, setuser] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [LookupUser, setLookupUser] = useState(null);
  const [selectedUser, setselectedUser] = useState(null);

  useEffect(() => {
    getLoctionUsers();
  }, []);
  const getUser = async (id) => {
    setLoading(true);
    const res = await Api.get(urls.GET_ALL_USERS);
    console.log("GET_ALL_USERS", res);
    if (res && res.success == true) {
      setuser(res.data);
      setLoading(false);
    } else {
      _toast("something went wrong");
      setLoading(false);
    }
  };

  const getLoctionUsers = async () => {
    try {
      setLoading(true);
      const res = await Api.get(urls.GET_USER_LOOKUP);
      console.log("res", res);
      if (res && res.success == true) {
        setLookupUser(res.data);
        getUser(res.data[0].id)
        setLoading(false);
      } else {
        _toast("something went wrong");
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      //   setErrorString(error);
    }
  };
  return (
    <>
      <Layout title={"Members"} navigation={navigation} titleSize={6}>
        <ScrollView>
          <View style={{ marginVertical: hp(1) }}>
            <DropDown
              backgroundColor={colors.lightGrey}
              borderColor={colors.white}
              width={wp(70)}
              // height={hp(5)}
              title={"Select Users"}
              data={LookupUser?.map((v) => v.name)}
              onSelect={(item) => {
                var id = LookupUser.find((v) => v.name == item)?.id;
                getUser(id)
                // setselectedUser(id);
                console.log('idkkkk', id)
              }}
            />
          </View>
          {user.length > 0
            ? user.map((item, index) =>
            // item.userTypeId == 2 ?
            (
              <CardView
                title={item.fullName}
                data={item}
                userDesignation={item.designationName}
                source={item.fullPath}
                navigation={navigation}
              />
            )
              // : null
            )
            : null}
          <View style={{ height: hp(10) }} />
        </ScrollView>
      </Layout>
      {Loading ? <Loader /> : undefined}
    </>
  );
};

export default Users;

const styles = StyleSheet.create({});
