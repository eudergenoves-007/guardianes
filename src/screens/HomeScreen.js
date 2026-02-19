import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function HomeScreen({ navigation }) {
  const quickActions = [
    {
      id: 1,
      title: 'Continuar\nAventura',
      icon: 'play-circle',
      color: '#27AE60',
      screen: 'Adventures',
    },
    {
      id: 2,
      title: 'Nueva\nAventura',
      icon: 'add-circle',
      color: '#3498DB',
      screen: 'AgeGroup',
    },
    {
      id: 3,
      title: 'Mi\nProgreso',
      icon: 'trophy',
      color: '#F39C12',
      screen: 'Progreso',
    },
    {
      id: 4,
      title: 'Audio\nCuentos',
      icon: 'headset',
      color: '#9B59B6',
      screen: 'AudioPlayer',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header con gradiente */}
      <LinearGradient
        colors={['#27AE60', '#2ECC71']}
        style={styles.header}
      >
        <Animatable.View animation="fadeInDown" style={styles.headerContent}>
          <Text style={styles.greeting}>¡Hola, Guardián!</Text>
          <Text style={styles.welcomeText}>
            Bienvenido al Jardín de Dios 🌱
          </Text>
        </Animatable.View>

        {/* Nivel y progreso */}
        <Animatable.View animation="fadeInUp" delay={300} style={styles.levelCard}>
          <View style={styles.levelInfo}>
            <Ionicons name="leaf" size={30} color="#27AE60" />
            <View style={styles.levelText}>
              <Text style={styles.levelTitle}>Nivel: Guardián Junior</Text>
              <View style={styles.progressBar}>
                <View style={[styles.progressFill, { width: '65%' }]} />
              </View>
              <Text style={styles.progressText}>65% completado</Text>
            </View>
          </View>
        </Animatable.View>
      </LinearGradient>

      {/* Acciones rápidas */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Acciones Rápidas</Text>
        <View style={styles.actionsGrid}>
          {quickActions.map((action, index) => (
            <Animatable.View
              key={action.id}
              animation="bounceIn"
              delay={index * 100}
            >
              <TouchableOpacity
                style={[styles.actionCard, { backgroundColor: action.color }]}
                onPress={() => navigation.navigate(action.screen)}
              >
                <Ionicons name={action.icon} size={40} color="white" />
                <Text style={styles.actionText}>{action.title}</Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </View>
      </View>

      {/* Aventura destacada */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Aventura Destacada</Text>
        <Animatable.View animation="fadeInUp" delay={400}>
          <TouchableOpacity
            style={styles.featuredCard}
            onPress={() =>
              navigation.navigate('AdventureDetail', { adventureId: 1 })
            }
          >
            <LinearGradient
              colors={['#27AE60', '#52BE80']}
              style={styles.featuredGradient}
            >
              <View style={styles.featuredContent}>
                <Text style={styles.featuredBadge}>NUEVA</Text>
                <Text style={styles.featuredTitle}>
                  Aventura 1: La Red de la Vida
                </Text>
                <Text style={styles.featuredDescription}>
                  Descubre cómo todo está conectado en el jardín de Dios
                </Text>
                <View style={styles.featuredFooter}>
                  <View style={styles.featuredTag}>
                    <Ionicons name="people" size={16} color="white" />
                    <Text style={styles.featuredTagText}>Todas las edades</Text>
                  </View>
                  <Ionicons name="arrow-forward-circle" size={30} color="white" />
                </View>
              </View>
            </LinearGradient>
          </TouchableOpacity>
        </Animatable.View>
      </View>

      {/* Tips diarios */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tip del Día 💡</Text>
        <Animatable.View animation="fadeIn" delay={600}>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>
              "Recuerda que cada pequeña acción cuenta. Hoy puedes ser guardián
              ayudando a regar una planta o recogiendo basura."
            </Text>
          </View>
        </Animatable.View>
      </View>

      {/* Espacio inferior */}
      <View style={{ height: 30 }} />
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
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    marginBottom: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  levelCard: {
    backgroundColor: 'white',
    borderRadius: 15,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  levelInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    flex: 1,
    marginLeft: 15,
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 8,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E8F8F5',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 5,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 4,
  },
  progressText: {
    fontSize: 12,
    color: '#7F8C8D',
  },
  section: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 15,
  },
  actionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  actionCard: {
    width: (width - 50) / 2,
    aspectRatio: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 10,
    textAlign: 'center',
  },
  featuredCard: {
    borderRadius: 20,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  featuredGradient: {
    padding: 20,
  },
  featuredContent: {
    position: 'relative',
  },
  featuredBadge: {
    backgroundColor: '#F39C12',
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginBottom: 15,
  },
  featuredFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  featuredTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  featuredTagText: {
    color: 'white',
    fontSize: 14,
    marginLeft: 5,
  },
  tipCard: {
    backgroundColor: '#FFF3CD',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#F39C12',
  },
  tipText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
});
