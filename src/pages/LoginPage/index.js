import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../utils';
import {InputField, SubmitButton} from '../../components';
import {IcEyeActive, IcEyeInactive} from '../../assets';

const LoginPage = ({navigation}) => {
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <InputField placeholder="Email" label="Email" />
          <View style={{position: 'relative'}}>
            <InputField
              placeholder="Password"
              label="Password"
              hide={isSecureEntry}
              maxlength={16}
            />
            <TouchableOpacity
              style={styles.eye}
              onPress={() => {
                setIsSecureEntry(toggle => !toggle);
              }}
              activeOpacity={1}>
              {isSecureEntry ? <IcEyeActive /> : <IcEyeInactive />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttton}>
          <SubmitButton
            label="Masuk"
            onPress={() => navigation.replace('MainApp')}
          />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.grey,
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
            }}>
            Tidak memiliki akun?{' '}
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: colors.default,
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
            }}
            onPress={() => navigation.navigate('SignUpPage')}>
            Daftar
          </Text>
        </View>
      </View>
    </View>
  );
};

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
    height: 363,
  },
  input: {
    width: 335,
    height: 223,
  },
  buttton: {
    width: 334,
    height: 58,
    marginTop: 82,
    marginBottom: 32,
  },
  eye: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 65,
    right: 15,
  },
});

export default LoginPage;
