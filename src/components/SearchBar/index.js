import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, useCustomState, usePrevious} from '../../utils';
import {IcSearch, IcFilter, IcClose, IcHamburger} from '../../assets';
import {useDispatch} from 'react-redux';
import {
  getListProduct,
  getProductByKeyword,
} from '../../redux/action/ProductAction';
import {useNavigation} from '@react-navigation/core';
import {
  getWishlist,
  getWishlistByKeyword,
} from '../../redux/action/WishlistAction';
import {
  getStoreProduct,
  getStoreProductByKeyword,
} from '../../redux/action/StoreAction';

const SearchBar = ({
  onPress,
  placeholder = 'Cari',
  Filter,
  Store,
  type,
  id,
  searchOrder,
  searchSelling,
  searchWithdraw,
  searchBank,
}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [input, setInput] = useCustomState(false);
  const search = () => {
    const arr = input.toLowerCase().split(' ');
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const keyword = arr.join(' ');
    if (keyword.length === 0) {
      if (type === 'home') {
        dispatch(getListProduct());
      } else if (type === 'store') {
        dispatch(getStoreProduct());
      } else if (type === 'wishlist') {
        dispatch(getWishlist(id));
      } else if (type === 'orderPage') {
        let newKeyword = keyword.toLowerCase();
        searchOrder(newKeyword);
      } else if (type === 'sellingPage') {
        let newKeyword = keyword.toLowerCase();
        searchSelling(newKeyword);
      } else if (type === 'withdraw') {
        let newKeyword = keyword.toLowerCase();
        searchWithdraw(newKeyword);
      } else if (type === 'bankList') {
        let newKeyword = keyword.toLowerCase();
        searchBank(newKeyword);
      }
    } else {
      if (type === 'home') {
        dispatch(getProductByKeyword(keyword));
      } else if (type === 'store') {
        dispatch(getStoreProductByKeyword(keyword));
      } else if (type === 'wishlist') {
        dispatch(getWishlistByKeyword(id, keyword));
      } else if (type === 'orderPage') {
        let newKeyword = keyword.toLowerCase();
        searchOrder(newKeyword);
      } else if (type === 'sellingPage') {
        let newKeyword = keyword.toLowerCase();
        searchSelling(newKeyword);
      } else if (type === 'withdraw') {
        let newKeyword = keyword.toLowerCase();
        searchWithdraw(newKeyword);
      } else if (type === 'bankList') {
        let newKeyword = keyword.toLowerCase();
        searchBank(newKeyword);
      }
    }
    // setInput('');
  };
  const prevInput = usePrevious(input);
  useEffect(() => {
    if (input === '' && input !== prevInput) {
      search();
    }
  }, [input]);
  return (
    <View style={styles.wrapper}>
      <View style={styles.box}>
        {Store ? (
          <TouchableOpacity
            onPress={() => navigation.openDrawer()}
            style={{
              zIndex: 1,
              width: 32,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <IcHamburger
              width={24}
              height={24}
              style={{position: 'absolute', top: 16, left: 2}}
            />
          </TouchableOpacity>
        ) : (
          <View style={{zIndex: 1, marginRight: 30}}>
            <IcSearch
              width={24}
              height={24}
              style={{position: 'absolute', top: 16, left: 0}}
            />
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={input ? input : ''}
          onChangeText={value => setInput(value)}
          onSubmitEditing={() => search()}
          returnKeyType={'search'}
        />
        <TouchableOpacity
          onPress={() => setInput('')}
          activeOpacity={0.7}
          style={{
            width: 30,
            height: 30,
            position: 'absolute',
            top: 14,
            right: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {input ? <IcClose width={24} height={24} /> : null}
        </TouchableOpacity>
      </View>
      {Filter && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.filter}
          activeOpacity={0.7}>
          <IcFilter width={24} height={24} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.white,
    height: 58,
    marginBottom: 24,
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    backgroundColor: colors.lightgrey,
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 40,
  },
  input: {
    // paddingLeft: 54,
    // paddingRight: 55,
    flex: 10,
    fontSize: 18,
    color: colors.grey,
    alignItems: 'center',
    height: 60,
    fontFamily: 'Poppins-Regular',
    marginRight: 10,
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 56,
    height: 56,
    backgroundColor: colors.default,
    borderRadius: 10,
    marginLeft: 16,
  },
});

export default SearchBar;
