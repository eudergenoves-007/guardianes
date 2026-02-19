// ProgressScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const ACHIEVEMENTS = [
  { id: 1, title: 'Primera Aventura', icon: 'star', unlocked: true, color: '#F39C12' },
  { id: 2, title: 'Guardián Dedicado', icon: 'flame', unlocked: true, color: '#E74C3C' },
  { id: 3, title: 'Explorador', icon: 'compass', unlocked: false, color: '#BDC3C7' },
  { id: 4, title: 'Sabio del Jardín', icon: 'school', unlocked: false, color: '#BDC3C7' },
];

export default function ProgressScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#F39C12', '#F8C471']} style={styles.header}>
        <Text style={styles.headerTitle}>Mi Progreso</Text>
        <View style={styles.statsRow}>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>2</Text>
            <Text style={styles.statLabel}>Aventuras</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>650</Text>
            <Text style={styles.statLabel}>Puntos</Text>
          </View>
          <View style={styles.stat}>
            <Text style={styles.statNumber}>5</Text>
            <Text style={styles.statLabel}>Nivel</Text>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Logros 🏆</Text>
        <View style={styles.achievementsGrid}>
          {ACHIEVEMENTS.map((achievement, index) => (
            <Animatable.View
              key={achievement.id}
              animation={achievement.unlocked ? 'bounceIn' : 'fadeIn'}
              delay={index * 100}
              style={styles.achievementCard}
            >
              <View
                style={[
                  styles.achievementIcon,
                  { backgroundColor: achievement.color },
                  !achievement.unlocked && styles.lockedIcon,
                ]}
              >
                <Ionicons
                  name={achievement.icon}
                  size={30}
                  color="white"
                />
              </View>
              <Text style={styles.achievementTitle}>{achievement.title}</Text>
              {!achievement.unlocked && (
                <Ionicons name="lock-closed" size={16} color="#BDC3C7" />
              )}
            </Animatable.View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Racha de Días 🔥</Text>
        <View style={styles.streakCard}>
          <Text style={styles.streakNumber}>7</Text>
          <Text style={styles.streakText}>días consecutivos</Text>
          <View style={styles.streakDays}>
            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
              <View
                key={i}
                style={[
                  styles.dayCircle,
                  i < 5 && styles.dayCircleActive,
                ]}
              >
                <Text
                  style={[
                    styles.dayText,
                    i < 5 && styles.dayTextActive,
                  ]}
                >
                  {day}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <Text style={styles.sectionTitle}>Próximo Nivel</Text>
        <View style={styles.levelCard}>
          <View style={styles.levelHeader}>
            <Text style={styles.levelText}>Nivel 5</Text>
            <Text style={styles.levelText}>Nivel 6</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '80%' }]} />
          </View>
          <Text style={styles.pointsNeeded}>50 puntos más para subir de nivel</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  stat: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  statLabel: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginTop: 15,
    marginBottom: 15,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  achievementCard: {
    width: '48%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  achievementIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  lockedIcon: {
    opacity: 0.4,
  },
  achievementTitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#2C3E50',
    marginBottom: 5,
  },
  streakCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  streakNumber: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#E74C3C',
  },
  streakText: {
    fontSize: 16,
    color: '#7F8C8D',
    marginBottom: 20,
  },
  streakDays: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  dayCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleActive: {
    backgroundColor: '#E74C3C',
  },
  dayText: {
    fontSize: 14,
    color: '#BDC3C7',
    fontWeight: 'bold',
  },
  dayTextActive: {
    color: 'white',
  },
  levelCard: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: '#E8F8F5',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 5,
  },
  pointsNeeded: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
  },
});
