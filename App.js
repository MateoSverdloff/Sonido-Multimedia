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
    // Detenemos el sonido actual si está sonando
    if (sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
    }
    const { sound: nuevoSonido } = await Audio.Sound.createAsync(
      require('./assets/ding.mp3') // Cambiado a sonido.mp3
    );
    setSonido(nuevoSonido);
    await nuevoSonido.playAsync();
  };

  // Reproduce música de fondo
  const reproducirMusicaFondo = async () => {
    // Detenemos la música de fondo actual si está sonando
    if (sonidoFondo) {
      await sonidoFondo.stopAsync();
      await sonidoFondo.unloadAsync();
    }
    const { sound: nuevoSonidoFondo } = await Audio.Sound.createAsync(
      require('./assets/elevator.mp3'), // Cambia esta ruta si es necesario
      { isLooping: true } // Reproduce en bucle
    );
    setSonidoFondo(nuevoSonidoFondo);
    await nuevoSonidoFondo.playAsync();
  };

  // Reproduce música remota
  const reproducirMusicaRemota = async () => {
    // Detenemos el sonido actual si está sonando
    if (sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
    }
    const { sound: nuevoSonido } = await Audio.Sound.createAsync(
      { uri: 'https://www.youtube.com/watch?v=nz-V3g6-1KQ' } // Reemplaza con tu URL remota
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

  // Limpiar sonidos
  const detenerTodosLosSonidos = async () => {
    if (sonido) {
      await sonido.stopAsync();
      await sonido.unloadAsync();
      setSonido(null); // Limpia el estado de sonido
    }
    if (sonidoFondo) {
      await sonidoFondo.stopAsync();
      await sonidoFondo.unloadAsync();
      setSonidoFondo(null); // Limpia el estado de música de fondo
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
    padding: 16,
  },
  slider: {
    width: 200,
    height: 40,
  },
});
  