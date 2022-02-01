import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {colors, colorsDark, getData} from '../../utils';
import {SearchBar, FilterProduct, Header, EmptyPage} from '../../components';
import Content from './Content';
import Slider from './Slider';
import Modal from 'react-native-modal';
import {IcFloatButton} from '../../assets';
import {connect, useDispatch} from 'react-redux';
import {
  deleteParameterStoreProduct,
  getStoreProduct,
} from '../../redux/action/StoreAction';
import {getCategory} from '../../redux/action/CategoryAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const StorePage = ({
  navigation,
  idCategory,
  keyword,
  idSort,
  rangeMaximum,
  rangeMinimum,
  theme
}) => {
  const dispatch = useDispatch();
  const [isModalVisible, setModalVisible] = useState(false);
  const styles = getStyles(theme);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const setModalOff = childdata => {
    setModalVisible(childdata);
  };

  useEffect(() => {
    let active = true;
    if (active) {
      dispatch(getCategory());
    }
    return () => {
      active = false;
      dispatch(deleteParameterStoreProduct());
    };
  }, []);

  useEffect(() => {
    dispatch(
      getStoreProduct(idCategory, keyword, idSort, rangeMaximum, rangeMinimum),
    );
  }, [idCategory, keyword, idSort, rangeMinimum, rangeMaximum]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle={theme ? 'light-content' : 'dark-content'} backgroundColor={theme ? colorsDark.white : colors.white} />
      <Header
        label="Toko Saya"
        onPress={() => navigation.navigate('ProfilePage')}
      />
      {/* <EmptyPage illustration="EmptyProduct" text="Toko Anda Kosong" /> */}
      <Modal
        statusBarTranslucent
        style={{margin: 0, justifyContent: 'flex-end'}}
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        onBackButtonPress={() => setModalVisible(false)}
        swipeDirection="down">
        <FilterProduct setModalOff={setModalOff} type={'Store'} />
      </Modal>
      <View style={styles.content}>
        <View style={{paddingHorizontal: ms(20)}}>
          {/* Search */}
          <SearchBar onPress={toggleModal} Filter Store type="store" />
          {/* Slider */}
          <Slider />
        </View>
        {/* Content */}
        <Content onPress={() => navigation.navigate('ProductPage')} />
        <TouchableOpacity
          activeOpacity={0.9}
          style={styles.plusWrapper}
          onPress={() => navigation.navigate('AddProductPage')}>
          <IcFloatButton fill={colors.default} />
        </TouchableOpacity>
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
    plusWrapper: {position: 'absolute', bottom: mvs(36), right: ms(36)},
  });

const mapStateToProps = state => ({
  idCategory: state.StoreReducer.idCategory,
  keyword: state.StoreReducer.keyword,
  idSort: state.StoreReducer.idSort,
  rangeMaximum: state.StoreReducer.rangeMaximum,
  rangeMinimum: state.StoreReducer.rangeMinimum,
  theme: state.DarkModeReducer.isDarkMode,
});

export default connect(mapStateToProps, null)(StorePage);
