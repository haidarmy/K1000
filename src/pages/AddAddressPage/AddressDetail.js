import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {Gap, InputField, SubmitButton} from '../../components';
import {colors, showSucces, usePrevious} from '../../utils';
import { connect, useDispatch } from 'react-redux';
import { updateAddress } from '../../redux/action/ProfileAction';

const AddressDetail = ({address, longAddress, userData, updateAddressResult}) => {
  const [addressDetail, setAddressDetail] = useState('')
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const completeAddress = `${addressDetail}, ${longAddress}`
  console.log(completeAddress)
  const onSubmit = () => {
    dispatch(updateAddress(completeAddress, userData))
  }
  const prevUpdateAddressResult = usePrevious(updateAddressResult);
  useEffect(() => {
      if ((updateAddressResult!==false) && updateAddressResult !== prevUpdateAddressResult)
      {
        showSucces('Berhasil update alamat');
        navigation.replace("AddressPage")
    };
  }, [updateAddressResult]);
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>{address}</Text>
        <Gap height={16} />
      </View>

      <View>
        <InputField
          placeholder="Detail Alamat"
          label="Tulis No. Rumah, Blok, RT/RW, dll."
          value={addressDetail}
          onChangeText={(value) => setAddressDetail(value)}
        />
        <SubmitButton
          label="Pilih lokasi ini"
          onPress={onSubmit}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  updateAddressLoading: state.ProfileReducer.updateAddressLoading,
  updateAddressResult: state.ProfileReducer.updateAddressResult,
  updateAddressError: state.ProfileReducer.updateAddressError,
});


export default connect(mapStateToProps, null)(AddressDetail);

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
