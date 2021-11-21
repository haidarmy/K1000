import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors } from '../../utils/';
const InputField = ({
  textAlign,
  placeholder,
  label,
  hide,
  maxlength,
  keyboard = 'default',
  multiline = false,
  numberOfLines = 1,
  value,
  onChangeText,
  returnKeyType,
  paddingRight,
  autoCapitalize,
  disabled
}) => {
  const [border, setBorder] = useState(colors.white);
  const onFocusForm = () => {
    setBorder(colors.default);
  };
  const onBlurForm = () => {
   setBorder(colors.white);
 };
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      <TextInput
        textAlign={textAlign ? 'center' : 'left'}
        style={styles.textinput(border,paddingRight)}
        placeholder={placeholder}
        placeholderTextColor={colors.grey}
        secureTextEntry={hide}
        maxLength={maxlength}
        keyboardType={keyboard}
        multiline={multiline}
        numberOfLines={numberOfLines}
        textAlignVertical="top"
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocusForm}
        onBlur={onBlurForm}
        returnKeyType={returnKeyType}
        autoCapitalize={autoCapitalize}
        editable={!disabled}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  text: {
    fontSize: 18,
    fontWeight: 'normal',
    fontFamily: 'Poppins-Medium',
  },
  textinput: (border, paddingRight) => ({
    backgroundColor: colors.lightgrey,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 26,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 18,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    borderWidth: 2,
    borderColor: border,
    paddingRight: paddingRight
  }),
});

export default InputField;
