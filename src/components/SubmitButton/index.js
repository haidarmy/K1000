import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../utils';

const SubmitButton = ({
  label,
  onPress,
  buttonColor = colors.default,
  labelColor = colors.white,
}) => {
  return (
    <TouchableOpacity
      style={styles.button(buttonColor)}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.text(labelColor)}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: buttonColor => ({
    backgroundColor: buttonColor,
    borderRadius: 10,
    height: 58,
    justifyContent: 'center',
    borderWidth: buttonColor ? 2 : 0,
    borderColor: buttonColor ? colors.default : null,
  }),

  text: labelColor => ({
    fontSize: 20,
    fontWeight: 'normal',
    color: labelColor,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  }),
});

export default SubmitButton;
