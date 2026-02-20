// src/screens/StoryLibrary.js
// BIBLIOTECA DE CUENTOS - Grid de libros disponibles

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { STORIES_DATA, getStoriesByAgeGroup } from '../data/storiesData';

const { width } = Dimensions.get('window');
const CARD_WIDTH = (width - 60) / 2;

export default function StoryLibrary({ navigation }) {
  const [selectedFilter, setSelectedFilter] = useState('todos');

  const filters = [
    { id: 'todos', label: 'Todos', icon: '📚' },
    { id: 'parvulos', label: 'Párvulos', icon: '👶' },
    { id: 'principiantes', label: 'Principiantes', icon: '👧' },
    { id: 'primarios', label: 'Primarios', icon: '🧒' },
    { id: 'intermedios', label: 'Intermedios', icon: '🧑' },
  ];

  const filteredStories =
    selectedFilter === 'todos'
      ? Object.values(STORIES_DATA)
      : getStoriesByAgeGroup(selectedFilter);

  const openStory = (story) => {
    navigation.navigate('StoryBookReader', { story });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <LinearGradient colors={['#8B4513', '#A0522D']} style={styles.header}>
        <Text style={styles.headerTitle}>📖 Biblioteca de Cuentos</Text>
        <Text style={styles.headerSubtitle}>
          Historias de Guardianes del Jardín
        </Text>
      </LinearGradient>

      {/* Filtros */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScroll}
        contentContainerStyle={styles.filtersContainer}
      >
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.id}
            style={[
              styles.filterButton,
              selectedFilter === filter.id && styles.filterButtonActive,
            ]}
            onPress={() => setSelectedFilter(filter.id)}
          >
            <Text style={styles.filterIcon}>{filter.icon}</Text>
            <Text
              style={[
                styles.filterLabel,
                selectedFilter === filter.id && styles.filterLabelActive,
              ]}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Grid de cuentos */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.storiesGrid}
        showsVerticalScrollIndicator={false}
      >
        {filteredStories.map((story, index) => (
          <Animatable.View
            key={story.id}
            animation="fadeInUp"
            delay={index * 100}
            style={styles.storyCardContainer}
          >
            <TouchableOpacity
              style={styles.storyCard}
              onPress={() => openStory(story)}
              activeOpacity={0.9}
            >
              {/* Portada del libro */}
              <View style={styles.bookCover}>
                {story.cover ? (
                  <Image source={story.cover} style={styles.coverImage} />
                ) : (
                  <LinearGradient
                    colors={['#8B4513', '#A0522D']}
                    style={styles.coverPlaceholder}
                  >
                    <Ionicons name="book" size={50} color="white" />
                  </LinearGradient>
                )}

                {/* Badge de duración */}
                <View style={styles.durationBadge}>
                  <Ionicons name="time-outline" size={12} color="white" />
                  <Text style={styles.durationText}>{story.duration}</Text>
                </View>

                {/* Efecto de libro 3D */}
                <View style={styles.bookSpine} />
                <View style={styles.bookPages} />
              </View>

              {/* Info del libro */}
              <View style={styles.bookInfo}>
                <Text style={styles.bookTitle} numberOfLines={2}>
                  {story.title}
                </Text>
                <Text style={styles.bookSubtitle} numberOfLines={1}>
                  {story.subtitle}
                </Text>
                <Text style={styles.bookAuthor} numberOfLines={1}>
                  {story.author}
                </Text>

                {/* Tags */}
                <View style={styles.tagsContainer}>
                  <View style={styles.tag}>
                    <Text style={styles.tagText}>{story.theme}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          </Animatable.View>
        ))}

        {/* Card para agregar más cuentos */}
        <View style={styles.storyCardContainer}>
          <TouchableOpacity style={styles.addCard}>
            <LinearGradient
              colors={['#E8E8E8', '#F5F5F5']}
              style={styles.addCardGradient}
            >
              <Ionicons name="add-circle-outline" size={50} color="#999" />
              <Text style={styles.addCardText}>Más cuentos próximamente</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5E6D3',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  filtersScroll: {
    marginVertical: 15,
  },
  filtersContainer: {
    paddingHorizontal: 20,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  filterButtonActive: {
    backgroundColor: '#8B4513',
  },
  filterIcon: {
    fontSize: 18,
    marginRight: 6,
  },
  filterLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2C1810',
  },
  filterLabelActive: {
    color: 'white',
  },
  scrollView: {
    flex: 1,
  },
  storiesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  storyCardContainer: {
    width: CARD_WIDTH,
    marginBottom: 20,
    marginHorizontal: 5,
  },
  storyCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  bookCover: {
    width: '100%',
    height: CARD_WIDTH * 1.4,
    position: 'relative',
  },
  coverImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  coverPlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  durationText: {
    color: 'white',
    fontSize: 11,
    marginLeft: 4,
    fontWeight: '600',
  },
  bookSpine: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  bookPages: {
    position: 'absolute',
    right: 3,
    top: 5,
    bottom: 5,
    width: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  bookInfo: {
    padding: 12,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2C1810',
    marginBottom: 4,
  },
  bookSubtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  bookAuthor: {
    fontSize: 11,
    color: '#999',
    fontStyle: 'italic',
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#27AE60',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
    marginRight: 5,
    marginTop: 2,
  },
  tagText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  addCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    overflow: 'hidden',
    height: CARD_WIDTH * 1.4 + 100,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  addCardGradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#DDD',
    borderStyle: 'dashed',
  },
  addCardText: {
    marginTop: 10,
    fontSize: 13,
    color: '#999',
    textAlign: 'center',
  },
});
