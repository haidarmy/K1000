import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {colors, getData, usePrevious} from '../../utils';
import {FilterProduct, Gap, Header, SubmitButton} from '../../components';
import Modal from 'react-native-modal';
import Calc from './Calc';
import {IcCC, IcChevronRight, IcShipping} from '../../assets';
import ShippingModal from '../../components/OrderItem/ShippingModal';
import BankAccount from './BankAccount';
import AddBankAccount from './AddBankAccount';
import BankList from './BankList';
import {connect, useDispatch} from 'react-redux';
import {addRequestWithdraw} from '../../redux/action/WithdrawAction';

const BalancePage = ({navigation, addRequestWithdrawResult}) => {
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
      let remainingBalance = parseInt(profile.balance) - parseInt(result)
      dispatch(addRequestWithdraw(withdrawId, data, remainingBalance));
    }
  };

  const prevAddRequestWithdrawResult = usePrevious(addRequestWithdrawResult);
  useEffect(() => {
    if (addRequestWithdrawResult && !prevAddRequestWithdrawResult) {
      navigation.replace('SuccessWithdrawPage')
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
        <View style={{flex: 1, backgroundColor: 'yellow'}}>
          <View
            style={{
              flex: 3,
              backgroundColor: 'white',
              // paddingTop: 5,
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <View style={styles.balanceWrapper}>
              <Text
                style={styles.text(
                  'Poppins-SemiBold',
                  18,
                  'rgba(255, 255, 255, 0.5)',
                )}>
                Saldo
              </Text>
              <Text style={styles.text('Poppins-SemiBold', 18, colors.white)}>
                Rp {profile.balance}
              </Text>
            </View>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.selectedShippingWrapper}
              onPress={() => accountList()}>
              <>
                <View style={styles.iconWrapper}>
                  <IcCC fill={colors.default} width={24} height={24} />
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
                          ...styles.text('Poppins-Medium', 16, colors.grey),
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
            <Text style={styles.text('Poppins-Bold', 32, colors.black)}>
              {result && `Rp ${result}`}
            </Text>
            <Gap height={10} />
            <Text style={styles.text('Poppins-Regular', 16, colors.red)}>
              {result < 50000 && result > 0
                ? 'Minimal penarikan Rp 50.0000'
                : result > profile.balance
                ? `Maksimal penarikan Rp ${profile.balance}`
                : null}
            </Text>
          </View>
        </View>
        <View style={{flex: 1}}>
          <View style={{flex: 1}}>
            <Calc setResultCalc={setResultCalc} />
          </View>
          {result < 50000 || result > profile.balance || !currentSelection || !result ? (
            <SubmitButton label="Tarik" onPress={onSubmit} disabled buttonColor={colors.grey}/>
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
  balanceWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(111, 95, 144, 0.8)',
    borderRadius: 6,
    paddingHorizontal: 20,
    paddingVertical: 6,
    marginBottom: 15,
  },
  iconWrapper: {
    backgroundColor: 'rgba(111, 95, 144, 0.2)',
    width: 42,
    height: 42,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  resCalc: {
    flex: 3,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
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
  shippingWrapper: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    height: 60,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 20,
  },
  selectedShippingWrapper: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: colors.grey,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
    marginBottom: 20,
  },
});
