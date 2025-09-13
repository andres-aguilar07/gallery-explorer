import { useState } from 'react';
import { Alert, Platform } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import * as Linking from 'expo-linking';

export const useStoragePermission = () => {
    const [hasPermission, setHasPermission] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const requestStoragePermission = async () => {
        try {
            setIsLoading(true);

            // Primero verificamos el estado actual
            const currentPermission = await MediaLibrary.getPermissionsAsync();

            if (currentPermission.status === 'granted') {
                setHasPermission(true);
                return { granted: true, status: 'granted' };
            }

            // Si nunca se ha preguntado o se puede volver a preguntar
            if (currentPermission.canAskAgain || currentPermission.status === 'undetermined') {
                const { status } = await MediaLibrary.requestPermissionsAsync();

                if (status === 'granted') {
                    setHasPermission(true);
                    return { granted: true, status: 'granted' };
                } else {
                    setHasPermission(false);
                    return { granted: false, status: status };
                }
            } else {
                // Los permisos han sido denegados permanentemente
                setHasPermission(false);
                return { granted: false, status: 'denied_permanently' };
            }
        } catch (error) {
            console.error('Error requesting permission:', error);
            setHasPermission(false);
            return { granted: false, status: 'error' };
        } finally {
            setIsLoading(false);
        }
    };

    const checkPermissionStatus = async () => {
        try {
            const { status } = await MediaLibrary.getPermissionsAsync();
            const granted = status === 'granted';
            setHasPermission(granted);
            return granted;
        } catch (error) {
            console.error('Error checking permission status:', error);
            return false;
        }
    };

    const openAppSettings = async () => {
        try {
            if (Platform.OS === 'ios') {
                await Linking.openURL('app-settings:');
            } else {
                await Linking.openSettings();
            }
        } catch (error) {
            console.error('Error opening settings:', error);
            Alert.alert(
                'Error',
                'No se pudo abrir la configuración. Por favor, ve manualmente a Configuración > Aplicaciones > Gallery Explorer > Permisos'
            );
        }
    };

    const showPermissionAlert = () => {
        Alert.alert(
            'Permisos requeridos',
            'Para usar esta aplicación, necesitas habilitar el permiso de acceso a la galería en la configuración de la aplicación.',
            [
                {
                    text: 'Cancelar',
                    style: 'cancel',
                },
                {
                    text: 'Ir a Configuración',
                    onPress: openAppSettings,
                },
            ]
        );
    };

    return {
        hasPermission,
        isLoading,
        requestStoragePermission,
        checkPermissionStatus,
        openAppSettings,
        showPermissionAlert
    };
};
