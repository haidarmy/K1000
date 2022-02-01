import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';

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
  button: (buttonColor, height = mvs(58)) => ({
    backgroundColor: buttonColor,
    borderRadius: ms(10),
    height: height,
    justifyContent: 'center',
    borderWidth: buttonColor === colors.grey || buttonColor === colorsDark.grey? 0 : buttonColor ? 2 : 0,
    borderColor:
      buttonColor === colors.grey || buttonColor === colorsDark.grey? null : buttonColor ? colors.default : null,
  }),

  text: labelColor => ({
    fontSize: ms(20),
    color: labelColor,
    textAlign: 'center',
    fontFamily: 'Poppins-Medium',
  }),
});

export default SubmitButton;
