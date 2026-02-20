// src/screens/StoryBookReader.js
// LECTOR DE CUENTOS INTERACTIVO - Estilo Libro Digital

import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Image,
  Animated,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';

const { width, height } = Dimensions.get('window');
const PAGE_WIDTH = width;

export default function StoryBookReader({ route, navigation }) {
  const { story } = route.params;
  
  const [currentPage, setCurrentPage] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const scrollViewRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Ocultar controles después de 3 segundos
  useEffect(() => {
    const timer = setTimeout(() => {
      if (showControls) {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }).start(() => setShowControls(false));
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [currentPage, showControls]);

  const toggleControls = () => {
    if (showControls) {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => setShowControls(false));
    } else {
      setShowControls(true);
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  };

  const goToPage = (pageIndex) => {
    scrollViewRef.current?.scrollTo({
      x: pageIndex * PAGE_WIDTH,
      animated: true,
    });
    setCurrentPage(pageIndex);
  };

  const nextPage = () => {
    if (currentPage < story.pages.length - 1) {
      goToPage(currentPage + 1);
    }
  };

  const previousPage = () => {
    if (currentPage > 0) {
      goToPage(currentPage - 1);
    }
  };

  const onScroll = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const page = Math.round(offsetX / PAGE_WIDTH);
    if (page !== currentPage && page >= 0 && page < story.pages.length) {
      setCurrentPage(page);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      {/* Libro de páginas con scroll horizontal */}
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        scrollEventThrottle={16}
        style={styles.scrollView}
      >
        {story.pages.map((page, index) => (
          <TouchableOpacity
            key={index}
            activeOpacity={1}
            onPress={toggleControls}
            style={styles.pageContainer}
          >
            <LinearGradient
              colors={page.gradientColors || ['#FFF8E1', '#FFFBF0']}
              style={styles.pageGradient}
            >
              {/* Imagen de la página */}
              {page.image ? (
                <Animatable.View
                  animation="fadeIn"
                  duration={800}
                  style={styles.imageContainer}
                >
                  <Image
                    source={page.image}
                    style={styles.pageImage}
                    resizeMode="contain"
                  />
                </Animatable.View>
              ) : (
                <View style={styles.imagePlaceholder}>
                  <Ionicons name="image-outline" size={80} color="#DDD" />
                  <Text style={styles.placeholderText}>
                    Imagen {index + 1}
                  </Text>
                </View>
              )}

              {/* Texto de la página */}
              <Animatable.View
                animation="fadeInUp"
                delay={300}
                style={styles.textContainer}
              >
                {/* Letra capital */}
                {page.dropCap && (
                  <View style={styles.dropCapContainer}>
                    <Text style={styles.dropCap}>{page.dropCap}</Text>
                  </View>
                )}

                <Text style={styles.pageText}>{page.text}</Text>

                {/* Número de página */}
                <Text style={styles.pageNumber}>{index + 1}</Text>
              </Animatable.View>
            </LinearGradient>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Controles superiores */}
      <Animated.View
        style={[styles.topControls, { opacity: fadeAnim }]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={styles.topGradient}
        >
          <View style={styles.topBar}>
            <TouchableOpacity
              style={styles.controlButton}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="close" size={28} color="white" />
            </TouchableOpacity>

            <View style={styles.titleContainer}>
              <Text style={styles.bookTitle} numberOfLines={1}>
                {story.title}
              </Text>
              <Text style={styles.bookAuthor}>{story.author}</Text>
            </View>

            <TouchableOpacity style={styles.controlButton}>
              <Ionicons name="bookmark-outline" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Controles inferiores */}
      <Animated.View
        style={[styles.bottomControls, { opacity: fadeAnim }]}
        pointerEvents={showControls ? 'auto' : 'none'}
      >
        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.6)']}
          style={styles.bottomGradient}
        >
          {/* Indicador de progreso */}
          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  {
                    width: `${((currentPage + 1) / story.pages.length) * 100}%`,
                  },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentPage + 1} / {story.pages.length}
            </Text>
          </View>

          {/* Botones de navegación */}
          <View style={styles.navigationButtons}>
            <TouchableOpacity
              style={[
                styles.navButton,
                currentPage === 0 && styles.navButtonDisabled,
              ]}
              onPress={previousPage}
              disabled={currentPage === 0}
            >
              <Ionicons
                name="chevron-back"
                size={28}
                color={currentPage === 0 ? '#666' : 'white'}
              />
              <Text
                style={[
                  styles.navButtonText,
                  currentPage === 0 && styles.navButtonTextDisabled,
                ]}
              >
                Anterior
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.navButton}
              onPress={() => {
                // Abrir índice o configuración
              }}
            >
              <Ionicons name="list" size={24} color="white" />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.navButton,
                currentPage === story.pages.length - 1 &&
                  styles.navButtonDisabled,
              ]}
              onPress={nextPage}
              disabled={currentPage === story.pages.length - 1}
            >
              <Text
                style={[
                  styles.navButtonText,
                  currentPage === story.pages.length - 1 &&
                    styles.navButtonTextDisabled,
                ]}
              >
                Siguiente
              </Text>
              <Ionicons
                name="chevron-forward"
                size={28}
                color={
                  currentPage === story.pages.length - 1 ? '#666' : 'white'
                }
              />
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </Animated.View>

      {/* Sombra de libro */}
      <View style={styles.bookShadow} pointerEvents="none" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C1810',
  },
  scrollView: {
    flex: 1,
  },
  pageContainer: {
    width: PAGE_WIDTH,
    height: height,
  },
  pageGradient: {
    flex: 1,
    paddingVertical: 60,
    paddingHorizontal: 30,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  pageImage: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  imagePlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    borderStyle: 'dashed',
  },
  placeholderText: {
    marginTop: 10,
    fontSize: 16,
    color: '#999',
  },
  textContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    padding: 20,
    borderRadius: 12,
    minHeight: 150,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    position: 'relative',
  },
  dropCapContainer: {
    float: 'left',
    marginRight: 8,
    marginTop: -5,
  },
  dropCap: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#27AE60',
    lineHeight: 60,
    fontFamily: 'serif',
  },
  pageText: {
    fontSize: 18,
    lineHeight: 28,
    color: '#2C1810',
    fontFamily: 'serif',
    textAlign: 'justify',
  },
  pageNumber: {
    position: 'absolute',
    bottom: 10,
    right: 20,
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
  topControls: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  topGradient: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  controlButton: {
    padding: 8,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  bookTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  bookAuthor: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 2,
  },
  bottomControls: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  bottomGradient: {
    paddingTop: 30,
    paddingBottom: 40,
    paddingHorizontal: 20,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#27AE60',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  navButtonDisabled: {
    opacity: 0.3,
  },
  navButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginHorizontal: 5,
  },
  navButtonTextDisabled: {
    color: '#666',
  },
  bookShadow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    pointerEvents: 'none',
  },
});
