import { StyleSheet, Image, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";

const ImageDisplay = (props) => {
  //   const [modalVisible, setModalVisible] = useState(props.modalVisible);
  return (
    <Modal
      isVisible={props.modalVisible}
      onSwipeComplete={() => props.setModalVisible(false)}
      swipeDirection={["left", "right", "down", "up"]}
      animationIn="slideInUp"
      style={styles.container}
    >
      <View style={styles.container}>
        <Image
          style={{ height: hp(60), width: wp(100) }}
          source={props.source}
        />
      </View>
    </Modal>
  );
};

export default ImageDisplay;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
