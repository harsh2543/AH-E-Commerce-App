import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Products from './components/Products';
import Store from './components/Store';
import PaymentScreen from './components/PaymentScreen';
import PaymentMethodScreen from './components/PaymentMethodScreen';
import Details from './components/Details';



const App = () => {
  const [activeScreen, setActiveScreen] = useState('products');
  const [cart, setCart] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [userDetails, setUserDetails] = useState({});
  const [searchText, setSearchText] = useState('');
  const [searchActive, setSearchActive] = useState(false);

  const handleAddToCart = (item) => {
    const itemExists = cart.find((cartItem) => cartItem.id === item.id);
    if (itemExists) {
      Alert.alert('Item Exists', `${item.name} is already in your cart.`);
    } else {
      setCart((prevCart) => [...prevCart, { ...item, quantity: 1 }]);
      Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
    }
  };

  const handleRemoveFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const handleCompleteOrder = () => {
    setCart([]);
    setActiveScreen('products');
    Alert.alert('Order Confirmed', 'Thank you for your purchase!');
  };

  const renderScreen = () => {
    switch (activeScreen) {
      case 'cart':
        return (
          <Store
            cart={cart}
            onRemoveFromCart={handleRemoveFromCart}
            onProceedToPayment={() => setActiveScreen('payment')}
            onBack={() => setActiveScreen('products')}
          />
        );
      case 'payment':
        return (
          <PaymentScreen
            onProceedToPaymentMethod={(details) => {
              setUserDetails(details);
              setActiveScreen('paymentMethod');
            }}
            onBack={() => setActiveScreen('cart')}
          />
        );
      case 'paymentMethod':
        return (
          <PaymentMethodScreen
            userDetails={userDetails}
            cart={cart}
            onBack={() => setActiveScreen('payment')}
            onComplete={handleCompleteOrder}
          />
        );
      case 'details':
        return (
          <Details
            item={selectedItem}
            onBack={() => setActiveScreen('products')}
            onAddToCart={handleAddToCart}
          />
        );
      default:
        return (
          <Products
            onSeeDetails={(item) => {
              setSelectedItem(item);
              setActiveScreen('details');
            }}
            onAddToCart={handleAddToCart}
            searchText={searchText}
          />
        );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        {activeScreen === 'products' ? (
          <TouchableOpacity onPress={() => console.log('Menu clicked')}>
            <Icon name="menu" size={28} color="#ffffff" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => setActiveScreen('products')}>
            <Icon name="arrow-back" size={28} color="#ffffff" />
          </TouchableOpacity>
        )}
        <Text style={styles.headerTitle}>ADIDAS</Text>
        <View style={styles.iconContainer}>
          {activeScreen === 'products' && (
            <>
              <TouchableOpacity onPress={() => setSearchActive((prev) => !prev)} style={styles.icon}>
                <Icon name="search" size={24} color="#ffffff" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setActiveScreen('cart')} style={styles.icon}>
                <Icon name="shopping-cart" size={24} color="#ffffff" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
      <View style={styles.bottomBar} />

      {searchActive && (
        <TextInput
          style={styles.searchBar}
          placeholder="Search products..."
          value={searchText}
          onChangeText={setSearchText}
        />
      )}
      {renderScreen()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    marginTop: 26,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0984e3',
    paddingVertical: 16,
    paddingHorizontal: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    flex: 1,
  },
  iconContainer: {
    flexDirection: 'row',
  },
  icon: {
    marginLeft: 17,
  },
  bottomBar: {
    height: 3,
    backgroundColor: '#74b9ff',
  },
  searchBar: {
    backgroundColor: '#ffffff',
    padding: 12,
    margin: 12,
    borderRadius: 8,
    elevation: 2,
  },
});

export default App;
