import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';

import {colors} from '../../theme/colors';

interface PrimaryButtonProps {
  title: string;
  onPress: () => void;
}

export const PrimaryButton = ({title, onPress}: PrimaryButtonProps) => (
  <TouchableOpacity activeOpacity={0.86} onPress={onPress} style={styles.root}>
    <Text style={styles.text}>{title}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 24,
    minHeight: 58,
    justifyContent: 'center',
    shadowColor: colors.greenDark,
    shadowOffset: {width: 0, height: 12},
    shadowOpacity: 0.24,
    shadowRadius: 18,
    elevation: 5,
  },
  text: {
    color: colors.white,
    fontSize: 17,
    fontWeight: '800',
  },
});
