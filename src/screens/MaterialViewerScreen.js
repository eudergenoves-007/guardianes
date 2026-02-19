// MaterialViewerScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function MaterialViewerScreen({ route }) {
  const { material } = route.params;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{material.title}</Text>
      <Text style={styles.note}>
        Aquí se mostrará el PDF: {material.file}
      </Text>
      <Text style={styles.note}>
        (Necesitarás agregar react-native-pdf para visualizar PDFs)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  note: {
    fontSize: 14,
    color: '#7F8C8D',
    textAlign: 'center',
    marginTop: 10,
  },
});
