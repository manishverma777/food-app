import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {colors} from '../theme/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

const menus = [
  {
    key: 'home',
    label: 'Home',
    activeIcon: 'home',
    inactiveIcon: 'home-outline',
  },
  {
    key: 'search',
    label: 'Search',
    activeIcon: 'search',
    inactiveIcon: 'search-outline',
  },
  {
    key: 'favorites',
    label: 'Favorites',
    activeIcon: 'heart',
    inactiveIcon: 'heart-outline',
  },
  {
    key: 'cart',
    label: 'Cart',
    activeIcon: 'cart',
    inactiveIcon: 'cart-outline',
  },
  {
    key: 'profile',
    label: 'Profile',
    activeIcon: 'person',
    inactiveIcon: 'person-outline',
  },
];

export const CustomDrawer = ({
  visible,
  activeTab,
  onClose,
  onNavigate,
}: any) => {
  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <View style={styles.drawer}>
        {menus.map(item => (
         <TouchableOpacity
  key={item.key}
  style={styles.item}
  onPress={() => {
    onNavigate(item.key as any);
    onClose();
  }}
>
  <Ionicons
 name={activeTab === item.key ? item.activeIcon : item.inactiveIcon as any}
  size={22}
  color={activeTab === item.key ? colors.green : '#666'}

  />

  <Text
    style={[
      styles.text,
      activeTab === item.key && styles.activeText,
    ]}
  >
    {item.label}
  </Text>
</TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity
        style={styles.backdrop}
        onPress={onClose}
      />
    </View>
  );
};

const styles = StyleSheet.create({
   overlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  flexDirection: 'row',
  zIndex: 9999,
  },
 drawer: {
  width: 260,
  height: '100%',
  backgroundColor: '#fff',
  paddingTop: 60,
  elevation: 20,
},
  backdrop: {
    flex: 1,
  },
item: {
  padding: 20,
  flexDirection: 'row',
  alignItems: 'center',
  gap: 15,
},
  text: {
    fontSize: 16,
    fontWeight: '600',
  },
  activeText: {
    color: colors.green,
  },
});