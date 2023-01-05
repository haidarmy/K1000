import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {colors, colorsDark, useCustomState, usePrevious} from '../../utils';
import {IcSearch, IcFilter, IcClose, IcHamburger} from '../../assets';
import {useDispatch, useSelector} from 'react-redux';
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
import {s, vs, ms, mvs} from 'react-native-size-matters';

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
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode)
  const styles = getStyles(theme);
  const navigation = useNavigation();
  const [input, setInput] = useCustomState(false);
  const search = () => {
    // const arr = input.toLowerCase().split(' ');
    // for (var i = 0; i < arr.length; i++) {
    //   arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    // }
    // const keyword = arr.join(' ');
    const keyword = input
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
            onPress={() => navigation.toggleDrawer()}
            style={styles.hamburgerWrapper}>
            <IcHamburger
              width={ms(24)}
              height={mvs(24)}
              style={{position: 'absolute', top: mvs(16), left: ms(2)}}
            />
          </TouchableOpacity>
        ) : (
          <View style={{zIndex: 1, marginRight: ms(30)}}>
            <IcSearch
              width={ms(24)}
              height={mvs(24)}
              style={{position: 'absolute', top: mvs(16), left: ms(0)}}
            />
          </View>
        )}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={colors.grey}
          value={input ? input : ''}
          onChangeText={value => setInput(value)}
          onSubmitEditing={() => input.length && search()}
          returnKeyType={'search'}
        />
        <TouchableOpacity
          onPress={() => setInput('')}
          activeOpacity={0.7}
          style={styles.clearWrapper}>
          {input ? <IcClose width={ms(24)} height={mvs(24)} /> : null}
        </TouchableOpacity>
      </View>
      {Filter && (
        <TouchableOpacity
          onPress={onPress}
          style={styles.filter}
          activeOpacity={0.7}>
          <IcFilter width={ms(24)} height={mvs(24)} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const getStyles = theme => StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    // backgroundColor: colors.white,
    height: mvs(58),
    marginBottom: mvs(16),
  },
  box: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'relative',
    backgroundColor: theme ? colorsDark.lightgrey : colors.lightgrey,
    borderRadius: ms(10),
    paddingLeft: ms(20),
    paddingRight: ms(40),
  },
  input: {
    // paddingLeft: 54,
    // paddingRight: 55,
    flex: 10,
    fontSize: ms(18),
    color: theme ? colorsDark.black : colors.black,
    alignItems: 'center',
    height: mvs(60),
    fontFamily: 'Poppins-Regular',
    marginRight: ms(10),
  },
  filter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: ms(56),
    height: mvs(56),
    backgroundColor: colors.default,
    borderRadius: ms(10),
    marginLeft: ms(16),
  },
  clearWrapper: {
    width: ms(30),
    height: mvs(30),
    position: 'absolute',
    top: mvs(14),
    right: ms(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  hamburgerWrapper: {
    zIndex: 1,
    width: ms(32),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default SearchBar;
