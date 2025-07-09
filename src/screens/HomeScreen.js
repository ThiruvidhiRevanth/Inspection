import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, Avatar, Banner } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useTheme,} from '../context/ThemeContext';
import TestimonialCarousel from '../components/TestimonialCarousel';
export default function HomeScreen({ navigation }) {
  const { state } = useApp();
  const { theme } = useTheme();
  const hasUnpaidOrders = state.orders.some(order => !order.isPaid);

  const handlePayNow = () => {
    Alert.alert('Payment', 'Redirecting to payment gateway...');
  };

  const handleNewInspection = () => {
    navigation.navigate('NewInspection');
  };

  const styles = createStyles(theme);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Header Section */}
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.headerLeft}>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
            CRN ID: {state.crnId}
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface }}>
            Welcome back!
          </Text>
        </View>
        <Avatar.Icon size={40} icon="account" />
      </View>

      {/* Payment Banner */}
      {hasUnpaidOrders && (
        <Banner
          visible={true}
          actions={[
            {
              label: 'Pay Now',
              onPress: handlePayNow,
            },
          ]}
          icon="alert-circle"
          style={{ backgroundColor: theme.colors.errorContainer }}
        >
          You have pending payments. Complete payment to schedule inspection.
        </Banner>
      )}

      {/* New Inspection Button */}
      <Button
        mode="contained"
        onPress={handleNewInspection}
        style={styles.newInspectionButton}
        icon="plus"
        buttonColor={theme.colors.primary}
      >
        New Inspection
      </Button>

      {/* Demo Video/Image Section */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Cover 
          source={{ uri: 'https://picsum.photos/400/200' }}
          style={styles.demoImage}
        />
        <Card.Content>
          <Text variant="titleMedium" style={{ color: theme.colors.onSurface,textAlign:'center',marginTop:20 }}>
           Comprehensive Home Inspections by Certified Experts
          </Text>
          <Text variant="bodyMedium" style={{ color: theme.colors.onSurface,textAlign:'center',marginTop:20}}>
            TEKFIX is India’s leading Property Inspection Company. TEKFIX qualified civil engineers conduct a thorough inspection of a property with the help of high tech equipment and submit a comprehensive report. TEKFIX aims to enable defect-free housing for all.
          </Text>
        </Card.Content>
      </Card>

      {/* Project Showcase */}
      <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        Our Recent Projects
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} style={[styles.projectCard, { backgroundColor: theme.colors.surface }]}>
            <Card.Cover 
              source={{ uri: `https://picsum.photos/200/150?random=${item}` }}
            />
            <Card.Content>
              <Text variant="bodySmall" style={{ color: theme.colors.onSurface }}>
                Project {item}
              </Text>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>

      {/* Testimonials */}
      <Text variant="titleLarge" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
        What Our Clients Say
      </Text>
      <TestimonialCarousel />
    </ScrollView>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  headerLeft: {
    flex: 1,
  },
  newInspectionButton: {
    margin: 20,
  },
  card: {
    margin: 20,
    marginTop: 10,
  },
  demoImage: {
    height: 200,
  borderTopLeftRadius: 12,
  borderTopRightRadius: 12,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  },
  sectionTitle: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  projectCard: {
    width: 150,
    marginLeft: 20,
    marginBottom: 20,
  borderTopRightRadius: 12,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  },
});