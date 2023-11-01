import React, { useEffect } from "react";
import {
    StyleSheet,
    View,
    ImageBackground,
    Image,
    Platform,
} from "react-native";
import { hp, wp } from "../../../helpers/Responsiveness";
import { colors } from "../../../constants/colorsPallet";
import { loginUser } from "../../../redux/actions/user.actions";
import { useDispatch, useSelector } from "react-redux";
import ResponsiveText from "../../../components/RnText";
import DropDown from "../../../components/DropDown";
import Input from "../../../components/Input";
import { globalPath } from "../../../constants/globalPath";
import RnButton from "../../../components/RnButton";
import Api from "../../../redux/lib/api";
import urls from "../../../redux/lib/urls";
import Fonts from "../../../helpers/Fonts";
import Loader from "../../../components/loader";
import AsyncStorage from "@react-native-community/async-storage";
import { routeName } from "../../../constants/routeName";
import { _toast } from "../../../constants/Index";
const ChangePassword = ({ navigation }) => {

    const [errorString, setErrorString] = React.useState("");
    const [loading, setLoading] = React.useState("");
    const [NewPassword, setNewPassword] = React.useState("");
    const [ConfirmPassword, setConfirmPassword] = React.useState("");

    const Submit = async () => {
        // const confirmPwd = NewPassword === ConfirmPassword;
        if (NewPassword == "") {
            setErrorString("Please enter password");
            return false;
        } else if (ConfirmPassword == "") {
            setErrorString("Confirm Passwors is Required");
            return false;
        } else if (NewPassword != ConfirmPassword) {
            setErrorString("Password and confirm password must be same");
            return false;
        }
        var obj = {
            "password": NewPassword,
        }
        console.log('obj', obj)
        try {
            setLoading(true);
            const res = await Api.post(urls.CHANGE_PASSWORD, obj);
            console.log("CHANGE_PASSWORD res", res);
            if (res.success == true) {
                setLoading(false);
                _toast(res.message);
                // console.log("Navigating to dashboard screen");
                navigation.goBack()
            } else {
                _toast(res.message);
                setLoading(false);
            }
        } catch (error) {
            setErrorString(error.toString());
            setLoading(false);
        }
    };
    function removeEmojis(string) {
        var regex = /(?:[\u2700-\u27bf]|(?:\ud83c[\udde6-\uddff]){2}|[\ud800-\udbff][\udc00-\udfff]|[\u0023-\u0039]\ufe0f?\u20e3|\u3299|\u3297|\u303d|\u3030|\u24c2|\ud83c[\udd70-\udd71]|\ud83c[\udd7e-\udd7f]|\ud83c\udd8e|\ud83c[\udd91-\udd9a]|\ud83c[\udde6-\uddff]|\ud83c[\ude01-\ude02]|\ud83c\ude1a|\ud83c\ude2f|\ud83c[\ude32-\ude3a]|\ud83c[\ude50-\ude51]|\u203c|\u2049|[\u25aa-\u25ab]|\u25b6|\u25c0|[\u25fb-\u25fe]|\u00a9|\u00ae|\u2122|\u2139|\ud83c\udc04|[\u2600-\u26FF]|\u2b05|\u2b06|\u2b07|\u2b1b|\u2b1c|\u2b50|\u2b55|\u231a|\u231b|\u2328|\u23cf|[\u23e9-\u23f3]|[\u23f8-\u23fa]|\ud83c\udccf|\u2934|\u2935|[\u2190-\u21ff])/g;
        return string.replace(regex, '');
    }
    return (
        <View style={styles.container}>

            <ImageBackground
                // source={globalPath.background}
                resizeMode="cover"
                style={styles.image}
            >

                <View style={{ marginHorizontal: wp(0) }}>
                    <View style={styles.screeninfo}>
                        <Image style={styles.logo} source={globalPath.logo} />
                    </View>
                    <View style={{ backgroundColor: colors.blue1, flex: 1 }}>
                        <View style={styles.footer}>
                            <ResponsiveText
                                margin={[20, 0, 0, 30]}
                                fontFamily={Fonts.Bold}
                                size={8}
                                color={colors.blue1}
                            >
                                Change Password
                            </ResponsiveText>
                            <ResponsiveText
                                margin={[0, 0, 0, 30]}
                                fontFamily={Fonts.Bold}
                                size={3.5}
                                color={colors.grey1}
                            >
                                Enter your new password for Reset Password.
                            </ResponsiveText>
                            <View style={{ marginTop: hp(5), marginHorizontal: wp(5) }}>
                                <Input
                                    placeholder={"New Password"}
                                    value={removeEmojis(NewPassword)}
                                    width={wp(90)}
                                    height={hp(6.5)}
                                    padding={[0, 0, 0, 25]}
                                    margin={[20, 0, 5, 0]}
                                    secureTextEntry
                                    // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    onChnageText={(text) => setNewPassword(text)}
                                    leftIcon={globalPath.Lock}
                                />
                                <Input
                                    placeholder={"Confirm Password"}
                                    value={removeEmojis(ConfirmPassword)}
                                    width={wp(90)}
                                    height={hp(6.5)}
                                    padding={[0, 0, 0, 25]}
                                    margin={[20, 0, 5, 0]}
                                    secureTextEntry
                                    // keyboardType={Platform.OS === 'ios' ? 'ascii-capable' : 'visible-password'}
                                    onChnageText={(text) => setConfirmPassword(text)}
                                    leftIcon={globalPath.Lock}
                                />
                                <ResponsiveText color={colors.red} margin={[20, 0, 0, 10]}>{errorString}</ResponsiveText>
                                <RnButton
                                    backgroundColor={colors.blue1}
                                    margin={[50, 0, 0, 0]}
                                    title={"Reset Password"}
                                    onPress={() => Submit()}
                                // onPress={()=>navigation.navigate(routeName.BOTTOM_TABS)}
                                />

                            </View>

                        </View>

                    </View>

                </View>
                {loading ?
                    <Loader />
                    :
                    undefined
                }
            </ImageBackground>

        </View>
    );
};
export default ChangePassword;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    footer: {
        flex: 1,
        backgroundColor: colors.grey,
        // borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        // alignItems: 'center'
        // marginTop:hp(0.5)
    },
    image: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    screeninfo: {
        flex: 0.4,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.blue1,
        borderBottomLeftRadius: 35,
    },
    logo: {
        height: hp(20),
        width: wp(40),
        resizeMode: "contain",
        // marginBottom: 20,
        alignItems: "center",
    },
});
