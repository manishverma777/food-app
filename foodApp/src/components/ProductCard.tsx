import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import {colors} from '../theme/colors';
import {Product} from '../types/product';

interface ProductCardProps {
  product: Product;
  isFavorite: boolean;
  onAddToCart?: () => void;
  onFavoritePress: () => void;
  onPress?: () => void;
}

export const ProductCard = ({
  product,
  isFavorite,
  onAddToCart,
  onFavoritePress,
  onPress,
}: ProductCardProps) => (
  <TouchableOpacity activeOpacity={0.88} onPress={onPress} style={styles.root}>
    <View style={styles.imageWrap}>
      <Image source={{uri: product.image}} style={styles.image} />
      <TouchableOpacity
        activeOpacity={0.78}
        onPress={onFavoritePress}
        style={styles.heartButton}
      >
        <Text style={[styles.heart, !isFavorite && styles.heartMuted]}>
          {isFavorite ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </View>
    <Text numberOfLines={2} style={styles.name}>
      {product.name}
    </Text>
    <Text style={styles.price}>
      {product.price}
      <Text style={styles.unit}> / {product.unit}</Text>
    </Text>
    {onAddToCart ? (
      <TouchableOpacity
        activeOpacity={0.84}
        onPress={onAddToCart}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    ) : null}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.card,
    borderColor: colors.line,
    borderRadius: 12,
    borderWidth: 1,
    flex: 1,
    marginBottom: 14,
    padding: 11,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.09,
    shadowRadius: 18,
    elevation: 4,
  },
  imageWrap: {
    backgroundColor: colors.cream,
    borderRadius: 12,
    height: 132,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  heartButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    position: 'absolute',
    right: 7,
    top: 7,
    width: 34,
  },
  heart: {
    color: colors.red,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 27,
  },
  heartMuted: {
    color: colors.dark,
  },
  name: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '800',
    lineHeight: 20,
    marginTop: 10,
    minHeight: 40,
  },
  price: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: '900',
    marginTop: 4,
  },
  unit: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: '500',
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.dark,
    borderRadius: 14,
    justifyContent: 'center',
    marginTop: 10,
    minHeight: 36,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: '900',
  },
});
