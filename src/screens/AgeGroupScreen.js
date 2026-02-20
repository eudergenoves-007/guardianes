import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { AGE_GROUPS } from '../data/adventuresData';

export default function AgeGroupScreen({ navigation, route }) {
  const { adventureId } = route.params || { adventureId: 1 };

  const handleSelectAgeGroup = (ageGroupId) => {
    navigation.navigate('AdventureDetail', {
      adventureId,
      selectedAgeGroup: ageGroupId,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecciona tu grupo de edad</Text>
      <Text style={styles.subtitle}>
        Cada grupo tiene material diseñado especialmente para su nivel
      </Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {AGE_GROUPS.map((group, index) => (
          <Animatable.View
            key={group.id}
            animation="fadeInUp"
            delay={index * 100}
            style={styles.cardWrapper}
          >
            <TouchableOpacity
              style={styles.card}
              onPress={() => handleSelectAgeGroup(group.id)}
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={[group.color, group.color + 'DD']}
                style={styles.gradient}
              >
                <Text style={styles.emoji}>{group.icon}</Text>
                <View style={styles.textContainer}>
                  <Text style={styles.groupName}>{group.name}</Text>
                  <Text style={styles.ageRange}>{group.ageRange}</Text>
                  <Text style={styles.description}>{group.description}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
  },
  cardWrapper: {
    marginBottom: 15,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  gradient: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emoji: {
    fontSize: 60,
    marginRight: 20,
  },
  textContainer: {
    flex: 1,
  },
  groupName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  ageRange: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.95)',
    marginBottom: 8,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
    lineHeight: 20,
  },
});
