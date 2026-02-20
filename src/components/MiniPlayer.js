// src/components/MiniPlayer.js
// MINI REPRODUCTOR FLOTANTE - PERSISTENTE EN TODAS LAS PANTALLAS

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRommelFi } from '../contexts/RommelFiContext';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';

const { width } = Dimensions.get('window');

export default function MiniPlayer() {
  const navigation = useNavigation();
  const {
    currentTrack,
    isPlaying,
    duration,
    position,
    togglePlayPause,
    playNext,
    getTrackImage,
  } = useRommelFi();

  if (!currentTrack) return null;

  const trackImage = getTrackImage(currentTrack);
  const progress = duration > 0 ? (position / duration) * 100 : 0;

  const openFullPlayer = () => {
    navigation.navigate('RommelFiPlayer');
  };

  return (
    <Animatable.View
      animation="slideInUp"
      duration={300}
      style={styles.container}
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={openFullPlayer}
        style={styles.touchable}
      >
        <LinearGradient
          colors={['rgba(18, 18, 18, 0.98)', 'rgba(40, 40, 40, 0.98)']}
          style={styles.gradient}
        >
          {/* Barra de progreso */}
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>

          {/* Contenido */}
          <View style={styles.content}>
            {/* Artwork */}
            <View style={styles.artworkContainer}>
              {trackImage ? (
                <Image source={trackImage} style={styles.artwork} />
              ) : (
                <View style={styles.artworkPlaceholder}>
                  <Ionicons name="musical-note" size={24} color="white" />
                </View>
              )}
            </View>

            {/* Track Info */}
            <View style={styles.trackInfo}>
              <Text style={styles.trackTitle} numberOfLines={1}>
                {currentTrack.title}
              </Text>
              <Text style={styles.trackArtist} numberOfLines={1}>
                {currentTrack.artist || 'Guardianes del Jardín'}
              </Text>
            </View>

            {/* Controls */}
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={(e) => {
                  e.stopPropagation();
                  togglePlayPause();
                }}
              >
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={28}
                  color="white"
                />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.controlButton}
                onPress={(e) => {
                  e.stopPropagation();
                  playNext();
                }}
              >
                <Ionicons name="play-skip-forward" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
  touchable: {
    width: '100%',
  },
  gradient: {
    paddingBottom: 10,
  },
  progressBar: {
    height: 3,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#1DB954',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingTop: 8,
  },
  artworkContainer: {
    marginRight: 12,
  },
  artwork: {
    width: 48,
    height: 48,
    borderRadius: 4,
  },
  artworkPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: {
    flex: 1,
    marginRight: 12,
  },
  trackTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  trackArtist: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    marginLeft: 4,
  },
});
