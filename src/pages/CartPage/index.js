import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import CartItem from './CartItem';
import {colors} from '../../utils';
import {ScrollView} from 'react-native-gesture-handler';
import {
  ProductDummy1,
  ProductDummy2,
  ProductDummy3,
  ProductDummy4,
} from '../../assets';
import { EmptyPage, Header } from '../../components';

const CartPage = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.white} />
      <Header label="Keranjang Saya"/>
      {/* <EmptyPage illustration="EmptyCart" text="Keranjang Anda Kosong"/> */}
      <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}>
        <CartItem item="Kakap Putih" price="Rp 40,000" image={ProductDummy1} />
        <CartItem
          item="Kerapu Cantang"
          price="Rp 60,000"
          image={ProductDummy2}
        />
        <CartItem item="Lobster" price="Rp 120,000" image={ProductDummy3} />
        <CartItem item="Kepiting" price="Rp 80,000" image={ProductDummy4} />
      </ScrollView>
      <View style={styles.totalContainer}>
        <Text style={styles.totalLabel}>Total:</Text>
        <Text style={styles.totalPrice}>Rp85,0000</Text>
      </View>
    </View>
  );
};

export default CartPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  totalContainer: {
    justifyContent: 'space-between',
    backgroundColor: colors.grey,
    flexDirection: 'row',
    paddingTop: 17,
    paddingBottom: 15,
    paddingHorizontal: 14,
  },
  totalLabel: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.black,
    paddingLeft: 11,
  },
  totalPrice: {
    fontSize: 24,
    fontFamily: 'Poppins-SemiBold',
    color: colors.default,
  },
});
