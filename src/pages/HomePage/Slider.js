import React from 'react'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { colors } from '../../utils'
import { Categories } from '../../components'

const  Slider = () => {
    return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
            <Categories label='Kerapu'/>
            <Categories label='Lobster'/>
            <Categories label='Kakap'/>
            <Categories label='Kepiting'/>
            <Categories label='Cumi'/>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height:35, 
        marginBottom: 24, 
        flexDirection: 'row', 
        justifyContent:'space-around'
    } 
})

export default Slider