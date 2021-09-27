import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {SearchBar, ProductCard, Header, EmptyPage} from '../../components';
import {colors, getData, usePrevious} from '../../utils';
import {connect, useDispatch} from 'react-redux';
import {getWishlist} from '../../redux/action/WishlistAction';

const WishlistPage = ({
  navigation,
  getWishlistResult,
  getWishlistError,
  getWishlistLoading,
  deleteWishlistResult,
}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData('user').then(res => {
        if (res) {
          dispatch(getWishlist(res.uid));
        }
      });
    });
    return unsubscribe;
  }, []);

  // useEffect(() => {
  //     getData('user').then(res => {
  //       if (res) {
  //         dispatch(getWishlist(res.uid));
  //       }
  //     });
  // }, []);

  const prevDeleteWishlistResult = usePrevious(deleteWishlistResult);
  useEffect(() => {
    const unsubscribe = () => {
      console.log('delete wish', deleteWishlistResult);
    if (
      deleteWishlistResult !== false &&
      deleteWishlistResult !== prevDeleteWishlistResult
    ) {
      console.log('hadeeh', deleteWishlistResult);
      getData('user').then(res => {
        if (res) {
          dispatch(getWishlist(res.uid));
        }
      });
    }
    }
    return unsubscribe
  }, [deleteWishlistResult]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header label="Favorit" />
      <SearchBar />
        {getWishlistResult ? (
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
          {Object.keys(getWishlistResult.productList).map(key => {
            const product = getWishlistResult.productList[key];
            return (
              <ProductCard
                key={key}
                id={key}
                image={{uri: product.image[0]}}
                name={product.name}
                price={product.price}
                weight={product.weight}
                rest={product}
                love={true}
                onNavigate={() =>
                  navigation.navigate('ProductPage', {
                    productData: product,
                    id: key,
                    love: true,
                  })
                }
              />
            );
          })}
          </ScrollView>
        ) : getWishlistLoading ? (
          <Text>LOADING....</Text>
        ) : getWishlistError ? (
          <Text>{getWishlistError}</Text>
        ) : (
          <EmptyPage illustration="EmptyWishlist" text="Wishlist Anda Kosong" />
        )}
    </View>
  );
};

const mapStateToProps = state => ({
  setWishlistLoading: state.WishlistReducer.setWishlistLoading,
  setWishlistResult: state.WishlistReducer.setWishlistResult,
  setWishlistError: state.WishlistReducer.setWishlistError,

  getWishlistLoading: state.WishlistReducer.getWishlistLoading,
  getWishlistResult: state.WishlistReducer.getWishlistResult,
  getWishlistError: state.WishlistReducer.getWishlistError,

  deleteWishlistLoading: state.WishlistReducer.loading,
  deleteWishlistResult: state.WishlistReducer.data,
  deleteWishlistError: state.WishlistReducer.errorMessage,
});

export default connect(mapStateToProps, null)(WishlistPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
  },
  content: {
    // height:698,
    paddingHorizontal: 8,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
