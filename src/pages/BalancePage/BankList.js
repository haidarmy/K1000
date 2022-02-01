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
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

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
      return <IcBni width={ms(32)} height={mvs(32)} />;
    case 'BRI':
      return <IcBri width={ms(32)} height={mvs(32)} />;
    case 'BSI':
      return <IcBsi width={ms(72)} height={mvs(72)} />;
    case 'BTN':
      return <IcBtn width={ms(32)} height={mvs(32)} />;
    case 'BCA':
      return <IcBca width={ms(32)} height={mvs(32)} />;
    case 'Mandiri':
      return <IcMandiri width={ms(32)} height={mvs(32)} />;
  }
};

const BankList = ({changeRender, setValueToParent}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
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
        <IcSwiper width={ms(50)} height={mvs(6)} />
      </View>
      <SearchBar
        placeholder="Cari Nama Bank"
        type="bankList"
        searchBank={searchBank}
      />
      <Gap height={mvs(10)}/>
      <ScrollView showsVerticalScrollIndicator={false}>
        {dummy
          .filter(e => e.name.toLowerCase().includes(keyword))
          .map(item => {
            return (
              <TouchableOpacity
                key={item.key}
                onPress={() => selectBank(item)}
                activeOpacity={0.7}
                style={styles.bankWrapper}>
                <View style={styles.iconWrapper(item.color)}>
                  {Icons(item.key)}
                </View>
                <Gap width={ms(20)} />
                <View>
                  <Text style={styles.text('Poppins-SemiBold', ms(16))}>
                    {item.name}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default BankList;

const getStyles = theme => StyleSheet.create({
  container: {
    // marginBottom: -50,
    backgroundColor: theme ? colorsDark.white : colors.white,
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
    height: '100%',
    paddingHorizontal: ms(20),
    paddingTop: mvs(30),
    paddingVertical: mvs(16),
  },
  bankWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(20),
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: mvs(16),
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(14),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  iconWrapper: color => ({
    backgroundColor: color,
    width: ms(42),
    height: mvs(42),
    borderRadius: ms(8),
    justifyContent: 'center',
    alignItems: 'center',
  }),
});
