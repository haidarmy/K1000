import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BarcodeMask from 'react-native-barcode-mask';
import {RNCamera} from 'react-native-camera';
import {InputField, SubmitButton} from '../../components';
import {IcBack, IcBackDark, IcBarcode, IcFlash} from '../../assets';
import {colors, colorsDark, usePrevious} from '../../utils';
import {connect, useDispatch, useSelector} from 'react-redux';
import {updateStatusSale} from '../../redux/action/SellingAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {LogBox} from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const InputResiPage = ({navigation, route, updateStatusSellingResult}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const {data, type} = route.params;
  const [barcode, setBarcode] = useState('');
  const [isFlashOn, setFlashOn] = useState(false);
  const onBarCodeRead = scanResult => {
    setBarcode(scanResult.data);
  };

  const onGetItemPress = () => {
    dispatch(
      updateStatusSale(
        data.orderId,
        data.store.storeId,
        barcode,
        data.shipping,
      ),
    );
  };

  const prevUpdateStatusSellingResult = usePrevious(updateStatusSellingResult);
  useEffect(() => {
    if (
      updateStatusSellingResult !== false &&
      updateStatusSellingResult !== prevUpdateStatusSellingResult
    ) {
      navigation.replace('SuccessDeliveredOrder', {data, type, barcode});
    }
  }, [updateStatusSellingResult]);

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        translucent
        backgroundColor="rgba(0,0,0,0)"
        animated
      />
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
           {theme ?  <IcBackDark width={ms(24)} height={mvs(24)} /> :  <IcBack width={ms(24)} height={mvs(24)} />}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => setFlashOn(!isFlashOn)}
            activeOpacity={0.7}
            style={styles.navWrapper('right')}>
            <IcFlash fill={theme ? colorsDark.black : colors.black} width={ms(24)} height={mvs(24)} />
          </TouchableOpacity>
          <View style={styles.title}>
            <Text
              style={[
                styles.text('Poppins-Regular', s(32)),
                {lineHeight: vs(40)},
              ]}>
              Scan Barcode
            </Text>
            <Text style={styles.text()}>Scan Barcode pada nomor</Text>
            <Text style={styles.text()}>resi pengiriman</Text>
          </View>
          <BarcodeMask
            animatedLineWidth={ms(240)}
            lineAnimationDuration={1000}
            animatedLineHeight={mvs(3)}
            animatedLineColor={'#9C19E0'}
            edgeColor={'rgba(255,255,255, 0.25)'}
            width={ms(300)}
            height={mvs(100)}
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
              <IcBarcode fill={colors.grey} width={ms(24)} height={mvs(24)} />
            </View>
          </View>
          <SubmitButton label="Input Resi" onPress={onGetItemPress} />
        </KeyboardAvoidingView>
      </KeyboardAvoidingView>
    </>
  );
};

const mapStateToProps = state => ({
  updateStatusSellingLoading: state.SellingReducer.updateStatusSellingLoading,
  updateStatusSellingResult: state.SellingReducer.updateStatusSellingResult,
  updateStatusSellingError: state.SellingReducer.updateStatusSellingError,
});

export default connect(mapStateToProps, null)(InputResiPage);

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: StatusBar.currentHeight,
  },
  cameraContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(16),
    color = theme ? colorsDark.white : colors.white,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
    textAlign: 'center',
  }),
  navWrapper: position => ({
    zIndex: 1,
    width: ms(32),
    height: mvs(32),
    borderRadius: ms(16),
    position: 'absolute',
    top: StatusBar.currentHeight + mvs(10),
    [`${position}`]: ms(20),
    backgroundColor: theme ? colorsDark.whiteTranslucent : colors.whiteTranslucent,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  inputContainer: {
    width: '100%',
    height: '30%',
    backgroundColor: theme ? colorsDark.white : colors.white,
    paddingHorizontal: ms(30),
    paddingBottom: mvs(20),
    justifyContent: 'center',
  },
  title: {zIndex: 99, marginTop: mvs(-120), flex: 0.3},
  barcodeWrapper: {position: 'absolute', top: mvs(58, 0.7), left: ms(20)},
});
