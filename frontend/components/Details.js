import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';

const Details = ({ item, onBack, onAddToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);

  const sizes = ['S', 'M', 'L', 'XL'];
  const colors = ['Red', 'Blue', 'Black', 'White'];
  const SERVER_IP = '192.168.97.245'; 

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      Alert.alert('Missing Selection', 'Please select both size and color.');
      return;
    }
    onAddToCart({ ...item, quantity, selectedSize, selectedColor });
    Alert.alert('Added to Cart', `${item.name} has been added to your cart.`);
    onBack();
  };

  const renderOptions = (options, selectedOption, setSelectedOption) => (
    <FlatList
      data={options}
      horizontal
      keyExtractor={(option) => option}
      renderItem={({ item: option }) => (
        <TouchableOpacity
          style={[
            styles.option,
            selectedOption === option && styles.selectedOption,
          ]}
          onPress={() => setSelectedOption(option)}
        >
          <Text style={styles.optionText}>{option}</Text>
        </TouchableOpacity>
      )}
    />
  );

  return (
    <View style={styles.container}>
      {/* Updated Image component with full URL */}
      <Image 
        source={{ uri: `http://${SERVER_IP}:5000${item.image}` }} 
        style={styles.image} 
        resizeMode="contain" 
        onError={(error) => console.log("Image Error:", error.nativeEvent.error)}
      />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.category}>{item.category}</Text>
      <Text style={styles.price}>₹{item.price}</Text>

      <Text style={styles.sectionTitle}>Select Size</Text>
      {renderOptions(sizes, selectedSize, setSelectedSize)}

      <Text style={styles.sectionTitle}>Select Color</Text>
      {renderOptions(colors, selectedColor, setSelectedColor)}

      <View style={styles.quantityContainer}>
        <TouchableOpacity onPress={() => setQuantity((prev) => Math.max(prev - 1, 1))}>
          <Text style={styles.quantityButton}>-</Text>
        </TouchableOpacity>
        <Text style={styles.quantity}>{quantity}</Text>
        <TouchableOpacity onPress={() => setQuantity((prev) => prev + 1)}>
          <Text style={styles.quantityButton}>+</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.addButton} onPress={handleAddToCart}>
        <Text style={styles.addButtonText}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  image: {
    width: '100%',
    height: 250,
    marginBottom: 20,
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  category: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginBottom: 10,
  },
  price: {
    fontSize: 18,
    color: '#0984e3',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  option: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#dfe6e9',
    borderColor: '#0984e3',
  },
  optionText: {
    fontSize: 14,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#0984e3',
    color: '#fff',
    borderRadius: 5,
  },
  quantity: {
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 20,
  },
  addButton: {
    backgroundColor: '#0984e3',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default Details;