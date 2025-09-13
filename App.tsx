import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { HomePage } from './src/pages/HomePage';
import { WelcomeScreen } from './src/components/WelcomeScreen';
import { useStoragePermission } from './src/hooks/useStoragePermission';

export default function App() {
  const { hasPermission, checkPermissionStatus } = useStoragePermission();

  useEffect(() => {
    checkPermissionStatus();
  }, []);

  const handlePermissionGranted = () => {
    checkPermissionStatus();
  };

  return (
    <View style={styles.container}>
      {!hasPermission ? (
        <WelcomeScreen onPermissionGranted={handlePermissionGranted} />
      ) : (
        <HomePage />
      )}
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
