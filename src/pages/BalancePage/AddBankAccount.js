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
import {useDispatch, useSelector} from 'react-redux';
import {IcCC, IcChevronRight, IcDropdown, IcPlus, IcSwiper} from '../../assets';
import {Gap, InputField, SearchBar, SubmitButton} from '../../components';
import {
  addUserBankAccount,
  getUserBankAccount,
} from '../../redux/action/WithdrawAction';
import {colors, colorsDark, getData, usePrevious} from '../../utils';
import {connect} from 'react-redux';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const dummy = [
  {name: 'Angelina Christy', bank: 'BCA', account: '0812038213'},
  {name: 'Azizi Shafa Asadel', bank: 'BNI', account: '02341038213'},
  {name: 'Freya Jayawardhana', bank: 'BRI', account: '029091038213'},
  {name: 'Fiony Alveria', bank: 'BSI', account: '0232340320809'},
  {name: 'Indah Cahya Nabila', bank: 'Mandiri', account: '02323403123'},
];

const AddBankAccount = ({
  changeRender,
  selectedBank,
  setValueToParent,
  addBankAccountResult,
}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const onSubmit = () => {
    if (form.uid && form.name && form.date && form.bank && form.account) {
      dispatch(addUserBankAccount(form));
    }
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
      let {color, ...rest} = selectedBank;
      getData('user').then(res =>
        setForm({...form, uid: res.uid, bank: rest, date: Date.now()}),
      );
    }
  }, [selectedBank]);

  const prevAddBankAccountResult = usePrevious(addBankAccountResult);
  useEffect(() => {
    if (
      addBankAccountResult !== false &&
      addBankAccountResult !== prevAddBankAccountResult
    ) {
      setValueToParent(form, 'addBankAcc');
    }
  }, [addBankAccountResult]);

  const [border, setBorder] = useState(theme ? colorsDark.white : colors.white);
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
          <IcSwiper width={ms(50)} height={mvs(6)} />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => changeRender('bankList')}
          style={{position: 'relative'}}>
          <InputField
            paddingRight={36}
            value={form.bank?.name}
            label="Pemilihan Bank"
            placeholder="Pilih Bank"
            placeholderTextColor={colors.grey}
            disabled
          />
          <View style={styles.dropdown}>
            <IcDropdown height={mvs(32)} width={ms(32)} />
          </View>
        </TouchableOpacity>
        <Text style={styles.text('Poppins-Medium', ms(18))}>
          Nomor Rekening
        </Text>
        <TextInputMask
          onFocus={onFocusForm}
          onBlur={onBlurForm}
          style={styles.textInput(border)}
          placeholder="Masukkan Nomor Rekening"
          placeholderTextColor={colors.grey}
          keyboardType={'numeric'}
          value={form.account}
          onChangeText={value => setForm({...form, account: value})}
          mask={'[0000] [0000] [0000] [0000]'}
        />
        <InputField
          label="Nama Pemilik Rekening"
          placeholder="Masukkan Nama Pemilik Rekening"
          placeholderTextColor={colors.grey}
          value={form.name}
          onChangeText={value => setForm({...form, name: value})}
        />
      </View>
      <SubmitButton
        label="Simpan & Lanjutkan"
        labelColor={theme ? colors.grey : colors.white}
        onPress={onSubmit}
        disabled={
          form.uid && form.name && form.date && form.bank && form.account
            ? false
            : true
        }
        buttonColor={
          form.uid && form.name && form.date && form.bank && form.account
            ? colors.default
            : theme ? colorsDark.grey : colors.grey
        }
      />
    </View>
  );
};

const mapStateToProps = state => ({
  addBankAccountLoading: state.WithdrawReducer.addBankAccountLoading,
  addBankAccountResult: state.WithdrawReducer.addBankAccountResult,
  addBankAccountError: state.WithdrawReducer.addBankAccountError,
});

export default connect(mapStateToProps, null)(AddBankAccount);

const getStyles = theme =>
  StyleSheet.create({
    container: {
      // height: '100%',
      // marginBottom: -50,
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingTop: vs(30),
      paddingHorizontal: ms(20),
      paddingVertical: vs(20),
      borderTopLeftRadius: ms(10),
      borderTopRightRadius: ms(10),
    },
    dropdown: {position: 'absolute', right: ms(7.5, 1), top: mvs(60, 0.6)},
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
    textInput: (border, paddingRight = 0) => ({
      backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
      borderRadius: ms(10),
      marginTop: vs(16),
      marginBottom: vs(26),
      paddingVertical: vs(16),
      paddingHorizontal: s(24),
      fontSize: ms(18),
      color: theme ? colorsDark.black : colors.black,
      fontFamily: 'Poppins-Regular',
      borderWidth: ms(2),
      borderColor: border,
      paddingRight: paddingRight,
    }),
  });
