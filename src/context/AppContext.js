import React, { createContext, useContext, useReducer, useEffect, useRef } from 'react';
import { loadUserData, saveUserData, clearUserData } from '../utils/storage';

const AppContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
  crnId: null,
  orders: [],
  profile: null,
  orderCounter: 1,
};

function appReducer(state, action) {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'SET_CRN_ID':
      return { ...state, crnId: action.payload };
    case 'SET_PROFILE':
      return { ...state, profile: action.payload };
    case 'ADD_ORDER':
      return { 
        ...state, 
        orders: [...state.orders, action.payload],
        orderCounter: action.payload.orderNumber + 1
      };
    case 'UPDATE_ORDER':
      return {
        ...state,
        orders: state.orders.map(order =>
          order.id === action.payload.id ? action.payload : order
        )
      };
    case 'LOAD_DATA':
      return { ...state, ...action.payload };
    case 'CLEAR_DATA':
      return initialState;
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  const orderCounterRef = useRef(1);
  const isAddingOrderRef = useRef(false); // Prevent multiple simultaneous calls

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      const userData = await loadUserData();
      if (userData) {
        // Calculate proper counter from existing orders
        const maxOrderNumber = userData.orders?.length > 0 
          ? Math.max(...userData.orders.map((order, index) => order.orderNumber || index + 1))
          : 0;
        
        const dataWithCounter = {
          ...userData,
          orderCounter: maxOrderNumber + 1
        };
        
        orderCounterRef.current = maxOrderNumber + 1;
        
        console.log('Loading data - orderCounter:', dataWithCounter.orderCounter);
        console.log('Existing orders:', userData.orders?.length || 0);
        
        dispatch({ type: 'LOAD_DATA', payload: dataWithCounter });
      }
    } catch (error) {
      console.error('Error loading initial data:', error);
    }
  };

  const saveData = async (data) => {
    try {
      await saveUserData(data);
    } catch (error) {
      console.error('Error saving data:', error);
    }
  };

  const login = (userInfo) => {
    const crnId = `CRN${Math.floor(Math.random() * 9000) + 1000}`;
    dispatch({ type: 'SET_USER', payload: userInfo });
    dispatch({ type: 'SET_CRN_ID', payload: crnId });
    
    const newState = { ...state, user: userInfo, crnId, isAuthenticated: true };
    saveData(newState);
  };

    const logout = async () => {
    try {
      await clearUserData();
      dispatch({ type: 'LOGOUT' });
      orderCounterRef.current = 1;
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  const updateProfile = (profileData) => {
    dispatch({ type: 'SET_PROFILE', payload: profileData });
    
    const newState = { ...state, profile: profileData };
    saveData(newState);
  };

  const addOrder = async (orderData) => {
    // Prevent multiple simultaneous calls
    if (isAddingOrderRef.current) {
      console.log('Order creation already in progress, skipping...');
      return;
    }
    
    isAddingOrderRef.current = true;
    
    try {
      // Generate truly unique ID with multiple components
      const timestamp = Date.now();
      const currentCounter = orderCounterRef.current;
      const orderId = `ORD${currentCounter}${timestamp}`;
      
      // Increment counter immediately
      orderCounterRef.current = currentCounter + 1;
      
      const newOrder = {
        id: orderId,
        orderNumber: currentCounter,
        ...orderData,
        isPaid: false,
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      console.log('=== CREATING NEW ORDER ===');
      console.log('Order ID:', orderId);
      console.log('Order Number:', currentCounter);
      console.log('Current orders count:', state.orders.length);
      
      dispatch({ type: 'ADD_ORDER', payload: newOrder });
      
      // Save immediately
      const newState = { 
        ...state, 
        orders: [...state.orders, newOrder],
        orderCounter: orderCounterRef.current
      };
      
      await saveData(newState);
      
      console.log('Order created successfully');
      console.log('=== END CREATE ORDER ===');
      
    } catch (error) {
      console.error('Error creating order:', error);
    } finally {
      isAddingOrderRef.current = false;
    }
  };

  const updateOrder = (orderId, updates) => {
    const updatedOrder = state.orders.find(order => order.id === orderId);
    if (updatedOrder) {
      const updated = { ...updatedOrder, ...updates };
      dispatch({ type: 'UPDATE_ORDER', payload: updated });
      
      const updatedOrders = state.orders.map(order =>
        order.id === orderId ? updated : order
      );
      
      const newState = { ...state, orders: updatedOrders };
      saveData(newState);
    }
  };

  const clearAllData = async () => {
    try {
      await clearUserData();
      dispatch({ type: 'CLEAR_DATA' });
      orderCounterRef.current = 1;
      console.log('All data cleared successfully');
    } catch (error) {
      console.error('Error clearing data:', error);
    }
  };

  const value = {
    state,
    login,
    logout,
    updateProfile,
    addOrder,
    updateOrder,
    clearAllData,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};