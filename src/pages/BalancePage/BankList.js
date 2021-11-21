import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IcBca,
  IcBni,
  IcBri,
  IcBsi,
  IcBtn,
  IcCC,
  IcChevronRight,
  IcMandiri,
  IcPlus,
  IcSwiper,
} from '../../assets';
import {Gap, SearchBar} from '../../components';
import {colors} from '../../utils';

const dummy = [
  {name: 'Bank Negara Indonesia (BNI)', key: 'BNI', color: colors.lightgrey},
  {name: 'Bank Rakyat Indonesia (BRI)', key: 'BRI', color: colors.lightgrey},
  {name: 'Bank Syariah Indonesia (BSI)', key: 'BSI', color: '#168F8C'},
  {name: 'Bank Tabungan Negara (BTN)', key: 'BTN', color: '#fff404'},
  {name: 'Bank Central Asia (BCA)', key: 'BCA', color: colors.lightgrey},
  {name: 'Bank Mandiri', key: 'Mandiri', color: '#103c6c'},
];

const Icons = key => {
  switch (key) {
    case 'BNI':
      return <IcBni width={32} height={32} />;
    case 'BRI':
      return <IcBri width={32} height={32} />;
    case 'BSI':
      return <IcBsi width={72} height={72} />;
    case 'BTN':
      return <IcBtn width={32} height={32} />;
    case 'BCA':
      return <IcBca width={32} height={32} />;
    case 'Mandiri':
      return <IcMandiri width={32} height={32} />;
  }
};

const BankList = ({changeRender, setValueToParent}) => {
  const [keyword, setKeyword] = useState('');
  const searchBank = key => {
    setKeyword(key);
  };
  const selectBank = item => {
    changeRender('addBankAcc', item);
    // setValueToParent(item, 'addBankAcc')
  };
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <IcSwiper width={50} height={6} />
      </View>
      <SearchBar
        placeholder="Cari Nama Bank"
        type="bankList"
        searchBank={searchBank}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {dummy
          .filter(e => e.name.toLowerCase().includes(keyword))
          .map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => selectBank(item)}
                activeOpacity={0.7}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginBottom: 20,
                }}>
                <View style={styles.iconWrapper(item.color)}>
                  {Icons(item.key)}
                </View>
                <Gap width={20} />
                <View>
                  <Text style={styles.text('Poppins-SemiBold', 16)}>
                    {item.name}
                  </Text>
                  {/* <Text style={styles.text('Poppins-Regular', 16, colors.grey)}>
                  {item.bank} | {item.account}
                </Text> */}
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default BankList;

const styles = StyleSheet.create({
  container: {
    // marginBottom: -50,
    backgroundColor: colors.white,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    height: '100%',
    paddingHorizontal: 25,
    paddingTop: 30,
    paddingVertical: 16,
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 14,
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  shippingCourier: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconWrapper: color => ({
    backgroundColor: color,
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
