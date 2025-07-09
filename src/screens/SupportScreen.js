import React from 'react';
import { View, StyleSheet, ScrollView, Linking } from 'react-native';
import { Text, Card, List, Button } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

export default function SupportScreen() {
  const { theme } = useTheme();
  
  const handleCall = () => {
    Linking.openURL('tel:+1234567890');
  };

  const handleEmail = () => {
    Linking.openURL('mailto:support@inspectionapp.com');
  };

  const handleWhatsApp = () => {
    Linking.openURL('https://wa.me/1234567890');
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            Support & Help
          </Text>
          
          <List.Item
            title="Call Support"
            description="+1 (234) 567-8900"
            left={props => <List.Icon {...props} icon="phone" iconColor={theme.colors.primary} />}
            onPress={handleCall}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="Email Support"
            description="support@inspectionapp.com"
            left={props => <List.Icon {...props} icon="email" iconColor={theme.colors.primary} />}
            onPress={handleEmail}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="WhatsApp"
            description="Chat with us on WhatsApp"
            left={props => <List.Icon {...props} icon="whatsapp" iconColor={theme.colors.primary} />}
            onPress={handleWhatsApp}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
        </Card.Content>
      </Card>
      
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleMedium" style={[styles.sectionTitle, { color: theme.colors.onSurface }]}>
            Frequently Asked Questions
          </Text>
          
          <List.Item
            title="How long does an inspection take?"
            description="Typically 2-4 hours depending on property size"
            left={props => <List.Icon {...props} icon="help-circle" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="What is included in the report?"
            description="Detailed findings, photos, and recommendations"
            left={props => <List.Icon {...props} icon="help-circle" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="Can I reschedule my inspection?"
            description="Yes, contact support to reschedule"
            left={props => <List.Icon {...props} icon="help-circle" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
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
    marginBottom: 10,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    marginBottom: 10,
  },
});