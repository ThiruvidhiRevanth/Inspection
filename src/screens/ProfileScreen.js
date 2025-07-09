import React from 'react';
import { View, StyleSheet, ScrollView, Alert } from 'react-native';
import { Text, Card, Button, List, Divider, Switch, IconButton } from 'react-native-paper';
import { useApp } from '../context/AppContext';
import { useTheme } from '../context/ThemeContext';
import OrderCard from '../components/OrderCard';

export default function ProfileScreen({ navigation }) {
  const { state, logout } = useApp();
  const { theme, isDarkMode, toggleTheme, themePreference, setSystemTheme } = useTheme();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          },
        },
      ]
    );
  };

  const handleThemeChange = () => {
    Alert.alert(
      'Theme Settings',
      'Choose your preferred theme:',
      [
        {
          text: 'Light',
          onPress: () => {
            if (isDarkMode) toggleTheme();
          },
        },
        {
          text: 'Dark',
          onPress: () => {
            if (!isDarkMode) toggleTheme();
          },
        },
        {
          text: 'System',
          onPress: setSystemTheme,
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {/* Profile Card */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <View style={styles.header}>
            <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
              Profile
            </Text>
            <IconButton
              icon="logout"
              size={24}
              onPress={handleLogout}
              iconColor={theme.colors.error}
            />
          </View>
          
          <List.Item
            title="CRN ID"
            description={state.crnId}
            left={props => <List.Icon {...props} icon="identifier" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="Name"
            description={state.profile?.fullName || 'Not provided'}
            left={props => <List.Icon {...props} icon="account" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="Phone"
            description={state.profile?.phone || state.user?.phoneOrEmail || 'Not provided'}
            left={props => <List.Icon {...props} icon="phone" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <List.Item
            title="Email"
            description={state.profile?.email || state.user?.phoneOrEmail || 'Not provided'}
            left={props => <List.Icon {...props} icon="email" iconColor={theme.colors.primary} />}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
        </Card.Content>
      </Card>

      {/* Settings Card */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            Settings
          </Text>
          
          <List.Item
            title="Dark Mode"
            description={`Current: ${themePreference === 'system' ? 'System' : isDarkMode ? 'Dark' : 'Light'}`}
            left={props => <List.Icon {...props} icon="theme-light-dark" iconColor={theme.colors.primary} />}
            right={() => (
              <Switch
                value={isDarkMode}
                onValueChange={toggleTheme}
                thumbColor={theme.colors.primary}
                trackColor={{ false: theme.colors.outline, true: theme.colors.primary }}
              />
            )}
            onPress={handleThemeChange}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
          
          <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />
          
          <List.Item
            title="Logout"
            description="Sign out of your account"
            left={props => <List.Icon {...props} icon="logout" iconColor={theme.colors.error} />}
            onPress={handleLogout}
            titleStyle={{ color: theme.colors.error }}
            descriptionStyle={{ color: theme.colors.onSurface }}
          />
        </Card.Content>
      </Card>

      {/* Order History Card */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text variant="titleLarge" style={[styles.title, { color: theme.colors.onSurface }]}>
            Order History
          </Text>
          
          {state.orders.length === 0 ? (
            <Text variant="bodyMedium" style={[styles.emptyText, { color: theme.colors.onSurface }]}>
              No orders yet. Create your first inspection request!
            </Text>
          ) : (
            state.orders.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))
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
    marginBottom: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  title: {
    textAlign: 'center',
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginVertical: 20,
  },
  divider: {
    marginVertical: 10,
  },
});