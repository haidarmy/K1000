import React from 'react';
import {View, Text, Image, StatusBar, Dimensions} from 'react-native';
import {colors, colorsDark} from '../../utils';
import {IllWelcomePage} from '../../assets';
import ActionButton from './ActionButton';
import {Loading} from '../../components';
import { showSucces } from '../../utils/showMessage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const WelcomePage = ({navigation}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <>
      <View style={styles.wrapper.container}>
        {/* <StatusBar barStyle="dark-content" backgroundColor={colors.red} /> */}
        <IllWelcomePage width={scale(331)} height={verticalScale(258)} />
        <View style={styles.wrapper.text}>
          <Text style={styles.text}>Temukan hasil laut dalam</Text>
          <Text style={styles.text}>genggaman tangan Anda</Text>
        </View>
        <View style={styles.wrapper.button}>
            <ActionButton
              bgColor={colors.default}
              borderWidth={0}
              borderColor={false}
              txtcolor={colors.white}
              label="Masuk"
              onPress={() => navigation.navigate('LoginPage')}
            />
            <ActionButton
              bgColor={theme ? colorsDark.white : colors.white}
              borderWidth={2}
              borderColor={colors.default}
              txtcolor={colors.default}
              label="Daftar"
              onPress={() => navigation.navigate('SignUpPage')}
            />
        </View>
      </View>
      {/* <Loading /> */}
    </>
  );
};

const getStyles = theme => ({
  wrapper: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme ? colorsDark.white : colors.white,
      flex: 1,
      padding: scale(20),
      paddingTop: StatusBar.currentHeight
    },
    illustration: {
      width: scale(331),
      height: verticalScale(258),
      backgroundColor: 'purple',
    },
    text: {
      paddingHorizontal: scale(24),
      justifyContent: 'center',
      // width:335,
      // height:64,
      marginTop: verticalScale(75),
    },
    button: {
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: verticalScale(128),
      paddingHorizontal: '4%',
      width: Dimensions.get('screen').width
    },
  },
  text: {
    color: colors.grey,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: moderateScale(18),
  },
});

export default WelcomePage;
