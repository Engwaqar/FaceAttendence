import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useEffect } from "react";
import Layout from '../../components/Layout'
import LeavesCard from '../../components/LeaveCard';
import { useDispatch, useSelector } from "react-redux";
import { hp, wp } from "../../helpers/Responsiveness";
import {  getLateUser } from "../../redux/actions/user.actions";
import Loader from '../../components/loader';
import RecordNotFound from '../../components/RecordnotFound';
// import { getLateUser } from '../../redux/sagas/user.sagas';
const LateComer = ({ navigation }) => {
    const dispatch = useDispatch();
    const LateData = useSelector((state) => state.userReducers.getLateUser.data);
    const Loading = useSelector((state) => state.userReducers.getLateUser.refreshing);
    console.log("LateDatahhhhhhh", LateData);
    useEffect(() => {
        dispatch(getLateUser());
    }, []);
    return (
        <>
            <Layout titleSize={6} backbutton navigation={navigation} title={'Late Reasons'}>
                <ScrollView>
                    {LateData.length > 0
                        ? LateData.map((item, index) => (item.lateReason?
                            <LeavesCard
                                date={item.lateDateTime}
                                description={item.lateReason}
                            />:null
                        ))
                        :Loading ?null: <RecordNotFound/>}
                    <View style={{ height: hp(10) }} />
                </ScrollView>
            </Layout>
            {Loading ?
                <Loader></Loader>
                :
                undefined
            }
        </>
    );
};

export default LateComer

const styles = StyleSheet.create({})