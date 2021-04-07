import React from 'react';
import { View, Text, Image } from 'react-native';
import { colors } from '../../utils';
import { WelcomePageIllustration } from '../../assets'
import ActionButton from './ActionButton'


const WelcomePage = ({navigation}) => {
    return (
        <View style={styles.wrapper.container}>
               <Image source={WelcomePageIllustration} style={styles.wrapper.illustration}></Image>
           <View style={styles.wrapper.text}>
               <Text style={styles.text}>Temukan hasil laut dalam genggaman tangan Anda </Text>
           </View>
           <View style={styles.wrapper.button}>
               <View style={{ marginHorizontal:16 }}>
                   <ActionButton 
                     bgColor={colors.default} 
                     borderWidth={0} 
                     borderColor={false} 
                     txtcolor={colors.white}
                     label="Masuk"
                     onPress={() => navigation.navigate('LoginPage')}
                    />
               </View>
               <View style={{ marginHorizontal:16 }}>
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
    )
}

const styles = ({
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
            backgroundColor: 'purple'
          },
        text: {
            paddingHorizontal:24,
            justifyContent:'center', 
            width:335, 
            height:64, 
            marginTop:75
        },
        button: {
            justifyContent:'center',
            flexDirection:'row', 
            marginTop:128
        }
    },
    text: {
        fontSize:18, 
        color:colors.grey, 
        textAlign:'center'
    }
  })

export default WelcomePage;