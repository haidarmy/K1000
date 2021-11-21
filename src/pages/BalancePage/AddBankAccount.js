import {fromPairs} from 'lodash';
import React, {useEffect, useState} from 'react';
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import { useDispatch } from 'react-redux';
import {IcCC, IcChevronRight, IcDropdown, IcPlus, IcSwiper} from '../../assets';
import {Gap, InputField, SearchBar, SubmitButton} from '../../components';
import { addUserBankAccount, getUserBankAccount } from '../../redux/action/WithdrawAction';
import {colors, getData, usePrevious} from '../../utils';
import { connect } from 'react-redux'

const dummy = [
  {name: 'Angelina Christy', bank: 'BCA', account: '0812038213'},
  {name: 'Azizi Shafa Asadel', bank: 'BNI', account: '02341038213'},
  {name: 'Freya Jayawardhana', bank: 'BRI', account: '029091038213'},
  {name: 'Fiony Alveria', bank: 'BSI', account: '0232340320809'},
  {name: 'Indah Cahya Nabila', bank: 'Mandiri', account: '02323403123'},
];

const AddBankAccount = ({changeRender, selectedBank, setValueToParent, addBankAccountResult}) => {
  const dispatch = useDispatch()
  const onSubmit = () => {
    dispatch(addUserBankAccount(form))
    // setValueToParent(form, 'addBankAcc')
  };
  const [form, setForm] = useState({
    uid: '',
    name: '',
    date: '',
    bank: {},
    account: '',
  });

  useEffect(() => {
    if (selectedBank) {
      let {color, ...rest} = selectedBank
      getData('user').then(res => setForm({...form, uid: res.uid, bank: rest, date: Date.now()}));
    }
  }, [selectedBank]);

  const prevAddBankAccountResult = usePrevious(addBankAccountResult);
  useEffect(() => {
    if ((addBankAccountResult!==false) && addBankAccountResult !== prevAddBankAccountResult) {
      setValueToParent(form, 'addBankAcc')
    }
  }, [addBankAccountResult]);

  const [border, setBorder] = useState(colors.white);
  const onFocusForm = () => {
    setBorder(colors.default);
  };
  const onBlurForm = () => {
    setBorder(colors.white);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <View style={styles.swiper}>
          <IcSwiper width={50} height={6} />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => changeRender('bankList')}
          style={{position: 'relative'}}>
          <InputField
            value={form.bank?.name}
            label="Pemilihan Bank"
            placeholder="Pilih Bank"
            disabled
          />
          <View style={{position: 'absolute', right: 20, top: 60}}>
            <IcDropdown height={32} width={32} />
          </View>
        </TouchableOpacity>
        <Text style={styles.text('Poppins-Medium', 18)}>Nomor Rekening</Text>
        <TextInputMask
          onFocus={onFocusForm}
          onBlur={onBlurForm}
          style={styles.textInput(border)}
          placeholder="Masukkan Nomor Rekening"
          keyboardType={'numeric'}
          value={form.account}
          onChangeText={value => setForm({...form, account: value})}
          mask={'[0000] [0000] [0000] [0000]'}
        />
        <InputField
          label="Nama Pemilik Rekening"
          placeholder="Masukkan Nama Pemilik Rekening"
          value={form.name}
          onChangeText={value => setForm({...form, name: value})}
        />
      </View>
      <SubmitButton label="Simpan & Lanjutkan" onPress={onSubmit} />
    </View>
  );
};

const mapStateToProps = state => ({
  addBankAccountLoading: state.WithdrawReducer.addBankAccountLoading,
  addBankAccountResult: state.WithdrawReducer.addBankAccountResult,
  addBankAccountError: state.WithdrawReducer.addBankAccountError,
});

export default connect(mapStateToProps, null)(AddBankAccount);

const styles = StyleSheet.create({
  container: {
    // height: '100%',
    // marginBottom: -50,
    flex: 1,
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
  shippingCourier: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
  iconWrapper: {
    backgroundColor: 'rgba(111, 95, 144, 0.2)',
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: (border, paddingRight = 0) => ({
    backgroundColor: colors.lightgrey,
    borderRadius: 10,
    marginTop: 16,
    marginBottom: 26,
    paddingVertical: 16,
    paddingHorizontal: 24,
    fontSize: 18,
    color: colors.black,
    fontFamily: 'Poppins-Regular',
    borderWidth: 2,
    borderColor: border,
    paddingRight: paddingRight,
  }),
});
