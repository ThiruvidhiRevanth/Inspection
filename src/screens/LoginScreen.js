import React, { useState } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Button, TextInput, Text, Card } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function LoginScreen({ navigation }) {
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useApp();
  const { theme } = useTheme();

  const handleSendOtp = () => {
    if (!phoneOrEmail.trim()) {
      Alert.alert('Error', 'Please enter phone number or email');
      return;
    }
    setLoading(true);
    // Simulate OTP sending
    setTimeout(() => {
      setLoading(false);
      setShowOtpInput(true);
      Alert.alert('OTP Sent', 'Use 1234 as OTP for demo');
    }, 1000);
  };

  const handleVerifyOtp = () => {
    if (otp !== '1234') {
      Alert.alert('Error', 'Invalid OTP. Use 1234 for demo');
      return;
    }
    
    const userInfo = {
      phoneOrEmail,
      loginTime: new Date().toISOString(),
    };
    
    login(userInfo);
    navigation.replace('MainTabs');
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="headlineMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
            Welcome to InspectionApp
          </Text>
          
          <TextInput
            label="Phone Number or Email"
            value={phoneOrEmail}
            onChangeText={setPhoneOrEmail}
            style={styles.input}
            keyboardType="email-address"
            disabled={showOtpInput}
            textColor={theme.colors.onSurface}
            theme={{ colors: { primary: theme.colors.primary } }}
          />
          
          {showOtpInput && (
            <TextInput
              label="Enter OTP"
              value={otp}
              onChangeText={setOtp}
              style={styles.input}
              keyboardType="numeric"
              maxLength={4}
              textColor={theme.colors.onSurface}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
          )}
          
          <Button
            mode="contained"
            onPress={showOtpInput ? handleVerifyOtp : handleSendOtp}
            style={styles.button}
            loading={loading}
            buttonColor={theme.colors.primary}
          >
            {showOtpInput ? 'Verify OTP' : 'Send OTP'}
          </Button>
          
          {showOtpInput && (
            <Text style={[styles.hint, { color: theme.colors.onSurface }]}>
              Demo OTP: 1234
            </Text>
          )}
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    padding: 20,
  },
  title: {
    textAlign: 'center',
    marginBottom: 30,
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
  hint: {
    textAlign: 'center',
    marginTop: 10,
  },
});