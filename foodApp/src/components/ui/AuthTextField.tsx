import React from 'react';
import {StyleSheet, Text, TextInput, TextInputProps, View} from 'react-native';

import {colors} from '../../theme/colors';

interface AuthTextFieldProps extends TextInputProps {
  icon: string;
  trailingIcon?: string;
}

export const AuthTextField = ({
  icon,
  trailingIcon,
  style,
  ...props
}: AuthTextFieldProps) => (
  <View style={styles.root}>
    <Text style={styles.icon}>{icon}</Text>
    <TextInput
      placeholderTextColor="#777C76"
      style={[styles.input, style]}
      {...props}
    />
    {trailingIcon ? <Text style={styles.trailing}>{trailingIcon}</Text> : null}
  </View>
);

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 248, 0.94)',
    borderRadius: 28,
    flexDirection: 'row',
    minHeight: 62,
    paddingHorizontal: 18,
  },
  icon: {
    color: colors.gray,
    fontSize: 22,
    marginRight: 12,
    width: 24,
  },
  input: {
    color: colors.dark,
    flex: 1,
    fontSize: 17,
    fontWeight: '500',
    paddingVertical: 0,
  },
  trailing: {
    color: colors.gray,
    fontSize: 20,
    marginLeft: 10,
  },
});
