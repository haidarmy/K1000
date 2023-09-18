import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  colors,
  colorsDark,
  getData,
  thousandsSeparators,
  usePrevious,
} from '../../utils';
import {
  FilterProduct,
  Gap,
  Header,
  Number,
  SubmitButton,
} from '../../components';
import Modal from 'react-native-modal';
import Calc from './Calc';
import {IcCC, IcChevronRight, IcShipping} from '../../assets';
import ShippingModal from '../../components/OrderItem/ShippingModal';
import BankAccount from './BankAccount';
import AddBankAccount from './AddBankAccount';
import BankList from './BankList';
import {connect, useDispatch, useSelector} from 'react-redux';
import {addRequestWithdraw} from '../../redux/action/WithdrawAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const BalancePage = ({navigation, addRequestWithdrawResult}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [currentSelection, setCurrentSelection] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [profile, setProfile] = useState(false);
  const [result, setResult] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    getData('user').then(res => {
      setProfile({
        ...profile,
        uid: res.uid,
        balance: res.balance,
        // avatar: res.avatar,
        // name: res.name ? res.name : '',
      });
    });
  }, []);

  const setResultCalc = res => {
    setResult(res);
  };

  const onSubmit = () => {
    let data = {...currentSelection, amount: result};
    let withdrawId = `${Date.now()}-${profile.uid}-${
      currentSelection?.bank?.key
    }`;
    if (currentSelection && result) {
      let remainingBalance = parseInt(profile.balance) - parseInt(result);
      dispatch(addRequestWithdraw(withdrawId, data, remainingBalance));
    }
  };

  const prevAddRequestWithdrawResult = usePrevious(addRequestWithdrawResult);
  useEffect(() => {
    if (addRequestWithdrawResult && !prevAddRequestWithdrawResult) {
      navigation.replace('SuccessWithdrawPage');
    }
  }, [addRequestWithdrawResult]);

  const setValueToParent = (item, type) => {
    if (type === 'bankAcc') {
      setCurrentSelection(item);
      setModalVisible(!isModalVisible);
    } else if (type === 'addBankAcc') {
      setCurrentSelection(item);
      setModalVisible(!isModalVisible);
    }
  };

  const accountList = () => {
    setModalVisible(!isModalVisible);
  };

  const ModalContainer = ({setValueToParent}) => {
    const [isRender, setRender] = useState('bankAcc');
    const [selectedBank, setSelectedBank] = useState('');
    const changeRender = (key, item) => {
      setRender(key);
      if (key === 'addBankAcc') {
        setSelectedBank(item);
      }
    };

    const condRender = () => {
      switch (isRender) {
        case 'addBankAcc':
          return (
            <AddBankAccount
              changeRender={changeRender}
              setValueToParent={setValueToParent}
              selectedBank={selectedBank}
            />
          );
        case 'bankList':
          return (
            <BankList
              changeRender={changeRender}
              setValueToParent={setValueToParent}
            />
          );
        case 'bankAcc':
          return (
            <BankAccount
              changeRender={changeRender}
              setValueToParent={setValueToParent}
            />
          );
      }
    };
    return (
      <Modal
        statusBarTranslucent
        propagateSwipe={true}
        style={{
          margin: 0,
          justifyContent: 'flex-end',
          // backgroundColor: 'white',
        }}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down"
        // deviceHeight={Dimensions.get('screen').height}
      >
        {condRender()}
      </Modal>
    );
  };

  if (isModalVisible) {
    return <ModalContainer setValueToParent={setValueToParent} />;
  } else {
    return (
      <View style={styles.page}>
        <Header
          label="Tarik Saldo ke Bank"
          onPress={() => navigation.goBack()}
        />
        <View style={{flex: 1}}>
          <View
            style={{
              flex: 3,
              backgroundColor: theme ? colorsDark.white : colors.white,
              // paddingTop: 5,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <View style={styles.balanceWrapper}>
              <Text
                style={styles.text(
                  'Poppins-SemiBold',
                  ms(18),
                  'rgba(255, 255, 255, 0.5)',
                )}>
                Saldo
              </Text>
              <Number
                number={profile.balance}
                textStyle={styles.text(
                  'Poppins-SemiBold',
                  ms(18),
                  theme ? colorsDark.white : colors.white,
                )}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.selectedAccountWrapper}
              onPress={() => accountList()}>
              <>
                <View style={styles.iconWrapper}>
                  <IcCC fill={colors.default} width={ms(24)} height={mvs(24)} />
                </View>
                <View style={{justifyContent: 'center'}}>
                  {currentSelection ? (
                    <>
                      <Text
                        style={{
                          ...styles.text('Poppins-SemiBold'),
                        }}>
                        {currentSelection.name}
                      </Text>
                      <Text
                        style={{
                          ...styles.text(
                            'Poppins-Medium',
                            ms(16),
                            theme ? colorsDark.grey : colors.grey,
                          ),
                        }}>
                        {currentSelection.bank.key} | ••••{` `}
                        {currentSelection.account.substr(
                          currentSelection.account.length - 4,
                          4,
                        )}
                      </Text>
                    </>
                  ) : (
                    <Text
                      style={{
                        ...styles.text('Poppins-SemiBold'),
                        textAlign: 'center',
                      }}>
                      Pilih Akun Bank
                    </Text>
                  )}
                </View>
              </>
              <IcChevronRight />
            </TouchableOpacity>
          </View>
          <View style={styles.resCalc}>
            {/* <Text style={styles.text('Poppins-Bold', ms(32), colors.black)}>
              {result && `Rp ${result}`}
            </Text> */}
            <Number
              number={result}
              textStyle={styles.text(
                'Poppins-Bold',
                ms(32),
                theme ? colorsDark.black : colors.black,
              )}
            />
            <Gap height={mvs(10)} />
            <Text style={styles.text('Poppins-Regular', ms(16), colors.red)}>
              {result < 50000 && result > 0
                ? 'Minimal penarikan Rp 50.0000'
                : result > profile.balance
                ? `Maksimal penarikan Rp ${thousandsSeparators(
                    profile.balance,
                  )}`
                : null}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Calc setResultCalc={setResultCalc} />
          </View>
          {result < 50000 ||
          result > profile.balance ||
          !currentSelection ||
          !result ? (
            <SubmitButton
              label="Tarik"
              labelColor={theme ? colors.grey : colors.white}
              onPress={onSubmit}
              disabled
              buttonColor={theme ? colorsDark.grey : colors.grey}
            />
          ) : (
            <SubmitButton label="Tarik" onPress={onSubmit} />
          )}
        </View>
      </View>
    );
  }
};

