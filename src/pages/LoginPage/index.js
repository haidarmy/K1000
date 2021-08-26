import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {colors, useForm, usePrevious, showError} from '../../utils';
import {InputField, SubmitButton} from '../../components';
import {IcEyeActive, IcEyeInactive} from '../../assets';
import {loginUser} from '../../redux/action/AuthAction';
import {connect, useDispatch} from 'react-redux';

const LoginPage = ({navigation, loginResult, loginLoading}) => {
  const dispatch = useDispatch();
  const [form, setForm] = useForm({
    email: '',
    password: '',
  });
  const onSubmit = () => {
    if (form.email && form.password) {
      // dispatch(setLoading(registerLoading));
      dispatch(loginUser(form.email, form.password));
      setForm('reset');
      // navigation.replace('MainApp');
    } else {
      showError('Pastikan semua kolom terisi!');
    }
  };
  const prevLoginResult = usePrevious(loginResult);
  useEffect(() => {
    console.log("User Data", loginResult)
    if ((loginResult!==false) && loginResult !== prevLoginResult) {
        navigation.replace('MainApp');
    }
  }, [loginResult]);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <View style={styles.input}>
          <InputField
            placeholder="Email"
            label="Email"
            value={form.email}
            onChangeText={value => setForm('email', value)}
          />
          <View style={{position: 'relative'}}>
            <InputField
              placeholder="Password"
              label="Password"
              hide={isSecureEntry}
              maxlength={16}
              value={form.password}
              onChangeText={value => setForm('password', value)}
            />
            <TouchableOpacity
              style={styles.eye}
              onPress={() => {
                setIsSecureEntry(toggle => !toggle);
              }}
              activeOpacity={1}>
              {!isSecureEntry ? <IcEyeActive /> : <IcEyeInactive />}
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttton}>
          <SubmitButton label="Masuk" onPress={onSubmit} />
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

const mapStateToProps = state => ({
  loginLoading: state.AuthReducer.loginResult,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(LoginPage);
