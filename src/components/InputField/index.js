import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import {colors} from '../../utils/'
const InputField = ({placeholder, label, hide, maxlength}) => {
    return (
       <View>
         <Text style={styles.text}>{label}</Text>
         <TextInput style={styles.textinput}
            placeholder={placeholder}
            placeholderTextColor={colors.grey}
            secureTextEntry={hide}
            maxLength={maxlength}
         />
       </View>
    )
}
const styles = StyleSheet.create({
      text: {
         fontSize:18,
         fontWeight: 'normal'
      },
      textinput : {
         backgroundColor: colors.lightgrey,
         borderRadius: 10,
         marginTop: 16,
         marginBottom: 26,
         paddingVertical: 16,
         paddingHorizontal: 24,
         fontSize: 18,
         color: colors.black
     }
})

export default  InputField