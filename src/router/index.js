import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {BottomNavigation} from '../components';
import {
  AddAddressPage,
  AddProductPage,
  AddressPage,
  CartPage,
  HomePage,
  LoginPage,
  ProductPage,
  ProfileDetailPage,
  ProfilePage,
  SignUpPage,
  SplashScreen,
  StorePage,
  WelcomePage,
  WishlistPage,
  SuccessAddToCartPage,
  CheckoutPage,
  PaymentPage,
  OrderPage,
  BalancePage,
  SellingPage,
  OrderDetailPage,
  InputResiPage,
  CheckResiPage,
  SuccessWithdrawPage,
  Skeleton,
} from '../pages';
import { colors } from '../utils';
import SideBarDrawer from '../components/SideBarDrawer';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const StoreDrawer = () => {
  return (
    <Drawer.Navigator
      initialRouteName="StorePage"
      drawerType="slide"
      drawerContent={props => <SideBarDrawer {...props}/>}
      overlayColor={'rgba(111, 95, 144, 0.075)'}
      backBehavior='initialRoute'
      >
      <Drawer.Screen name="StorePage" component={StorePage} />
      <Drawer.Screen name="SellingPage" component={SellingPage} />
      <Drawer.Screen name="BalancePage" component={BalancePage} />
    </Drawer.Navigator>
  );
};

const MainApp = () => {
  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomNavigation {...props} backBehaviour="HomePage" />
      )}>
      <Tab.Screen name="HomePage" component={HomePage} />
      <Tab.Screen name="CartPage" component={CartPage} />
      <Tab.Screen name="WishlistPage" component={WishlistPage} />
      <Tab.Screen name="ProfilePage" component={ProfilePage} />
    </Tab.Navigator>
  );
};

const Router = () => {
  return (
    <Stack.Navigator>
       <Stack.Screen
        name="Skeleton"
        component={Skeleton}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MainApp"
        component={MainApp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="StoreDrawer"
        component={StoreDrawer}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WelcomePage"
        component={WelcomePage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAddressPage"
        component={AddAddressPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddProductPage"
        component={AddProductPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddressPage"
        component={AddressPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProductPage"
        component={ProductPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckoutPage"
        component={CheckoutPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentPage"
        component={PaymentPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ProfileDetailPage"
        component={ProfileDetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpPage"
        component={SignUpPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="InputResiPage"
        component={InputResiPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckResiPage"
        component={CheckResiPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderPage"
        component={OrderPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetailPage"
        component={OrderDetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessAddToCartPage"
        component={SuccessAddToCartPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SuccessWithdrawPage"
        component={SuccessWithdrawPage}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Router;
