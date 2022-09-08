import React, {useEffect, useState} from 'react';
import {
  StatusBar,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {SceneMap, TabBar, TabView} from 'react-native-tab-view';
import {connect, useDispatch, useSelector} from 'react-redux';
import {SearchBar, Header, Gap, OrderItem} from '../../components';
import {getListOrder} from '../../redux/action/OrderAction';
import {colors, colorsDark, getData} from '../../utils';
import Content from './Content';
import {s, vs, ms, mvs} from 'react-native-size-matters';

const renderTabBar = props => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  return (
    <TabBar
      {...props}
      pressColor='rgba(0,0,0,0)'
      scrollEnabled
      renderLabel={({route, focused, color}) => (
        <Text
          style={{
            fontFamily: 'Poppins-Medium',
            color: focused ? colors.default : colors.grey,
            margin: ms(5),
          }}>
          {route.title}
        </Text>
      )}
      indicatorStyle={{backgroundColor: colors.default}}
      style={{backgroundColor: theme ? colorsDark.white : colors.white}}
      tabStyle={{width: 'auto'}}
    />
  );
};

const Pending = ({jumpTo, keyword, theme, setTab}) => (
  <View
    style={{flex: 1, backgroundColor: theme ? colorsDark.white : colors.white}}>
    <Content status="pending" jumpTo={jumpTo} keyword={keyword} setTab={setTab} />
  </View>
);

const Packed = ({jumpTo, keyword, theme, setTab}) => (
  <View
    style={{flex: 1, backgroundColor: theme ? colorsDark.white : colors.white}}>
    <Content status="packed" jumpTo={jumpTo} keyword={keyword} setTab={setTab} />
  </View>
);
const Shipped = ({jumpTo, keyword, theme, setTab}) => (
  <View
    style={{flex: 1, backgroundColor: theme ? colorsDark.white : colors.white}}>
    <Content status="shipped" jumpTo={jumpTo} keyword={keyword} setTab={setTab} />
  </View>
);

const Finished = ({jumpTo, keyword, theme, setTab}) => (
  <View
    style={{flex: 1, backgroundColor: theme ? colorsDark.white : colors.white}}>
    <Content status="finished" jumpTo={jumpTo} keyword={keyword} setTab={setTab} />
  </View>
);

const Canceled = ({jumpTo, keyword, theme, setTab}) => (
  <View
    style={{flex: 1, backgroundColor: theme ? colorsDark.white : colors.white}}>
    <Content status="cancel" jumpTo={jumpTo} keyword={keyword} setTab={setTab} />
  </View>
);

const SellingPage = ({navigation, route}) => {
  const setTab = route?.params?.tab
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [keyword, setKeyword] = useState('');
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'pending', title: 'Belum Bayar'},
    {key: 'packed', title: 'Dikemas'},
    {key: 'shipped', title: 'Dikirim'},
    {key: 'finished', title: 'Selesai'},
    {key: 'canceled', title: 'Dibatalkan'},
  ]);

  const searchSelling = key => {
    setKeyword(key);
  };

  const renderScene = ({route, jumpTo}) => {
    switch (route.key) {
      case 'pending':
        return <Pending jumpTo={jumpTo} keyword={keyword} theme={theme} setTab={setTab}/>;
      case 'packed':
        return <Packed jumpTo={jumpTo} keyword={keyword} theme={theme} setTab={setTab}/>;
      case 'shipped':
        return <Shipped jumpTo={jumpTo} keyword={keyword} theme={theme} setTab={setTab}/>;
      case 'finished':
        return <Finished jumpTo={jumpTo} keyword={keyword} theme={theme} setTab={setTab}/>;
      case 'canceled':
        return <Canceled jumpTo={jumpTo} keyword={keyword} theme={theme} setTab={setTab}/>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={theme ? 'light-content' : 'dark-content'}
        backgroundColor={theme ? colorsDark.white : colors.white}
      />
      <Header label="Penjualan Saya" onPress={() => navigation.goBack()} />
      <Gap height={mvs(10)} />
      <View style={{paddingHorizontal: ms(20)}}>
        <SearchBar Store type="sellingPage" searchSelling={searchSelling} />
      </View>
      <TabView
        style={{marginHorizontal: ms(20)}}
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

const getStyles = theme =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme ? colorsDark.white : colors.white,
      paddingTop: StatusBar.currentHeight,
      // padding: mvs(20),
    },
  });
