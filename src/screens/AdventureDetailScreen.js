// AdventureDetailScreen.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
// ¡AQUÍ ESTÁ LA IMPORTACIÓN CORRECTA!
import { ADVENTURES_DATA, MATERIAL_TYPES, getAdventurePlaylist } from '../data/adventuresData';

export default function AdventureDetailScreen({ route, navigation }) {
  const { adventureId, selectedAgeGroup } = route.params || { adventureId: 1 };
  const adventure = ADVENTURES_DATA[adventureId];

  const ageGroup = selectedAgeGroup
    ? adventure.ageGroups.find((g) => g.id === selectedAgeGroup)
    : null;

  if (!ageGroup) {
    // Mostrar grupos de edad para seleccionar
    return (
      <View style={styles.container}>
        <Text style={styles.title}>{adventure.title}</Text>
        <Text style={styles.description}>{adventure.description}</Text>
        <Text style={styles.sectionTitle}>Selecciona tu grupo de edad:</Text>
        <ScrollView>
          {adventure.ageGroups.map((group) => (
            <TouchableOpacity
              key={group.id}
              style={styles.ageGroupCard}
              onPress={() =>
                navigation.push('AdventureDetail', {
                  adventureId,
                  selectedAgeGroup: group.id,
                })
              }
            >
              <Text style={styles.ageGroupIcon}>{group.icon}</Text>
              <Text style={styles.ageGroupName}>{group.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  // Mostrar materiales del grupo de edad
  return (
    <ScrollView style={styles.container}>
      <LinearGradient colors={[ageGroup.color, ageGroup.color + 'DD']} style={styles.header}>
        <Text style={styles.headerTitle}>{adventure.title}</Text>
        <Text style={styles.headerSubtitle}>{ageGroup.name}</Text>
      </LinearGradient>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>Materiales disponibles</Text>
        {ageGroup.materials.map((material, index) => {
          const typeInfo = MATERIAL_TYPES[material.type];
          return (
            <TouchableOpacity
              key={index}
              style={styles.materialCard}
              onPress={() => {
                if (material.type === 'audio') {
                  // Lógica del reproductor corregida
                  const playlist = getAdventurePlaylist(adventureId, selectedAgeGroup);
                  const startIndex = playlist.findIndex(p => p.id === material.id);
                  navigation.navigate('RommelFiPlayer', {
                    material: {
                      ...material,
                      id: material.id || Date.now(),
                      artist: material.artist || 'Guardianes del Jardín',
                    },
                    playlist: playlist,
                    startIndex: startIndex >= 0 ? startIndex : 0,
                  });
                } else {
                  navigation.navigate('MaterialViewer', { material });
                }
              }}
            >
              <View style={[styles.iconCircle, { backgroundColor: typeInfo.color }]}>
                <Ionicons name={typeInfo.icon} size={24} color="white" />
              </View>
              <View style={styles.materialInfo}>
                <Text style={styles.materialTitle}>{material.title}</Text>
                <Text style={styles.materialMeta}>
                  {material.duration || material.pages ? 
                    `${material.duration || material.pages + ' páginas'}` : 
                    typeInfo.label}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#BDC3C7" />
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: { padding: 30, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 5 },
  headerSubtitle: { fontSize: 18, color: 'rgba(255, 255, 255, 0.95)' },
  content: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', padding: 20 },
  description: { fontSize: 16, paddingHorizontal: 20, color: '#7F8C8D' },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', marginBottom: 15, color: '#2C3E50' },
  ageGroupCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 20, marginHorizontal: 20, marginBottom: 10, borderRadius: 15 },
  ageGroupIcon: { fontSize: 40, marginRight: 15 },
  ageGroupName: { fontSize: 18, fontWeight: '600' },
  materialCard: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 15, marginBottom: 12, borderRadius: 15, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  materialInfo: { flex: 1 },
  materialTitle: { fontSize: 16, fontWeight: '600', color: '#2C3E50', marginBottom: 3 },
  materialMeta: { fontSize: 14, color: '#7F8C8D' },
});
