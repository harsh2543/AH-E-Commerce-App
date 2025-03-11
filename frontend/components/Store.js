import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';

const Store = ({ cart, onRemoveFromCart, onProceedToPayment, onBack }) => {
  const SERVER_IP = '192.168.97.245'; 
  
  const cartTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Cart</Text>
      {cart.length === 0 ? (
        <Text style={styles.emptyText}>Your cart is empty!</Text>
      ) : (
        <>
          <FlatList
            data={cart}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.cartItem}>
                <Image 
                  source={{ uri: `http://${SERVER_IP}:5000${item.image}` }} 
                  style={styles.cartImage} 
                  resizeMode="contain"
                  onError={(error) => console.log('Image Error:', error.nativeEvent.error)}
                />
                <View style={styles.itemInfo}>
                  <Text style={styles.cartItemName}>{item.name}</Text>
                  <Text style={styles.cartItemPrice}>
                    ₹{item.price} x {item.quantity}
                  </Text>
                </View>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => onRemoveFromCart(item.id)}
                >
                  <Text style={styles.buttonText}>Remove</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <Text style={styles.totalText}>Total: ₹{cartTotal().toFixed(2)}</Text>
          <TouchableOpacity style={styles.paymentButton} onPress={onProceedToPayment}>
            <Text style={styles.paymentButtonText}>Proceed to Payment</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#2d3436',
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2,
  },
  cartImage: {
    width: 60,
    height: 60,
    marginRight: 15,
  },
  itemInfo: {
    flex: 1,
  },
  cartItemName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  cartItemPrice: {
    fontSize: 14,
    color: '#636e72',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    padding: 8,
    borderRadius: 6,
    marginLeft: 10,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  paymentButton: {
    backgroundColor: '#0984e3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  paymentButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default Store;