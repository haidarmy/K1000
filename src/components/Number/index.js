import React from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import NumberFormat from 'react-number-format';

const Number = ({number, textStyle}) => {
  return (
    <NumberFormat
      value={number}
      thousandSeparator="."
      decimalSeparator=","
      prefix="Rp "
      renderText={value => <Text style={textStyle}>{value}</Text>}
      displayType="text"
    />
  );
};

export default Number;

const styles = StyleSheet.create({});
