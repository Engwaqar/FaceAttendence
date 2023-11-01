import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import React from "react";
import Layout from "../../components/Layout";
import { globalPath } from "../../constants/globalPath";
import Icon from "../../components/Icon";
import { hp, wp } from "../../helpers/Responsiveness";
import { TextProfile } from "../../components/TextProfile";
import { colors } from "../../constants/colorsPallet";
import { isImage } from "../../constants/Index";
const EmployeProfile = (props) => {
  const data = props.route.params;
  console.log("datasssssssss", data);
  return (
    // <Layout title={'Profile'}></Layout>
    <ImageBackground
      source={globalPath.EmployeProfile}
      resizeMode="cover"
      style={styles.image}
    >
      <TouchableOpacity
        style={{ marginTop: "8%", marginRight: "80%" }}
        onPress={() => props.navigation.goBack()}
      >
        <Icon size={20} margin={[10, 0, 0, 0]} source={globalPath.backArrow} />
      </TouchableOpacity>

      <Icon
        source={
          isImage(data.fullPath) ? { uri: data.fullPath } : globalPath.user
        }
        resizeMode="contain"
        style={styles.EmployePic}
      ></Icon>

      <View
        style={{
          backgroundColor: colors.blue1,
          width: wp(60),
          height: hp(5),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextProfile
          margin={[0, 0, 0, 0]}
          Title={data.fullName}
          color={colors.white}
          size={4}
          weight={"bold"}
        />
      </View>
      <TextProfile
        margin={[10, 0, 0, 0]}
        Title={data.userDesignation}
        color={colors.white}
        size={4}
        weight={"bold"}
      />
      <View style={{ flexDirection: "row", marginTop: 10 }}>
        <View style={styles.Text}>
          <TextProfile
            Title="User Name"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile Title={data.fullName} color={colors.white} size={3.2} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="Registration"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile Title="000-0000-0000" color={colors.white} size={3.2} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="Email"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile Title={data.email} color={colors.white} size={3.2} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="Employee Salary"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile Title={data.employerSalary} color={colors.white} size={3.2} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="Contact"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile
            Title={data.contactNumber}
            color={colors.white}
            size={3.2}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="Gender"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile
            Title={data.gender ? data.gender : "Not Defined"}
            color={colors.white}
            size={3.2}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="DOB"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile
            Title={data.dateofBirth ? data.dateofBirth : "01-02-2000"}
            color={colors.white}
            size={3.2}
          />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="State Name"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile Title="Punjab" color={colors.white} size={3.2} />
        </View>
      </View>
      <View style={{ flexDirection: "row" }}>
        <View style={styles.Text}>
          <TextProfile
            Title="Country"
            color={colors.white}
            size={4}
            weight={"bold"}
          />
        </View>
        <View style={styles.Text2}>
          <TextProfile Title="Pakistan" color={colors.white} size={3.2} />
        </View>
      </View>
      <View style={{ justifyContent: "center", height: hp(10) }}>
        <TextProfile Title="www.fabintel.com" color={colors.white} size={5} />
      </View>
    </ImageBackground>
  );
};

export default EmployeProfile;
const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: "center",
  },
  EmployePic: {
    height: hp(32),
    width: wp(60),
    marginTop: hp(1),
    backgroundColor: colors.grey,
  },
  Text: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: "15%",
  },
  Text2: {
    flex: 1,
    justifyContent: "center",
    padding: 5,
  },
});
