import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { colors } from "../../constants/colorsPallet";
import Checkin from "../../components/Checkin";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import Layout from "../../components/Layout";
import Card from "../../components/Card";
import ResponsiveText from "../../components/RnText";
import { hp, wp } from "../../helpers/Responsiveness";
import LeavesCard from "../../components/LeaveCard";
import { useDispatch, useSelector } from "react-redux";
import { getLeavesRequest } from "../../redux/actions/user.actions";
import { ScrollView } from "react-native-gesture-handler";
import Loader from "../../components/loader";
import RecordNotFound from "../../components/RecordnotFound";
const Leaves = ({ navigation }) => {
  const dispatch = useDispatch();
  const LeavesData = useSelector((state) => state.userReducers.getLeaves.data);
  const Loading = useSelector((state) => state.userReducers.getLeaves.refreshing);
  console.log("leaves", LeavesData);
  useEffect(() => {
    dispatch(getLeavesRequest());
  }, []);
  return (
    <>
    <Layout titleSize={6}  navigation={navigation} backbutton title={"Leaves"}>
      <ScrollView>
        {LeavesData.length > 0
          ? LeavesData.map((item, index) => (
              <LeavesCard
                title={item.reason}
                // status={item.approvalStatus}
                startDate={item.startDate}
                endDate={item.endDate}
                date={item.createdDatetime}
                description={item.description}
                status={item.status}
              />
            ))
          : Loading ?null: <RecordNotFound/>}
          <View style={{height:hp(10)}}/>
      </ScrollView>
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
