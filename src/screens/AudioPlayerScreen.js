// AudioPlayerScreen.js
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

export default function AudioPlayerScreen({ route }) {
  const { material } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#9B59B6', '#8E44AD']} style={styles.gradient}>
        <Text style={styles.title}>{material?.title || 'Reproductor de Audio'}</Text>
        
        <View style={styles.artwork}>
          <Ionicons name="musical-notes" size={80} color="white" />
        </View>

        <Text style={styles.duration}>{material?.duration || '0:00'}</Text>

        <View style={styles.controls}>
          <TouchableOpacity style={styles.button}>
            <Ionicons name="play-back" size={30} color="white" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.playButton}
            onPress={() => setIsPlaying(!isPlaying)}
          >
            <Ionicons 
              name={isPlaying ? 'pause' : 'play'} 
              size={40} 
              color="white" 
            />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.button}>
            <Ionicons name="play-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.note}>
          El reproductor de audio se implementará con expo-av
        </Text>
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 40,
  },
  artwork: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  duration: {
    fontSize: 18,
    color: 'white',
    marginBottom: 30,
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    padding: 15,
  },
  playButton: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 30,
  },
  note: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 12,
    marginTop: 40,
    textAlign: 'center',
  },
});
