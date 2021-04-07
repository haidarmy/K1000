import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../../utils'
import { InputField, Button } from '../../components'

const SignUpPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <InputField label="Email" placeholder="Email"/>
                <InputField label="Password" placeholder="Password"/>
                <InputField label="Password Confirmation" placeholder="Password Confirmation"/>
                <View style={{marginTop:81}}>
                    <Button label="Daftar" onPress={() => navigation.replace('HomePage')}/>
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
    }
})

export default SignUpPage;