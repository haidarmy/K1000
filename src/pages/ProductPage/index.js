import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Bag, Heart, Back } from '../../assets';
import { SubmitButton } from '../../components';
import { colors } from '../../utils';

const ProductPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <View style={{width: undefined, height: 375, backgroundColor: colors.default}}>
                    <View style={{height: 24, paddingHorizontal: 32, justifyContent: 'space-between', flexDirection:'row', paddingTop: 24}}>
                        <TouchableOpacity onPress={() => navigation.navigate('HomePage')} style={{width: 24, height:24}}>
                            <Back width={24} height={24}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={{width: 24, height:24}}>
                            <Heart width={24} height={24}/>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{paddingHorizontal: 20, paddingTop: 35}}>
                <View style={{marginBottom: 20}}>
                    <Text style={{fontSize: 24, color: colors.black}}>Kakap putih</Text>
                    <Text style={{fontSize: 24, color: colors.default}}>Rp40,000</Text>
                    <Text style={{fontSize: 14, color: colors.grey}}>1000 g</Text>
                </View>
                <View>
                    <Text style={{fontSize: 20, color: colors.black}}>Description</Text>
                    <Text style={{fontSize: 16, color: colors.grey}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Tellus augue amet id et dui. Dictum malesuada rhonches</Text>
                </View>
                </View>
            </View>
            <View style={{height: 122, backgroundColor:colors.lightgrey}}>
                <View style={{paddingHorizontal: 20, paddingVertical:  32, justifyContent: 'space-between', flexDirection: 'row'}}>
                    <TouchableOpacity style={{width: 58, height: 58, backgroundColor: colors.white, borderRadius: 10, justifyContent:'center', alignItems: 'center'}}>
                        <Bag width={24} height={24} onPress={() => navigation.navigate('CartPage')}/>
                    </TouchableOpacity>
                    <View style={{height:58, width: 280}}>
                        <SubmitButton label="Tambah ke Keranjang"/>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        backgroundColor: colors.white,
        flex: 1
    }
})

export default ProductPage;