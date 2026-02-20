// src/contexts/RommelFiContext.js
// AUDITORÍA APLICADA: CORRECCIÓN DE RUTAS ABSOLUTAS PARA WEB (RENDER)

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Platform } from 'react-native';

const RommelFiContext = createContext();

export const useRommelFi = () => {
  const context = useContext(RommelFiContext);
  if (!context) throw new Error('useRommelFi debe usarse dentro de RommelFiProvider');
  return context;
};

export const RommelFiProvider = ({ children }) => {
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
  const [repeatMode, setRepeatMode] = useState('off');
  const [shuffleMode, setShuffleMode] = useState(false);
  const [playCount, setPlayCount] = useState(0);

  useEffect(() => {
    configureAudio();
    return () => {
      if (sound) sound.unloadAsync();
    };
  }, [sound]);

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

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(status.positionMillis);
      setDuration(status.durationMillis);
      setIsPlaying(status.isPlaying);

      if (status.didJustFinish && !status.isLooping) {
        handleTrackFinished();
      }
    } else if (status.error) {
      console.error('Error fatal de expo-av:', status.error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  // EL CEREBRO CORREGIDO: CONSTRUYE RUTAS ABSOLUTAS PARA LA WEB
  const processAudioUrl = (url) => {
    if (!url) return null;
    if (typeof url === 'string') {
      if (url.includes('drive.google.com/file/d/')) {
        const fileId = url.match(/\/d\/([^\/]+)/)?.[1];
        if (fileId) return `https://drive.google.com/uc?export=download&id=${fileId}`;
      }
      
      // PARCHE WEB: Si la ruta empieza con "/", le pegamos el dominio principal
      if (url.startsWith('/') && Platform.OS === 'web' && typeof window !== 'undefined') {
        const fullUrl = window.location.origin + url;
        console.log("Ruta web absoluta generada:", fullUrl); // Auditoría visual en tu navegador
        return fullUrl;
      }
      return url;
    }
    return null;
  };

  const getTrackImage = (track) => {
    if (track?.artwork) {
      if (typeof track.artwork === 'string') return { uri: track.artwork };
      return track.artwork;
    }
    return null;
  };

  const loadAndPlayTrack = async (track, trackIndex = 0) => {
    try {
      setIsLoading(true);
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
      }

      const audioUrl = processAudioUrl(track.file || track.url);
      if (!audioUrl) throw new Error('URL de audio no generada');

      console.log("Intentando reproducir:", audioUrl); // Log para saber exactamente qué pide

      const audioSource = typeof audioUrl === 'string' ? { uri: audioUrl } : audioUrl;

      const { sound: newSound } = await Audio.Sound.createAsync(
        audioSource,
        { shouldPlay: true, rate: playbackSpeed },
        onPlaybackStatusUpdate
      );

      setSound(newSound);
      setCurrentTrack(track);
      setCurrentIndex(trackIndex);
      setIsPlaying(true);
      setIsLoading(false);
      setPlayCount(prev => prev + 1);
    } catch (error) {
      console.error('Error cargando track. Revisa si el archivo existe:', error);
      setIsLoading(false);
      setIsPlaying(false);
    }
  };

  const handleTrackFinished = async () => {
    if (repeatMode === 'one') {
      await seekTo(0);
      await sound?.playAsync();
    } else if (autoPlay && playlist.length > 1) {
      await playNext();
    } else {
      setIsPlaying(false);
    }
  };

  const togglePlayPause = async () => {
    try {
      if (!sound) {
        if (currentTrack) await loadAndPlayTrack(currentTrack, currentIndex);
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

  const playTrack = async (track, index = 0) => {
    if (playlist.length === 0) setPlaylist([track]);
    await loadAndPlayTrack(track, index);
  };

  const setPlaylistAndPlay = async (tracks, startIndex = 0) => {
    if (!tracks || tracks.length === 0) return;
    setPlaylist(tracks);
    setCurrentTrack(tracks[startIndex]);
    await loadAndPlayTrack(tracks[startIndex], startIndex);
  };

  const playNext = async () => {
    if (playlist.length === 0) return;
    let nextIndex = shuffleMode ? Math.floor(Math.random() * playlist.length) : (currentIndex + 1) % playlist.length;
    await loadAndPlayTrack(playlist[nextIndex], nextIndex);
  };

  const playPrevious = async () => {
    if (playlist.length === 0) return;
    if (position > 3000) {
      await seekTo(0);
      return;
    }
    let prevIndex = shuffleMode ? Math.floor(Math.random() * playlist.length) : (currentIndex === 0 ? playlist.length - 1 : currentIndex - 1);
    await loadAndPlayTrack(playlist[prevIndex], prevIndex);
  };

  const seekTo = async (positionMillis) => {
    if (sound) await sound.setPositionAsync(positionMillis);
  };

  const changePlaybackSpeed = async (speed) => {
    if (sound) {
      await sound.setRateAsync(speed, true);
      setPlaybackSpeed(speed);
    }
  };

  const toggleRepeatMode = () => {
    const modes = ['off', 'one', 'all'];
    setRepeatMode(modes[(modes.indexOf(repeatMode) + 1) % modes.length]);
  };

  const toggleShuffleMode = () => setShuffleMode(prev => !prev);
  const toggleAutoPlay = () => setAutoPlay(prev => !prev);

  const formatTime = (millis) => {
    if (!millis || millis < 0) return '0:00';
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <RommelFiContext.Provider value={{
      sound, currentTrack, playlist, currentIndex, isPlaying, isLoading, duration, position, playbackSpeed, autoPlay, repeatMode, shuffleMode, playCount,
      playTrack, togglePlayPause, playNext, playPrevious, seekTo, setPlaylistAndPlay, changePlaybackSpeed, toggleRepeatMode, toggleShuffleMode, toggleAutoPlay, formatTime, getTrackImage, processAudioUrl
    }}>
      {children}
    </RommelFiContext.Provider>
  );
};
