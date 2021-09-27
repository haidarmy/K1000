import React, {useEffect} from 'react';
import {View, Text, Image, StyleSheet} from 'react-native';
import FIREBASE from '../../config/FIREBASE';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    const unsubscribe = FIREBASE.auth().onAuthStateChanged(user => {
      setTimeout(() => {
        if (user) {
          navigation.replace('MainApp');
          console.log('LOGIIIIN BANG');
        } else {
          navigation.replace('WelcomePage');
          console.log('LOGOUTTT');
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
