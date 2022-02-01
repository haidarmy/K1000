import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Gap, InputField, SubmitButton} from '../../components';
import {
  colors,
  colorsDark,
  getData,
  showSucces,
  storeData,
  usePrevious,
} from '../../utils';
import {connect, useDispatch, useSelector} from 'react-redux';
import {updateAddress} from '../../redux/action/ProfileAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const AddressDetail = ({
  address,
  longAddress,
  userData,
  updateAddressResult,
  loading,
  params,
}) => {
  const [addressDetail, setAddressDetail] = useState('');
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const completeAddress = addressDetail
    ? `${addressDetail}, ${longAddress}`
    : `${longAddress}`;
  console.log(completeAddress);
  const onSubmit = () => {
    dispatch(updateAddress(completeAddress, userData));
    getData('user').then(res => {
      storeData('user', {...res, address: completeAddress});
    });
  };
  const prevUpdateAddressResult = usePrevious(updateAddressResult);
  useEffect(() => {
    if (
      updateAddressResult !== false &&
      updateAddressResult !== prevUpdateAddressResult
    ) {
      showSucces('Berhasil update alamat');
      if (params?.originPage) {
        navigation.replace(params?.originPage, {
          getCartResult: params?.getCartResult,
        });
      } else {
        navigation.replace('AddressPage');
      }
    }
  }, [updateAddressResult]);
  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}>
            <View
              style={{height: mvs(20), width: '90%', borderRadius: ms(5)}}
            />
          </SkeletonPlaceholder>
          <Gap height={mvs(10)} />
          <SkeletonPlaceholder
            backgroundColor={theme ? colorsDark.grey : '#DDDDDD'}
            highlightColor={theme ? colors.grey : '#F2F8FC'}>
            <View
              style={{height: mvs(20), width: '60%', borderRadius: ms(5)}}
            />
          </SkeletonPlaceholder>
        </View>
      ) : (
        <>
          <View>
            <Text style={styles.text}>{address}</Text>
            <Gap height={mvs(16)} />
          </View>
          <View>
            <InputField
              placeholder="Detail Alamat"
              label="Tulis No. Rumah, Blok, RT/RW, dll."
              value={addressDetail}
              onChangeText={value => setAddressDetail(value)}
            />
            <SubmitButton label="Pilih lokasi ini" onPress={onSubmit} />
          </View>
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  updateAddressLoading: state.ProfileReducer.updateAddressLoading,
  updateAddressResult: state.ProfileReducer.updateAddressResult,
  updateAddressError: state.ProfileReducer.updateAddressError,
});

export default connect(mapStateToProps, null)(AddressDetail);

const getStyles = theme =>
  StyleSheet.create({
    container: {
      padding: ms(20),
      paddingBottom: mvs(20),
      // height: '40%',
      backgroundColor: theme ? colorsDark.white : colors.white,
      justifyContent: 'space-between',
    },
    text: {
      fontFamily: 'Poppins-Regular',
      fontSize: ms(18),
      color: colors.default,
    },
  });
