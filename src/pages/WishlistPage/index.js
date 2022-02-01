import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView, StatusBar} from 'react-native';
import {
  SearchBar,
  ProductCard,
  Header,
  EmptyPage,
  ProductSkeleton,
} from '../../components';
import {colors, colorsDark, getData, usePrevious} from '../../utils';
import {connect, useDispatch, useSelector} from 'react-redux';
import {getWishlist} from '../../redux/action/WishlistAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import EmptySearchResult from '../../components/EmptySearchResult';

const WishlistPage = ({
  navigation,
  getWishlistResult,
  getWishlistError,
  getWishlistLoading,
  deleteWishlistResult,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [uid, setUid] = useState('');
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData('user').then(res => {
        if (res) {
          setUid(res.uid);
          dispatch(getWishlist(res.uid));
        }
      });
    });
    return unsubscribe;
  }, []);

  const prevDeleteWishlistResult = usePrevious(deleteWishlistResult);
  useEffect(() => {
    const unsubscribe = () => {
      console.log('delete wish', deleteWishlistResult);
      if (
        deleteWishlistResult !== false &&
        deleteWishlistResult !== prevDeleteWishlistResult
      ) {
        getData('user').then(res => {
          if (res) {
            dispatch(getWishlist(res.uid));
          }
        });
      }
    };
    return unsubscribe;
  }, [deleteWishlistResult]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} backgroundColor={theme ? colorsDark.white : colors.white} />
      <Header label="Favorit" />
      <View style={{paddingHorizontal: ms(18)}}>
        <SearchBar type="wishlist" id={uid} />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        {Object.values(getWishlistResult ?? {}).length > 0 ? (
          Object.keys(getWishlistResult.productList).map(key => {
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
          })
        ) : getWishlistResult?.length === 0 ? (
          <EmptySearchResult />
        ) : getWishlistLoading ? (
          <ProductSkeleton />
        ) : getWishlistError ? (
          <Text>{getWishlistError}</Text>
        ) : uid ? (
          <EmptyPage illustration="EmptyWishlist" text="Wishlist Anda Kosong" />
        ) : null}
      </ScrollView>
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

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    backgroundColor: theme ? colorsDark.white : colors.white,
  },
  content: {
    paddingHorizontal: ms(18),
    // height:698,
    // paddingHorizontal: 8,
    backgroundColor: theme ? colorsDark.white : colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
