import React from 'react';
import {View, Text, Image, StatusBar} from 'react-native';
import {colors} from '../../utils';
import {IllWelcomePage} from '../../assets';
import ActionButton from './ActionButton';
import {Loading} from '../../components';
import { showSucces } from '../../utils/showMessage';

const WelcomePage = ({navigation}) => {
  return (
    <>
      <View style={styles.wrapper.container}>
        {/* <StatusBar barStyle="dark-content" backgroundColor={colors.red} /> */}
        <IllWelcomePage width={331} height={258} />
        <View style={styles.wrapper.text}>
          <Text style={styles.text}>Temukan hasil laut dalam</Text>
          <Text style={styles.text}>genggaman tangan Anda</Text>
        </View>
        <View style={styles.wrapper.button}>
          <View style={{marginHorizontal: 16}}>
            <ActionButton
              bgColor={colors.default}
              borderWidth={0}
              borderColor={false}
              txtcolor={colors.white}
              label="Masuk"
              onPress={() => navigation.navigate('LoginPage')}
            />
          </View>
          <View style={{marginHorizontal: 16}}>
            <ActionButton
              bgColor={colors.white}
              borderWidth={2}
              borderColor={colors.default}
              txtcolor={colors.default}
              label="Daftar"
              onPress={() => navigation.navigate('SignUpPage')}
            />
          </View>
        </View>
      </View>
      {/* <Loading /> */}
    </>
  );
};

const styles = {
  wrapper: {
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.white,
      flex: 1,
      padding: 24,
    },
    illustration: {
      width: 331,
      height: 258,
      backgroundColor: 'purple',
    },
    text: {
      paddingHorizontal: 24,
      justifyContent: 'center',
      // width:335,
      // height:64,
      marginTop: 75,
    },
    button: {
      justifyContent: 'center',
      flexDirection: 'row',
      marginTop: 128,
    },
  },
  text: {
    color: colors.grey,
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
  },
};

export default WelcomePage;
