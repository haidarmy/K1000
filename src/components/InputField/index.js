import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {colors, colorsDark} from '../../utils/';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import CurrencyInput from 'react-native-currency-input';
import { useSelector } from 'react-redux';

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
  disabled,
  currencyMasked,
}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode)
  const [border, setBorder] = useState(theme ? colorsDark.white : colors.white);
  const styles = getStyles(theme);
  const onFocusForm = () => {
    setBorder(colors.default);
  };
  const onBlurForm = () => {
    setBorder(theme ? colorsDark.white : colors.white);
  };
  return (
    <View>
      <Text style={styles.text}>{label}</Text>
      {currencyMasked ? (
        <CurrencyInput
          value={value}
          onChangeValue={onChangeText}
          prefix="Rp "
          delimiter="."
          separator=","
          precision={0}
          textAlign={textAlign ? 'center' : 'left'}
          style={styles.textinput(border, paddingRight)}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          secureTextEntry={hide}
          maxLength={maxlength}
          keyboardType={keyboard}
          multiline={multiline}
          numberOfLines={numberOfLines}
          textAlignVertical="top"
          onFocus={onFocusForm}
          onBlur={onBlurForm}
          returnKeyType={returnKeyType}
          autoCapitalize={autoCapitalize}
          editable={!disabled}
          // onChangeText={onChangeText}
          //  onChangeText={(formattedValue) => {
          //    console.log(value); // $2,310.46
          //  }}
        />
      ) : (
        <TextInput
          textAlign={textAlign ? 'center' : 'left'}
          style={styles.textinput(border, paddingRight)}
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
      )}
    </View>
  );
};
const getStyles = theme => StyleSheet.create({
  text: {
    fontSize: ms(18),
    fontWeight: 'normal',
    fontFamily: 'Poppins-Medium',
    color: theme ? colorsDark.black : colors.black
  },
  textinput: (border, paddingRight) => ({
    backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    borderRadius: ms(10),
    marginTop: vs(16),
    marginBottom: vs(26),
    paddingVertical: vs(16),
    paddingHorizontal: s(24),
    fontSize: ms(18),
    color: theme ? colorsDark.black : colors.black,
    fontFamily: 'Poppins-Regular',
    borderWidth: ms(2),
    borderColor: border,
    paddingRight: paddingRight,
  }),
});

export default InputField;
