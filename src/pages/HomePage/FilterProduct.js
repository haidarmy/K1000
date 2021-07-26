import React from 'react'
import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import { colors } from '../../utils'
import { IcSwiper} from '../../assets'
import { SubmitButton, BottomNavigation, Categories } from '../../components';


const  FilterProduct = () => {
    return (
        <View style={styles.container}>
            <View style={styles.swiper}>   
            <IcSwiper width={50} height={6}/>
            </View>
            <View style={{height: 102, marginBottom: 24}}>
                <Text style={{marginBottom: 16, fontSize: 16, fontFamily:'Poppins-Medium'}}>Urutkan Berdasarkan</Text>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.sort}>
                    <Categories label="Terbaru"/>
                    <Categories label="Terpopuler"/>
                    <Categories label="Termurah"/>
                    <Categories label="Termahal"/>
                </ScrollView>
            </View>
            
            <View style={{height: 108, marginBottom: 50}}>
                <Text style={{marginBottom: 6, fontSize: 16, fontFamily: 'Poppins-Medium'}}>Rentang Harga</Text>
                <View style={styles.range.wrapper}>
                    <TextInput style={styles.range.input}
                        placeholder='Minimal'
                        placeholderTextColor={colors.grey}
                        textAlign='center'
                        keyboardType={'numeric'}   
                    />
                    <Text style={{fontSize: 32, marginBottom: 15}}>—</Text>
                    <TextInput style={styles.range.input}
                        placeholder='Maksimal'
                        placeholderTextColor={colors.grey}
                        textAlign='center'
                        keyboardType={'numeric'}
                        
                    />
                </View>
            </View>
            <SubmitButton label="Terapkan"/>
            </View>
    )
}

const styles = ({
    container: {
        height: 420, 
        backgroundColor: colors.white, 
        paddingHorizontal: 20, 
        paddingVertical: 16, 
        borderTopLeftRadius: 10, 
        borderTopRightRadius: 10
    },
    swiper: {
        alignItems: 'center', 
        justifyContent: 'flex-start', 
        marginBottom: 16
    },
    sort: {
        height:35, 
        marginBottom: 24, 
        flexDirection: 'row', 
        justifyContent:'space-around'
    },
    range: {
        wrapper: {
            flexDirection: 'row', 
            justifyContent:'space-between', 
            alignItems: 'center'
        },
        input: {
            width: 142, 
            height: 58, 
            backgroundColor: colors.lightgrey,
            borderRadius: 10,
            marginTop: 16,
            marginBottom: 26,
            paddingVertical: 16,
            paddingHorizontal: 24,
            fontSize: 18,
            fontFamily: 'Poppins-Regular'
        }
    }
   
})

export default FilterProduct
