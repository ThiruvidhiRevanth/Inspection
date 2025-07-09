import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Card, Provider } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import DynamicForm from '../components/DynamicForm';

export default function NewInspectionScreen({ navigation }) {
  const { state, addOrder, updateProfile } = useApp();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    propertyType: 'apartment',
    bhk: 1,
    toilets: 1,
    rooms: 1,
    serviceType: 'basic',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form with last order data or profile data
  useEffect(() => {
    if (state.orders.length > 0) {
      const lastOrder = state.orders[state.orders.length - 1];
      setFormData(prev => ({
        ...prev,
        fullName: lastOrder.fullName || '',
        phone: lastOrder.phone || '',
        email: lastOrder.email || '',
        propertyType: lastOrder.propertyType || 'apartment',
        bhk: lastOrder.bhk || 1,
        toilets: lastOrder.toilets || 1,
        rooms: lastOrder.rooms || 1,
        serviceType: lastOrder.serviceType || 'basic',
      }));
    } else if (state.profile) {
      setFormData(prev => ({
        ...prev,
        fullName: state.profile.fullName || '',
        phone: state.profile.phone || '',
        email: state.profile.email || '',
      }));
    }
  }, [state.orders, state.profile]);

  const handleSubmit = async () => {
    if (isSubmitting) {
      console.log('Already submitting, ignoring...');
      return;
    }

    if (!formData.fullName || !formData.phone || !formData.email) {
      Alert.alert('Error', 'Please fill all required fields');
      return;
    }

    setIsSubmitting(true);
    
    try {
      console.log('Submitting form data:', formData);
      
      updateProfile(formData);
      await addOrder(formData);
      
      Alert.alert(
        'Success',
        'Inspection request submitted successfully!',
        [
          {
            text: 'OK',
            onPress: () => {
              setIsSubmitting(false);
              navigation.goBack();
            },
          },
        ]
      );
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      Alert.alert('Error', 'Failed to submit inspection request');
    }
  };

  return (
    <Provider theme={theme}>
      <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <Text variant="titleMedium" style={[styles.title, { color: theme.colors.onSurface }]}>
              Property Inspection Request
            </Text>
            
            <TextInput
              label="Full Name *"
              value={formData.fullName}
              onChangeText={(text) => setFormData(prev => ({ ...prev, fullName: text }))}
              style={styles.input}
              disabled={isSubmitting}
              textColor={theme.colors.onSurface}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            
            <TextInput
              label="Phone *"
              value={formData.phone}
              onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
              style={styles.input}
              keyboardType="phone-pad"
              disabled={isSubmitting}
              textColor={theme.colors.onSurface}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            
            <TextInput
              label="Email *"
              value={formData.email}
              onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
              style={styles.input}
              keyboardType="email-address"
              disabled={isSubmitting}
              textColor={theme.colors.onSurface}
              theme={{ colors: { primary: theme.colors.primary } }}
            />
            
            <DynamicForm
              formData={formData}
              setFormData={setFormData}
              disabled={isSubmitting}
            />
            
            <Button
              mode="contained"
              onPress={handleSubmit}
              style={styles.submitButton}
              loading={isSubmitting}
              disabled={isSubmitting}
              buttonColor={theme.colors.primary}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inspection Request'}
            </Button>
          </Card.Content>
        </Card>
      </ScrollView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 20,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    marginBottom: 15,
  },
  submitButton: {
    marginTop: 20,
  },
});