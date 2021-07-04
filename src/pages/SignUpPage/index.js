import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils'
import { InputField, SubmitButton } from '../../components'
import { Eye, InactiveEye } from '../../assets'

const SignUpPage = ({navigation}) => {
const [isSecureEntry,setIsSecureEntry] = useState(true)
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <InputField 
                    label="Email" 
                    placeholder="Email"
                />
                <View style={{position: 'relative'}}>
                    <InputField 
                        placeholder="Password" 
                        label="Password" 
                        hide={isSecureEntry} 
                        maxlength={16}
                    />
                    <TouchableOpacity style={styles.eye} onPress={() => {setIsSecureEntry((toggle) => !toggle)}}>
                        {isSecureEntry ? <Eye/> : <InactiveEye/>}
                    </TouchableOpacity>
                </View>
                <View style={{position: 'relative'}}>
                    <InputField 
                        placeholder="Password Confirmation" 
                        label="Password Confirmation" 
                        hide={isSecureEntry} 
                        maxlength={16}/>
                    <TouchableOpacity style={styles.eye} onPress={() => {setIsSecureEntry((toggle) => !toggle)}}>
                        {isSecureEntry ? <Eye/> : <InactiveEye/>}
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 81, marginBottom: 32}}>
                    <SubmitButton label="Daftar" onPress={() => navigation.replace('HomePage')}/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{textAlign:'center', color:colors.grey}}>Sudah memiliki akun? </Text>
                    <Text style={{textAlign:'center', color:colors.default}} onPress={() => navigation.navigate('LoginPage')}>Masuk</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        backgroundColor: colors.white,
        flex: 1,
        padding: 24,
    },
    wrapper: {
        marginTop: 112,
        width: 335,
        height: 363
    },
    eye: {
        width: 24, 
        height: 24, 
        position: 'absolute', 
        top: 60, 
        right: 15
    }
})

export default SignUpPage;