import React, {useState} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {IcClipboard, IcPin, IcProduct, IcShipping} from '../../assets';
import {Gap, Header, OrderItem, SubmitButton} from '../../components';
import Clipboard from '@react-native-clipboard/clipboard';
import Snackbar from 'react-native-snackbar';
import {colors} from '../../utils';

const orderDetailPage = ({navigation, route}) => {
  const {data, type, url, barcode} = route.params;
  const [isTrimmed, setIsTrimmed] = useState(true);

  const trim = (text, count) => {
    if (text.length > count) {
      return (
        <View style={{flexDirection: 'row', flexWrap: 'wrap'}}>
          <Text style={styles.text()}>
            {isTrimmed ? text.slice(0, count) : text}
          </Text>
          <Gap width={3} />
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setIsTrimmed(!isTrimmed)}>
            <Text style={styles.text('Poppins-SemiBold', 16, colors.default)}>
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
    let text = data.shipping.expedition
    if(text.includes('JNE')){
      navigation.navigate('CheckResiPage', {web:'https://www.jne.co.id/id/tracking/trace'})
    }
    else if(text.includes('POS')){
      navigation.navigate('CheckResiPage', {web:'https://www.posindonesia.co.id/id/tracking'})
    }
    else if(text.includes('TIKI')){
      navigation.navigate('CheckResiPage', {web:'https://www.tiki.id/id/tracking'})
    }
  }

  const transStatus = (status) => {
    if(status === 'pending'){
      return 'Menunggu Pembayaran'
    }
    else if(status === 'packed'){
      return 'Dikemas'
    }
    else if(status === 'shipped'){
      return 'Dikirim'
    }
    else if(status === 'finished'){
      return 'Selesai'
    }
  }
  return (
    <View style={{backgroundColor: colors.white, flex: 1}}>
      <Header label="Detail Pesanan" onPress={() => navigation.goBack()} />
      <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
        <View
          style={{
            flex: 1,
            marginBottom: 15,
            padding: 20,
            backgroundColor: colors.white,
          }}>
          <View style={{flexDirection: 'row'}}>
            <IcProduct fill={colors.default} width3={24} height={24} />
            <Text
              style={[
                styles.text('Poppins-SemiBold', 18),
                {flex: 1, marginBottom: 10, marginLeft: 5},
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
        <View
          style={{
            flex: 1,
            marginBottom: 15,
            padding: 20,
            backgroundColor: colors.white,
          }}>
          <View style={{flex: 1, marginBottom: 20}}>
            <View style={{flexDirection: 'row'}}>
              <IcShipping fill={colors.default} width3={24} height={24} />
              <Text
                style={[
                  styles.text('Poppins-SemiBold', 18),
                  {flex: 1, marginBottom: 10, marginLeft: 5},
                ]}>
                Informasi Pengiriman
              </Text>
              {data.shipping?.resi || barcode ? (
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => checkResi()}
                  >
                  <Text
                    style={styles.text('Poppins-SemiBold', 18, colors.default)}>
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
                  style={{
                    width: 30,
                    height: 30,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: -5,
                  }}>
                  <IcClipboard fill={colors.default} width={20} height={20} />
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <View style={{flex: 1}}>
            <View style={{flexDirection: 'row'}}>
              <IcPin fill={colors.default} width={24} height={24} />
              <Text
                style={[
                  styles.text('Poppins-SemiBold', 18),
                  {flex: 1, marginBottom: 10},
                ]}>
                Alamat Pengiriman
              </Text>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => copyToClipboard(data.user.address, 'address')}>
                <Text
                  style={styles.text('Poppins-SemiBold', 18, colors.default)}>
                  Salin
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={styles.text()}>{data.user.name}</Text>
              <Text style={styles.text()}> ({data.user.number})</Text>
            </View>
            <Text style={styles.text()}>{data.user.address}</Text>
          </View>
        </View>
        <View style={{flex: 1, marginBottom: 15}}>
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
        <View style={{flex: 1, padding: 20, backgroundColor: colors.white}}>
          <Text style={styles.text('Poppins-SemiBold', 18)}>
            Ringkasan Belanja
          </Text>
          <Gap height={10} />
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text()}>Total Harga</Text>
            <Text style={styles.text('Poppins-SemiBold')}>
              Rp {parseInt(data.subTotal) - parseInt(data.shipping.cost)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text()}>Total Ongkir</Text>
            <Text style={styles.text('Poppins-SemiBold')}>
              Rp {data.shipping.cost}
            </Text>
          </View>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.text('Poppins-SemiBold', 20)}>
              Total Pembayaran
            </Text>
            <Text style={styles.text('Poppins-Bold', 20, colors.default)}>
              Rp {data.subTotal}
            </Text>
          </View>
          {data.status === 'pending' && type === 'order' ? (
            <View style={{paddingTop: 20}}>
              <SubmitButton
                label="Bayar"
                onPress={() => navigation.navigate('PaymentPage', {url})}
              />
            </View>
          ) : data.status === 'packed' && type === 'selling' && !data.shipping?.resi && !barcode ? (
            <View style={{paddingTop: 20}}>
              <SubmitButton
                label="Kirim"
                onPress={() =>
                  navigation.navigate('InputResiPage', {data, type})
                }
              />
            </View>
          ) : data.status === 'shipped' && type === 'order' ? (
            <View style={{paddingTop: 20}}>
              <SubmitButton label="Diterima" />
            </View>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

export default orderDetailPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.lightgrey,
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 16,
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
});
