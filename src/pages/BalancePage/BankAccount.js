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
import {connect, useDispatch} from 'react-redux';
import {IcCC, IcChevronRight, IcPlus, IcSwiper} from '../../assets';
import {BankAccSkeleton, Gap, SearchBar} from '../../components';
import {getUserBankAccount} from '../../redux/action/WithdrawAction';
import {colors, getData} from '../../utils';

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

  return (
    <View style={styles.container}>
      <View style={styles.swiper}>
        <IcSwiper width={50} height={6} />
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
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 10,
          }}>
          <View
            style={{
              height: 42,
              width: 42,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IcPlus fill={colors.default} width={32} height={32} />
          </View>
          <Gap width={15} />
          <Text style={[styles.text('Poppins-SemiBold', 16), {flex: 1}]}>
            Tambah Rekening Bank
          </Text>
          <IcChevronRight />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        {getBankAccountResult ? (
          Object.keys(getBankAccountResult)
            .filter(e =>
              filteredAccount(e)
            )
            .map(key => {
              const item = getBankAccountResult[key];
              return (
                <TouchableOpacity
                  key={key}
                  onPress={() => setValueToParent(item, 'bankAcc')}
                  activeOpacity={0.7}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginBottom: 20,
                  }}>
                  <View style={styles.iconWrapper}>
                    <IcCC fill={colors.default} width={24} height={24} />
                  </View>
                  <Gap width={15} />
                  <View>
                    <Text style={styles.text('Poppins-Bold', 16)}>
                      {item.name}
                    </Text>
                    <Text
                      style={styles.text('Poppins-Regular', 16, colors.grey)}>
                      {item.bank.key} | ••••{' '}
                      {item.account.substr(item.account.length - 4, 4)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            })
        ) : getBankAccountLoading ? (
          <BankAccSkeleton/>
        ) : (
          <Text>Data Kosong</Text>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // maxHeight: '100%',
    // marginBottom: -50,
    backgroundColor: colors.white,
    paddingTop: 30,
    paddingHorizontal: 25,
    paddingVertical: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
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
  iconWrapper: {
    backgroundColor: 'rgba(111, 95, 144, 0.2)',
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
