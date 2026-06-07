import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ProductCard} from '../../components/ProductCard';
import {colors} from '../../theme/colors';
import {Product} from '../../types/product';

interface SearchScreenProps {
  favoriteIds: string[];
  onAddToCart: (productId: string) => void;
  onProductPress: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  products: Product[];
}

export const SearchScreen = ({
  favoriteIds,
  onAddToCart,
  onProductPress,
  onToggleFavorite,
  products,
}: SearchScreenProps) => {
  const [query, setQuery] = useState('');
  const results = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    if (!searchText) {
      return products;
    }

    return products.filter(product =>
      [product.name, product.category, product.description]
        .join(' ')
        .toLowerCase()
        .includes(searchText),
    );
  }, [products, query]);

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Search</Text>
      <View style={styles.searchBox}>
        <Text style={styles.icon}>S</Text>
        <TextInput
          autoFocus
          onChangeText={setQuery}
          placeholder="Search fresh groceries"
          placeholderTextColor={colors.gray}
          style={styles.input}
          value={query}
        />
      </View>

      <Text style={styles.count}>
        {results.length} {results.length === 1 ? 'item' : 'items'} found
      </Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.grid}>
          {results.map((product, index) => (
            <View
              key={product.id}
              style={[styles.gridItem, index % 2 === 0 && styles.gridGap]}
            >
              <ProductCard
                isFavorite={favoriteIds.includes(product.id)}
                onAddToCart={() => onAddToCart(product.id)}
                onFavoritePress={() => onToggleFavorite(product.id)}
                onPress={() => onProductPress(product.id)}
                product={product}
              />
            </View>
          ))}
        </View>
        {results.length === 0 ? (
          <Text style={styles.empty}>No matching products.</Text>
        ) : null}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
    padding: 22,
  },
  title: {
    color: colors.dark,
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 20,
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 20,
    borderWidth: 1,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: 16,
  },
  icon: {
    color: colors.gray,
    fontSize: 17,
    fontWeight: '900',
    marginRight: 10,
  },
  input: {
    color: colors.dark,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  count: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: '700',
    marginVertical: 16,
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
  empty: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: '700',
  },
});
