import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, TextInput } from 'react-native';

const PaymentMethodScreen = ({ userDetails, cart, onComplete, onBack }) => {
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', expiry: '', cvv: '' });
  const [upiId, setUpiId] = useState('');

  const calculateTotal = () => cart.reduce((total, item) => total + item.price * item.quantity, 0);

  const handlePayment = () => {
    if (!selectedMethod) {
      Alert.alert('Payment Method Missing', 'Please select a payment method.');
      return;
    }

    if (selectedMethod === 'Card' && (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv)) {
      Alert.alert('Incomplete Card Details', 'Please fill in all card details.');
      return;
    }

    if (selectedMethod === 'UPI' && !upiId) {
      Alert.alert('UPI ID Missing', 'Please enter your UPI ID.');
      return;
    }

    if (selectedMethod === 'COD') {
      Alert.alert('Order Confirmed', 'Your order has been placed with Cash on Delivery.');
      onComplete();
      return;
    }

    // Simulate successful payment for Card and UPI
    Alert.alert('Payment Successful', 'Thank you for your payment!');
    onComplete();
  };

  const renderPaymentDetails = () => {
    switch (selectedMethod) {
      case 'Card':
        return (
          <View style={styles.paymentDetailsContainer}>
            <TextInput
              style={styles.input}
              placeholder="Card Number"
              keyboardType="numeric"
              value={cardDetails.cardNumber}
              onChangeText={(value) => setCardDetails({ ...cardDetails, cardNumber: value })}
            />
            <TextInput
              style={styles.input}
              placeholder="Expiry Date (MM/YY)"
              value={cardDetails.expiry}
              onChangeText={(value) => setCardDetails({ ...cardDetails, expiry: value })}
            />
            <TextInput
              style={styles.input}
              placeholder="CVV"
              keyboardType="numeric"
              secureTextEntry
              value={cardDetails.cvv}
              onChangeText={(value) => setCardDetails({ ...cardDetails, cvv: value })}
            />
          </View>
        );
      case 'UPI':
        return (
          <TextInput
            style={styles.input}
            placeholder="Enter UPI ID"
            value={upiId}
            onChangeText={setUpiId}
          />
        );
      case 'COD':
        return <Text style={styles.codText}>Cash on Delivery selected. Pay at your doorstep.</Text>;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select Payment Method</Text>
      <Text style={styles.totalText}>Total Amount: ₹{calculateTotal()}</Text>

      <View style={styles.methodContainer}>
        <TouchableOpacity
          style={[styles.methodButton, selectedMethod === 'Card' && styles.selectedMethodButton]}
          onPress={() => setSelectedMethod('Card')}
        >
          <Text style={styles.methodText}>Credit/Debit Card</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, selectedMethod === 'UPI' && styles.selectedMethodButton]}
          onPress={() => setSelectedMethod('UPI')}
        >
          <Text style={styles.methodText}>UPI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.methodButton, selectedMethod === 'COD' && styles.selectedMethodButton]}
          onPress={() => setSelectedMethod('COD')}
        >
          <Text style={styles.methodText}>Cash on Delivery</Text>
        </TouchableOpacity>
      </View>

      {renderPaymentDetails()}

      <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
        <Text style={styles.payButtonText}>Pay Now</Text>
      </TouchableOpacity>
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
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2d3436',
  },
  totalText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
    color: '#0984e3',
  },
  methodContainer: {
    marginBottom: 20,
  },
  methodButton: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  selectedMethodButton: {
    borderColor: '#0984e3',
    backgroundColor: '#dfe6e9',
  },
  methodText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: '600',
  },
  paymentDetailsContainer: {
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    elevation: 2,
  },
  codText: {
    fontSize: 16,
    color: '#636e72',
    textAlign: 'center',
    marginVertical: 20,
  },
  payButton: {
    backgroundColor: '#0984e3',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  payButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default PaymentMethodScreen;
