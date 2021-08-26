import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {colors, showError, useForm, usePrevious} from '../../utils';
import {InputField, SubmitButton} from '../../components';
import {IcEyeActive, IcEyeInactive} from '../../assets';
import {registerUser} from '../../redux/action/AuthAction';
import {setLoading} from '../../redux/action/LoadingAction';
import {connect, useDispatch} from 'react-redux';

const SignUpPage = ({navigation, registerResult}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    email: '',
    password: '',
    passwordConfirm: '',
  });

  const onSubmit = () => {
    if (
      form.password !== form.passwordConfirm &&
      form.password !== '' &&
      form.passwordConfirm !== ''
    ) {
      showError(
        'Pastikan kolom password confirmation yang dimasukkan sama dengan kolom password!',
      );
    } else if (form.email && form.password && form.passwordConfirm) {
      dispatch(registerUser(form));
      setForm('reset');
    } else {
      showError('Pastikan semua kolom terisi!');
    }
  };
  const prevRegisterResult = usePrevious(registerResult);
  useEffect(() => {
    if ((registerResult!==false) && registerResult !== prevRegisterResult) {
      navigation.replace('MainApp');
  }
  }, [registerResult]);

  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle="dark-content" backgroundColor={colors.white} /> */}
      <View style={styles.wrapper}>
        <InputField
          label="Email"
          placeholder="Email"
          value={form.email}
          onChangeText={value => setForm('email', value)}
          keyboard="email-address"
          autoCapitalize="none"
        />
        <View style={{position: 'relative'}}>
          <InputField
            placeholder="Password"
            label="Password"
            hide={isSecureEntry}
            value={form.password}
            onChangeText={value => setForm('password', value)}
            paddingRight={50}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.eye}
            onPress={() => {
              setIsSecureEntry(toggle => !toggle);
            }}>
            {!isSecureEntry ? <IcEyeActive /> : <IcEyeInactive />}
          </TouchableOpacity>
        </View>
        <View style={{position: 'relative'}}>
          <InputField
            placeholder="Password Confirmation"
            label="Password Confirmation"
            hide={isSecureEntry}
            paddingRight={50}
            value={form.passwordConfirm}
            onChangeText={value => setForm('passwordConfirm', value)}
          />
          <TouchableOpacity
            activeOpacity={1}
            style={styles.eye}
            onPress={() => {
              setIsSecureEntry(toggle => !toggle);
            }}>
            {!isSecureEntry ? <IcEyeActive /> : <IcEyeInactive />}
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 81, marginBottom: 32}}>
          <SubmitButton label="Daftar" onPress={onSubmit} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={{
              textAlign: 'center',
              color: colors.grey,
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
            }}>
            Sudah memiliki akun?
          </Text>
          <Text
            style={{
              textAlign: 'center',
              color: colors.default,
              fontFamily: 'Poppins-Medium',
              fontSize: 14,
            }}
            onPress={() => navigation.navigate('LoginPage')}>
            Masuk
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
  eye: {
    width: 24,
    height: 24,
    position: 'absolute',
    top: 65,
    right: 15,
  },
});

const mapStateToProps = state => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStateToProps, null)(SignUpPage);
