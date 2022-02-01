import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Alert,
} from 'react-native';
import {colors, colorsDark, showError, useForm, usePrevious} from '../../utils';
import {Gap, InputField, SubmitButton} from '../../components';
import {IcEyeActive, IcEyeInactive} from '../../assets';
import {registerUser} from '../../redux/action/AuthAction';
import {setLoading} from '../../redux/action/LoadingAction';
import {connect, useDispatch, useSelector} from 'react-redux';
import { ScaledSheet } from 'react-native-size-matters';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const SignUpPage = ({navigation, registerResult}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
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
            paddingRight={ms(50)}
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
            paddingRight={ms(50)}
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
        <View style={{marginTop: mvs(81), marginBottom: mvs(32)}}>
          <SubmitButton label="Daftar" onPress={onSubmit} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={styles.text(colors.grey)}>
            Sudah memiliki akun?
          </Text>
          <Gap width={ms(5)}/>
          <Text
            style={styles.text(colors.default)}
            onPress={() => navigation.navigate('LoginPage')}>
            Masuk
          </Text>
        </View>
      </View>
    </View>
  );
};

const getStyles = theme => ScaledSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: theme ? colorsDark.white : colors.white,
    flex: 1,
    padding: '24@msr',
    paddingTop: StatusBar.currentHeight,
  },
  wrapper: {
    // marginTop: 112,
    paddingTop: '20@vs',
    paddingHorizontal: '20@s',
    width: '335@s',
    height: '363@vs',
  },
  eye: {
    width: '24@s',
    height: '24@vs',
    position: 'absolute',
    top: '62@vs',
    right: '15@s',
  },
  text: (color) =>  ({
    textAlign: 'center',
    color: color,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  })
});

const mapStateToProps = state => ({
  registerLoading: state.AuthReducer.registerLoading,
  registerResult: state.AuthReducer.registerResult,
  registerError: state.AuthReducer.registerError,
});

export default connect(mapStateToProps, null)(SignUpPage);
