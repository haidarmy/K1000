import React, {useEffect, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableWithoutFeedback,
  TouchableOpacity,
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
import {colors, getData, storeData} from '../../utils';
import {Gap} from '..';
import { getUserInfo } from '../../redux/action/UserAction';
import { useDispatch } from 'react-redux';

const SideBarDrawer = props => {
  const dispatch = useDispatch()
  const [profile, setProfile] = useState(false)
  useEffect(() => {
    getData('user').then(res => {
      dispatch(getUserInfo(res.uid))
      console.log(res);
      setProfile({
        ...profile,
        uid: res.uid,
        avatar: res.avatar,
        balance: res.balance,
        name: res.name ? res.name : '',
      });
    })
  }, [])
  const [selectedId, setSelectedId] = useState('Produk');
  const listArray = [
    {icon: IcProduct, title: 'Produk'},
    {icon: IcSell, title: 'Penjualan'},
    {icon: IcCashWd, title: 'Tarik Dana'},
  ];

  const Icon = ({title, icon}) => {
    switch (title) {
      case 'Produk':
        return <IcProduct fill={icon} width={24} height={24} />;
      case 'Penjualan':
        return <IcSell fill={icon} width={24} height={24} />;
      case 'Tarik Dana':
        return <IcCashWd fill={icon} width={24} height={24} />;
      default:
        break;
    }
  };

  const Item = ({title, onPress, backgroundColor, color, icon, index}) => (
    <TouchableOpacity onPress={() => onPress(index)} style={styles.itemWrapper(backgroundColor)}>
      <Icon title={title} icon={icon} />
      <Gap width={20} />
      <Text style={styles.text('Poppins-Regular', 18, color)}>{title}</Text>
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
    <View style={{flex: 1, padding: 20}}>
      <View style={{flex: 0.3}}>
        <IcHamburger
          width={24}
          height={24}
          onPress={(props) => props.navigation.closeDrawer()}
        />
        <Gap height={40} />
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={{uri:'data:image/png;base64,' + profile.avatar}}
            style={styles.avatar}
          />
          <Gap width={20} />
          <Text style={[styles.text('Poppins-SemiBold', 20), {flex: 1}]}>
            {profile.name}
          </Text>
        </View>
        <Gap height={30} />
        <View
          style={styles.balance}>
          <Text style={styles.text()}>Saldo</Text>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={IcCash}
              style={{width: 26, height: 20, alignSelf: 'center'}}
            />
            <Gap width={5} />
            <Text style={styles.text('Poppins-SemiBold', 16, colors.default)}>
             Rp {profile.balance}
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 0.7}}>
        <Gap height={30} />
        <FlatList
          data={listArray}
          renderItem={renderItem}
          keyExtractor={item => item.title}
        />
      </View>
    </View>
    // <DrawerContentScrollView {...props}>
    //   <DrawerItemList {...props} />
    //   <DrawerItem
    //     label="Help"
    //     onPress={() => Linking.openURL('https://mywebsite.com/help')}
    //   />
    // </DrawerContentScrollView>
  );
};

export default SideBarDrawer;

const styles = StyleSheet.create({
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 16,
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  itemWrapper: (backgroundColor) => ({
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: backgroundColor,
    height: 50,
    width: '100%',
    padding: 10,
    borderRadius: 12,
  }),
  avatar: {
    width: 80,
    height: 80,
    borderWidth: 2,
    borderColor: colors.default,
    borderRadius: 40,
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});
