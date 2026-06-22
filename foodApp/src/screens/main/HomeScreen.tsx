import React, {useMemo, useState} from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {ProductCard} from '../../components/ProductCard';
import {categories} from '../../data/products';
import {colors} from '../../theme/colors';
import {Product} from '../../types/product';
import { selectProfileImage } from './selector';
import { useSelector } from 'react-redux';

interface HomeScreenProps {
  favoriteIds: string[];
  onAddToCart: (productId: string) => void;
  onProductPress: (productId: string) => void;
  onToggleFavorite: (productId: string) => void;
  products: Product[];
  userName: string;
   onOpenDrawer: () => void;
}

export const HomeScreen = ({
  favoriteIds,
  onAddToCart,
  onProductPress,
  onToggleFavorite,
  onOpenDrawer,
  products,
  userName,
}: HomeScreenProps) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    const searchText = query.trim().toLowerCase();

    return products.filter(product => {
      const matchesCategory =
        activeCategory === 'all' || product.category === activeCategory;
      const matchesSearch =
        searchText.length === 0 ||
        product.name.toLowerCase().includes(searchText) ||
        product.category.toLowerCase().includes(searchText);

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, products, query]);
  const images = useSelector(selectProfileImage);
  console.log('images',images)

  return (
    <View style={styles.safe}>
      <StatusBar backgroundColor={colors.green} barStyle="light-content" />
      <SafeAreaView edges={['top']} style={styles.headerSafe}>
        <View style={styles.header}>
          <View style={styles.profileRow}>
             <TouchableOpacity
    onPress={onOpenDrawer}
    style={{marginRight: 12}}>
    <Text
      style={{
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
      }}>
      ☰
    </Text>
  </TouchableOpacity>
            <Image
              source={{
                uri: images || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
              }}
              style={styles.avatar}
            />
            <View style={styles.greeting}>
              <Text style={styles.greetingTitle}>Hi, {firstName(userName)}!</Text>
              <Text style={styles.greetingSub}>Discover fresh products.</Text>
            </View>
            <TouchableOpacity activeOpacity={0.78} style={styles.bellButton}>
              <Text style={styles.bell}>N</Text>
              <View style={styles.alertDot}>
                <Text style={styles.alertText}>4</Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.searchBox}>
            <Text style={styles.searchIcon}>S</Text>
            <TextInput
              onChangeText={setQuery}
              placeholder="Search for fresh fruits, dairy..."
              placeholderTextColor="#858882"
              style={styles.searchInput}
              value={query}
            />
          </View>
        </View>
      </SafeAreaView>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        style={styles.scroller}
      >
        <View style={styles.categoryRail}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {categories.map(category => {
              const active = category.id === activeCategory;

              return (
                <TouchableOpacity
                  activeOpacity={0.82}
                  key={category.id}
                  onPress={() => setActiveCategory(category.id)}
                  style={styles.categoryItem}
                >
                  <View
                    style={[
                      styles.categoryIconWrap,
                      {backgroundColor: category.color},
                      active && styles.categoryIconActive,
                    ]}
                  >
                    <Text style={[styles.categoryIcon, active && styles.activeText]}>
                      {category.icon}
                    </Text>
                  </View>
                  <Text
                    numberOfLines={1}
                    style={[styles.categoryLabel, active && styles.activeText]}
                  >
                    {category.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        <Text style={styles.sectionTitle}>
          {query || activeCategory !== 'all' ? 'Fresh Results' : 'Featured Products'}
        </Text>

        <View style={styles.grid}>
          {filteredProducts.map((product, index) => (
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

        {filteredProducts.length === 0 ? (
          <Text style={styles.empty}>No products found.</Text>
        ) : null}
      </ScrollView>
    </View>
  );
};

const firstName = (name: string) => name.trim().split(' ')[0] || 'Sarah';

const styles = StyleSheet.create({
  safe: {
    backgroundColor: colors.background,
    flex: 1,
  },
  headerSafe: {
    backgroundColor: colors.green,
  },
  scroller: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    backgroundColor: colors.background,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: colors.green,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    paddingBottom: 30,
    paddingHorizontal: 22,
    paddingTop: 14,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 10},
    shadowOpacity: 0.16,
    shadowRadius: 18,
    elevation: 8,
    zIndex: 10,
  },
  profileRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  avatar: {
    borderColor: 'rgba(255,255,255,0.7)',
    borderRadius: 25,
    borderWidth: 2,
    height: 50,
    width: 50,
  },
  greeting: {
    flex: 1,
    marginLeft: 12,
  },
  greetingTitle: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  greetingSub: {
    color: 'rgba(255,255,255,0.86)',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 2,
  },
  bellButton: {
    alignItems: 'center',
    height: 42,
    justifyContent: 'center',
    width: 42,
  },
  bell: {
    color: colors.white,
    fontSize: 22,
    fontWeight: '900',
  },
  alertDot: {
    alignItems: 'center',
    backgroundColor: colors.red,
    borderRadius: 9,
    height: 18,
    justifyContent: 'center',
    position: 'absolute',
    right: 4,
    top: 2,
    width: 18,
  },
  alertText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '900',
  },
  searchBox: {
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,248,0.95)',
    borderRadius: 22,
    flexDirection: 'row',
    marginTop: 22,
    minHeight: 52,
    paddingHorizontal: 16,
  },
  searchIcon: {
    color: colors.gray,
    fontSize: 17,
    fontWeight: '900',
    marginRight: 10,
  },
  searchInput: {
    color: colors.dark,
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    paddingVertical: 0,
  },
  categoryRail: {
    marginTop: 18,
    paddingLeft: 22,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: 16,
    width: 76,
  },
  categoryIconWrap: {
    alignItems: 'center',
    borderRadius: 16,
    height: 58,
    justifyContent: 'center',
    width: 58,
  },
  categoryIconActive: {
    borderColor: colors.green,
    borderWidth: 2,
  },
  categoryIcon: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '900',
  },
  categoryLabel: {
    color: colors.dark,
    fontSize: 12,
    fontWeight: '800',
    marginTop: 7,
    textAlign: 'center',
  },
  activeText: {
    color: colors.green,
  },
  sectionTitle: {
    color: colors.dark,
    fontSize: 25,
    fontWeight: '900',
    marginBottom: 14,
    marginHorizontal: 22,
    marginTop: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 22,
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
    paddingHorizontal: 22,
  },
});
