import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';

const PaymentScreen = ({ onProceedToPaymentMethod, onBack }) => {
  const [details, setDetails] = useState({
    name: '',
    address: '',
    city: '',
    pincode: '',
    email: '',
  });

  const handleChange = (key, value) => setDetails((prev) => ({ ...prev, [key]: value }));

  const handleProceed = () => {
    const { name, address, city, pincode, email } = details;
    if (!name || !address || !city || !pincode || !email) {
      Alert.alert('Missing Information', 'Please fill in all the details.');
      return;
    }
    onProceedToPaymentMethod(details);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Details</Text>
      <TextInput
        style={styles.input}
        placeholder="Full Name"
        value={details.name}
        onChangeText={(value) => handleChange('name', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Address"
        value={details.address}
        onChangeText={(value) => handleChange('address', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="City"
        value={details.city}
        onChangeText={(value) => handleChange('city', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Pincode"
        keyboardType="numeric"
        value={details.pincode}
        onChangeText={(value) => handleChange('pincode', value)}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={details.email}
        onChangeText={(value) => handleChange('email', value)}
      />
      <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
        <Text style={styles.buttonText}>Proceed to Payment</Text>
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
  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    elevation: 2,
  },
  proceedButton: {
    backgroundColor: '#0984e3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PaymentScreen;
