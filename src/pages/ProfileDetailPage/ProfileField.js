import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const ProfileField = ({
  label,
  value,
  onPress,
  edit = false,
  disable,
  keyboardType = 'default',
  onChangeText,
  placeholder,
  maxLength,
  underline = 1,
  textInputMask,
}) => {
  const [press, setPress] = useState(false);
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.label}>{label}</Text>
          {!disable && (
            <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
              <Text style={styles.option}>
                {value.length < 1 && !press ? 'Atur Sekarang' : 'Ubah'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {textInputMask ? (
          <TextInputMask
            style={styles.value(underline, edit)}
            placeholder={placeholder}
            keyboardType={keyboardType}
            editable={edit}
            value={value}
            onPressIn={() => setPress(true)}
            onChangeText={onChangeText}
            mask={'+62 [000] [0000] [0000]'}
          />
        ) : (
          <TextInput
            editable={edit}
            style={styles.value(underline, edit)}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            onPressIn={() => setPress(true)}
            placeholder={placeholder}
            maxLength={maxLength}
          />
        )}
      </View>
    </View>
  );
};

export default ProfileField;

const getStyles = theme => StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'white'
  },
  label: {
    fontSize: ms(18),
    fontFamily: 'Poppins-Medium',
    color: theme ? colorsDark.black : colors.black,
    paddingLeft: ms(3),
  },
  value: (underline, edit) => ({
    fontSize: ms(18),
    fontFamily: 'Poppins-Regular',
    color: theme ? colorsDark.black : colors.black,
    borderBottomWidth: edit ? underline : 0,
    borderBottomColor: colors.default,
  }),
  option: {
    fontSize: ms(18),
    fontFamily: 'Poppins-Medium',
    color: colors.default,
  },
});
