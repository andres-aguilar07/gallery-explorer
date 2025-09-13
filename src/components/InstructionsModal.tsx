import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth } = Dimensions.get('window');

interface InstructionsModalProps {
    visible: boolean;
    onClose: () => void;
}

const DONT_SHOW_AGAIN_KEY = '@gallery_explorer_dont_show_instructions';

export const checkShouldShowInstructions = async (): Promise<boolean> => {
    try {
        const dontShow = await AsyncStorage.getItem(DONT_SHOW_AGAIN_KEY);
        // Si no existe el valor, mostrar por defecto
        // Si es 'true', no mostrar
        // Si es 'false', mostrar
        return dontShow !== 'true';
    } catch (error) {
        console.log('Error verificando preferencia:', error);
        return true; // Mostrar por defecto si hay error
    }
};

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ visible, onClose }) => {
    const [dontShowAgain, setDontShowAgain] = useState(false);

    // Cargar el estado inicial del checkbox cuando el modal se abre
    useEffect(() => {
        const loadCheckboxState = async () => {
            if (visible) {
                try {
                    const savedValue = await AsyncStorage.getItem(DONT_SHOW_AGAIN_KEY);
                    setDontShowAgain(savedValue === 'true');
                } catch (error) {
                    console.log('Error cargando estado del checkbox:', error);
                    setDontShowAgain(false);
                }
            }
        };

        loadCheckboxState();
    }, [visible]);

    const handleClose = async () => {
        if (dontShowAgain) {
            try {
                await AsyncStorage.setItem(DONT_SHOW_AGAIN_KEY, 'true');
            } catch (error) {
                console.log('Error guardando preferencia:', error);
            }
        }
        onClose();
    };

    const toggleDontShowAgain = async () => {
        const newValue = !dontShowAgain;
        setDontShowAgain(newValue);

        // Actualizar AsyncStorage inmediatamente cuando cambia el estado
        try {
            await AsyncStorage.setItem(DONT_SHOW_AGAIN_KEY, newValue.toString());
        } catch (error) {
            console.log('Error actualizando preferencia:', error);
        }
    };

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Text style={styles.title}>¿Cómo usar Gallery Explorer?</Text>
                        <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
                            <Ionicons name="close" size={24} color="#666" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.content}>
                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>1</Text>
                            </View>
                            <Text style={styles.stepText}>
                                Marca cada foto como <Text style={styles.keepText}>mantener</Text> o <Text style={styles.discardText}>descartar</Text>
                            </Text>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>2</Text>
                            </View>
                            <Text style={styles.stepText}>
                                Cuando termines, presiona <Text style={styles.deleteButtonText}>"Borrar elementos descartados"</Text>
                            </Text>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>3</Text>
                            </View>
                            <Text style={styles.stepText}>
                                ¡Listo! Tu galería estará limpia (las fotos y videos estarán en papelera por si las necesitas)
                            </Text>
                        </View>
                    </View>

                    <View style={styles.checkboxContainer}>
                        <TouchableOpacity
                            style={styles.checkbox}
                            onPress={toggleDontShowAgain}
                        >
                            <View style={[styles.checkboxBox, dontShowAgain && styles.checkboxChecked]}>
                                {dontShowAgain && (
                                    <Ionicons name="checkmark" size={16} color="white" />
                                )}
                            </View>
                            <Text style={styles.checkboxText}>No volver a mostrar</Text>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.gotItButton} onPress={handleClose}>
                        <Text style={styles.gotItText}>¡Entendido!</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    modalContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 24,
        width: screenWidth * 0.9,
        maxWidth: 400,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '700',
        color: '#1a1a1a',
        flex: 1,
    },
    closeButton: {
        padding: 4,
    },
    content: {
        marginBottom: 24,
    },
    step: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginBottom: 16,
    },
    stepNumber: {
        width: 32,
        height: 32,
        borderRadius: 16,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        marginTop: 2,
    },
    stepNumberText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    stepText: {
        fontSize: 16,
        color: '#333',
        lineHeight: 22,
        flex: 1,
    },
    keepText: {
        color: '#28a745',
        fontWeight: '600',
    },
    discardText: {
        color: '#dc3545',
        fontWeight: '600',
    },
    deleteButtonText: {
        color: '#ff6b6b',
        fontWeight: '600',
    },
    gotItButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 14,
        paddingHorizontal: 24,
        borderRadius: 12,
        alignItems: 'center',
    },
    gotItText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    checkboxContainer: {
        marginBottom: 20,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxBox: {
        width: 20,
        height: 20,
        borderWidth: 2,
        borderColor: '#007AFF',
        borderRadius: 4,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    checkboxChecked: {
        backgroundColor: '#007AFF',
    },
    checkboxText: {
        fontSize: 14,
        color: '#666',
    },
});
