import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'inspection_app_data';

export const saveUserData = async (data) => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving user data:', error);
  }
};

export const loadUserData = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading user data:', error);
    return null;
  }
};

export const clearUserData = async () => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
    console.log('User data cleared successfully');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

// Add this new function to clear all app data
export const clearAllData = async () => {
  try {
    await AsyncStorage.clear();
    console.log('All AsyncStorage data cleared');
  } catch (error) {
    console.error('Error clearing all data:', error);
  }
};

// Add this function to debug storage contents
export const debugStorage = async () => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    console.log('Current storage data:', data);
    if (data) {
      const parsed = JSON.parse(data);
      console.log('Parsed orders:', parsed.orders);
    }
  } catch (error) {
    console.error('Error reading storage:', error);
  }
};