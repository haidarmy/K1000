import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SplashScreen = ({navigation}) => {
    useEffect(() => {
       setTimeout(() => {
         navigation.replace('WelcomePage')  
       }, 3000)
    })
    return (
        <View style={styles.container}>
          <Text>Splash</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
      padding: 24,
      backgroundColor: 'white'
    },
    illustration: {
      width: 342,
      height: 342,
    }
  })
    
export default SplashScreen;