import React, {useState} from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {IcClipboard, IcPin, IcProduct, IcShipping} from '../../assets';
import {Gap, Header, Number, OrderItem, SubmitButton} from '../../components';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const orderDetailPage = ({navigation, route}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const {data, type, url, barcode} = route.params;
  const [isTrimmed, setIsTrimmed] = useState(true);

  const trim = (text, count) => {
    if (text.length > count) {
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.text()}>
            {isTrimmed ? text.slice(0, count) : text}
          </Text>
          <Gap width={ms(3)} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsTrimmed(!isTrimmed)}>
            <Text
              style={styles.text('Poppins-SemiBold', ms(16), colors.default)}>
              ...
            </Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return <Text style={styles.text()}>{text}</Text>;
    }
  };
  const [copiedText, setCopiedText] = useState('');

  const copyToClipboard = (clip, type) => {
    Clipboard.setString(clip);
    snack(type);
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getString();
    setCopiedText(text);
  };

  const snack = type => {
    Snackbar.show({
      text: `${
        type === 'receipt' ? 'Nomor resi' : 'Alamat'
      } disalin ke clipboard Anda`,
      duration: Snackbar.LENGTH_SHORT,
      backgroundColor: colors.default,
      fontFamily: 'Poppins-Regular',
    });
  };

  const checkResi = () => {
    let text = data.shipping.expedition;
    if (text.includes('JNE')) {
      navigation.navigate('CheckResiPage', {
        web: 'https://www.jne.co.id/id/tracking/trace',
      });
    } else if (text.includes('POS')) {
      navigation.navigate('CheckResiPage', {
        web: 'https://www.posindonesia.co.id/id/tracking',
      });
    } else if (text.includes('TIKI')) {
      navigation.navigate('CheckResiPage', {
        web: 'https://www.tiki.id/id/tracking',
      });
    }
  };

  const transStatus = status => {
    if (status === 'pending') {
      return 'Menunggu Pembayaran';
    } else if (status === 'packed') {
      return 'Dikemas';
    } else if (status === 'shipped') {
      return 'Dikirim';
    } else if (status === 'finished') {
      return 'Selesai';
    }
  };
  return (
    <View style={styles.page}>
      <Header label="Detail Pesanan" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View style={styles.itemContainer}>
          <View style={{flexDirection: 'row'}}>
            <IcProduct fill={colors.default} width={ms(24)} height={mvs(24)} />
            <Text
              style={[
                styles.text('Poppins-SemiBold', ms(18)),
                styles.titleWrapper,
              ]}>
              Informasi Pesanan
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text()}>Status Pesanan</Text>
            <Text style={styles.text()}>{transStatus(data.status)}</Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text()}>Tanggal Pembelian</Text>
            <Text style={styles.text()}>{data.date}</Text>
          </View>
          {trim(data.orderId, 25)}
        </View>
        <View style={styles.itemContainer}>
          <View style={{flex: 1, marginBottom: mvs(20)}}>
            <View style={{flexDirection: 'row'}}>
              <IcShipping
                fill={colors.default}
                width={ms(24)}
                height={mvs(24)}
              />
              <Text
                style={[
                  styles.text('Poppins-SemiBold', ms(18)),
                  styles.titleWrapper,
                ]}>
                Informasi Pengiriman
              </Text>
              {data.shipping?.resi || barcode ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => checkResi()}>
                  <Text
                    style={styles.text(
                      'Poppins-SemiBold',
                      ms(18),
                      colors.default,
                    )}>
                    Lacak
                  </Text>
                </TouchableOpacity>
              ) : null}
            </View>
            <Text style={styles.text()}>{data.shipping.expedition}</Text>
            <Text style={styles.text()}>
              {data.shipping.service.split(' ')[0]}
            </Text>
            <Text style={styles.text()}>{data.shipping.estimate}</Text>
            {data.shipping?.resi || barcode ? (
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text style={styles.text()}>
                  {barcode ? barcode : data.shipping?.resi}
                </Text>
                <Gap width={5} />
                <TouchableOpacity
                  onPress={() =>
                    copyToClipboard(
                      barcode ? barcode : data.shipping?.resi,
                      'receipt',
                    )
                  }
                  activeOpacity={0.7}
                  style={styles.clipWrapper}>
                  <IcClipboard
                    fill={colors.default}
                    width={ms(20)}
                    height={mvs(20)}
                  />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <IcPin fill={colors.default} width={ms(24)} height={mvs(24)} />
              <Text
                style={[
                  styles.text('Poppins-SemiBold', ms(18)),
                  {flex: 1, marginBottom: mvs(10)},
                ]}>
                Alamat Pengiriman
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => copyToClipboard(data.user.address, 'address')}>
                <Text
                  style={styles.text(
                    'Poppins-SemiBold',
                    ms(18),
                    colors.default,
                  )}>
                  Salin
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text()}>{data.user.name}</Text>
              <Text style={styles.text()}> (0{data.user.number})</Text>
            </View>
            <Text style={styles.text()}>{data.user.address}</Text>
          </View>
        </View>
        <View style={styles.orderWrapper}>
          <View style={{paddingHorizontal: ms(20)}}>
            <OrderItem
              applyOnPress
              data={data}
              toko={data.store.storeName}
              tokoId={data.store.storeId}
              items={Object.values(data.order)}
              subTotal={data.subTotal}
              type={`${type} detail`}
              status={data.status}
              user={data.user}
              date={data.date}
            />
          </View>
        </View>
        <View style={styles.orderFooter}>
          <Text style={styles.text('Poppins-SemiBold', ms(18))}>
            Ringkasan Belanja
          </Text>
          <Gap height={mvs(10)} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text()}>Total Harga</Text>
            <Number
              number={parseInt(data.subTotal) - parseInt(data.shipping.cost)}
              textStyle={styles.text('Poppins-SemiBold')}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text()}>Total Ongkir</Text>
            <Number
              number={data.shipping.cost}
              textStyle={styles.text('Poppins-SemiBold')}
            />
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text('Poppins-SemiBold', ms(20))}>
              Total Pembayaran
            </Text>
            <Number
              number={data.subTotal}
              textStyle={styles.text('Poppins-Bold', ms(20), colors.default)}
            />
          </View>
          {data.status === 'pending' && type === 'order' ? (
            <View style={{paddingTop: mvs(20)}}>
              <SubmitButton
                label="Bayar"
                onPress={() => navigation.navigate('PaymentPage', {url})}
              />
            </View>
          ) : data.status === 'packed' &&
            type === 'selling' &&
            !data.shipping?.resi &&
            !barcode ? (
            <View style={{paddingTop: mvs(20)}}>
              <SubmitButton
                label="Kirim"
                onPress={() =>
                  navigation.navigate('InputResiPage', {data, type})
                }
              />
            </View>
          ) : data.status === 'shipped' && type === 'order' ? (
            <View style={{paddingTop: mvs(20)}}>
              <SubmitButton label="Diterima" />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default orderDetailPage;

const getStyles = theme =>
  StyleSheet.create({
    page: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    container: {
      flex: 1,
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    },
    clipWrapper: {
      width: ms(30),
      height: mvs(30),
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: mvs(-5),
    },
    itemContainer: {
      flex: 1,
      marginBottom: mvs(10),
      padding: vs(20),
      backgroundColor: theme ? colorsDark.white : colors.white,
    },
    text: (
      fontFamily = 'Poppins-Regular',
      fontSize = ms(16),
      color = theme ? colorsDark.black : colors.black,
    ) => ({
      fontFamily: fontFamily,
      fontSize: fontSize,
      color: color,
    }),
    titleWrapper: {flex: 1, marginBottom: mvs(10), marginLeft: ms(5)},
    orderWrapper: {
      flex: 1,
      marginBottom: mvs(10),
      backgroundColor: theme ? colorsDark.white : colors.white,
    },
    orderFooter: {
      flex: 1,
      padding: mvs(20),
      backgroundColor: theme ? colorsDark.white : colors.white,
    },
  });
