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
import {colors} from '../../utils';
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

const StorePage = ({
  navigation,
  idCategory,
  keyword,
  idSort,
  rangeMaximum,
  rangeMinimum,
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
    let active = true;
    if (active) {
      dispatch(getCategory());
    }
    return () => {
      active = false
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
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
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
        <FilterProduct setModalOff={setModalOff} type={'Store'}/>
      </Modal>
      <View style={{flex: 1, backgroundColor: colors.white, paddingTop: 9}}>
        <View style={{paddingHorizontal: 20}}>
          {/* Search */}
          <SearchBar onPress={toggleModal} Filter Store type='store'/>
          {/* Slider */}
          <Slider />
        </View>
        {/* Content */}
        <Content onPress={() => navigation.navigate('ProductPage')} />
        <TouchableOpacity
          activeOpacity={0.9}
          style={{position: 'absolute', bottom: 36, right: 36}}
          onPress={() => navigation.navigate('AddProductPage')}>
          <IcFloatButton fill={colors.default} />
        </TouchableOpacity>
      </View>
      {/* Navbar */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
});

const mapStateToProps = state => ({
  idCategory: state.StoreReducer.idCategory,
  keyword: state.StoreReducer.keyword,
  idSort: state.StoreReducer.idSort,
  rangeMaximum: state.StoreReducer.rangeMaximum,
  rangeMinimum: state.StoreReducer.rangeMinimum,
});

export default connect(mapStateToProps, null)(StorePage);
