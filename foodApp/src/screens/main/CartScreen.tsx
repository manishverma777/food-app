import React, {useMemo} from 'react';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {PrimaryButton} from '../../components/ui/PrimaryButton';
import {colors} from '../../theme/colors';
import {CartItems, Product} from '../../types/product';

interface CartScreenProps {
  cartItems: CartItems;
  onAddItem: (productId: string) => void;
  onRemoveItem: (productId: string) => void;
  products: Product[];
}

export const CartScreen = ({
  cartItems,
  onAddItem,
  onRemoveItem,
  products,
}: CartScreenProps) => {
  const cartProducts = useMemo(
    () =>
      products
        .filter(product => cartItems[product.id])
        .map(product => ({
          product,
          quantity: cartItems[product.id],
        })),
    [cartItems, products],
  );
  const subtotal = cartProducts.reduce(
    (total, item) => total + parsePrice(item.product.price) * item.quantity,
    0,
  );

  return (
    <SafeAreaView style={styles.safe}>
      <Text style={styles.title}>Cart</Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        {cartProducts.length > 0 ? (
          <>
            {cartProducts.map(({product, quantity}) => (
              <View key={product.id} style={styles.cartRow}>
                <View style={styles.itemInfo}>
                  <Text style={styles.itemName}>{product.name}</Text>
                  <Text style={styles.itemPrice}>
                    {product.price} / {product.unit}
                  </Text>
                </View>
                <View style={styles.quantityBox}>
                  <TouchableOpacity
                    onPress={() => onRemoveItem(product.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <TouchableOpacity
                    onPress={() => onAddItem(product.id)}
                    style={styles.quantityButton}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}

            <View style={styles.summary}>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLabel}>Subtotal</Text>
                <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
              </View>
              <View style={styles.summaryLine}>
                <Text style={styles.summaryLabel}>Delivery</Text>
                <Text style={styles.summaryValue}>$2.00</Text>
              </View>
              <View style={styles.totalLine}>
                <Text style={styles.totalLabel}>Total</Text>
                <Text style={styles.totalValue}>${(subtotal + 2).toFixed(2)}</Text>
              </View>
              <PrimaryButton onPress={() => {}} title="Checkout" />
            </View>
          </>
        ) : (
          <View style={styles.panel}>
            <Text style={styles.icon}>Cart</Text>
            <Text style={styles.heading}>Your fresh basket is empty</Text>
            <Text style={styles.copy}>Add products from home and checkout here.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const parsePrice = (price: string) => Number(price.replace('$', '')) || 0;

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
  cartRow: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    flexDirection: 'row',
    marginBottom: 12,
    padding: 16,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    color: colors.dark,
    fontSize: 17,
    fontWeight: '900',
  },
  itemPrice: {
    color: colors.gray,
    fontSize: 14,
    fontWeight: '700',
    marginTop: 4,
  },
  quantityBox: {
    alignItems: 'center',
    backgroundColor: colors.greenLight,
    borderRadius: 18,
    flexDirection: 'row',
    padding: 4,
  },
  quantityButton: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 14,
    height: 28,
    justifyContent: 'center',
    width: 28,
  },
  quantityButtonText: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '900',
    lineHeight: 20,
  },
  quantity: {
    color: colors.dark,
    fontSize: 16,
    fontWeight: '900',
    marginHorizontal: 14,
  },
  summary: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    marginTop: 10,
    padding: 18,
  },
  summaryLine: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    color: colors.gray,
    fontSize: 15,
    fontWeight: '700',
  },
  summaryValue: {
    color: colors.dark,
    fontSize: 15,
    fontWeight: '900',
  },
  totalLine: {
    borderTopColor: colors.line,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 18,
    marginTop: 4,
    paddingTop: 14,
  },
  totalLabel: {
    color: colors.dark,
    fontSize: 18,
    fontWeight: '900',
  },
  totalValue: {
    color: colors.green,
    fontSize: 20,
    fontWeight: '900',
  },
  panel: {
    backgroundColor: colors.white,
    borderColor: colors.line,
    borderRadius: 18,
    borderWidth: 1,
    padding: 22,
  },
  icon: {
    color: colors.green,
    fontSize: 18,
    fontWeight: '900',
  },
  heading: {
    color: colors.dark,
    fontSize: 22,
    fontWeight: '900',
    marginTop: 14,
  },
  copy: {
    color: colors.gray,
    fontSize: 15,
    lineHeight: 22,
    marginTop: 8,
  },
});
