import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcMan, IcWoman} from '../../assets';
import {Gap} from '../../components';
import {colors, colorsDark} from '../../utils';
import {s, vs, ms, mvs} from 'react-native-size-matters';
import { useSelector } from 'react-redux';

const GenderModal = ({childToParent}) => {
  const theme = useSelector(state => state.DarkModeReducer.isDarkMode);
  const styles = getStyles(theme);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <View>
          <TouchableOpacity activeOpacity={0.7} style={styles.menuWrapper} onPress={() => childToParent('Laki-Laki')}>
            <IcMan fill={colors.default} width={24} height={24}/>
            <Text style={styles.text}>Laki-Laki</Text>
          </TouchableOpacity>
          <Gap height={24} />
          <TouchableOpacity activeOpacity={0.7} style={styles.menuWrapper} onPress={() => childToParent('Perempuan')}>
            <IcWoman fill={colors.default} width={24} height={24}/>
            <Text style={styles.text}>Perempuan</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default GenderModal;

const getStyles = theme => StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: mvs(28),
    backgroundColor: theme ? colorsDark.white : colors.white,
    width: '80%',
    height: 'auto',
  },
  text: {
    fontSize: ms(18),
    fontFamily: 'Poppins-Medium',
    color: colors.grey,
    paddingLeft: s(20),
  },
  menuWrapper: {
    flexDirection: 'row',
  },
});
