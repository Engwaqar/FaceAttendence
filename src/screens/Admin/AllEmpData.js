import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Layout from "../../components/Layout";
import ResponsiveText from "../../components/RnText";
import { ScrollView } from "react-native-gesture-handler";
import { hp, wp } from "../../helpers/Responsiveness";
import { colors } from "../../constants/colorsPallet";
import Api from "../../redux/lib/api";
import urls from "../../redux/lib/urls";
import { useEffect } from "react";
import { useState } from "react";
import DropDown from "../../components/DropDown";
import CustomizeDropdown from "../../components/CustomizeDropdown";
import { formatAMPM } from "../../redux/actions/user.actions";

const AllEmpData = ({ navigation }) => {
  const dateArr=[{
    name:'',
    attendenceOfMonth:[{
      present:'1',
      day:'Mon'
    },
    {
      present:'2',
      day:'Tue'
    },
    {
      present:'3',
      day:'Wed'
    },
    {
      present:'4',
      day:'Thu'
    },
    {
      present:'5',
      day:'Fri'
    },
    {
      present:'8',
      day:'Mon'
    },
    {
      present:'9',
      day:'Tue'
    },
    {
      present:'10',
      day:'Wed'
    },
    {
      present:'11',
      day:'Thu'
    },
    {
      present:'12',
      day:'Fri'
    }
  
  ]

  }]
  const [data, setData] = useState([]);
  const [selectedmonth, setSelectedmonth] = useState(new Date().getMonth() + 1);
  const [selectedyear, setSelectedyear] = useState(new Date().getFullYear());
  const month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const years = [2020, 2021, 2022];

  useEffect(() => {
    getData(selectedmonth, selectedyear);
  }, []);

  const getData = async (month, year) => {
    const res = await Api.get(
      urls.GetAttendenceAllADminsideApp + month + "/" + year
    );
    console.log("monthyl rep", res);
    if (res && res.success == true) {
      setData(res.data);
      // setData(dateArr.concat(res.data));

      // _toast("Checked In");
    } else {
      setData([]);

      // _toast(res.message);
    }
  };
  // Edit these as they are your cells. You may even take parameters to display different data / react elements etc. */}

  const renderRow = (emp, index) => {
    return (
      <View
        style={{
          flex: 1,
          //   alignSelf: "stretch",
          flexDirection: "row",
          height: hp(8),
          // borderBottomWidth: 0.4,
          backgroundColor: index % 2 == 0 ? colors.grey : colors.white,
          borderRightWidth:0.3,
          paddingHorizontal:5
          //   justifyContent:'center',
          //   alignItems:'center'
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            //  alignSelf: "stretch"
          }}
        >
          <ResponsiveText>{emp.name}</ResponsiveText>
        </View>
        {/* <ScrollView style={{flex:0.7}} horizontal>
          {emp.data.map((item) => (
            <View style={{ width: wp(10) }}>
              <ResponsiveText>P</ResponsiveText>
            </View>
          ))}
        </ScrollView> */}

        {/* 
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} />
        <View style={{ flex: 1, alignSelf: "stretch" }} /> */}
      </View>
    );
  };
  return (
    <Layout
      navigation={navigation}
      backbutton
      title={"Monthly Report"}
      titleSize={6}
    >
      <View style={styles.cardview}>
        <View style={{ flex: 1 }}>
          <ResponsiveText>Month</ResponsiveText>
          <DropDown
            btnwidth={wp(40)}
            width={wp(40)}
            height={wp(12)}
            defaultButtonText={selectedmonth}
            backgroundColor={colors.grey}
            borderRadius={15}
            bordercolor={colors.blue1}
            data={month}
            onSelect={(item) => {
              getData(item,selectedyear);
            }}
          />
        </View>
        <View style={{ flex: 1 }}>
          <ResponsiveText>Year</ResponsiveText>

          <DropDown
            btnwidth={wp(40)}
            data={years}
            width={wp(40)}
            height={wp(12)}
            defaultButtonText={selectedyear}
            backgroundColor={colors.grey}
            borderRadius={15}
            bordercolor={colors.blue1}
            onSelect={(item) => {
              getData(selectedmonth,item);
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{
          flex: 1,
          padding: 5,
          //alignItems: "center", justifyContent: "center"
        }}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            //alignItems: "center", justifyContent: "center"
          }}
        >
          <View style={{ flex: 0.4 }}>
            {data.map((emp, index) => {
              // This will render a row for each data element.
              return renderRow(emp, index);
            })}
          </View>
          <ScrollView style={{ flex: 0.8 }} horizontal>
            <View>
              {data.map((item, index) => (
                <View
                  style={{
                    flexDirection: "row",
                    backgroundColor:
                      index % 2 == 0 ? colors.grey : colors.white,
                    borderBottomWidth: 0.4,
                  }}
                >
                  {item.attendenceOfMonth.map((a, index) => (
                    <View
                      style={{
                        width: wp(10),
                        height: hp(8),
                        backgroundColor:
                          index % 2 == 0
                            ? colors.transparent
                            : colors.transparent,
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <ResponsiveText>{a.present}</ResponsiveText>
                      {
                      //item.name!=''?null:
                      <ResponsiveText size={2.5} color={colors.black1}>
                        {a.day}
                      </ResponsiveText>
                      }
                      <ResponsiveText size={2.5} color={colors.black1}>
                        {formatAMPM( a.createdDateTime,'type6')}
                      </ResponsiveText>
                    </View>
                  ))}
                </View>
              ))}
            </View>
            {/* <View style={{flexDirection:'row'}}>
          {Emp.map((item) => (
            <View style={{ width: wp(10) }}>
              <ResponsiveText>P</ResponsiveText>
            </View>
          ))}
          </View> */}
          </ScrollView>
        </View>
        <View style={{ height: hp(15) }} />
      </ScrollView>
    </Layout>
  );
};

export default AllEmpData;

const styles = StyleSheet.create({
  cardview: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: colors.white,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
    shadowOpacity: 0.1,
    marginVertical: 10,
    borderRadius: 10,
  },
});
