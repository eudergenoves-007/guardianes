// src/screens/RommelFiPlayerScreen.js
// REPRODUCTOR ESTILO SPOTIFY - ROMMELFI

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Image,
  ScrollView,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import Slider from '@react-native-community/slider';
import { useRommelFi } from '../contexts/RommelFiContext';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');

export default function RommelFiPlayerScreen({ route, navigation }) {
  const { material, playlist } = route.params || {};
  
  const {
    currentTrack,
    isPlaying,
    isLoading,
    duration,
    position,
    playbackSpeed,
    autoPlay,
    repeatMode,
    shuffleMode,
    playCount,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    changePlaybackSpeed,
    toggleRepeatMode,
    toggleShuffleMode,
    toggleAutoPlay,
    formatTime,
    getTrackImage,
    playTrack,
    setPlaylistAndPlay,
  } = useRommelFi();

  const [showSpeedOptions, setShowSpeedOptions] = useState(false);
  const [showQueue, setShowQueue] = useState(false);
  const [dominantColor, setDominantColor] = useState(['#1DB954', '#1ed760']);

  // Rotación del artwork
  const rotateAnim = new Animated.Value(0);

  useEffect(() => {
    if (material) {
      const track = {
        id: material.id || Date.now(),
        title: material.title,
        artist: material.artist || 'Guardianes del Jardín',
        file: material.file,
        url: material.url || material.file,
        artwork: material.artwork,
        description: material.description,
        duration: material.duration,
      };
      playTrack(track);
    }

    if (playlist && playlist.length > 0) {
      setPlaylistAndPlay(playlist, 0);
    }
  }, []);

  // Animación de rotación
  useEffect(() => {
    if (isPlaying) {
      Animated.loop(
        Animated.timing(rotateAnim, {
          toValue: 1,
          duration: 10000,
          useNativeDriver: true,
        })
      ).start();
    }
  }, [isPlaying]);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // Obtener imagen del track
  const trackImage = getTrackImage(currentTrack);

  // Progreso
  const progress = duration > 0 ? position / duration : 0;

  // Iconos de repeat
  const getRepeatIcon = () => {
    switch (repeatMode) {
      case 'one': return 'repeat-outline';
      case 'all': return 'repeat';
      default: return 'repeat-outline';
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={dominantColor}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="chevron-down" size={28} color="white" />
          </TouchableOpacity>

          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              REPRODUCIENDO
            </Text>
            <Text style={styles.headerSubtitle} numberOfLines={1}>
              {playlist?.length > 0 ? `${playlist.length} pistas` : 'Guardián'}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setShowQueue(!showQueue)}
          >
            <Ionicons name="list" size={28} color="white" />
          </TouchableOpacity>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          {/* Artwork Container */}
          <View style={styles.artworkContainer}>
            {trackImage ? (
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <Image
                  source={trackImage}
                  style={styles.artwork}
                  resizeMode="cover"
                />
              </Animated.View>
            ) : (
              <Animatable.View
                animation={isPlaying ? 'pulse' : undefined}
                iterationCount="infinite"
                duration={2000}
                style={styles.artwork}
              >
                <LinearGradient
                  colors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.05)']}
                  style={styles.artworkPlaceholder}
                >
                  <Ionicons
                    name="musical-notes"
                    size={100}
                    color="rgba(255,255,255,0.9)"
                  />
                </LinearGradient>
              </Animatable.View>
            )}
          </View>

          {/* Track Info */}
          <View style={styles.trackInfo}>
            <Text style={styles.trackTitle} numberOfLines={2}>
              {currentTrack?.title || 'Selecciona una pista'}
            </Text>
            <Text style={styles.trackArtist} numberOfLines={1}>
              {currentTrack?.artist || 'Artista'}
            </Text>
            
            {currentTrack?.description && (
              <Text style={styles.trackDescription} numberOfLines={2}>
                {currentTrack.description}
              </Text>
            )}
          </View>

          {/* Stats */}
          <View style={styles.stats}>
            <View style={styles.statItem}>
              <Ionicons name="play-circle" size={16} color="rgba(255,255,255,0.7)" />
              <Text style={styles.statText}>{playCount} reproducciones</Text>
            </View>
          </View>

          {/* Progress Bar */}
          <View style={styles.progressContainer}>
            <Slider
              style={styles.slider}
              value={progress}
              onSlidingComplete={(value) => seekTo(value * duration)}
              minimumValue={0}
              maximumValue={1}
              minimumTrackTintColor="white"
              maximumTrackTintColor="rgba(255, 255, 255, 0.3)"
              thumbTintColor="white"
              disabled={!duration}
            />
            <View style={styles.timeContainer}>
              <Text style={styles.timeText}>{formatTime(position)}</Text>
              <Text style={styles.timeText}>{formatTime(duration)}</Text>
            </View>
          </View>

          {/* Main Controls */}
          <View style={styles.mainControls}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleShuffleMode}
            >
              <Ionicons
                name="shuffle"
                size={24}
                color={shuffleMode ? '#1DB954' : 'rgba(255,255,255,0.6)'}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={playPrevious}
              disabled={!currentTrack}
            >
              <Ionicons name="play-skip-back" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.playButton}
              onPress={togglePlayPause}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator size="large" color="white" />
              ) : (
                <Ionicons
                  name={isPlaying ? 'pause' : 'play'}
                  size={40}
                  color="white"
                />
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.skipButton}
              onPress={playNext}
              disabled={!currentTrack}
            >
              <Ionicons name="play-skip-forward" size={32} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.controlButton}
              onPress={toggleRepeatMode}
            >
              <Ionicons
                name={getRepeatIcon()}
                size={24}
                color={repeatMode !== 'off' ? '#1DB954' : 'rgba(255,255,255,0.6)'}
              />
              {repeatMode === 'one' && (
                <View style={styles.repeatBadge}>
                  <Text style={styles.repeatBadgeText}>1</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* Secondary Controls */}
          <View style={styles.secondaryControls}>
            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => setShowSpeedOptions(!showSpeedOptions)}
            >
              <Ionicons name="speedometer" size={20} color="white" />
              <Text style={styles.secondaryButtonText}>{playbackSpeed}x</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={toggleAutoPlay}
            >
              <Ionicons
                name={autoPlay ? 'play-forward' : 'play-forward-outline'}
                size={20}
                color={autoPlay ? '#1DB954' : 'white'}
              />
              <Text style={styles.secondaryButtonText}>Auto</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {/* Compartir */}}
            >
              <Ionicons name="share-social" size={20} color="white" />
              <Text style={styles.secondaryButtonText}>Compartir</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => {/* Favorito */}}
            >
              <Ionicons name="heart-outline" size={20} color="white" />
              <Text style={styles.secondaryButtonText}>Me gusta</Text>
            </TouchableOpacity>
          </View>

          {/* Speed Options */}
          {showSpeedOptions && (
            <Animatable.View
              animation="fadeInUp"
              style={styles.speedOptionsContainer}
            >
              <Text style={styles.optionsTitle}>Velocidad de reproducción</Text>
              <View style={styles.speedButtons}>
                {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((speed) => (
                  <TouchableOpacity
                    key={speed}
                    style={[
                      styles.speedButton,
                      playbackSpeed === speed && styles.speedButtonActive,
                    ]}
                    onPress={() => {
                      changePlaybackSpeed(speed);
                      setShowSpeedOptions(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.speedButtonText,
                        playbackSpeed === speed && styles.speedButtonTextActive,
                      ]}
                    >
                      {speed}x
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </Animatable.View>
          )}

          {/* Queue */}
          {showQueue && playlist && playlist.length > 0 && (
            <Animatable.View
              animation="fadeInUp"
              style={styles.queueContainer}
            >
              <Text style={styles.queueTitle}>Cola de reproducción</Text>
              {playlist.map((track, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.queueItem,
                    currentTrack?.id === track.id && styles.queueItemActive,
                  ]}
                  onPress={() => playTrack(track, index)}
                >
                  <View style={styles.queueItemNumber}>
                    <Text style={styles.queueItemNumberText}>{index + 1}</Text>
                  </View>
                  <View style={styles.queueItemInfo}>
                    <Text style={styles.queueItemTitle} numberOfLines={1}>
                      {track.title}
                    </Text>
                    <Text style={styles.queueItemArtist} numberOfLines={1}>
                      {track.artist || 'Guardianes del Jardín'}
                    </Text>
                  </View>
                  {currentTrack?.id === track.id && (
                    <Ionicons name="volume-high" size={20} color="#1DB954" />
                  )}
                </TouchableOpacity>
              ))}
            </Animatable.View>
          )}

          <View style={{ height: 50 }} />
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  gradient: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 15,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  headerTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 1.5,
  },
  headerSubtitle: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginTop: 2,
  },
  scrollView: {
    flex: 1,
  },
  artworkContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  artwork: {
    width: width * 0.85,
    height: width * 0.85,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 30,
    elevation: 20,
  },
  artworkPlaceholder: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  trackInfo: {
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  trackTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
    textAlign: 'center',
  },
  trackArtist: {
    fontSize: 18,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    marginBottom: 8,
  },
  trackDescription: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    textAlign: 'center',
    lineHeight: 20,
  },
  stats: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 5,
  },
  progressContainer: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  timeText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '500',
  },
  mainControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  controlButton: {
    padding: 10,
    position: 'relative',
  },
  skipButton: {
    padding: 15,
    marginHorizontal: 10,
  },
  playButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  repeatBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#1DB954',
    justifyContent: 'center',
    alignItems: 'center',
  },
  repeatBadgeText: {
    fontSize: 8,
    color: 'white',
    fontWeight: 'bold',
  },
  secondaryControls: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 30,
    marginBottom: 20,
  },
  secondaryButton: {
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  speedOptionsContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  optionsTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 12,
    textAlign: 'center',
  },
  speedButtons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  speedButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    margin: 5,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  speedButtonActive: {
    backgroundColor: 'white',
  },
  speedButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  speedButtonTextActive: {
    color: '#1DB954',
  },
  queueContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    padding: 15,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  queueTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },
  queueItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 8,
  },
  queueItemActive: {
    backgroundColor: 'rgba(29, 185, 84, 0.2)',
  },
  queueItemNumber: {
    width: 30,
    alignItems: 'center',
  },
  queueItemNumberText: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 14,
  },
  queueItemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  queueItemTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 2,
  },
  queueItemArtist: {
    color: 'rgba(255,255,255,0.6)',
    fontSize: 12,
  },
});
