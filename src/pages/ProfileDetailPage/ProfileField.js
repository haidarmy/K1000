import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useState} from 'react/cjs/react.development';
import {colors} from '../../utils';

const ProfileField = ({
  label,
  value,
  onPress,
  edit = false,
  disable,
  option,
  keyboardType = 'default',
  onChangeText,
  placeholder,
  maxLength
}) => {
  const [press, setPress] = useState(false);
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          editable={edit}
          style={styles.value}
          keyboardType={keyboardType}
          value={value}
          onChangeText={onChangeText}
          onPressIn={() => setPress(true)}
          placeholder={placeholder}
          maxLength={maxLength}
        />
      </View>
      {!disable && (
        <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
          <Text style={styles.option}>
            {value.length < 1 && !press
              ? 'Atur Sekarang'
              : option
              ? 'Simpan'
              : 'Ubah'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default ProfileField;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    paddingLeft: 3,
  },
  value: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: colors.black,
  },
  option: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.default,
  },
});
