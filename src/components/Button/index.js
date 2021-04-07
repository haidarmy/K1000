import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import {colors} from '../../utils/'

const Button = ({label, onPress}) => {
    return (
       <TouchableOpacity style={styles.button} onPress={onPress}>
       <Text style={styles.text}>{label}</Text>
       </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.default,
        borderRadius: 10,
        width: 334,
        height: 58,
        justifyContent:'center'
    },
    text: {
        fontSize: 20,
        fontWeight: "normal",
        color:colors.white,
        textAlign: 'center'
    }
})

export default Button


