import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Importar pantallas originales
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import StoryLibrary from './src/screens/StoryLibrary';
import StoryBookReader from './src/screens/StoryBookReader';
import AdventuresScreen from './src/screens/AdventuresScreen';
import AdventureDetailScreen from './src/screens/AdventureDetailScreen';
import AgeGroupScreen from './src/screens/AgeGroupScreen';
import MaterialViewerScreen from './src/screens/MaterialViewerScreen';
import AudioPlayerScreen from './src/screens/AudioPlayerScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProgressScreen from './src/screens/ProgressScreen';

// === INYECCIÓN DE ROMMELFI ===
import { RommelFiProvider } from './src/contexts/RommelFiContext';
import MiniPlayer from './src/components/MiniPlayer';
import RommelFiPlayerScreen from './src/screens/RommelFiPlayerScreen';
// =============================

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación de pestañas principales (Tu diseño intacto)
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Aventuras') {
            iconName = focused ? 'compass' : 'compass-outline';
          } else if (route.name === 'Progreso') {
            iconName = focused ? 'trophy' : 'trophy-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#27AE60',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Inicio" component={HomeScreen} />
      <Tab.Screen name="Aventuras" component={AdventuresScreen} />
      <Tab.Screen name="Progreso" component={ProgressScreen} />
      <Tab.Screen name="Perfil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

// Navegación principal
export default function App() {
  return (
    <RommelFiProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName="Splash"
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Main" component={MainTabs} />
            <Stack.Screen 
              name="AdventureDetail" 
              component={AdventureDetailScreen}
              options={{ headerShown: true, title: 'Aventura' }}
            />
            <Stack.Screen 
              name="AgeGroup" 
              component={AgeGroupScreen}
              options={{ headerShown: true, title: 'Selecciona tu edad' }}
            />
            <Stack.Screen 
              name="MaterialViewer" 
              component={MaterialViewerScreen}
              options={{ headerShown: true, title: 'Material' }}
            />
            <Stack.Screen 
              name="AudioPlayer" 
              component={AudioPlayerScreen}
              options={{ headerShown: true, title: 'Audio' }}
            />
            {/* Pantalla del reproductor completo de RommelFi */}
            <Stack.Screen 
              name="RommelFiPlayer" 
              component={RommelFiPlayerScreen}
              options={{ headerShown: false }} 
            />
            <Stack.Screen 
              name="StoryLibrary" 
              component={StoryLibrary} 
              options={{ headerShown: true, title: 'Biblioteca de Cuentos' }} 
            />
            <Stack.Screen 
              name="StoryBookReader" 
              component={StoryBookReader} 
              options={{ headerShown: false }} 
            />
          </Stack.Navigator>
          {/* El MiniPlayer flotante se inyecta aquí */}
          <MiniPlayer />
        </NavigationContainer>
      </PaperProvider>
    </RommelFiProvider>
  );
}
