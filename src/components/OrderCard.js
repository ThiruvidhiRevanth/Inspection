import React from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Card, Text, Button, Chip } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function OrderCard({ order }) {
  const { updateOrder } = useApp();
  const { theme } = useTheme();

  const handlePayNow = () => {
    Alert.alert(
      'Payment',
      'Proceed with payment?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Pay',
          onPress: () => {
            updateOrder(order.id, { isPaid: true, status: 'paid' });
            Alert.alert('Success', 'Payment completed successfully!');
          },
        },
      ]
    );
  };

  const handleScheduleInspection = () => {
    Alert.alert('Schedule', 'Inspection scheduling feature coming soon!');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return '#FF9800';
      case 'paid':
        return '#4CAF50';
      case 'scheduled':
        return '#2196F3';
      default:
        return '#666';
    }
  };

  return (
    <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
      <Card.Content>
        <View style={styles.header}>
          <View>
            <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
              {order.id}
            </Text>
            <Text variant="bodySmall" style={[styles.orderNumber, { color: theme.colors.onSurface }]}>
              Order #{order.orderNumber || 'N/A'}
            </Text>
          </View>
          <Chip
            mode="flat"
            style={[styles.statusChip, { backgroundColor: getStatusColor(order.status) }]}
            textStyle={styles.statusText}
          >
            {order.status.toUpperCase()}
          </Chip>
        </View>
        
        <Text variant="bodyMedium" style={[styles.detail, { color: theme.colors.onSurface }]}>
          Property: {order.propertyType}
        </Text>
        
        <Text variant="bodyMedium" style={[styles.detail, { color: theme.colors.onSurface }]}>
          Service: {order.serviceType}
        </Text>
        
        {order.propertyType === 'office' ? (
          <Text variant="bodyMedium" style={[styles.detail, { color: theme.colors.onSurface }]}>
            Rooms: {order.rooms}, Toilets: {order.toilets}
          </Text>
        ) : (
          <Text variant="bodyMedium" style={[styles.detail, { color: theme.colors.onSurface }]}>
            BHK: {order.bhk}, Toilets: {order.toilets}
          </Text>
        )}
        
        <Text variant="bodySmall" style={[styles.date, { color: theme.colors.onSurface }]}>
          Created: {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        
        <View style={styles.actions}>
          {!order.isPaid ? (
            <Button
              mode="contained"
              onPress={handlePayNow}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Pay Now
            </Button>
          ) : (
            <Button
              mode="contained"
              onPress={handleScheduleInspection}
              style={styles.button}
              buttonColor={theme.colors.primary}
            >
              Schedule Inspection
            </Button>
          )}
        </View>
      </Card.Content>
        </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  orderNumber: {
    marginTop: 2,
  },
  statusChip: {
    paddingHorizontal: 8,
  },
  statusText: {
    color: 'white',
    fontSize: 12,
  },
  detail: {
    marginBottom: 5,
  },
  date: {
    marginTop: 5,
  },
  actions: {
    marginTop: 10,
  },
  button: {
    marginTop: 5,
  },
});