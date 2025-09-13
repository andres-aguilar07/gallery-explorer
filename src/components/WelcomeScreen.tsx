import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native';
import { useStoragePermission } from '../hooks/useStoragePermission';

interface WelcomeScreenProps {
    onPermissionGranted: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPermissionGranted }) => {
    const { requestStoragePermission, isLoading, showPermissionAlert } = useStoragePermission();

    const handlePermissionRequest = async () => {
        const result = await requestStoragePermission();

        if (result.granted) {
            onPermissionGranted();
        } else if (result.status === 'denied_permanently') {
            // Si los permisos han sido denegados permanentemente, mostrar alerta para ir a configuraciones
            showPermissionAlert();
        }
        // Si el status es 'denied' pero no permanentemente, no hacemos nada (el usuario puede intentar de nuevo)
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.title}>Bienvenido a Gallery Explorer</Text>
                <Text style={styles.subtitle}>
                    Te ayudaré a limpiar 🗑️ tu galería de manera rápida y sencilla.
                </Text>

                <Text style={styles.description}>
                    Para eso necesito permiso de almacenamiento
                </Text>
            </View>

            <TouchableOpacity
                style={[styles.button, isLoading && styles.buttonDisabled]}
                onPress={handlePermissionRequest}
                activeOpacity={0.8}
                disabled={isLoading}
            >
                <Text style={styles.buttonText}>
                    {isLoading ? 'Solicitando...' : 'Dar Permiso'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#34495e',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
    },
    description: {
        fontSize: 16,
        color: '#7f8c8d',
        textAlign: 'center',
        lineHeight: 22,
    },
    button: {
        backgroundColor: '#3498db',
        paddingHorizontal: 40,
        paddingVertical: 15,
        borderRadius: 25,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        marginBottom: 50,
    },
    buttonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'center',
    },
    buttonDisabled: {
        backgroundColor: '#95a5a6',
        opacity: 0.7,
    },
});
