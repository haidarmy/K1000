import React, { useEffect, useState } from 'react';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { ScaledSheet } from 'react-native-size-matters';
import { connect, useDispatch, useSelector } from 'react-redux';
import { IcEyeActive, IcEyeInactive } from '../../assets';
import { InputField, SubmitButton } from '../../components';
import { loginUser } from '../../redux/action/AuthAction';
import { colors, colorsDark, showError, useForm, usePrevious } from '../../utils';

const LoginPage = ({navigation, loginResult, loginLoading}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
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
    if ((loginResult!==false) && loginResult !== prevLoginResult) {
        navigation.replace('MainApp');
    }
  }, [loginResult]);
  const [isSecureEntry, setIsSecureEntry] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        {/* <View style={styles.input}> */}
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
        {/* </View> */}
        <View style={styles.button}>
          <SubmitButton label="Masuk" onPress={onSubmit} />
        </View>
        <View style={{flexDirection: 'row', justifyContent: 'center'}}>
          <Text
            style={styles.buttonText(colors.grey)}>
            Tidak memiliki akun?{' '}
          </Text>
          <Text
            style={styles.buttonText(colors.default)}
            onPress={() => navigation.navigate('SignUpPage')}>
            Daftar
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
    paddingTop: StatusBar.currentHeight
  },
  wrapper: {
    marginTop: '112@vs',
    width: '335@s',
    paddingHorizontal: '20@s',
    // height: verticalScale(363),
    // backgroundColor: 'yellow'
  },
  input: {
    // width: scale(335),
    // height: verticalScale(223),
    // backgroundColor: 'green'
  },
  button: {
    // width: scale(334),
    // height: verticalScale(58),
    marginTop: '82@vs',
    marginBottom: '32@vs',
  },
  buttonText: (color) =>  ({
    textAlign: 'center',
    color: color,
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
  }),
  eye: {
    width: '24@s',
    height: '24@vs',
    position: 'absolute',
    top: '62@vs',
    right: '15@s',
  },
});

const mapStateToProps = state => ({
  loginLoading: state.AuthReducer.loginLoading,
  loginResult: state.AuthReducer.loginResult,
  loginError: state.AuthReducer.loginError,
});

export default connect(mapStateToProps, null)(LoginPage);
