import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';

// Importar el Provider de RommelFi
import { RommelFiProvider } from './src/contexts/RommelFiContext';

// Importar el MiniPlayer
import MiniPlayer from './src/components/MiniPlayer';

// Importar pantallas
import SplashScreen from './src/screens/SplashScreen';
import HomeScreen from './src/screens/HomeScreen';
import AdventuresScreen from './src/screens/AdventuresScreen';
import AdventureDetailScreen from './src/screens/AdventureDetailScreen';
import AgeGroupScreen from './src/screens/AgeGroupScreen';
import MaterialViewerScreen from './src/screens/MaterialViewerScreen';
import RommelFiPlayerScreen from './src/screens/RommelFiPlayerScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import ProgressScreen from './src/screens/ProgressScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Navegación de pestañas principales con MiniPlayer
function MainTabs() {
  return (
    <View style={{ flex: 1 }}>
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
          tabBarActiveTintColor: '#1DB954',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
            // Agregar espacio para el mini player
            marginBottom: 0,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name="Inicio" component={HomeScreen} />
        <Tab.Screen name="Aventuras" component={AdventuresScreen} />
        <Tab.Screen name="Progreso" component={ProgressScreen} />
        <Tab.Screen name="Perfil" component={ProfileScreen} />
      </Tab.Navigator>
      
      {/* Mini Player Flotante - aparece en todas las pestañas */}
      <MiniPlayer />
    </View>
  );
}

// Navegación principal
function AppNavigator() {
  return (
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
          options={{ 
            headerShown: true, 
            title: 'Aventura',
            headerStyle: { backgroundColor: '#27AE60' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="AgeGroup" 
          component={AgeGroupScreen}
          options={{ 
            headerShown: true, 
            title: 'Selecciona tu edad',
            headerStyle: { backgroundColor: '#27AE60' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="MaterialViewer" 
          component={MaterialViewerScreen}
          options={{ 
            headerShown: true, 
            title: 'Material',
            headerStyle: { backgroundColor: '#27AE60' },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="RommelFiPlayer" 
          component={RommelFiPlayerScreen}
          options={{ 
            headerShown: false,
            presentation: 'modal', // Efecto modal en iOS
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// App Principal con Providers
export default function App() {
  return (
    <PaperProvider>
      <RommelFiProvider>
        <AppNavigator />
      </RommelFiProvider>
    </PaperProvider>
  );
}
