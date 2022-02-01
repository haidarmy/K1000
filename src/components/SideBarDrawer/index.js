import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import {
  AvatarDummy,
  IcCash,
  IcCashWd,
  IcHamburger,
  IcProduct,
  IcSell,
} from '../../assets';
import {colors, colorsDark, getData, storeData} from '../../utils';
import {Gap, Number} from '..';
import {getUserInfo} from '../../redux/action/UserAction';
import {useDispatch, useSelector} from 'react-redux';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {useNavigation} from '@react-navigation/core';

const SideBarDrawer = props => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  const [profile, setProfile] = useState(false);
  useEffect(() => {
    getData('user').then(res => {
      dispatch(getUserInfo(res.uid));
      console.log(res);
      setProfile({
        ...profile,
        uid: res.uid,
        avatar: res.avatar,
        balance: res.balance,
        name: res.name ? res.name : '',
      });
    });
  }, []);
  const [selectedId, setSelectedId] = useState('Produk');
  const listArray = [
    {icon: IcProduct, title: 'Produk'},
    {icon: IcSell, title: 'Penjualan'},
    {icon: IcCashWd, title: 'Tarik Dana'},
  ];

  const Icon = ({title, icon}) => {
    switch (title) {
      case 'Produk':
        return <IcProduct fill={icon} width={ms(24)} height={mvs(24)} />;
      case 'Penjualan':
        return <IcSell fill={icon} width={ms(24)} height={mvs(24)} />;
      case 'Tarik Dana':
        return <IcCashWd fill={icon} width={ms(24)} height={mvs(24)} />;
      default:
        break;
    }
  };

  const Item = ({title, onPress, backgroundColor, color, icon, index}) => (
    <TouchableOpacity
      onPress={() => onPress(index)}
      style={styles.itemWrapper(backgroundColor)}>
      <Icon title={title} icon={icon} />
      <Gap width={ms(20)} />
      <Text style={styles.text('Poppins-Regular', ms(18), color)}>{title}</Text>
    </TouchableOpacity>
  );

  const renderItem = ({item, index}) => {
    const backgroundColor =
      item.title === selectedId ? 'rgba(111, 95, 144, 0.15)' : null;
    const color = item.title === selectedId ? colors.default : colors.grey;
    const icon = item.title === selectedId ? colors.default : colors.grey;
    return (
      <Item
        title={item.title}
        onPress={index => {
          setSelectedId(item.title);
          props.navigation.navigate(props?.state?.routes[index].name);
        }}
        backgroundColor={backgroundColor}
        color={color}
        icon={icon}
        index={index}
      />
    );
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 0.3}}>
        <IcHamburger
          width={ms(24)}
          height={mvs(24)}
          onPress={() => props.navigation.toggleDrawer()}
        />
        <Gap height={mvs(20)} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri: 'data:image/png;base64,' + profile.avatar}}
            style={styles.avatar}
          />
          <Gap width={ms(20)} />
          <Text style={[styles.text('Poppins-SemiBold', ms(20)), {flex: 1}]}>
            {profile.name}
          </Text>
        </View>
        <Gap height={mvs(30)} />
        <View style={styles.balance}>
          <Text style={styles.text()}>Saldo</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={IcCash}
              style={{width: ms(26), height: mvs(20), alignSelf: 'center'}}
            />
            <Gap width={7} />
            <Number
              number={profile.balance}
              textStyle={styles.text(
                'Poppins-SemiBold',
                ms(16),
                colors.default,
              )}
            />
          </View>
        </View>
      </View>
      <View style={{flex: 0.7}}>
        <Gap height={mvs(30)} />
        <FlatList
          data={listArray}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
  );
};

export default SideBarDrawer;

const getStyles = theme => StyleSheet.create({
  container: {
    flex: 1,
    padding: mvs(20),
    backgroundColor: theme ? colorsDark.white : colors.white,
    paddingTop: StatusBar.currentHeight + mvs(20),
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(16),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  itemWrapper: backgroundColor => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: mvs(15),
    backgroundColor: backgroundColor,
    height: mvs(50),
    width: '100%',
    padding: mvs(10),
    borderRadius: ms(10),
  }),
  avatar: {
    width: ms(80),
    height: mvs(80),
    borderWidth: ms(2),
    borderColor: colors.default,
    borderRadius: ms(40),
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
