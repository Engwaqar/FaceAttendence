import React, { useEffect, version } from "react";

import {
    StyleSheet,
    Text,
    View,
    StatusBar,
    Image,
    ImageBackground,
    ScrollView
} from 'react-native';
import {Bounce } from 'react-native-animated-spinkit'
import { Circle } from "react-native-svg";

import { colors } from "../constants/colorsPallet";
export default function Loader(props) {
return(
<View 
 style={{
  position: "absolute",
  justifyContent:'center',
  alignItems:'center',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: "rgba(65, 65, 65, 0.5)",
  flex: 1,
}}
>
            <Bounce size={48} color={colors.blue1} />

          </View>
)


}