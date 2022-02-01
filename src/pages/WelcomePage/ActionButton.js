import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ActionButton = ({bgColor, borderWidth, borderColor, txtcolor, label, onPress}) => {
    return (
        <View>
          <TouchableOpacity activeOpacity={0.7} style={{
              justifyContent:'center',
              backgroundColor:bgColor, 
              borderWidth:borderWidth, 
              borderColor:borderColor, 
              borderRadius:10, 
              width: scale(158), 
              height: verticalScale(58), 
            }}  onPress={onPress}  
            >
            <Text style={{
                fontSize:20, 
                color:txtcolor, 
                textAlign:'center',
                fontFamily:'Poppins-Medium'
                }}
            >
            {label}</Text>
          </TouchableOpacity>
        </View>
    )
}

export default ActionButton