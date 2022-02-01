import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack, IcBackDark} from '../../assets';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const Header = ({label, onPress}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
         {theme ? <IcBackDark/> : <IcBack/>}
        </TouchableOpacity>
      )}
      <Text style={styles.textHeader}>{label}</Text>
    </View>
  );
};

export default Header;

const getStyles = theme => StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: vs(12),
    backgroundColor: theme ? colorsDark.white : colors.white
    // marginBottom: 28,
  },
  textHeader: {
    fontSize: ms(24),
    fontFamily: 'Poppins-Bold',
    color: theme ? colorsDark.black : colors.black,
    textAlign: 'center',
    flex: 1,
  },
});
