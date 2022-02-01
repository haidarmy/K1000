import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {IcDelete} from '../../assets';
import {colors, colorsDark, usePrevious} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const Calc = ({setResultCalc}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
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
          if (currentNumber.length < 10) {
            setCurrentNumber(currentNumber + '*');
          }
        } else if (btnPressed === '÷') {
          if (currentNumber.length < 10) {
            setCurrentNumber(currentNumber + '/');
          }
        } else {
          if (currentNumber.length < 10) {
            setCurrentNumber(currentNumber + btnPressed);
          }
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
      if (currentNumber.length < 10) {
        setCurrentNumber(currentNumber + btnPressed);
      }
    } else if (
      (btnPressed === '0' || btnPressed === '000') &&
      (lastNum === '/' || lastNum === '*' || lastNum === '-' || lastNum === '+')
    ) {
      if (currentNumber.length < 10) {
        setCurrentNumber(currentNumber.substring(0, currentNumber.length - 1));
      }
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
    console.clear()
    console.log(`🚀 → file: Calc.js → line 132 → calculate → currentNumber`, `${currentNumber} - Length: ${currentNumber.length}`)
    let lastArr = currentNumber[currentNumber.length - 1];
    if (
      lastArr === '/' ||
      lastArr === '*' ||
      lastArr === '-' ||
      lastArr === '+' ||
      lastArr === '.'
    ) {
      if (currentNumber.length < 10) {
        setCurrentNumber(currentNumber);
      }
    } else {
      let result = Math.round(eval(currentNumber)).toString();
      if (currentNumber.length < 10) {
        setCurrentNumber(result);
        setResultCalc(result);
      }
      return;
    }
  };

  return (
    <View style={{height: '120%'}}>
      <View style={styles.buttons}>
        {buttons.map(btn => (
          <TouchableOpacity
            key={btn}
            style={[styles.button, {backgroundColor: theme ? colorsDark.white : colors.white}]}
            onPress={() => handleInput(btn)}>
            {btn === 'D' ? (
              <IcDelete width={ms(32)} height={mvs(32)} />
            ) : btn === '/' ||
              btn === '×' ||
              btn === '-' ||
              btn === '÷' ||
              btn === '+' ? (
              <Text style={[styles.textButton, {color: colors.default}]}>
                {btn}
              </Text>
            ) : (
              <Text style={[styles.textButton, {color: theme ? colorsDark.black : colors.black}]}>{btn}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const getStyles = theme => StyleSheet.create({
  results: {
    backgroundColor: '#f5f5f5',
    maxWidth: '100%',
    minHeight: '35%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  resultText: {
    maxHeight: mvs(45),
    color: '#FF6666',
    margin: mvs(15),
    fontSize: ms(35),
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
    color: colors.black,
    fontSize: ms(28),
    fontFamily: 'Poppins-Bold',
  },
});
export default Calc;
