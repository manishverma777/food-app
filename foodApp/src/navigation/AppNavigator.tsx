import React, {useMemo, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import {products as initialProducts} from '../data/products';
import {LoginScreen} from '../screens/auth/LoginScreen';
import {SignUpScreen} from '../screens/auth/SignUpScreen';
import {CartScreen} from '../screens/main/CartScreen';
import {FavoritesScreen} from '../screens/main/FavoritesScreen';
import {HomeScreen} from '../screens/main/HomeScreen';
import {ProductDetailScreen} from '../screens/main/ProductDetailScreen';
import {ProfileScreen} from '../screens/main/ProfileScreen';
import {SearchScreen} from '../screens/main/SearchScreen';
import {colors} from '../theme/colors';
import {AppRoute, MainTab} from '../types/navigation';
import {CartItems} from '../types/product';
import {UserProfile} from '../types/profile';
import {BottomTabs} from './BottomTabs';

const defaultProfile: UserProfile = {
  name: 'Sarah Johnson',
  email: 'sarah@foodiefresh.app',
  phone: '+1 555 014 982',
  address: '221 Market Street, San Francisco, CA 94105',
};

export const AppNavigator = () => {
  const [route, setRoute] = useState<AppRoute>('login');
  const [favoriteIds, setFavoriteIds] = useState<string[]>(
    initialProducts
      .filter(product => product.favorite)
      .map(product => product.id),
  );
  const [cartItems, setCartItems] = useState<CartItems>({});
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const activeTab: MainTab = isMainTab(route) ? route : 'home';
  const selectedProduct = initialProducts.find(
    product => product.id === selectedProductId,
  );

  const cartCount = useMemo(
    () => Object.values(cartItems).reduce((total, quantity) => total + quantity, 0),
    [cartItems],
  );

  const toggleFavorite = (productId: string) => {
    setFavoriteIds(current =>
      current.includes(productId)
        ? current.filter(id => id !== productId)
        : [...current, productId],
    );
  };

  const addToCart = (productId: string) => {
    setCartItems(current => ({
      ...current,
      [productId]: (current[productId] ?? 0) + 1,
    }));
  };

  const decreaseCartItem = (productId: string) => {
    setCartItems(current => {
      const quantity = current[productId] ?? 0;
      const next = {...current};

      if (quantity <= 1) {
        delete next[productId];
        return next;
      }

      next[productId] = quantity - 1;
      return next;
    });
  };

  if (route === 'login') {
    return (
      <LoginScreen
        onLogin={() => setRoute('home')}
        onSignUp={() => setRoute('signup')}
      />
    );
  }

  if (route === 'signup') {
    return (
      <SignUpScreen
        onBack={() => setRoute('login')}
        onCreateAccount={() => setRoute('home')}
      />
    );
  }

  return (
    <View style={styles.root}>
      <View style={styles.content}>
        {selectedProduct ? (
          <ProductDetailScreen
            isFavorite={favoriteIds.includes(selectedProduct.id)}
            onAddToCart={addToCart}
            onBack={() => setSelectedProductId(null)}
            onToggleFavorite={toggleFavorite}
            product={selectedProduct}
          />
        ) : (
          renderMainRoute({
            activeTab,
            addToCart,
            cartItems,
            decreaseCartItem,
            favoriteIds,
            onProductPress: setSelectedProductId,
            profile,
            setProfile,
            toggleFavorite,
          })
        )}
      </View>
      {selectedProduct ? null : (
        <BottomTabs
          activeTab={activeTab}
          cartCount={cartCount}
          favoriteCount={favoriteIds.length}
          onTabPress={setRoute}
        />
      )}
    </View>
  );
};

const isMainTab = (route: AppRoute): route is MainTab =>
  ['home', 'search', 'favorites', 'cart', 'profile'].includes(route);

interface MainRouteOptions {
  activeTab: MainTab;
  addToCart: (productId: string) => void;
  cartItems: CartItems;
  decreaseCartItem: (productId: string) => void;
  favoriteIds: string[];
  onProductPress: (productId: string) => void;
  profile: UserProfile;
  setProfile: (profile: UserProfile) => void;
  toggleFavorite: (productId: string) => void;
}

const renderMainRoute = ({
  activeTab,
  addToCart,
  cartItems,
  decreaseCartItem,
  favoriteIds,
  onProductPress,
  profile,
  setProfile,
  toggleFavorite,
}: MainRouteOptions) => {
  switch (activeTab) {
    case 'search':
      return (
        <SearchScreen
          favoriteIds={favoriteIds}
          onAddToCart={addToCart}
          onProductPress={onProductPress}
          onToggleFavorite={toggleFavorite}
          products={initialProducts}
        />
      );
    case 'favorites':
      return (
        <FavoritesScreen
          favoriteIds={favoriteIds}
          onAddToCart={addToCart}
          onProductPress={onProductPress}
          onToggleFavorite={toggleFavorite}
          products={initialProducts}
        />
      );
    case 'cart':
      return (
        <CartScreen
          cartItems={cartItems}
          onAddItem={addToCart}
          onRemoveItem={decreaseCartItem}
          products={initialProducts}
        />
      );
    case 'profile':
      return <ProfileScreen onChangeProfile={setProfile} profile={profile} />;
    case 'home':
    default:
      return (
        <HomeScreen
          favoriteIds={favoriteIds}
          onAddToCart={addToCart}
          onProductPress={onProductPress}
          onToggleFavorite={toggleFavorite}
          products={initialProducts}
          userName={profile.name}
        />
      );
  }
};

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.background,
    flex: 1,
  },
  content: {
    flex: 1,
  },
});
