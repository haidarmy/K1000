import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  KeyboardAvoidingView,
  RefreshControl,
} from 'react-native';
import {colors, colorsDark, useForm} from '../../utils';
import {IcSwiper} from '../../assets';
import SubmitButton from '../SubmitButton';
import Categories from '../Categories';
import {connect, useDispatch, useSelector} from 'react-redux';
import {
  getProductByRange,
  getProductBySort,
} from '../../redux/action/ProductAction';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import {Number} from '..';

const ShippingModal = ({
  setModalOff,
  shippingLoading,
  shippingResult,
  shippingError,
  setSubtotalToParent,
}) => {
  const dispatch = useDispatch();
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);

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
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={shippingLoading}
            colors={[colors.default]}
            progressBackgroundColor={colors.white}
            progressViewOffset={-10}
          />
        }
        showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.swiper}>
            <IcSwiper width={ms(50)} height={mvs(6)} />
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
                      `${Object.values(item.costs)[key].service}`,
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
                    style={styles.text(
                      'Poppins-SemiBold',
                      ms(18),
                      colors.default,
                    )}>
                    {Object.values(item)[1]}
                  </Text>
                  <Text style={styles.text('Poppins-SemiBold', ms(16))}>
                    {`${Object.values(item.costs)[key].service}`}
                    <Text> (</Text>
                    <Number
                      number={Object.values(item.costs)[key].cost[0].value}
                    />
                    <Text>)</Text>
                  </Text>
                  <View></View>
                  <Text style={styles.text()}>{`Estimasi tiba dalam ${
                    Object.values(item.costs)[key].cost[0].etd.includes('HARI')
                      ? Object.values(item.costs)[key].cost[0].etd
                      : Object.values(item.costs)[key].cost[0].etd +
                        ' ' +
                        'HARI'
                  }`}</Text>
                </TouchableOpacity>
              ));
            })
          ) : shippingLoading ? (
            <></>
          ) : shippingError ? (
            <Text>{shippingError}</Text>
          ) : null}
        </View>
      </ScrollView>
    </View>
  );
};

const getStyles = theme => StyleSheet.create({
  container: {
    height: 'auto',
    // marginBottom: -50,
    backgroundColor: theme ? colorsDark.white : colors.white,
    paddingTop: mvs(30),
    paddingHorizontal: ms(20),
    paddingVertical: mvs(16),
    borderTopLeftRadius: ms(10),
    borderTopRightRadius: ms(10),
  },
  swiper: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginBottom: mvs(16),
    marginTop: mvs(8),
  },
  text: (
    fontFamily = 'Poppins-Regular',
    fontSize = ms(14),
    color = theme ? colorsDark.black : colors.black,
  ) => ({
    fontFamily: fontFamily,
    fontSize: fontSize,
    color: color,
  }),
  shippingCourier: {
    borderBottomWidth: ms(0.5),
    borderBottomColor: theme ? colorsDark.grey : colors.grey,
    paddingVertical: mvs(10),
    paddingHorizontal: ms(5),
  },
});

const mapStateToProps = state => ({
  shippingLoading: state.ShippingReducer?.shippingLoading,
  shippingResult: state.ShippingReducer?.shippingResult,
  shippingError: state.ShippingReducer?.shippingError,
});

export default connect(mapStateToProps, null)(ShippingModal);
