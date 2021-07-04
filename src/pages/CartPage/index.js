import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { colors } from '../../utils';
import { BottomNavigation } from '../../components'
import { Trash, Ikan } from '../../assets'

const CartPage = () => {
    return(
        <View style={styles.container}>
            <View style={{flex: 1}}>
                <Text style={{fontSize: 26, color: colors.black, fontWeight: 'bold', textAlign: 'center', paddingTop: 12, marginBottom: 12}}>Keranjang Saya</Text>
                <View style={{backgroundColor: colors.default, flex: 1}}>
                    <View style={{height: 144, backgroundColor: 'salmon', marginBottom: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, justifyContent: 'space-between'}}>
                        <View style={{width: 76, height: 76, backgroundColor: colors.white, borderRadius: 10}}></View>
                        <View style={{width: 156, height: 112, backgroundColor: 'mustard'}}>
                            <Text style={{fontSize: 20, marginBottom: 8}}>Kakap Putih</Text>
                            <Text style={{fontSize: 18, color: colors.default, marginBottom: 8}}>Rp40,000</Text>
                            <View style={{flexDirection: 'row', width: 100, height: 32, backgroundColor: 'red'}}>
                                <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', flex:1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: 'orange'}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={{flex:1, backgroundColor: colors.white}} keyboardType={'numeric'} textAlign='center'/>
                                <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', flex:1, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'orange'}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{width: 40, height: 40, backgroundColor: colors.white, borderRadius: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <Trash width={24} height={24}/>
                        </View>
                    </View>
                    <View style={{height: 144, backgroundColor: 'salmon', marginBottom: 16, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, justifyContent: 'space-between'}}>
                        <View style={{width: 76, height: 76, backgroundColor: colors.white, borderRadius: 10}}></View>
                        <View style={{width: 156, height: 112, backgroundColor: 'mustard'}}>
                            <Text style={{fontSize: 20, marginBottom: 8}}>Kakap Putih</Text>
                            <Text style={{fontSize: 18, color: colors.default, marginBottom: 8}}>Rp40,000</Text>
                            <View style={{flexDirection: 'row', width: 100, height: 32, backgroundColor: 'red'}}>
                                <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', flex:1, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, backgroundColor: 'orange'}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>-</Text>
                                </TouchableOpacity>
                                <TextInput style={{flex:1, backgroundColor: colors.white}} keyboardType={'numeric'} textAlign='center'/>
                                <TouchableOpacity style={{justifyContent: 'center', alignItems:'center', flex:1, borderTopRightRadius: 10, borderBottomRightRadius: 10, backgroundColor: 'orange'}}>
                                    <Text style={{fontSize: 18, fontWeight: 'bold'}}>+</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={{width: 40, height: 40, backgroundColor: colors.white, borderRadius: 40, justifyContent: 'center', alignItems: 'center'}}>
                            <Trash width={24} height={24}/>
                        </View>
                    </View>
                </View>
                <View style={{height: 67, backgroundColor: 'pink'}}>

                </View>
            </View>
            <View style={{height: 81, backgroundColor: colors.default}}>
                <BottomNavigation/>
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

export default CartPage;
