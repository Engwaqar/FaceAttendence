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
import FastImage from 'react-native-fast-image';
import { hp ,wp} from '../helpers/Responsiveness';
import { colors } from '../constants/colorsPallet';
import { globalPath } from '../../constants/globalPath';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { color } from 'react-native-reanimated';
import { routeName } from '../../constants/routeName';
const Profile_CardView = (props) => {
    return (

        <View  >
            <View style={{padding:hp(2),flexDirection:'row',justifyContent:'space-between',}}>
            <Text style={{fontWeight:'500',color:colors.black}}>User Name</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.fullName}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>Registration</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.registrationNumber}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>Email</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.email}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>Gender</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.gender}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>DOB</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.dateofBirth}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>State Name</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.stateName}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>Country Name</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.countryName}</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>Status</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>Active</Text>
            </View>
            <View style={styles.profileinfo}>
            <Text style={{fontWeight:'500',color:colors.black}}>Parent Contact</Text>
            <Text style={{fontWeight:'300',color:colors.grey1}}>{props.data.parentContactNumber}</Text>
            </View>
        </View>
    );
};
export default Profile_CardView;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.green
    },
    footer: {
        flex: 0.9,
        backgroundColor: colors.grey,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: hp(2),
        paddingHorizontal: 30
    },
    header: {
        flex: 0.5,
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
    },
    boxView: {
        backgroundColor: colors.white,
        top:hp(-5),
        height: hp(60),
        elevation:1,
        width: wp(80),
        borderRadius: hp(3),
        alignSelf: 'center',
      position:'absolute'


    },
    profileinfo:{
        padding:hp(2),flexDirection:'row',borderTopWidth:hp(0.3),borderTopColor:colors.grey,justifyContent:'space-between'
    },
    
    profileImage:{
       
        borderRadius:hp(10),
        overflow: "hidden",
        borderWidth: hp(0.4),
        borderColor:colors.yellow,
        height:hp(13),
        width:wp(25),
    
    }
});