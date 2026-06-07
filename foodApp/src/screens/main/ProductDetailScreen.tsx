import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../theme/colors';
import {Product} from '../../types/product';

interface ProductDetailScreenProps {
  isFavorite: boolean;
  onAddToCart: (productId: string) => void;
  onBack: () => void;
  onToggleFavorite: (productId: string) => void;
  product: Product;
}

export const ProductDetailScreen = ({
  isFavorite,
  onAddToCart,
  onBack,
  onToggleFavorite,
  product,
}: ProductDetailScreenProps) => (
  <SafeAreaView edges={['top']} style={styles.safe}>
    <View style={styles.topBar}>
      <TouchableOpacity activeOpacity={0.78} onPress={onBack} style={styles.iconButton}>
        <Text style={styles.iconText}>{'<'}</Text>
      </TouchableOpacity>
      <Text numberOfLines={1} style={styles.topTitle}>
        Details
      </Text>
      <TouchableOpacity
        activeOpacity={0.78}
        onPress={() => onToggleFavorite(product.id)}
        style={styles.iconButton}
      >
        <Text style={[styles.heart, !isFavorite && styles.heartMuted]}>
          {isFavorite ? '♥' : '♡'}
        </Text>
      </TouchableOpacity>
    </View>

    <ScrollView
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      <View style={styles.imageWrap}>
        <Image source={{uri: product.image}} style={styles.image} />
      </View>

      <View style={styles.titleRow}>
        <View style={styles.nameBlock}>
          <Text style={styles.name}>{product.name}</Text>
          <Text style={styles.category}>{formatCategory(product.category)}</Text>
        </View>
        <View style={styles.priceBox}>
          <Text style={styles.price}>{product.price}</Text>
          <Text style={styles.unit}>/ {product.unit}</Text>
        </View>
      </View>

      <Text style={styles.description}>{product.description}</Text>

      <View style={styles.infoGrid}>
        <DetailItem label="Quality" value={product.quality} />
        <DetailItem label="Origin" value={product.origin} />
        <DetailItem label="Storage" value={product.storage} />
        <DetailItem label="Delivery" value={product.delivery} />
      </View>

      <Text style={styles.sectionTitle}>Nutrition highlights</Text>
      <View style={styles.chips}>
        {product.nutrition.map(item => (
          <View key={item} style={styles.chip}>
            <Text style={styles.chipText}>{item}</Text>
          </View>
        ))}
      </View>
    </ScrollView>

    <View style={styles.footer}>
      <TouchableOpacity
        activeOpacity={0.86}
        onPress={() => onAddToCart(product.id)}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  </SafeAreaView>
);

const DetailItem = ({label, value}: {label: string; value: string}) => (
  <View style={styles.detailItem}>
    <Text style={styles.detailLabel}>{label}</Text>
    <Text style={styles.detailValue}>{value}</Text>
  </View>
);

const formatCategory = (category: string) =>
  category.charAt(0).toUpperCase() + category.slice(1);

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  topBar: {
    alignItems: 'center',
    backgroundColor: colors.green,
    flexDirection: 'row',
    paddingBottom: 16,
    paddingHorizontal: 18,
    paddingTop: 8,
  },
  iconButton: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    height: 38,
    justifyContent: 'center',
    width: 38,
  },
  iconText: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 26,
  },
  topTitle: {
    color: colors.white,
    flex: 1,
    fontSize: 20,
    fontWeight: '900',
    textAlign: 'center',
  },
  heart: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
    lineHeight: 27,
  },
  heartMuted: {
    color: 'rgba(255,255,255,0.78)',
  },
  content: {
    padding: 22,
    paddingBottom: 110,
  },
  imageWrap: {
    backgroundColor: colors.cream,
    borderRadius: 18,
    height: 260,
    overflow: 'hidden',
  },
  image: {
    height: '100%',
    resizeMode: 'cover',
    width: '100%',
  },
  titleRow: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    marginTop: 20,
  },
  nameBlock: {
    flex: 1,
    paddingRight: 14,
  },
  name: {
    color: colors.dark,
    fontSize: 28,
    fontWeight: '900',
    lineHeight: 34,
  },
  category: {
    color: colors.green,
    fontSize: 14,
    fontWeight: '900',
    marginTop: 6,
  },
  priceBox: {
    alignItems: 'flex-end',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  price: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: '900',
  },
  unit: {
    color: colors.gray,
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  description: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginTop: 14,
  },
  infoGrid: {
    marginTop: 20,
  },
  detailItem: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 14,
    borderWidth: 1,
    marginBottom: 10,
    padding: 15,
  },
  detailLabel: {
    color: colors.green,
    fontSize: 13,
    fontWeight: '900',
    marginBottom: 6,
  },
  detailValue: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: '700',
    lineHeight: 21,
  },
  sectionTitle: {
    color: colors.dark,
    fontSize: 19,
    fontWeight: '900',
    marginBottom: 12,
    marginTop: 10,
  },
  chips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: colors.greenLight,
    borderRadius: 14,
    marginBottom: 10,
    marginRight: 10,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  chipText: {
    color: colors.greenDark,
    fontSize: 13,
    fontWeight: '900',
  },
  footer: {
    backgroundColor: colors.white,
    borderTopColor: colors.line,
    borderTopWidth: 1,
    bottom: 0,
    left: 0,
    padding: 18,
    position: 'absolute',
    right: 0,
  },
  addButton: {
    alignItems: 'center',
    backgroundColor: colors.dark,
    borderRadius: 16,
    justifyContent: 'center',
    minHeight: 52,
  },
  addButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '900',
  },
});
