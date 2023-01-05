import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {connect, useDispatch, useSelector} from 'react-redux';
import {IcCC, IcChevronRight, IcPlus, IcSwiper} from '../../assets';
import {BankAccSkeleton, EmptyPage, Gap, SearchBar} from '../../components';
import {getUserBankAccount} from '../../redux/action/WithdrawAction';
import {colors, colorsDark, getData} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import EmptySearchResult from '../../components/EmptySearchResult';

const dummy = [
  {name: 'Angelina Christy', bank: 'BCA', account: '0812038213'},
  {name: 'Azizi Shafa Asadel', bank: 'BNI', account: '02341038213'},
  {name: 'Freya Jayawardhana', bank: 'BRI', account: '029091038213'},
  {name: 'Fiony Alveria', bank: 'BSI', account: '0232340320809'},
  {name: 'Indah Cahya Nabila', bank: 'Mandiri', account: '02323403123'},
  {name: 'Angelina Christy', bank: 'BCA', account: '0812038213'},
  {name: 'Azizi Shafa Asadel', bank: 'BNI', account: '02341038213'},
  {name: 'Freya Jayawardhana', bank: 'BRI', account: '029091038213'},
  {name: 'Fiony Alveria', bank: 'BSI', account: '0232340320809'},
  {name: 'Indah Cahya Nabila', bank: 'Mandiri', account: '02323403123'},
  {name: 'Fiony Alveria', bank: 'BSI', account: '0232340320809'},
  {name: 'Indah Cahya Nabila', bank: 'Mandiri', account: '02323403123'},
  {name: 'Angelina Christy', bank: 'BCA', account: '0812038213'},
  {name: 'Azizi Shafa Asadel', bank: 'BNI', account: '02341038213'},
  {name: 'Freya Jayawardhana', bank: 'BRI', account: '029091038213'},
  {name: 'Fiony Alveria', bank: 'BSI', account: '0232340320809'},
  {name: 'Indah Cahya Nabila', bank: 'Mandiri', account: '02323403123'},
];

const BankAccount = ({
  changeRender,
  setValueToParent,
  getBankAccountLoading,
  getBankAccountResult,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [keyword, setKeyword] = useState('');
  useEffect(() => {
    getData('user').then(res => {
      dispatch(getUserBankAccount(res.uid));
    });
  }, []);

  const searchWithdraw = key => {
    setKeyword(key);
  };

  const filteredAccount = e => {
    const regex = /\d/;
    const doesItHaveNumber = regex.test(keyword);
    if (doesItHaveNumber) {
      return getBankAccountResult[e].account.includes(keyword);
    } else {
      return getBankAccountResult[e].name.toLowerCase().includes(keyword);
    }
  };

  const checkSearchResult = () => {
    const regex = /\d/;
    const doesItHaveNumber = regex.test(keyword);
    if (doesItHaveNumber) {
      return Object.values(getBankAccountResult).some(e =>
        e.account.includes(keyword),
      );
    } else {
      return Object.values(getBankAccountResult).some(e =>
        e.name.toLowerCase().includes(keyword),
      );
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <IcSwiper width={ms(50)} height={mvs(6)} />
      </View>
      <View>
        <SearchBar
          placeholder="Cari Rekening Bank"
          type="withdraw"
          searchWithdraw={searchWithdraw}
        />
        <TouchableOpacity
          onPress={() => changeRender('addBankAcc')}
          activeOpacity={0.7}
          style={styles.addAccWrapper}>
          <View style={styles.addIcWrapper}>
            <IcPlus fill={colors.default} width={ms(32)} height={mvs(32)} />
          </View>
          <Gap width={ms(15)} />
          <Text style={[styles.text('Poppins-SemiBold', ms(16)), {flex: 1}]}>
            Tambah Rekening Bank
          </Text>
          <IcChevronRight />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {getBankAccountResult.length ? (
          checkSearchResult() ? (
            Object.keys(getBankAccountResult)
              .filter(e => filteredAccount(e))
              .map(key => {
                console.log(
                  `🚀 → file: BankAccount.js → line 99 → key`,
                  getBankAccountResult,
                );
                const item = getBankAccountResult[key];
                return (
                  <TouchableOpacity
                    key={key}
                    onPress={() => setValueToParent(item, 'bankAcc')}
                    activeOpacity={0.7}
                    style={styles.accWrapper}>
                    <View style={styles.iconWrapper}>
                      <IcCC
                        fill={colors.default}
                        width={ms(24)}
                        height={mvs(24)}
                      />
                    </View>
                    <Gap width={ms(15)} />
                    <View>
                      <Text style={styles.text('Poppins-Bold', ms(16))}>
                        {item.name}
                      </Text>
                      <Text
                        style={styles.text(
                          'Poppins-Regular',
                          ms(16),
                          colors.grey,
                        )}>
                        {item.bank.key} | ••••{' '}
                        {item.account.substr(item.account.length - 4, 4)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              })
          ) : (
            <EmptySearchResult />
          )
        ) : getBankAccountLoading ? (
          <BankAccSkeleton />
        ) : (
          <EmptyPage
            illustration="EmptyAccount"
            text="Tidak Ada Rekening Yang Tersimpan"
          />
        )}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  getBankAccountLoading: state.WithdrawReducer.getBankAccountLoading,
  getBankAccountResult: state.WithdrawReducer.getBankAccountResult,
  getBankAccountError: state.WithdrawReducer.getBankAccountError,
});
export default connect(mapStateToProps, null)(BankAccount);

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      // maxHeight: '100%',
      // marginBottom: -50,
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingTop: mvs(30),
      paddingHorizontal: ms(25),
      paddingVertical: vs(16),
      borderTopLeftRadius: ms(10),
      borderTopRightRadius: ms(10),
    },
    addAccWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: vs(12),
    },
    addIcWrapper: {
      height: mvs(42),
      width: ms(42),
      justifyContent: 'center',
      alignItems: 'center',
    },
    accWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: vs(16),
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
    iconWrapper: {
      backgroundColor: 'rgba(111, 95, 144, 0.2)',
      width: ms(42),
      height: mvs(42),
      borderRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
