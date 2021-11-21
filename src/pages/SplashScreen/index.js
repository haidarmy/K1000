import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import { useDispatch } from 'react-redux';
import FIREBASE from '../../config/FIREBASE';
import { getWishlist } from '../../redux/action/WishlistAction';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch()
  useEffect(() => {
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

    return () => unsubscribe();
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Splash</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    padding: 24,
    backgroundColor: 'white',
  },
  illustration: {
    width: 342,
    height: 342,
  },
});

export default SplashScreen;
