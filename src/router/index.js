import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from '../components';
import { AddAddressPage, AddProductPage,AddressPage, CartPage, HomePage, LoginPage, ProductPage, ProfileDetailPage, ProfilePage, SignUpPage, SplashScreen, StorePage, WelcomePage, WishlistPage, SuccessAddToCartPage, CheckoutPage} from '../pages'

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const MainApp = () => {
    return (
        <Tab.Navigator tabBar={props => <BottomNavigation {...props} backBehaviour = "HomePage"/>}>
            <Tab.Screen name="HomePage" component={ HomePage } />
            <Tab.Screen name="CartPage" component={ CartPage } />
            <Tab.Screen name="WishlistPage" component={ WishlistPage }/>
            <Tab.Screen name="ProfilePage" component={ ProfilePage }/>
        </Tab.Navigator>
    )
}


const Router = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name="SplashScreen" component={ SplashScreen } options={{headerShown: false}}/>
            <Stack.Screen name="MainApp" component={ MainApp } options={{headerShown: false}}/>
            <Stack.Screen name="WelcomePage" component={ WelcomePage } options={{headerShown: false}}/>
            <Stack.Screen name="AddAddressPage" component={ AddAddressPage } options={{headerShown: false}}/>
            <Stack.Screen name="AddProductPage" component={ AddProductPage } options={{headerShown: false}}/>
            <Stack.Screen name="AddressPage" component={ AddressPage } options={{headerShown: false}}/>
            <Stack.Screen name="LoginPage" component={ LoginPage } options={{headerShown: false}}/>
            <Stack.Screen name="ProductPage" component={ ProductPage } options={{headerShown: false}}/>
            <Stack.Screen name="CheckoutPage" component={ CheckoutPage } options={{headerShown: false}}/>
            <Stack.Screen name="ProfileDetailPage" component={ ProfileDetailPage } options={{headerShown: false}}/>
            <Stack.Screen name="SignUpPage" component={ SignUpPage } options={{headerShown: false}}/>
            <Stack.Screen name="StorePage" component={ StorePage } options={{headerShown: false}}/>
            <Stack.Screen name="SuccessAddToCartPage" component={ SuccessAddToCartPage } options={{headerShown: false}}/>
        </Stack.Navigator>
    )
}

export default Router;
