import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {IcDelete} from '../../assets';
import {colors, usePrevious} from '../../utils';

const Calc = ({setResultCalc}) => {
  const [currentNumber, setCurrentNumber] = useState('');
  const buttons = [
    // 'C',
    // 'D',
    // '/',
    1,
    2,
    3,
    '+',
    4,
    5,
    6,
    '-',
    7,
    8,
    9,
    '×',
    '0',
    '000',
    'D',
    '÷',
    // '=',
  ];

  const handleInput = btnPressed => {
    let lastNum = currentNumber[currentNumber.length - 1];
    if (
      lastNum !== '/' &&
      lastNum !== '*' &&
      lastNum !== '-' &&
      lastNum !== '+'
    ) {
      if (
        btnPressed === '+' ||
        btnPressed === '-' ||
        btnPressed === '×' ||
        btnPressed === '÷'
      ) {
        if (btnPressed === '×') {
          setCurrentNumber(currentNumber + '*');
        } else if (btnPressed === '÷') {
          setCurrentNumber(currentNumber + '/');
        } else {
          setCurrentNumber(currentNumber + btnPressed);
        }
        return;
      }
    }
    switch (btnPressed) {
      case 'D':
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
        if (currentNumber.length === 1) {
          setResultCalc('');
        }
        return;
    }
    if (
      !(
        ((btnPressed === '0' || btnPressed === '000') &&
          currentNumber.length === 0) ||
        ((btnPressed === '0' || btnPressed === '000') &&
          (lastNum === '/' ||
            lastNum === '*' ||
            lastNum === '-' ||
            lastNum === '+')) ||
        ((btnPressed === '+' ||
          btnPressed === '-' ||
          btnPressed === '×' ||
          btnPressed === '÷') &&
          (lastNum === '/' ||
            lastNum === '*' ||
            lastNum === '-' ||
            lastNum === '+'))
      )
    ) {
      console.log(`🚀 --------Here------------`);
      setCurrentNumber(currentNumber + btnPressed);
    } else if (
      (btnPressed === '0' || btnPressed === '000') &&
      (lastNum === '/' || lastNum === '*' || lastNum === '-' || lastNum === '+')
    ) {
      setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
      return;
    }
  };
  const prevCurrentNumber = usePrevious(currentNumber);
  useEffect(() => {
    if (
      currentNumber !== undefined &&
      currentNumber !== NaN &&
      currentNumber !== Infinity &&
      currentNumber.length !== 0 &&
      !currentNumber.includes('0/0') &&
      currentNumber !== prevCurrentNumber
    ) {
      calculate();
    }
  }, [currentNumber]);

  const calculate = () => {
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      lastArr === '/' ||
      lastArr === '*' ||
      lastArr === '-' ||
      lastArr === '+' ||
      lastArr === '.'
    ) {
      setCurrentNumber(currentNumber);
    } else {
      let result = eval(currentNumber).toString();
      setCurrentNumber(result);
      setResultCalc(result);
      return;
    }
  };

  return (
    <View style={{height: '120%'}}>
      <View style={styles.buttons}>
        {buttons.map(btn => (
          <TouchableOpacity
            key={btn}
            style={[styles.button, {backgroundColor: colors.white}]}
            onPress={() => handleInput(btn)}>
            {btn === 'D' ? (
              <IcDelete width={32} height={32} />
            ) : btn === '/' ||
              btn === '×' ||
              btn === '-' ||
              btn === '÷' ||
              btn === '+' ? (
              <Text style={[styles.textButton, {color: colors.default}]}>
                {btn}
              </Text>
            ) : (
              <Text style={[styles.textButton]}>{btn}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  results: {
    backgroundColor: '#f5f5f5',
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  resultText: {
    maxHeight: 45,
    color: '#FF6666',
    margin: 15,
    fontSize: 35,
  },
  buttons: {
    width: '100%',
    height: '35%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    borderColor: '#e5e5e5',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '24%',
    minHeight: '54%',
    flex: 2,
  },
  textButton: {
    // color: '#7c7c7c',
    color: colors.black,
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
  },
});
export default Calc;
