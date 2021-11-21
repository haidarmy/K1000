import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors} from '../../utils';

const SubmitButton = ({
  height,
  disabled = false,
  label,
  onPress,
  buttonColor = colors.default,
  labelColor = colors.white,
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles.button(buttonColor, height)}
      onPress={onPress}
      activeOpacity={0.7}>
      <Text style={styles.text(labelColor)}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: (buttonColor, height = 58) => ({
    backgroundColor: buttonColor,
    borderRadius: 10,
    height: height,
    justifyContent: 'center',
    borderWidth: buttonColor === colors.grey ? 0 : buttonColor ? 2 : 0,
    borderColor:
      buttonColor === colors.grey ? null : buttonColor ? colors.default : null,
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
