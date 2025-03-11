import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';

const Products = ({ onSeeDetails, onAddToCart, searchText }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const SERVER_IP = '192.168.97.245'; // Updated IP address

  useEffect(() => {
    axios.get(`http://${SERVER_IP}:5000/products`)
      .then((response) => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderProductItem = ({ item }) => {
    const imageUrl = `http://${SERVER_IP}:5000${item.image}`;
    
    return (
      <View style={styles.productCard}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.productImage}
          resizeMode="contain"
          onError={(error) => console.log('Image load error:', error.nativeEvent.error)}
        />
        <Text style={styles.productName}>{item.name}</Text>
        <Text style={styles.productPrice}>₹{item.price}</Text>
        <TouchableOpacity style={styles.button} onPress={() => onSeeDetails(item)}>
          <Text style={styles.buttonText}>View Details</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={() => onAddToCart(item)}>
          <Text style={styles.buttonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0984e3" />
      </View>
    );
  }

  return (
    <FlatList
      data={filteredProducts}
      renderItem={renderProductItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
      contentContainerStyle={styles.listContainer}
    />
  );
};

// Styles remain unchanged (same as previous version)
const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  productCard: {
    flex: 1,
    margin: 10,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 14,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 150,
    marginBottom: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
    textAlign: 'center',
  },
  productPrice: {
    fontSize: 14,
    color: '#0984e3',
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#74b9ff',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 5,
  },
  cartButton: {
    backgroundColor: '#0984e3',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Products;