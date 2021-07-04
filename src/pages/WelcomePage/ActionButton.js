import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const ActionButton = ({bgColor, borderWidth, borderColor, txtcolor, label, onPress}) => {
    return (
        <View>
          <TouchableOpacity style={{
              justifyContent:'center',
              backgroundColor:bgColor, 
              borderWidth:borderWidth, 
              borderColor:borderColor, 
              borderRadius:10, 
              width:158, 
              height:58, 
            }}  onPress={onPress}  
            >
            <Text style={{
                fontSize:20, 
                color:txtcolor, 
                textAlign:'center'
                }}
            >
            {label}</Text>
          </TouchableOpacity>
        </View>
    )
}

export default ActionButton