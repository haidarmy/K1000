import React from 'react'
import { colors } from '../../utils'
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import { ProductCard } from '../../components'
import { ProductDummy1, ProductDummy2, ProductDummy3, ProductDummy4, ProductDummy5 } from '../../assets'

const Content = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.container}>
            <ProductCard image={ProductDummy1} name="Kerapu Cantang" price="Rp.80.000" weight="1000 g"/>
            <ProductCard image={ProductDummy2} name="Kepiting" price="Rp.120.000" weight="1000 g"/>
            <ProductCard image={ProductDummy3} name="Tuna" price="Rp.150.000" weight="1000 g"/>
            <ProductCard image={ProductDummy4} name="Lobster" price="Rp.240.000" weight="1000 g"/>
            <ProductCard image={ProductDummy5} name="Kakap" price="Rp.40.000" weight="1000 g"/>
        </ScrollView>
    )
}

const styles = ({
    container:{
        // height:698,
        paddingHorizontal: 28, 
        backgroundColor: colors.white, 
        flexDirection: 'row', 
        flexWrap: 'wrap', 
        justifyContent: 'space-between',
    }
})

export default Content