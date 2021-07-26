import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { useState } from 'react/cjs/react.development'
import {colors} from '../../utils/'

const Categories = ({label}) => {
    const [isBackground, setIsBackground] = useState(false)
    return (
        <View>
            <TouchableOpacity style={isBackground? styles.wrapper('rgba(53, 104, 255,0.15)') : styles.wrapper()} activeOpacity={0.7} onPress={() => {setIsBackground(toggle => !toggle)}}>
                <Text style={styles.text(isBackground)}>{label}</Text>
            </TouchableOpacity>
        </View>
    )
    
}

const styles = StyleSheet.create({
    wrapper:(background) => ({
        borderRadius: 12,
        padding: 5, 
        paddingHorizontal:6,
        marginRight: 24,  
        maxWidth:'auto', 
        alignItems: 'center', 
        justifyContent:'center',
        backgroundColor: background
    }) ,
    text: (isBackground) => ({
        color: isBackground ? colors.default : colors.grey, 
        fontSize: 18,
        fontFamily: 'Poppins-SemiBold'
    })
})

export default Categories
