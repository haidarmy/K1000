import { useNavigation } from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-gesture-handler';
import {connect, useDispatch} from 'react-redux';
import {ICTrashSolid} from '../../assets';
import {deleteCartItem} from '../../redux/action/CartAction';
import {colors, showWarning} from '../../utils';

const Item = ({id, mainCart, item, trash, orders, applyOnPress}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [counter, setCounter] = useState(0);
  useEffect(() => {
      setCounter(item.orderAmount)
  }, [])

  const plusFunc = () => {
    if (counter < 99) {
      setCounter(counter + 1);
    } else {
      showWarning('Maksimal item yang dapat ditambahkan adalah 99');
    }
  };

  const minusFunc = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  const deleteOrders = () => {
    console.log('MAU DIHAPUS NI GAN', orders[item.orderId]);
    dispatch(deleteCartItem(item.orderId, mainCart, orders[item.orderId]));
  };
  return (
    <TouchableOpacity activeOpacity={applyOnPress ? 0.7 : 1} style={styles.container} onPress={applyOnPress ? () => navigation.navigate('ProductPage', {productData: item.product, orderAmount: item.orderAmount}) : null}>
      <Image source={{uri: item.product.image[0]}} style={styles.image} />
      <View style={styles.descContainer}>
        <Text style={{...styles.text, color: colors.black}}>
          {item.product.name}
        </Text>
        <Text style={{...styles.text, color: colors.default}}>
          Rp {item.product.price}
        </Text>
        <View style={{flexDirection: 'row'}}>
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
        </View>
      </View>
      {!trash && (
        <TouchableOpacity activeOpacity={0.7} onPress={() => deleteOrders()}>
          <ICTrashSolid />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default connect()(Item);

const styles = {
  container: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    backgroundColor: colors.lightgrey,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    height: 144,
  },
  descContainer: {
    marginLeft: 24,
    flex: 1,
    paddingLeft: 16,
    justifyContent: 'center',
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: 14,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    marginBottom: 8,
  },
  counterText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: colors.black,
  },
  counterWrapper: {
    plus: {
      width: 32,
      height: 32,
      backgroundColor: colors.white,
      borderWidth: 2,
      borderColor: colors.lightgrey,
      borderTopRightRadius: 8,
      borderBottomRightRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    value: {
      width: 32,
      height: 32,
      padding: 0,
      backgroundColor: colors.lightgrey,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: colors.lightgrey,
    },
    minus: {
      width: 32,
      height: 32,
      backgroundColor: colors.white,
      borderColor: colors.lightgrey,
      borderWidth: 2,
      borderTopLeftRadius: 8,
      borderBottomLeftRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
};
