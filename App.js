import React, { useState } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';

export default function App() {
  const [sonido, setSonido] = useState();
  const [sonidoFondo, setSonidoFondo] = useState();
  const [volumen, setVolumen] = useState(1.0); // Volumen entre 0 y 1

  // Reproduce un sonido local
  const reproducirSonidoLocal = async () => {
    if (sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
    }
    const { sound: nuevoSonido } = await Audio.Sound.createAsync(
      require('./assets/ding.mp3')
    );
    setSonido(nuevoSonido);
    await nuevoSonido.playAsync();
  };

  // Reproduce música de fondo
  const reproducirMusicaFondo = async () => {
    if (sonidoFondo) {
      await sonidoFondo.stopAsync();
      await sonidoFondo.unloadAsync();
    }
    const { sound: nuevoSonidoFondo } = await Audio.Sound.createAsync(
      require('./assets/elevator.mp3'),
      { isLooping: true } // Reproduce en bucle
    );
    setSonidoFondo(nuevoSonidoFondo);
    await nuevoSonidoFondo.playAsync();
  };

  // Reproduce música desde una URL
  const reproducirMusicaRemota = async () => {
    if (sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
    }
    const { sound: nuevoSonido } = await Audio.Sound.createAsync(
      { uri: 'https://codeskulptor-demos.commondatastorage.googleapis.com/descent/gotitem.mp3' } 
    );
    setSonido(nuevoSonido);
    await nuevoSonido.playAsync();
  };

  // Controlar el volumen
  const cambiarVolumen = async (valor) => {
    setVolumen(valor);
    if (sonido) {
      await sonido.setVolumeAsync(valor);
    }
    if (sonidoFondo) {
      await sonidoFondo.setVolumeAsync(valor);
    }
  };

  // Pausar sonidos
  const detenerTodosLosSonidos = async () => {
    if (sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
      setSonido(null);
    }
    if (sonidoFondo) {
      await sonidoFondo.stopAsync();
      await sonidoFondo.unloadAsync();
      setSonidoFondo(null);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Reproducir sonido local" onPress={reproducirSonidoLocal} />
      <Button title="Reproducir música de fondo" onPress={reproducirMusicaFondo} />
      <Button title="Reproducir música remota" onPress={reproducirMusicaRemota} />
      <Slider
      style={styles.slider}
      minimumValue={0}
      maximumValue={1}
      value={volumen}
      onValueChange={cambiarVolumen}
      step={0.1}
      />
      <Button title="Detener todos los sonidos" onPress={detenerTodosLosSonidos} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center', 
    padding: 16,
  },
  slider: {
    width: 200,
    height: 40,
  },
});
