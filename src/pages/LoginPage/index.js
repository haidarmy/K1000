import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../../utils';
import { InputField, Button } from '../../components';

const LoginPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <View style={styles.input}>
                    <View>
                        <InputField placeholder="Email" label="Email"/>
                    </View>
                    <View>
                        <InputField placeholder="Password" label="Password"/>
                    </View>
                </View>
                <View style={styles.buttton}>
                    <Button label="Masuk" onPress={() => navigation.navigate('HomePage')}/>
                </View>
                <View style={{flexDirection:'row', justifyContent:'center'}}>
                    <Text style={{textAlign:'center', color:colors.grey}}>Tidak memiliki akun? </Text>
                    <Text style={{textAlign:'center', color:colors.default}} onPress={() => navigation.navigate('SignUpPage')}>Daftar</Text>
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
    input: {
       width: 335, 
       height: 223, 
    },
    buttton: {
        width: 334,
        height: 58,
        marginTop: 82,
        marginBottom: 32
    }
})

export default LoginPage;