import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {colors} from '../theme/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import {MainTab} from '../types/navigation';

const tabs = [
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

interface BottomTabsProps {
  activeTab: MainTab;
  cartCount: number;
  favoriteCount: number;
  onTabPress: (tab: MainTab) => void;
}

export const BottomTabs = ({
  activeTab,
  cartCount,
  favoriteCount,
  onTabPress,
}: BottomTabsProps) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.root, {paddingBottom: Math.max(insets.bottom, 10)}]}>
      {tabs.map(tab => {
        const active = tab.key === activeTab;
        const badge =
          tab.key === 'favorites'
            ? favoriteCount
            : tab.key === 'cart'
              ? cartCount
              : 0;

        return (
          <TouchableOpacity
            activeOpacity={0.8}
            key={tab.key}
            onPress={() => onTabPress(tab.key)}
            style={styles.item}
          >
          <View style={[styles.iconCircle, active && styles.iconCircleActive]}>
 <Icon
  name={active ? tab.activeIcon : tab.inactiveIcon}
  size={22}
  color={active ? colors.green : colors.dark}
/>

  {badge > 0 ? (
    <View style={styles.badge}>
      <Text style={styles.badgeText}>{badge}</Text>
    </View>
  ) : null}
</View>
            <Text style={[styles.label, active && styles.active]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
      
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 8,
  },
  item: {
    alignItems: 'center',
    minWidth: 58,
  },
  iconCircle: {
    alignItems: 'center',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    width: 34,
  },
  iconCircleActive: {
    backgroundColor: colors.greenLight,
  },
  icon: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '900',
    textAlign: 'center',
  },
  label: {
    color: colors.dark,
    fontSize: 12,
    fontWeight: '700',
    marginTop: 2,
  },
  active: {
    color: colors.green,
  },
  badge: {
    alignItems: 'center',
    backgroundColor: colors.green,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    minWidth: 18,
    position: 'absolute',
    right: -9,
    top: -5,
  },
  badgeText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: '900',
  },
});
