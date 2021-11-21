import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {connect, useDispatch} from 'react-redux';
import {SearchBar, Header, Gap, OrderItem} from '../../components';
import {getListOrder} from '../../redux/action/OrderAction';
import {colors, getData} from '../../utils';
import Content from './Content';

const renderTabBar = props => (
  <TabBar
    {...props}
    pressColor={colors.white}
    scrollEnabled
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? colors.default : colors.grey,
          margin: 5,
        }}>
        {route.title}
      </Text>
    )}
    indicatorStyle={{backgroundColor: colors.default}}
    style={{backgroundColor: colors.white}}
    tabStyle={{width: 'auto'}}
  />
);

const Pending = ({jumpTo, keyword}) => (
  <View style={{flex: 1, backgroundColor: colors.white}}>
    <Content status="pending" jumpTo={jumpTo} keyword={keyword}/>
  </View>
);

const Packed = ({jumpTo, keyword}) => (
  <View style={{flex: 1, backgroundColor: colors.white}}>
    <Content status="packed" jumpTo={jumpTo} keyword={keyword}/>
  </View>
);
const Shipped = ({jumpTo, keyword}) => (
  <View style={{flex: 1, backgroundColor: colors.white}}>
    <Content status="shipped" jumpTo={jumpTo} keyword={keyword}/>
  </View>
);

const Finished = ({jumpTo, keyword}) => (
  <View style={{flex: 1, backgroundColor: colors.white}}>
    <Content status="finished" jumpTo={jumpTo} keyword={keyword}/>
  </View>
);

const Canceled = ({jumpTo, keyword}) => (
  <View style={{flex: 1, backgroundColor: colors.white}}>
    <Content status="cancel" jumpTo={jumpTo} keyword={keyword}/>
  </View>
);

const SellingPage = ({navigation}) => {
  const [keyword, setKeyword] = useState('')
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'pending', title: 'Belum Bayar'},
    {key: 'packed', title: 'Dikemas'},
    {key: 'shipped', title: 'Dikirim'},
    {key: 'finished', title: 'Selesai'},
    {key: 'canceled', title: 'Dibatalkan'},
  ]);

  const searchSelling = (key) => {
    setKeyword(key)
  }

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'pending':
        return <Pending jumpTo={jumpTo} keyword={keyword}/>;
      case 'packed':
        return <Packed jumpTo={jumpTo} keyword={keyword}/>;
      case 'shipped':
        return <Shipped jumpTo={jumpTo} keyword={keyword}/>;
      case 'finished':
        return <Finished jumpTo={jumpTo} keyword={keyword}/>;
      case 'canceled':
        return <Canceled jumpTo={jumpTo} keyword={keyword}/>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header label="Penjualan Saya" onPress={() => navigation.goBack()} />
      <Gap height={10} />
      <SearchBar Store type='sellingPage' searchSelling={searchSelling} />
      <TabView
        renderTabBar={renderTabBar}
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: layout.width}}
      />
    </View>
  );
};

export default SellingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 20,
  },
});
