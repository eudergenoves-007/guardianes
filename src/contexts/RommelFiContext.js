// src/contexts/RommelFiContext.js
// CONTEXTO GLOBAL PARA REPRODUCCIÓN PERSISTENTE

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { Audio } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RommelFiContext = createContext();

export const useRommelFi = () => {
  const context = useContext(RommelFiContext);
  if (!context) {
    throw new Error('useRommelFi debe usarse dentro de RommelFiProvider');
  }
  return context;
};

export const RommelFiProvider = ({ children }) => {
  // Estados principales
  const [sound, setSound] = useState(null);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [duration, setDuration] = useState(0);
  const [position, setPosition] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [repeatMode, setRepeatMode] = useState('off'); // 'off', 'one', 'all'
  const [shuffleMode, setShuffleMode] = useState(false);

  // Estadísticas
  const [playCount, setPlayCount] = useState(0);
  const [totalPlayTime, setTotalPlayTime] = useState(0);

  // Configurar audio al montar
  useEffect(() => {
    configureAudio();
    loadSettings();
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, []);

  // Guardar configuración
  useEffect(() => {
    saveSettings();
  }, [autoPlay, playbackSpeed, repeatMode, shuffleMode]);

  // Configurar modo de audio
  const configureAudio = async () => {
    try {
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
        playThroughEarpieceAndroid: false,
      });
    } catch (error) {
      console.error('Error configurando audio:', error);
    }
  };

  // Cargar configuración guardada
  const loadSettings = async () => {
    try {
      const settings = await AsyncStorage.getItem('rommelfi_settings');
      if (settings) {
        const parsed = JSON.parse(settings);
        setAutoPlay(parsed.autoPlay ?? true);
        setPlaybackSpeed(parsed.playbackSpeed ?? 1.0);
        setRepeatMode(parsed.repeatMode ?? 'off');
        setShuffleMode(parsed.shuffleMode ?? false);
      }

      const stats = await AsyncStorage.getItem('rommelfi_stats');
      if (stats) {
        const parsed = JSON.parse(stats);
        setPlayCount(parsed.playCount ?? 0);
        setTotalPlayTime(parsed.totalPlayTime ?? 0);
      }
    } catch (error) {
      console.error('Error cargando configuración:', error);
    }
  };

  // Guardar configuración
  const saveSettings = async () => {
    try {
      const settings = {
        autoPlay,
        playbackSpeed,
        repeatMode,
        shuffleMode,
      };
      await AsyncStorage.setItem('rommelfi_settings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error guardando configuración:', error);
    }
  };

  // Guardar estadísticas
  const saveStats = async () => {
    try {
      const stats = {
        playCount,
        totalPlayTime,
      };
      await AsyncStorage.setItem('rommelfi_stats', JSON.stringify(stats));
    } catch (error) {
      console.error('Error guardando estadísticas:', error);
    }
  };

  // Callback de estado de reproducción
  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      // Si terminó y hay autoplay
      if (status.didJustFinish && !status.isLooping) {
        handleTrackFinished();
      }
    } else if (status.error) {
      console.error('Error en reproducción:', status.error);
      setIsLoading(false);
    }
  };

  // Procesar URL de Google Drive
  const processAudioUrl = (url) => {
    if (!url) return null;

    // Si ya es una URL válida
    if (url.startsWith('http://') || url.startsWith('https://')) {
      // Convertir links de Google Drive view a download
      if (url.includes('drive.google.com/file/d/')) {
        const fileId = url.match(/\/d\/([^\/]+)/)?.[1];
        if (fileId) {
          return `https://drive.google.com/uc?export=download&id=${fileId}`;
        }
      }
      
      // Convertir Dropbox ?dl=0 a ?dl=1
      if (url.includes('dropbox.com') && url.includes('?dl=0')) {
        return url.replace('?dl=0', '?dl=1');
      }

      return url;
    }

    return null;
  };

  // Obtener imagen del track
  const getTrackImage = (track) => {
    if (track?.artwork) {
      // Si tiene artwork, procesarlo
      if (typeof track.artwork === 'string') {
        return { uri: track.artwork };
      }
      return track.artwork;
    }
    return null;
  };

  // Cargar y reproducir track
  const loadAndPlayTrack = async (track, trackIndex = 0) => {
    try {
      setIsLoading(true);

      // Descargar track anterior
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      // Procesar URL
      const audioUrl = processAudioUrl(track.file || track.url);
      if (!audioUrl) {
        throw new Error('URL de audio no válida');
      }

      // Crear source
      const audioSource = typeof audioUrl === 'string' 
        ? { uri: audioUrl }
        : audioUrl;

      // Cargar audio
      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
        {
          shouldPlay: true,
          rate: playbackSpeed,
        },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentTrack(track);
      setCurrentIndex(trackIndex);
      setIsPlaying(true);
      setIsLoading(false);

      // Incrementar contador
      setPlayCount(prev => prev + 1);
      
      // Guardar historial
      await saveToHistory(track);

    } catch (error) {
      console.error('Error cargando track:', error);
      setIsLoading(false);
      throw error;
    }
  };

  // Guardar en historial
  const saveToHistory = async (track) => {
    try {
      const history = await AsyncStorage.getItem('rommelfi_history');
      let historyArray = history ? JSON.parse(history) : [];
      
      // Agregar al inicio, limitar a 50
      historyArray = [
        { ...track, playedAt: new Date().toISOString() },
        ...historyArray.filter(h => h.id !== track.id)
      ].slice(0, 50);

      await AsyncStorage.setItem('rommelfi_history', JSON.stringify(historyArray));
    } catch (error) {
      console.error('Error guardando historial:', error);
    }
  };

  // Manejar fin de track
  const handleTrackFinished = async () => {
    if (repeatMode === 'one') {
      // Repetir el mismo track
      await seekTo(0);
      await sound?.playAsync();
    } else if (autoPlay && playlist.length > 1) {
      // Reproducir siguiente
      await playNext();
    } else {
      setIsPlaying(false);
    }
  };

  // Play/Pause
  const togglePlayPause = async () => {
    try {
      if (!sound) {
        if (currentTrack) {
          await loadAndPlayTrack(currentTrack, currentIndex);
        }
        return;
      }

      const status = await sound.getStatusAsync();
      if (status.isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error en play/pause:', error);
    }
  };

  // Reproducir track específico
  const playTrack = async (track, index = 0) => {
    await loadAndPlayTrack(track, index);
  };

  // Establecer playlist
  const setPlaylistAndPlay = async (tracks, startIndex = 0) => {
    setPlaylist(tracks);
    if (tracks.length > 0) {
      await loadAndPlayTrack(tracks[startIndex], startIndex);
    }
  };

  // Siguiente
  const playNext = async () => {
    if (playlist.length === 0) return;

    let nextIndex;
    if (shuffleMode) {
      nextIndex = Math.floor(Math.random() * playlist.length);
    } else {
      nextIndex = (currentIndex + 1) % playlist.length;
    }

    await loadAndPlayTrack(playlist[nextIndex], nextIndex);
  };

  // Anterior
  const playPrevious = async () => {
    if (playlist.length === 0) return;

    // Si llevamos más de 3 segundos, reiniciar
    if (position > 3000) {
      await seekTo(0);
      return;
    }

    let prevIndex;
    if (shuffleMode) {
      prevIndex = Math.floor(Math.random() * playlist.length);
    } else {
      prevIndex = currentIndex === 0 ? playlist.length - 1 : currentIndex - 1;
    }

    await loadAndPlayTrack(playlist[prevIndex], prevIndex);
  };

  // Seek
  const seekTo = async (positionMillis) => {
    if (sound) {
      await sound.setPositionAsync(positionMillis);
    }
  };

  // Cambiar velocidad
  const changePlaybackSpeed = async (speed) => {
    if (sound) {
      await sound.setRateAsync(speed, true);
      setPlaybackSpeed(speed);
    }
  };

  // Toggle repeat
  const toggleRepeatMode = () => {
    const modes = ['off', 'one', 'all'];
    const currentModeIndex = modes.indexOf(repeatMode);
    const nextMode = modes[(currentModeIndex + 1) % modes.length];
    setRepeatMode(nextMode);
  };

  // Toggle shuffle
  const toggleShuffleMode = () => {
    setShuffleMode(prev => !prev);
  };

  // Toggle autoplay
  const toggleAutoPlay = () => {
    setAutoPlay(prev => !prev);
  };

  // Formatear tiempo
  const formatTime = (millis) => {
    if (!millis || millis < 0) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const value = {
    // Estados
    sound,
    currentTrack,
    playlist,
    currentIndex,
    isPlaying,
    isLoading,
    duration,
    position,
    playbackSpeed,
    autoPlay,
    repeatMode,
    shuffleMode,
    playCount,
    totalPlayTime,

    // Funciones principales
    playTrack,
    togglePlayPause,
    playNext,
    playPrevious,
    seekTo,
    setPlaylistAndPlay,

    // Configuración
    changePlaybackSpeed,
    toggleRepeatMode,
    toggleShuffleMode,
    toggleAutoPlay,

    // Utilidades
    formatTime,
    getTrackImage,
    processAudioUrl,
    saveStats,
  };

  return (
    <RommelFiContext.Provider value={value}>
      {children}
    </RommelFiContext.Provider>
  );
};
