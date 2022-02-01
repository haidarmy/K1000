import {useNavigation} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {connect, useDispatch, useSelector} from 'react-redux';
import {Number, SubmitButton} from '..';
import {ICTrashSolid} from '../../assets';
import {deleteCartItem} from '../../redux/action/CartAction';
import {colors, colorsDark, showWarning} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const Item = ({id, mainCart, item, trash, orders, applyOnPress, type}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    setCounter(item.orderAmount);
  }, []);

  // const plusFunc = () => {
  //   if (counter < 99) {
  //     setCounter(counter + 1);
  //   } else {
  //     showWarning('Maksimal item yang dapat ditambahkan adalah 99');
  //   }
  // };

  // const minusFunc = () => {
  //   if (counter > 0) {
  //     setCounter(counter - 1);
  //   }
  // };
  const deleteOrders = () => {
    console.log('MAU DIHAPUS NI GAN', orders[item.orderId]);
    dispatch(deleteCartItem(item.orderId, mainCart, orders[item.orderId]));
  };
  return (
    <TouchableOpacity
      activeOpacity={applyOnPress ? 0.7 : 1}
      style={styles.container}
      onPress={
        applyOnPress
          ? () =>
              navigation.navigate('ProductPage', {
                productData: item.product,
                orderAmount: item.orderAmount,
              })
          : null
      }>
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center',
          marginBottom: mvs(20),
          padding: mvs(16),
        }}>
        <Image source={{uri: item.product.image[0]}} style={styles.image} />
        <View style={styles.descContainer}>
          <Text style={{...styles.text, color: theme ? colorsDark.black : colors.black}}>
            {item.product.name}
          </Text>
          <Number
            number={item.product.price}
            textStyle={{...styles.text, color: colors.default}}
          />
          <Text style={styles.textCustom('Poppins-Medium')}>x{counter}</Text>
          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => minusFunc()}
              style={styles.counterWrapper.minus}>
              <Text style={styles.counterText}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={(styles.counterText, styles.counterWrapper.value)}
              defaultValue="1"
              value={`${counter ? counter : 1}`}
              textAlign="center"
              keyboardType="numeric"
              maxLength={2}
              onChangeText={value =>
                counter < 99 ? setCounter(parseInt(value)) : setCounter(1)
              }
            />
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => plusFunc()}
              style={styles.counterWrapper.plus}>
              <Text style={styles.counterText}>+</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {trash && (
          <TouchableOpacity activeOpacity={0.7} onPress={() => deleteOrders()}>
            <ICTrashSolid fill={theme ? colorsDark.white : colors.white} />
          </TouchableOpacity>
        )}
      </View>
      {type !== 'checkout' && (
        <View
          style={{
            borderTopWidth: ms(1.5),
            borderColor: '#E5D9FF',
            flex: 1,
            width: '100%',
            // paddingBottom: 20,
            marginTop: mvs(-20),
            alignItems: 'center',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              flex: 1,
              width: '100%',
              padding: ms(16),
            }}>
            <View
              style={
                type !== 'order detail' && {
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }
              }>
              <Text style={styles.textCustom()}>Total Harga</Text>
              <Number
                number={item.product.price * counter}
                textStyle={styles.textCustom('Poppins-SemiBold')}
              />
            </View>
            {type === 'order detail' && (
              <TouchableOpacity activeOpacity={0.7} style={{width: '40%'}}>
                <SubmitButton
                  label={'Beli Lagi'}
                  height={mvs(45)}
                  onPress={() =>
                    navigation.navigate('ProductPage', {
                      productData: item.product,
                      orderAmount: item.orderAmount,
                    })
                  }
                />
              </TouchableOpacity>
            )}
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default connect()(Item);

const getStyles = theme => ({
  container: {
    // padding: 16,
    // height: 144,
    // width: '0%'
    marginHorizontal: ms(20),
    marginBottom: mvs(16),
    backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    borderRadius: ms(20),
    flexDirection: 'column',
    alignItems: 'center',
    elevation: 3,
  },
  descContainer: {
    marginLeft: ms(24),
    flex: 1,
    paddingLeft: ms(16),
    justifyContent: 'center',
  },
  image: {
    width: ms(76),
    height: mvs(76),
    borderRadius: ms(14),
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    flexWrap: 'wrap',
    flex: 1,
    fontSize: ms(20),
    marginBottom: mvs(8),
  },
  textCustom: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(16),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  counterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: ms(16),
    color: theme ? colorsDark.black : colors.black,
  },
  counterWrapper: {
    plus: {
      width: ms(32),
      height: mvs(32),
      backgroundColor: colors.white,
      borderWidth: ms(2),
      borderColor: colors.lightgrey,
      borderTopRightRadius: ms(8),
      borderBottomRightRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      width: ms(32),
      height: mvs(32),
      padding: ms(0),
      backgroundColor: colors.lightgrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: ms(2),
      borderColor: colors.lightgrey,
    },
    minus: {
      width: ms(32),
      height: mvs(32),
      backgroundColor: colors.white,
      borderColor: colors.lightgrey,
      borderWidth: ms(2),
      borderTopLeftRadius: ms(8),
      borderBottomLeftRadius: ms(8),
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
});
