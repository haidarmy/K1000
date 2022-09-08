import React, {useEffect, useState} from 'react';
import {Dimensions, StatusBar, StyleSheet, View} from 'react-native';
import Modal from 'react-native-modal';
import {ms, mvs} from 'react-native-size-matters';
import {connect, useDispatch} from 'react-redux';
import {FilterProduct, SearchBar} from '../../components';
import {getCategory} from '../../redux/action/CategoryAction';
import {
  getListProduct,
  getProductByKeyword,
} from '../../redux/action/ProductAction';
import {colors, colorsDark} from '../../utils';
import Content from './Content';
import Slider from './Slider';

const HomePage = ({
  navigation,
  idCategory,
  keyword,
  idSort,
  rangeMaximum,
  rangeMinimum,
  theme,
}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setModalOff = childdata => {
    setModalVisible(childdata);
  };

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getListProduct(undefined, keyword));
    dispatch(getProductByKeyword(false));
  }, [dispatch, keyword]);

  useEffect(() => {
    dispatch(
      getListProduct(idCategory, undefined, idSort, rangeMaximum, rangeMinimum),
    );
    console.log(`🚀 → file: index.js → line 49 → useEffect → keyword`, keyword);
  }, [idCategory, idSort, rangeMinimum, rangeMaximum, dispatch, keyword]);

  const styles = getStyles(theme);
  return (
    <View style={styles.container}>
      <Modal
        statusBarTranslucent
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down"
        deviceHeight={Dimensions.get('screen').height}>
        <FilterProduct setModalOff={setModalOff} type={'Home'} />
      </Modal>
      <View style={styles.content}>
        <View style={{paddingHorizontal: ms(20)}}>
          {/* Search */}
          <SearchBar onPress={toggleModal} Filter type="home" />
          {/* Slider */}
          <Slider />
        </View>
        {/* Content */}
        <Content />
      </View>
      {/* Navbar */}
    </View>
  );
};

const getStyles = theme =>
  StyleSheet.create({
    container: {
      backgroundColor: theme ? colorsDark.white : colors.white,
      flex: 1,
      paddingTop: StatusBar.currentHeight,
    },
    content: {
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingTop: mvs(9),
    },
  });

const mapStateToProps = state => ({
  idCategory: state.ProductReducer.idCategory,
  keyword: state.ProductReducer.keyword,
  idSort: state.ProductReducer.idSort,
  rangeMaximum: state.ProductReducer.rangeMaximum,
  rangeMinimum: state.ProductReducer.rangeMinimum,
  theme: state.DarkModeReducer.isDarkMode,
});

export default connect(mapStateToProps, null)(HomePage);
