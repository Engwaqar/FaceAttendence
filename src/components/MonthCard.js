import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import ResponsiveText from "./RnText";
import { colors } from "../constants/colorsPallet";
import Icon from "./Icon";
import DropDown from "./DropDown";

import { globalPath } from "../constants/globalPath";
import { wp } from "../helpers/Responsiveness";
import { useDispatch } from "react-redux";

const MonthCard = (props) => {
  const dispatch = useDispatch();
  const month = [
    {
      id: 1,
      name: "January",
    },
    {
      id: 2,
      name: "Febrary",
    },
    {
      id: 3,
      name: "March",
    },
    {
      id: 4,
      name: "April",
    },
    {
      id: 5,
      name: "May",
    },
    {
      id: 6,
      name: "June",
    },
    {
      id: 7,
      name: "July",
    },
    {
      id: 8,
      name: "Augest",
    },
    {
      id: 9,
      name: "September",
    },
    {
      id: 10,
      name: "October",
    },
    {
      id: 11,
      name: "November",
    },
    {
      id: 12,
      name: "December",
    },
  ];
  const [modalVisible, setModalVisible] = useState(false);
  const [SelectedMonth, setSelectedMonth] = useState("");

  const getMonth = () => {
    var mon = new Date().getMonth() + 1;
    var name = month.find((v) => v.id == mon).name;
    if (SelectedMonth == "") {
      setSelectedMonth(name)
      return name;
    } else {
      return SelectedMonth;
    }
  };
  const Save = () => {
    setModalVisible(!modalVisible);
    props.action(month.find((v) => v.name == SelectedMonth).id);
  };

  return (
    <>
      <Modal
        // style={{ marginHorizontal:wp(10) }}
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        // onRequestClose={() => {
        //   alert("Modal has been closed.");
        //   setModalVisible(!modalVisible);
        // }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <DropDown
              width={wp(70)}
              defaultButtonText={getMonth()}
              data={month.map((v) => v.name)}
              onSelect={(item) => {
                console.log("select", item);
                setSelectedMonth(item);
              }}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonClose]}
              onPress={() => Save()}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginHorizontal: wp(5),
        }}
      >
        <ResponsiveText
          // fontFamily={Fonts.Bold}
          size={5}
          color={colors.blue1}
        >
          {getMonth()} Attendence
        </ResponsiveText>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon source={globalPath.filter} />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MonthCard;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    marginHorizontal: wp(20),
  },
  modalView: {
    margin: 20,

    backgroundColor: colors.grey,
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 20,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: colors.blue1,
  },
  textStyle: {
    color: colors.white,
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});
