import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {IcMan, IcWoman} from '../../assets';
import {Gap} from '../../components';
import {colors} from '../../utils';

const GenderModal = ({childToParent}) => {
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

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    backgroundColor: colors.white,
    width: '80%',
    height: 'auto',
  },
  text: {
    fontSize: 18,
    fontFamily: 'Poppins-Medium',
    color: colors.black,
    paddingLeft: 20,
  },
  menuWrapper: {
    flexDirection: 'row',
  },
});
