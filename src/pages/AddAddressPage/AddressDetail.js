import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Gap, InputField, SubmitButton} from '../../components';
import {colors} from '../../utils';

const AddressDetail = ({alamat}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{alamat}</Text>
        <Gap height={16} />
      </View>

      <View>
        <InputField
          placeholder="Detail Alamat"
          label="Tulis No. Rumah, Blok, RT/RW, dll."
        />
        <SubmitButton
          label="Pilih lokasi ini"
          onPress={() => navigation.replace('AddressPage')}
        />
      </View>
    </View>
  );
};

export default AddressDetail;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    height: '40%',
    backgroundColor: colors.white,
    justifyContent: 'space-between',
  },
  text: {
    fontFamily: 'Poppins-Regular',
    fontSize: 18,
    color: colors.default,
  },
});
