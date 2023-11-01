import React, { version } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  ImageBackground,
  ScrollView
} from 'react-native';
import ResponsiveText from './RnText';
import { hp, wp } from '../helpers/Responsiveness';
import { colors } from '../constants/colorsPallet';
import { TouchableOpacity } from 'react-native-gesture-handler';
const Timetable_cardView = (props) => {
  return (
    <View
      style={{
        elevation: 1,
        top: hp(2),
        margin: 2,
        flexDirection: "row",
        marginVertical: 5,
        paddingVertical: 10,
        paddingLeft: hp(1),
        backgroundColor: colors.white,
        borderRadius: hp(1)
      }}>
      {props.item.url ?
        <TouchableOpacity >
          <Image style={styles.imageView}
            source={props.item.url}
          />

        </TouchableOpacity> : undefined}
      <View style={{ justifyContent: 'center', marginLeft: 10,flex:1 }}>


        <ResponsiveText weight={'bold'} size={4.5} color={colors.green}>{props.item.subject}</ResponsiveText>


       
            <ResponsiveText color={colors.black} size={3}>
              {props.item.teacher}
            </ResponsiveText>
        
        <ResponsiveText color={colors.grey1} size={3}>
          {props.item.startTimeToDisplay}-{props.item.endTimeToDisplay}
        </ResponsiveText>
      </View>
      <View style={{ backgroundColor: colors.offwhite1, borderRadius: 3, height: hp(2.4), width: wp(15), right: 10 }}>
        
            <ResponsiveText color={colors.black} size={2.5} margin={[2, 0, 0, 0]} textAlign={'center'}>Lecture</ResponsiveText>
          </View>
    </View>

  )
}
export default Timetable_cardView;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.green
  },
  footer: {
    flex: 2,
    backgroundColor: colors.grey,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: hp(2),
    paddingHorizontal: 30
  },
  header: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.green
  },
  imageView: {
    height: hp(10),
    width: wp(12),
    resizeMode: 'contain',
    borderRadius: 5

  },
  name: {
    fontSize: hp(1.3),
    color: colors.green,
  }
});