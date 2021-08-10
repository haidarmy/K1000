import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'
import {colors} from '../../utils/'
const InputField = ({placeholder, label, hide, maxlength, keyboard='default', multiline=false, numberOfLines=1}) => {
    return (
       <View>
         <Text style={styles.text}>{label}</Text>
         <TextInput style={styles.textinput}
            placeholder={placeholder}
            placeholderTextColor={colors.grey}
            secureTextEntry={hide}
            maxLength={maxlength}
            keyboardType={keyboard}
            multiline={multiline}
            numberOfLines={numberOfLines}
            textAlignVertical='top'
         />
       </View>
    )
}
const styles = StyleSheet.create({
      text: {
         fontSize:18,
         fontWeight: 'normal',
         fontFamily: 'Poppins-Medium'
      },
      textinput : {
         backgroundColor: colors.lightgrey,
         borderRadius: 10,
         marginTop: 16,
         marginBottom: 26,
         paddingVertical: 16,
         paddingHorizontal: 24,
         fontSize: 18,
         color: colors.black,
         fontFamily: 'Poppins-Regular'
     }
})

export default  InputField