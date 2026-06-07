import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ProductCard} from '../../components/ProductCard';
import {colors} from '../../theme/colors';
import {Product} from '../../types/product';

interface FavoritesScreenProps {
  favoriteIds: string[];
  onAddToCart: (productId: string) => void;
  onProductPress: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  products: Product[];
}

export const FavoritesScreen = ({
  favoriteIds,
  onAddToCart,
  onProductPress,
  onToggleFavorite,
  products,
}: FavoritesScreenProps) => {
  const favorites = useMemo(
    () => products.filter(product => favoriteIds.includes(product.id)),
    [favoriteIds, products],
  );

  return (
    <SafeAreaView edges={['top']} style={styles.safe}>
      <View style={styles.header}>
        <Text style={styles.title}>My Favorites</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {favorites.length > 0 ? (
          <View style={styles.grid}>
            {favorites.map((product, index) => (
              <View
                key={product.id}
                style={[styles.gridItem, index % 2 === 0 && styles.gridGap]}
              >
                <ProductCard
                  isFavorite
                  onAddToCart={() => onAddToCart(product.id)}
                  onFavoritePress={() => onToggleFavorite(product.id)}
                  onPress={() => onProductPress(product.id)}
                  product={product}
                />
              </View>
            ))}
          </View>
        ) : (
          <View style={styles.emptyBox}>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptyText}>
              Tap the heart on any product and it will appear here.
            </Text>
          </View>
        )}
        <Text style={styles.count}>{favorites.length} items favorited</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.green,
    flex: 1,
  },
  header: {
    alignItems: 'center',
    backgroundColor: colors.green,
    justifyContent: 'center',
    minHeight: 96,
  },
  title: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  content: {
    backgroundColor: colors.background,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    flexGrow: 1,
    paddingBottom: 24,
    paddingHorizontal: 22,
    paddingTop: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  gridItem: {
    width: '48%',
  },
  gridGap: {
    marginRight: '4%',
  },
  emptyBox: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    padding: 22,
  },
  emptyTitle: {
    color: colors.dark,
    fontSize: 20,
    fontWeight: '900',
  },
  emptyText: {
    color: colors.gray,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
  count: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '500',
    marginTop: 10,
  },
});
