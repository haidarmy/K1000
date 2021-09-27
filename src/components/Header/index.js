import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcBack} from '../../assets';
import {colors} from '../../utils';

const Header = ({label, onPress}) => {
  return (
    <View style={styles.container}>
      {onPress && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <IcBack />
        </TouchableOpacity>
      )}
      <Text style={styles.textHeader}>{label}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    // marginBottom: 28,
  },
  textHeader: {
    fontSize: 26,
    fontFamily: 'Montserrat-Bold',
    color: colors.black,
    textAlign: 'center',
    flex: 1,
  },
});
