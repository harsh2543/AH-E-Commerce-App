import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import PaymentScreen from './PaymentScreen';
import PaymentMethodScreen from './PaymentMethodScreen';

const CheckoutFlow = ({ cartTotal = 0 }) => {
  const [isPaymentMethodVisible, setIsPaymentMethodVisible] = useState(false);

  // Handle moving to PaymentMethodScreen
  const handleShowPaymentMethod = () => {
    setIsPaymentMethodVisible(true);
  };

  // Handle successful payment
  const handlePaymentSuccess = () => {
    Alert.alert('Payment Successful', 'Thank you for your purchase!');
    setIsPaymentMethodVisible(false); // Reset to the delivery details screen
  };

  return (
    <View style={{ flex: 1 }}>
      {!isPaymentMethodVisible ? (
        <PaymentScreen
          cartTotal={cartTotal}
          onShowPaymentMethod={handleShowPaymentMethod} // Pass the handler
        />
      ) : (
        <PaymentMethodScreen
          cartTotal={cartTotal}
          onBack={() => setIsPaymentMethodVisible(false)} // Handle back action
          onPaymentSuccess={handlePaymentSuccess} // Handle successful payment
        />
      )}
    </View>
  );
};

export default CheckoutFlow;
