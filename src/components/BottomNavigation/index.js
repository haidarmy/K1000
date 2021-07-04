import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Home, Bag, Heart, User, Search, Filter, Swiper} from '../../assets'
import { colors } from '../../utils'

const BottomNavigation = () => {
    return (
        <View style={{height: 81, backgroundColor: colors.white, flexDirection:'row'}}>
                <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Home width={24} height={24}/>
                    <Text style={{fontSize: 14, color: colors.grey, marginTop: 3}}>Beranda</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <Bag width={24} height={24}/>
                    <Text style={{fontSize: 14, color: colors.grey, marginTop: 3}}>Keranjang</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1,  justifyContent:'center', alignItems:'center'}}>
                    <Heart width={24} height={24}/>
                    <Text style={{fontSize: 14, color: colors.grey, marginTop: 3}}>Wishlist</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                    <User width={24} height={24}/>
                    <Text style={{fontSize: 14, color: colors.grey, marginTop: 3}}>Pengguna</Text>
                </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({})

export default BottomNavigation

            