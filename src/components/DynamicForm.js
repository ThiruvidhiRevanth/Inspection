import React from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, FlatList } from 'react-native';
import { Text, Divider, Surface, Portal } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

export default function DynamicForm({ formData, setFormData, disabled = false }) {
  const [propertyModalVisible, setPropertyModalVisible] = React.useState(false);
  const [serviceModalVisible, setServiceModalVisible] = React.useState(false);
  const { theme } = useTheme();

  const propertyTypes = [
    { label: 'Apartment', value: 'apartment' },
    { label: 'Villa', value: 'villa' },
    { label: 'Office', value: 'office' },
  ];

  const serviceTypes = [
    { label: 'Basic Inspection', value: 'basic' },
    { label: 'Detailed Inspection', value: 'detailed' },
    { label: 'Premium Inspection', value: 'premium' },
  ];

  const updateCounter = (field, increment) => {
    if (disabled) return;
    setFormData(prev => ({
      ...prev,
      [field]: Math.max(1, prev[field] + (increment ? 1 : -1))
    }));
  };

  const CounterRow = ({ label, value, onDecrease, onIncrease }) => (
    <Surface style={[styles.counterContainer, { backgroundColor: theme.colors.surface }]} elevation={1}>
      <Text variant="bodyLarge" style={[styles.counterLabel, { color: theme.colors.onSurface }]}>
        {label}
      </Text>
      <View style={styles.counterControls}>
        <TouchableOpacity 
          style={[
            styles.counterButton, 
            { backgroundColor: theme.colors.primary },
            disabled && styles.disabledButton
          ]} 
          onPress={onDecrease}
          disabled={disabled}
        >
          <Text style={styles.counterButtonText}>−</Text>
        </TouchableOpacity>
        
        <Text style={[styles.counterNumber, { color: theme.colors.onSurface }]}>
          {value}
        </Text>
        
        <TouchableOpacity 
          style={[
            styles.counterButton, 
            { backgroundColor: theme.colors.primary },
            disabled && styles.disabledButton
          ]} 
          onPress={onIncrease}
          disabled={disabled}
        >
          <Text style={styles.counterButtonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Surface>
  );

  const DropdownModal = ({ visible, onDismiss, options, onSelect, title }) => (
    <Portal>
      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={onDismiss}
      >
        <TouchableOpacity 
          style={styles.modalOverlay} 
          onPress={onDismiss}
          activeOpacity={1}
        >
          <View style={[styles.modalContainer, { backgroundColor: theme.colors.surface }]}>
            <Text variant="titleMedium" style={[styles.modalTitle, { color: theme.colors.onSurface }]}>
              {title}
            </Text>
            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.modalItem, { borderBottomColor: theme.colors.outline }]}
                  onPress={() => onSelect(item.value)}
                >
                  <Text style={[styles.modalItemText, { color: theme.colors.onSurface }]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </Portal>
  );

  const renderPropertySpecificFields = () => {
    if (formData.propertyType === 'office') {
      return (
        <View>
          <CounterRow
            label="Rooms"
            value={formData.rooms}
            onDecrease={() => updateCounter('rooms', false)}
            onIncrease={() => updateCounter('rooms', true)}
          />
          <CounterRow
            label="Toilets"
            value={formData.toilets}
            onDecrease={() => updateCounter('toilets', false)}
            onIncrease={() => updateCounter('toilets', true)}
          />
        </View>
      );
    } else {
      return (
        <View>
          <CounterRow
            label="BHK"
            value={formData.bhk}
            onDecrease={() => updateCounter('bhk', false)}
            onIncrease={() => updateCounter('bhk', true)}
          />
          <CounterRow
            label="Toilets"
            value={formData.toilets}
            onDecrease={() => updateCounter('toilets', false)}
            onIncrease={() => updateCounter('toilets', true)}
          />
        </View>
      );
    }
  };

  const styles = createStyles(theme);

  return (
    <View style={styles.container}>
      {/* Property Type Dropdown */}
      <View style={styles.fieldContainer}>
        <Text variant="bodyLarge" style={[styles.label, { color: theme.colors.onSurface }]}>
          Property Type
        </Text>
        
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline },
            disabled && styles.disabledButton
          ]}
          onPress={() => !disabled && setPropertyModalVisible(true)}
          disabled={disabled}
        >
          <Text style={[styles.dropdownText, { color: theme.colors.onSurface }, disabled && styles.disabledText]}>
            {propertyTypes.find(p => p.value === formData.propertyType)?.label || 'Select Property Type'}
          </Text>
          <Text style={[styles.dropdownArrow, { color: theme.colors.onSurface }, disabled && styles.disabledText]}>
            ▼
          </Text>
        </TouchableOpacity>

        <DropdownModal
          visible={propertyModalVisible}
          onDismiss={() => setPropertyModalVisible(false)}
          options={propertyTypes}
          title="Select Property Type"
          onSelect={(value) => {
            setFormData(prev => ({ ...prev, propertyType: value }));
            setPropertyModalVisible(false);
          }}
        />
      </View>

      <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

      {/* Property Specific Fields */}
      {renderPropertySpecificFields()}

      <Divider style={[styles.divider, { backgroundColor: theme.colors.outline }]} />

      {/* Service Type Dropdown */}
      <View style={styles.fieldContainer}>
        <Text variant="bodyLarge" style={[styles.label, { color: theme.colors.onSurface }]}>
          Service Type
        </Text>
        
        <TouchableOpacity
          style={[
            styles.dropdownButton,
            { backgroundColor: theme.colors.surface, borderColor: theme.colors.outline },
            disabled && styles.disabledButton
          ]}
          onPress={() => !disabled && setServiceModalVisible(true)}
          disabled={disabled}
        >
          <Text style={[styles.dropdownText, { color: theme.colors.onSurface }, disabled && styles.disabledText]}>
            {serviceTypes.find(s => s.value === formData.serviceType)?.label || 'Select Service Type'}
          </Text>
          <Text style={[styles.dropdownArrow, { color: theme.colors.onSurface }, disabled && styles.disabledText]}>
            ▼
          </Text>
        </TouchableOpacity>

        <DropdownModal
          visible={serviceModalVisible}
          onDismiss={() => setServiceModalVisible(false)}
          options={serviceTypes}
          title="Select Service Type"
          onSelect={(value) => {
            setFormData(prev => ({ ...prev, serviceType: value }));
            setServiceModalVisible(false);
          }}
        />
      </View>
    </View>
  );
}

const createStyles = (theme) => StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  fieldContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  
  // Dropdown Button
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    minHeight: 50,
  },
  dropdownText: {
    fontSize: 16,
    flex: 1,
  },
  dropdownArrow: {
    fontSize: 12,
  },
  
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
    modalContainer: {
    borderRadius: 12,
    padding: 20,
    maxHeight: '50%',
    width: '80%',
    maxWidth: 300,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: 'bold',
  },
  modalItem: {
    paddingVertical: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
  },
  modalItemText: {
    fontSize: 16,
    textAlign: 'center',
  },
  
  // Counter Styles
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 12,
  },
  counterLabel: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  counterControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  counterButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  counterNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    minWidth: 30,
    textAlign: 'center',
  },
  
  // Disabled styles
  disabledButton: {
    opacity: 0.6,
  },
  disabledText: {
    opacity: 0.6,
  },

  divider: {
    marginVertical: 15,
  },
});