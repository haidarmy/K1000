import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import {colors, useForm} from '../../utils';
import {IcSwiper} from '../../assets';
import SubmitButton from '../SubmitButton';
import Categories from '../Categories';
import {connect, useDispatch} from 'react-redux';
import {
  getProductByRange,
  getProductBySort,
} from '../../redux/action/ProductAction';
import {objectExpression} from '@babel/types';

const ShippingModal = ({
  setModalOff,
  shippingLoading,
  shippingResult,
  shippingError,
  setSubtotalToParent,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    Object.values(shippingResult).map(item => {
      return Object.keys(Object.values(item.costs)).map(key =>
        console.log(Object.values(item)[1]),
      );
    });
    // console.log(
    //   'shippingResult Service',
    //   Object.values(shippingResult).map(item => {
    //     return Object.keys(Object.values(item.costs)).map(
    //       key => Object.values(item.costs)[key].service,
    //     );
    //   }),
    // );
    // console.log(
    //   'shippingResult cost',
    //   Object.values(shippingResult).map(item => {
    //     return Object.keys(Object.values(item.costs)).map(
    //       key => console.log(Object.values(item.costs)[key].cost[0])
    //     );
    //   }),
    // );
  }, [shippingResult]);

  const onSubmit = (exp, service, cost, etd) => {
    setModalOff(toggle => !toggle);
    setSubtotalToParent(exp, service, cost, etd);
  };
  return (
    <View>
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.container}>
        <View style={styles.swiper}>
          <IcSwiper width={50} height={6} />
        </View>
        {shippingResult ? (
          Object.values(shippingResult).map(item => {
            return Object.keys(Object.values(item.costs)).map(key => (
              <TouchableOpacity
                key={key}
                activeOpacity={0.7}
                style={styles.shippingCourier}
                onPress={() =>
                  onSubmit(
                    Object.values(item)[1],
                    `${Object.values(item.costs)[key].service} (Rp ${
                      Object.values(item.costs)[key].cost[0].value
                    })`,
                    Object.values(item.costs)[key].cost[0].value,
                    `Estimasi tiba dalam ${
                      Object.values(item.costs)[key].cost[0].etd.includes(
                        'HARI',
                      )
                        ? Object.values(item.costs)[key].cost[0].etd
                        : Object.values(item.costs)[key].cost[0].etd +
                          ' ' +
                          'HARI'
                    }`,
                  )
                }>
                <Text
                  style={styles.text('Poppins-SemiBold', 18, colors.default)}>
                  {Object.values(item)[1]}
                </Text>
                <Text style={styles.text('Poppins-SemiBold', 16)}>
                  {`${Object.values(item.costs)[key].service} (Rp ${
                    Object.values(item.costs)[key].cost[0].value
                  })`}
                </Text>
                <Text style={styles.text()}>{`Estimasi tiba dalam ${
                  Object.values(item.costs)[key].cost[0].etd.includes('HARI')
                    ? Object.values(item.costs)[key].cost[0].etd
                    : Object.values(item.costs)[key].cost[0].etd + ' ' + 'HARI'
                }`}</Text>
              </TouchableOpacity>
            ));
          })
        ) : shippingLoading ? (
          <View style={{flex: 1, backgroundColor: colors.white}}>
            <Text>LOADING....</Text>
          </View>
        ) : shippingError ? (
          <Text>{shippingError}</Text>
        ) : null}
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 'auto',
    // marginBottom: -50,
    backgroundColor: colors.white,
    paddingTop: 30,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: 16,
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = 14,
    color = colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  shippingCourier: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.grey,
    paddingVertical: 10,
    paddingHorizontal: 5,
  },
});

const mapStateToProps = state => ({
  shippingLoading: state.ShippingReducer?.shippingLoading,
  shippingResult: state.ShippingReducer?.shippingResult,
  shippingError: state.ShippingReducer?.shippingError,
});

export default connect(mapStateToProps, null)(ShippingModal);
