import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colorsPallet";
import { _toast } from "../../constants/Index";
import Layout from "../../components/Layout";
import LeavesCard from "../../components/LeaveCard";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import RoundButton from "../../components/RoundButton";
import { routeName } from "../../constants/routeName";
import { ScrollView } from "react-native-gesture-handler";
import { Grid } from "react-native-animated-spinkit";
import Loader from "../../components/loader";
import RecordNotFound from "../../components/RecordnotFound";
const Leaves = ({ navigation ,route}) => {
  const [data, setData] = useState([]);
  const [Loading, setLoading] = useState(false);
  useEffect(() => {
    getRequests();
  }, []);
  const getRequests = async () => {

    const res = await Api.get(urls.GET_REQUESTS);
    setLoading(true);
    console.log("res", res);
    if (res && res.success == true) {
      setLoading(false);
      setData(res.data);
    } else {
      setLoading(false);
      _toast(res.message);
    }
  };
  return (
    <>
    <Layout titleSize={6}  navigation={navigation} backbutton title={"Request"}>
      <ScrollView>
        {data.length > 0
          ? data.map((item, index) => (
              <LeavesCard
                title={item.title}
                status={item.approvalStatus}
                date={item.createdDatetime}
                description={item.description}
              />
            ))
          : Loading ?null: <RecordNotFound/>}
           
      </ScrollView>

      <RoundButton onPress={() => navigation.navigate(routeName.ADDREQUEST,getRequests)} />
     
    </Layout>
    {Loading?
       <Loader/>
         :
         undefined
      }
      </>
  );
};
export default Leaves;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.blue1,
  },
});
