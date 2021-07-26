import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { colors } from '../../utils'
import { IcSearch, IcFilter, IcClose} from '../../assets'
import { ProductCard } from '../../components'

const SearchBar = ({onPress}) => {
    const [input, setInput] = useState('')
    return (
        <View style={styles.wrapper}>
            <View style={styles.box}>
                <IcSearch width={24} height={24} style={{position: 'absolute', top: 16, left: 24}}/>
                <TextInput style={styles.input} placeholder="Cari" value={input} onChangeText={ value => setInput(value) }/>
                <TouchableOpacity onPress={() => setInput('')} activeOpacity={0.7} style={{width: 30, height: 30, position: 'absolute', top: 14, right: 20, justifyContent: 'center', alignItems: 'center'}}>
                    {input ? <IcClose width={24} height={24}/> : null}
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={onPress} style={styles.filter} activeOpacity={0.7}>
                <IcFilter width={24} height={24}/>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapper:{
        flexDirection:'row', 
        justifyContent:'flex-start', 
        alignItems:'center', 
        backgroundColor: colors.white, 
        height:58, 
        marginBottom: 24
    },
    box: {
        flex:1, 
        position: 'relative',
        backgroundColor: colors.lightgrey, 
        marginRight: 16, 
        borderRadius: 10,
    },
    input: {
        paddingLeft: 54,
        paddingRight: 55, 
        fontSize: 18, 
        color: colors.grey, 
        alignItems: 'center', 
        height: 60,
        fontFamily:'Poppins-Regular'
    },
    filter: {
        alignItems:'center', 
        justifyContent: 'center', 
        width: 56, 
        height: 56, 
        backgroundColor: colors.default, 
        borderRadius: 10
    }
})

export default SearchBar