const mapStateToProps = state => ({
  addRequestWithdrawLoading: state.WithdrawReducer.addRequestWithdrawLoading,
  addRequestWithdrawResult: state.WithdrawReducer.addRequestWithdrawResult,
  addRequestWithdrawError: state.WithdrawReducer.addRequestWithdrawError,
});

export default connect(mapStateToProps, null)(BalancePage);

const getStyles = theme =>
  StyleSheet.create({
    page: {
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingTop: StatusBar.currentHeight,
      padding: mvs(20),
    },
    balanceWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'rgba(111, 95, 144, 0.8)',
      borderRadius: ms(6),
      paddingHorizontal: ms(20),
      paddingVertical: mvs(6),
      marginBottom: mvs(15),
    },
    iconWrapper: {
      backgroundColor: 'rgba(111, 95, 144, 0.2)',
      width: ms(42),
      height: mvs(42),
      borderRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    resCalc: {
      flex: 2,
      backgroundColor: theme ? colorsDark.white : colors.white,
      justifyContent: 'center',
      alignItems: 'center',
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
    shippingWrapper: {
      padding: mvs(10),
      borderWidth: ms(1),
      borderRadius: ms(10),
      borderColor: theme ? colorsDark.lightgrey : colors.grey,
      height: mvs(60),
      alignItems: 'center',
      flexDirection: 'row',
      marginBottom: mvs(20),
    },
    selectedAccountWrapper: {
      padding: mvs(15),
      borderWidth: ms(1),
      borderRadius: ms(10),
      borderColor: theme ? colorsDark.lightgrey : colors.grey,
      alignItems: 'center',
      justifyContent: 'space-around',
      flexDirection: 'row',
      marginBottom: mvs(20),
    },
  });
