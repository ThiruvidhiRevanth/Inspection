# Inspection App - React Native

A mobile application for home/property inspection requests with user authentication, dynamic forms, and order management.

---

## 🚀 Features

### ✅ Implemented Features

- **Authentication:** Phone/Email login with OTP verification (demo OTP: `1234`)
- **Dynamic Forms:** Property type-specific fields (Apartment/Villa: BHK & Toilets, Office: Rooms & Toilets)
- **Data Persistence:** AsyncStorage for local data storage
- **Order Management:** Create, view, and manage inspection orders
- **Profile Management:** User profile with order history
- **Payment Tracking:** Track paid/unpaid orders
- **Data Prefill:** Auto-populate forms with previous order data
- **Responsive UI:** Clean, modern interface with React Native Paper

---

## 🏠 Core Screens

- **Login Screen:** Phone/Email + OTP verification
- **Home Screen:** CRN ID display, project showcase, testimonials
- **New Inspection:** Dynamic form based on property type
- **Profile:** User info and order history
- **Payment:** Payment status tracking
- **Support:** Contact information and FAQ

---

## 🔧 Technical Implementation

- **Framework:** React Native with Expo
- **Navigation:** React Navigation v6 (Stack + Bottom Tabs)
- **State Management:** React Context API
- **UI Components:** React Native Paper
- **Storage:** AsyncStorage for local persistence
- **Mock Data:** Static testimonials, project showcase

---

## 📱 App Flow

1. **Login** → Enter phone/email → Receive OTP (`1234`) → Verify
2. **Home** → View CRN ID, projects, testimonials → Create new inspection
3. **New Inspection** → Fill dynamic form → Submit (auto-saves to profile)
4. **Profile** → View orders → Pay/Schedule inspection
5. **Payment** → Track payment status for all orders

---

## 🛠️ Setup Instructions

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
    ```
2. **Install dependencies**
    ```bash
    npm install
    ```
3. **Start the development server**
    ```bash
    expo start
    ```
4. **Run on device/emulator**
    - Scan QR code with Expo Go app (Android)
    - Scan QR code with Camera app (iOS)
    - Or press `a` for Android emulator, `i` for iOS simulator

---

## 🔐 Demo Login Instructions

### Test Credentials

- **Phone/Email:** Any valid email or phone number
- **OTP:** `1234` (hardcoded for demo)

#### Sample User Journey

1. Enter `test@example.com` or `+1234567890`
2. Tap "Send OTP"
3. Enter `1234` when prompted
4. Explore the app features

---

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── DynamicForm.js   # Property-specific form fields
│   ├── OrderCard.js     # Order display component
│   └── TestimonialCarousel.js
├── context/             # State management
│   └── AppContext.js    # Main app context
├── screens/             # App screens
│   ├── LoginScreen.js
│   ├── HomeScreen.js
│   ├── NewInspectionScreen.js
│   ├── ProfileScreen.js
│   ├── PaymentScreen.js
│   └── SupportScreen.js
└── utils/               # Utility functions
    └── storage.js       # AsyncStorage wrapper
```

---

## 🎯 Key Features Explained

### 1. Dynamic Form System

- **Property Type Selection:** Apartment/Villa/Office
- **Conditional Fields:**
    - Apartment/Villa: BHK + Toilets
    - Office: Rooms + Toilets
- **Interactive Counters:** +/- buttons for numeric inputs
- **Service Type:** Dropdown with 3 options

### 2. Data Persistence

- **AsyncStorage Integration:** All data persists between app sessions
- **Auto-prefill:** Forms populate with previous order data
- **Profile Sync:** User info syncs across orders

### 3. Order Management

- **Unique IDs:** Auto-generated CRN and Order IDs
- **Status Tracking:** Pending → Paid → Scheduled
- **Payment Integration:** Mock payment flow

### 4. UI/UX Features

- **Material Design:** React Native Paper components
- **Responsive Layout:** Adapts to different screen sizes
- **Loading States:** Smooth transitions and feedback
- **Error Handling:** User-friendly error messages

---

## 📊 Mock Data

### Testimonials

```javascript
[
  { name: "John Doe", rating: 5, text: "Excellent service!" },
  { name: "Sarah Smith", rating: 5, text: "Professional team!" },
  { name: "Mike Johnson", rating: 4, text: "Great attention to detail!" }
]
```

### Service Types

- Basic Inspection
- Detailed Inspection
- Premium Inspection

### Property Types

- Apartment (BHK + Toilets)
- Villa (BHK + Toilets)
- Office (Rooms + Toilets)

---

## 🔧 Development Notes

### State Management

- **Context API:** Centralized state management
- **Local Storage:** AsyncStorage for persistence
- **Data Flow:** Components → Context → Storage

### Form Validation

- **Required Fields:** Name, Phone, Email
- **Input Types:** Phone, Email, Numeric
- **Dynamic Validation:** Based on property type

### Navigation Structure

```
LoginScreen
└── MainTabs
    ├── HomeScreen
    ├── SupportScreen
    ├── PaymentScreen
    └── ProfileScreen
    └── NewInspectionScreen (Modal)
```

---

## 🚧 Known Limitations

### Features Not Implemented (As Per Requirements)

- Real OTP verification
- Actual payment gateway integration
- Inspector assignment system
- Detailed inspection checklist
- PDF report generation
- Admin panel
- Push notifications

### Technical Limitations

- No backend API integration
- Limited offline functionality
- No image upload for property photos
- No real-time updates

---

## 📋 Dependencies

```json
{
  "expo": "~49.0.0",
  "react": "18.2.0",
  "react-native": "0.72.6",
  "@react-navigation/native": "^6.1.7",
  "@react-navigation/stack": "^6.3.17",
  "@react-navigation/bottom-tabs": "^6.5.8",
  "react-native-paper": "^5.10.4",
  "@react-native-async-storage/async-storage": "1.18.2",
  "react-native-vector-icons": "^10.0.0"
}
```

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the [License](LICENSE) file for details.

---
