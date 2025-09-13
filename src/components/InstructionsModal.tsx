import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Modal,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

interface InstructionsModalProps {
    visible: boolean;
    onClose: () => void;
}

export const InstructionsModal: React.FC<InstructionsModalProps> = ({ visible, onClose }) => {
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
                        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
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
                                Cuando termines, presiona <Text style={styles.deleteButtonText}>"Borrar fotos descartadas"</Text>
                            </Text>
                        </View>

                        <View style={styles.step}>
                            <View style={styles.stepNumber}>
                                <Text style={styles.stepNumberText}>3</Text>
                            </View>
                            <Text style={styles.stepText}>
                                ¡Listo! Tu galería estará limpia y las fotos estarán en papelera por si las necesitas
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.gotItButton} onPress={onClose}>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
});
