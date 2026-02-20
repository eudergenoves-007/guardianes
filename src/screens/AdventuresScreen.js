import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

const ADVENTURES = [
  {
    id: 1,
    title: 'La Red de la Vida',
    subtitle: 'Todo está conectado',
    description: 'Descubre cómo cada elemento del jardín se ayuda mutuamente',
    icon: '🕸️',
    color: '#27AE60',
    completed: true,
    progress: 100,
  },
  {
    id: 2,
    title: 'Los Ciclos del Jardín',
    subtitle: 'Nada se desperdicia',
    description: 'Aprende sobre los ciclos naturales de la creación de Dios',
    icon: '🔄',
    color: '#3498DB',
    completed: false,
    progress: 45,
  },
  {
    id: 3,
    title: 'La Diversidad Asombrosa',
    subtitle: 'Cada quien es especial',
    description: 'Explora la variedad increíble de la creación',
    icon: '🦋',
    color: '#9B59B6',
    completed: false,
    progress: 0,
  },
  {
    id: 4,
    title: 'Los Límites Sabios',
    subtitle: 'Cada cosa en su lugar',
    description: 'Comprende el orden y los límites en la naturaleza',
    icon: '⚖️',
    color: '#E74C3C',
    completed: false,
    progress: 0,
  },
  {
    id: 5,
    title: 'El Llamado del Guardián',
    subtitle: 'Nuestra responsabilidad',
    description: 'Descubre tu rol como cuidador del jardín de Dios',
    icon: '🛡️',
    color: '#F39C12',
    completed: false,
    progress: 0,
  },
  {
    id: 6,
    title: 'Restauración y Esperanza',
    subtitle: 'Todo puede sanar',
    description: 'Aprende sobre restauración y renovación',
    icon: '🌱',
    color: '#1ABC9C',
    completed: false,
    progress: 0,
  },
];

export default function AdventuresScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#27AE60', '#2ECC71']} style={styles.header}>
        <Text style={styles.headerTitle}>Aventuras</Text>
        <Text style={styles.headerSubtitle}>
          6 aventuras para descubrir el jardín de Dios
        </Text>
      </LinearGradient>

      {/* Lista de aventuras */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {ADVENTURES.map((adventure, index) => (
          <Animatable.View
            key={adventure.id}
            animation="fadeInRight"
            delay={index * 100}
            style={styles.cardWrapper}
          >
            <TouchableOpacity
              style={styles.adventureCard}
              onPress={() =>
                navigation.navigate('AdventureDetail', {
                  adventureId: adventure.id,
                })
              }
              activeOpacity={0.8}
            >
              <LinearGradient
                colors={
                  adventure.completed
                    ? [adventure.color, adventure.color + 'CC']
                    : ['#f8f9fa', '#ffffff']
                }
                style={styles.cardGradient}
              >
                {/* Indicador de completado */}
                {adventure.completed && (
                  <View style={styles.completedBadge}>
                    <Ionicons name="checkmark-circle" size={24} color="white" />
                  </View>
                )}

                {/* Contenido */}
                <View style={styles.cardContent}>
                  {/* Ícono y número */}
                  <View style={styles.iconContainer}>
                    <Text style={styles.adventureIcon}>{adventure.icon}</Text>
                    <View
                      style={[
                        styles.numberBadge,
                        { backgroundColor: adventure.color },
                      ]}
                    >
                      <Text style={styles.numberText}>{adventure.id}</Text>
                    </View>
                  </View>

                  {/* Texto */}
                  <View style={styles.textContainer}>
                    <Text
                      style={[
                        styles.adventureTitle,
                        { color: adventure.completed ? 'white' : '#2C3E50' },
                      ]}
                    >
                      {adventure.title}
                    </Text>
                    <Text
                      style={[
                        styles.adventureSubtitle,
                        {
                          color: adventure.completed
                            ? 'rgba(255,255,255,0.9)'
                            : '#7F8C8D',
                        },
                      ]}
                    >
                      {adventure.subtitle}
                    </Text>
                    <Text
                      style={[
                        styles.adventureDescription,
                        {
                          color: adventure.completed
                            ? 'rgba(255,255,255,0.8)'
                            : '#95A5A6',
                        },
                      ]}
                    >
                      {adventure.description}
                    </Text>

                    {/* Barra de progreso */}
                    {adventure.progress > 0 && (
                      <View style={styles.progressContainer}>
                        <View
                          style={[
                            styles.progressBarBg,
                            {
                              backgroundColor: adventure.completed
                                ? 'rgba(255,255,255,0.3)'
                                : '#E8F8F5',
                            },
                          ]}
                        >
                          <View
                            style={[
                              styles.progressBarFill,
                              {
                                width: `${adventure.progress}%`,
                                backgroundColor: adventure.completed
                                  ? 'white'
                                  : adventure.color,
                              },
                            ]}
                          />
                        </View>
                        <Text
                          style={[
                            styles.progressText,
                            {
                              color: adventure.completed
                                ? 'rgba(255,255,255,0.9)'
                                : '#7F8C8D',
                            },
                          ]}
                        >
                          {adventure.progress}%
                        </Text>
                      </View>
                    )}
                  </View>

                  {/* Flecha */}
                  <Ionicons
                    name="chevron-forward"
                    size={24}
                    color={adventure.completed ? 'white' : adventure.color}
                  />
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Animatable.View>
        ))}

        {/* Espacio inferior */}
        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
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
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  scrollView: {
    flex: 1,
    paddingTop: 20,
  },
  cardWrapper: {
    marginHorizontal: 20,
    marginBottom: 15,
  },
  adventureCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  cardGradient: {
    padding: 20,
  },
  completedBadge: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 10,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 15,
    alignItems: 'center',
  },
  adventureIcon: {
    fontSize: 50,
    marginBottom: 5,
  },
  numberBadge: {
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  adventureTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  adventureSubtitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 5,
  },
  adventureDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    marginRight: 10,
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    width: 40,
  },
});
