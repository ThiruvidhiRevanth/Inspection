# Inspection App - React Native

A mobile application for home/property inspection requests with user authentication, dynamic forms, and order management.

## Features

### ✅ Implemented Features
- **Authentication**: Phone/Email login with OTP verification (demo OTP: 1234)
- **Dynamic Forms**: Property type-specific fields (Apartment/Villa: BHK & Toilets, Office: Rooms & Toilets)
- **Data Persistence**: AsyncStorage for local data storage
- **Order Management**: Create, view, and manage inspection orders
- **Profile Management**: User profile with order history
- **Payment Tracking**: Track paid/unpaid orders
- **Data Prefill**: Auto-populate forms with previous order data
- **Responsive UI**: Clean, modern interface with React Native Paper

### 🏠 Core Screens
1. **Login Screen**: Phone/Email + OTP verification
2. **Home Screen**: CRN ID display, project showcase, testimonials
3. **New Inspection**: Dynamic form based on property type
4. **Profile**: User info and order history
5. **Payment**: Payment status tracking
6. **Support**: Contact information and FAQ

### 🔧 Technical Implementation
- **Framework**: React Native with Expo
- **Navigation**: React Navigation v6 (Stack + Bottom Tabs)
- **State Management**: React Context API
- **UI Components**: React Native Paper
- **Storage**: AsyncStorage for local persistence
- **Mock Data**: Static testimonials, project showcase

### 📱 App Flow
1. **Login** → Enter phone/email → Receive OTP (use 1234) → Verify
2. **Home** → View CRN ID, projects, testimonials → Create new inspection
3. **New Inspection** → Fill dynamic form → Submit (auto-saves to profile)
4. **Profile** → View orders → Pay/Schedule inspection
5. **Payment** → Track payment status for all orders

## Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI: `npm install -g expo-cli`
- Expo Go app on your mobile device

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd inspection-app
