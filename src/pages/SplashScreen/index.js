import React, { useEffect } from 'react';
import { StatusBar, StyleSheet, Text, View } from 'react-native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import { ms, mvs } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';
import { IllLogo } from '../../assets';
import FIREBASE from '../../config/FIREBASE';
import { getWishlist } from '../../redux/action/WishlistAction';
import { colors } from '../../utils';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    changeNavigationBarColor('transparent', true)
    const unsubscribe = FIREBASE.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          dispatch(getWishlist(user.uid));
          navigation.replace('MainApp');
        } else {
          navigation.replace('WelcomePage');
        }
      }, 3000);
    });

    return () => {
      changeNavigationBarColor(colors.white, true)
      unsubscribe();
    };
  }, [navigation]);
  // useEffect(() => {
  //   hideNavigationBar();
  // }, [])
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor='rgba(0,0,0,0)' animated />
      <IllLogo width={ms(320)} height={mvs(320)}/>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: ms(32),
          color: 'white',
        }}>
        K-1000 Market
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: ms(24),
    backgroundColor: colors.default,
    // paddingTop: StatusBar.currentHeight,
  },
  illustration: {
    width: 342,
    height: 342,
  },
});

export default SplashScreen;
