// ProfileScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={['#27AE60', '#2ECC71']} style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👦</Text>
        </View>
        <Text style={styles.name}>Guardián Junior</Text>
        <Text style={styles.subtitle}>Nivel 5 • 650 puntos</Text>
      </LinearGradient>

      <View style={styles.content}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="person-outline" size={24} color="#27AE60" />
          <Text style={styles.menuText}>Editar Perfil</Text>
          <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={24} color="#27AE60" />
          <Text style={styles.menuText}>Configuración</Text>
          <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="help-circle-outline" size={24} color="#27AE60" />
          <Text style={styles.menuText}>Ayuda</Text>
          <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="information-circle-outline" size={24} color="#27AE60" />
          <Text style={styles.menuText}>Acerca de</Text>
          <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
        </TouchableOpacity>
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
    paddingBottom: 40,
    alignItems: 'center',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  avatarText: {
    fontSize: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  content: {
    padding: 20,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 18,
    marginBottom: 12,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 15,
    color: '#2C3E50',
  },
});
