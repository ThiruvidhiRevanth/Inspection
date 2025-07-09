import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Text, Card, Button, List } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';

export default function PaymentScreen() {
  const { state } = useApp();
  const { theme } = useTheme();
  
  const unpaidOrders = state.orders.filter(order => !order.isPaid);
  const paidOrders = state.orders.filter(order => order.isPaid);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            Payment Status
          </Text>
          
          {unpaidOrders.length > 0 && (
            <>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Pending Payments
              </Text>
              {unpaidOrders.map((order) => (
                <List.Item
                  key={order.id}
                  title={order.id}
                  description={`${order.propertyType} - ${order.serviceType}`}
                  left={props => <List.Icon {...props} icon="clock" iconColor={theme.colors.primary} />}
                  right={props => (
                    <Button mode="contained" size="small" buttonColor={theme.colors.primary}>
                      Pay Now
                    </Button>
                  )}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurface }}
                />
              ))}
            </>
          )}
          
          {paidOrders.length > 0 && (
            <>
              <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
                Completed Payments
              </Text>
              {paidOrders.map((order) => (
                <List.Item
                  key={order.id}
                  title={order.id}
                  description={`${order.propertyType} - ${order.serviceType}`}
                  left={props => <List.Icon {...props} icon="check-circle" iconColor="#4CAF50" />}
                  right={props => (
                    <Text variant="bodySmall" style={[styles.paidText, { color: '#4CAF50' }]}>
                      PAID
                    </Text>
                  )}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurface }}
                />
              ))}
            </>
          )}
          
          {state.orders.length === 0 && (
            <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.onSurface }]}>
              No orders found. Create your first inspection request!
            </Text>
          )}
        </Card.Content>
      </Card>
    </ScrollView>
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
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
  },
  paidText: {
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
  },
});