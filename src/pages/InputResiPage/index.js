import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {InputField, SubmitButton} from '../../components';
import {IcBack, IcBarcode, IcFlash} from '../../assets';
import {colors, usePrevious} from '../../utils';
import {connect, useDispatch} from 'react-redux';
import {updateStatusSale} from '../../redux/action/SellingAction';

const InputResiPage = ({navigation, route, updateStatusSellingResult}) => {
  const dispatch = useDispatch();
  const {data, type} = route.params;
  const [barcode, setBarcode] = useState('');
  const [isFlashOn, setFlashOn] = useState(false);
  const onBarCodeRead = scanResult => {
    setBarcode(scanResult.data);
  };

  const onGetItemPress = () => {
    dispatch(updateStatusSale(data.orderId, data.store.storeId, barcode, data.shipping))
  };

  const prevUpdateStatusSellingResult = usePrevious(updateStatusSellingResult);
  useEffect(() => {
    if (updateStatusSellingResult !== false && updateStatusSellingResult !== prevUpdateStatusSellingResult) {
      navigation.replace('OrderDetailPage', {data, type, barcode});
    }
  }, [updateStatusSellingResult]);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <RNCamera
        style={styles.cameraContainer}
        onBarCodeRead={onBarCodeRead}
        flashMode={
          isFlashOn
            ? RNCamera.Constants.FlashMode.torch
            : RNCamera.Constants.FlashMode.off
        }>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.navWrapper('left')}
          onPress={() => navigation.goBack()}>
          <IcBack width={24} height={24} />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFlashOn(!isFlashOn)}
          activeOpacity={0.7}
          style={styles.navWrapper('right')}>
          <IcFlash fill={colors.black} width={24} height={24} />
        </TouchableOpacity>
        <View style={styles.title}>
          <Text style={[styles.text('Poppins-Regular', 32), {lineHeight: 40}]}>
            Scan Barcode
          </Text>
          <Text style={styles.text()}>Scan Barcode pada nomor</Text>
          <Text style={styles.text()}>resi pengiriman</Text>
        </View>
        <BarcodeMask
          animatedLineWidth={240}
          lineAnimationDuration={1000}
          animatedLineHeight={3}
          animatedLineColor={'#9C19E0'}
          edgeColor={'rgba(255,255,255, 0.25)'}
          width={300}
          height={100}
          showAnimatedLine={true}
          outerMaskOpacity={0.25}
        />
      </RNCamera>
      <KeyboardAvoidingView style={styles.inputContainer}>
        <View style={{justifyContent: 'center'}}>
          <InputField
            value={barcode}
            placeholder="Masukkan nomor resi"
            textAlign
            maxlength={20}
            onChangeText={value => setBarcode(value)}
          />
          <View style={styles.barcodeWrapper}>
            <IcBarcode fill={colors.grey} width={24} height={24} />
          </View>
        </View>
        <SubmitButton label="Input Resi" onPress={onGetItemPress} />
      </KeyboardAvoidingView>
    </KeyboardAvoidingView>
  );
};

const mapStateToProps = state => ({
  updateStatusSellingLoading: state.SellingReducer.updateStatusSellingLoading,
  updateStatusSellingResult: state.SellingReducer.updateStatusSellingResult,
  updateStatusSellingError: state.SellingReducer.updateStatusSellingError,
});

export default connect(mapStateToProps, null)(InputResiPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cameraContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 16,
    color = colors.white,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
    textAlign: 'center',
  }),
  navWrapper: position => ({
    zIndex: 1,
    width: 32,
    height: 32,
    borderRadius: 16,
    position: 'absolute',
    top: 20,
    [`${position}`]: 20,
    backgroundColor: 'rgba(255,255,255, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  inputContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: colors.white,
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  title: {zIndex: 99, marginTop: -120, flex: 0.3},
  barcodeWrapper: {position: 'absolute', top: 58, left: 20},
});
