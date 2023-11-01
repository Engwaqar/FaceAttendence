import { StyleSheet, Text, View,Image} from 'react-native'
import React from 'react'
import { globalPath } from "../constants/globalPath";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../constants/colorsPallet";
import { hp, wp } from "../helpers/Responsiveness";
const UpperTab = (props) => {
  return (
    // <View style={styles.middlebar}>
    <TouchableOpacity style={[styles.middle_images,{backgroundColor:props.colors}]}
     onPress={(props.onPress)}>
      <Image
        source={props.source}
        style={{
          height: hp(5),
          width: wp(18),
          resizeMode: "contain",
        }}
      />
      <Text style={styles.Middle_Text}>{props.title}</Text>
      {/* </TouchableOpacity> */}
    </TouchableOpacity>
   
  // </View>
  )
}

export default UpperTab

const styles = StyleSheet.create({
    middlebar: {
        flexDirection: "row",
        backgroundColor: colors.white,
    
        // alignItems: "center",
        padding: 10,
        // borderTopRightRadius: 25,
        paddingHorizontal: hp(1),
        // alignSelf: "center",
        marginVertical: 10
      },
      Middle_Text: {
        fontSize: 11,
        fontWeight: "bold",
        marginTop: 10,
        textAlign: "center",
        color: colors.white,
      },
       
  middle_images: {
    borderRightWidth: 0.4,
    borderColor: colors.grey,
    alignItems: "center",
    justifyContent:'center',
    height: hp(12),
    width: wp(23),
    margin: 2,
    borderRadius: 10
  },
})