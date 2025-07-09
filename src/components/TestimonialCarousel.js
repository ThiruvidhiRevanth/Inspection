import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Avatar } from 'react-native-paper';
import { useTheme } from '../context/ThemeContext';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    rating: 5,
    text: 'Excellent service! Very thorough inspection and detailed report.',
    avatar: 'J',
  },
  {
    id: 2,
    name: 'Sarah Smith',
    rating: 5,
    text: 'Professional team and quick turnaround. Highly recommended!',
    avatar: 'S',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    rating: 4,
    text: 'Great attention to detail. Found issues I would have missed.',
    avatar: 'M',
  },
];

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Text key={i} style={i < rating ? styles.starFilled : styles.starEmpty}>
        ★
      </Text>
    ));
  };

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      onMomentumScrollEnd={(event) => {
        const index = Math.round(event.nativeEvent.contentOffset.x / 300);
        setCurrentIndex(index);
      }}
    >
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} style={[styles.testimonialCard, { backgroundColor: theme.colors.surface }]}>
          <Card.Content>
            <View style={styles.header}>
              <Avatar.Text size={40} label={testimonial.avatar} />
              <View style={styles.nameAndRating}>
                <Text variant="titleMedium" style={{ color: theme.colors.onSurface }}>
                  {testimonial.name}
                </Text>
                <View style={styles.rating}>
                  {renderStars(testimonial.rating)}
                </View>
              </View>
            </View>
            <Text variant="bodyMedium" style={[styles.testimonialText, { color: theme.colors.onSurface }]}>
              "{testimonial.text}"
            </Text>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  testimonialCard: {
    width: 300,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  nameAndRating: {
    marginLeft: 10,
    flex: 1,
  },
  rating: {
    flexDirection: 'row',
  },
  starFilled: {
    color: '#FFD700',
    fontSize: 16,
  },
  starEmpty: {
    color: '#DDD',
    fontSize: 16,
  },
  testimonialText: {
    fontStyle: 'italic',
    textAlign: 'center',
  },
});