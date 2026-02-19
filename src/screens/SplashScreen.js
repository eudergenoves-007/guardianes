import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function SplashScreen({ navigation }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.5)).current;

  useEffect(() => {
    // Animación de entrada
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Navegar a la pantalla principal después de 3 segundos
    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#27AE60', '#2ECC71', '#52BE80']}
        style={styles.gradient}
      >
        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          {/* Emoji de planta como logo temporal */}
          <Text style={styles.logo}>🌱</Text>
          
          <Animatable.Text
            animation="fadeInUp"
            delay={500}
            style={styles.title}
          >
            GUARDIANES
          </Animatable.Text>
          
          <Animatable.Text
            animation="fadeInUp"
            delay={700}
            style={styles.subtitle}
          >
            DEL JARDÍN
          </Animatable.Text>

          <Animatable.Text
            animation="fadeIn"
            delay={1200}
            style={styles.tagline}
          >
            Todo está conectado en el jardín de Dios
          </Animatable.Text>
        </Animated.View>

        {/* Elementos decorativos flotantes */}
        <Animatable.Text
          animation="bounceIn"
          delay={800}
          style={[styles.floatingEmoji, { top: 100, left: 30 }]}
        >
          🌸
        </Animatable.Text>
        <Animatable.Text
          animation="bounceIn"
          delay={1000}
          style={[styles.floatingEmoji, { top: 150, right: 40 }]}
        >
          🐝
        </Animatable.Text>
        <Animatable.Text
          animation="bounceIn"
          delay={1200}
          style={[styles.floatingEmoji, { bottom: 150, left: 50 }]}
        >
          🌳
        </Animatable.Text>
        <Animatable.Text
          animation="bounceIn"
          delay={1400}
          style={[styles.floatingEmoji, { bottom: 200, right: 30 }]}
        >
          ☀️
        </Animatable.Text>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
  },
  logo: {
    fontSize: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: 'white',
    letterSpacing: 2,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  subtitle: {
    fontSize: 32,
    fontWeight: '600',
    color: 'white',
    marginTop: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
    marginTop: 20,
    fontStyle: 'italic',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  floatingEmoji: {
    fontSize: 40,
    position: 'absolute',
  },
});
