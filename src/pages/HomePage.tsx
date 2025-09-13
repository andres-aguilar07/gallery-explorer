import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Dimensions,
    ActivityIndicator
} from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useGallery } from '../hooks/useGallery';
import { InstructionsModal, checkShouldShowInstructions } from '../components/InstructionsModal';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const imageSize = screenWidth * 0.8;

export const HomePage = () => {
    const {
        currentAsset,
        isLoading,
        markAsset,
        deleteDiscardedAssets,
        nextAsset,
        previousAsset,
        discardedCount,
        keptCount,
    } = useGallery();

    const [isDeleting, setIsDeleting] = useState(false);
    const [showInstructions, setShowInstructions] = useState(false);

    useEffect(() => {
        // Verificar si se deben mostrar las instrucciones al inicio
        const checkAndShowInstructions = async () => {
            const shouldShow = await checkShouldShowInstructions();
            if (shouldShow) {
                setShowInstructions(true);
            }
        };

        checkAndShowInstructions();
    }, []);

    const handleKeep = () => {
        if (currentAsset) {
            markAsset(currentAsset.id, 'keep');
            nextAsset();
        }
    };

    const handleDiscard = () => {
        if (currentAsset) {
            markAsset(currentAsset.id, 'discard');
            nextAsset();
        }
    };

    const handleDeleteDiscarded = async () => {
        if (discardedCount === 0) return;

        setIsDeleting(true);
        await deleteDiscardedAssets();
        setIsDeleting(false);
    };

    const renderMedia = () => {
        if (!currentAsset) {
            return (
                <View style={styles.emptyContainer}>
                    <Ionicons name="images-outline" size={64} color="#ccc" />
                    <Text style={styles.emptyText}>No hay medios en la galería</Text>
                </View>
            );
        }

        // Usar localUri si está disponible, sino usar uri original
        const mediaUri = currentAsset.localUri || currentAsset.uri;

        if (currentAsset.isVideo) {
            return (
                <Video
                    source={{ uri: mediaUri }}
                    style={styles.media}
                    useNativeControls
                    resizeMode={ResizeMode.CONTAIN}
                    shouldPlay={false}
                />
            );
        } else {
            return (
                <Image
                    source={{ uri: mediaUri }}
                    style={styles.media}
                    resizeMode="contain"
                />
            );
        }
    };

    if (isLoading && !currentAsset) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.title}>Gallery Explorer</Text>
                <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
                <Text style={styles.loadingText}>Cargando galería...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.title}>Gallery Explorer</Text>
                <TouchableOpacity
                    style={styles.helpButton}
                    onPress={() => setShowInstructions(true)}
                >
                    <Ionicons name="help" size={20} color="white" />
                </TouchableOpacity>
            </View>

            {/* Stats */}
            <View style={styles.statsContainer}>
                <View style={styles.statItem}>
                    <Text style={styles.statNumber}>{keptCount}</Text>
                    <Text style={styles.statLabel}>Mantener</Text>
                </View>
                <View style={styles.statItem}>
                    <Text style={[styles.statNumber, styles.discardNumber]}>{discardedCount}</Text>
                    <Text style={styles.statLabel}>Descartar</Text>
                </View>
            </View>

            {/* Media Container */}
            <View style={styles.mediaContainer}>
                {renderMedia()}
                {currentAsset && (
                    <View style={styles.statusIndicator}>
                        {currentAsset.status === 'keep' && (
                            <View style={[styles.statusBadge, styles.keepBadge]}>
                                <Ionicons name="checkmark" size={16} color="white" />
                                <Text style={styles.statusText}>Mantener</Text>
                            </View>
                        )}
                        {currentAsset.status === 'discard' && (
                            <View style={[styles.statusBadge, styles.discardBadge]}>
                                <Ionicons name="close" size={16} color="white" />
                                <Text style={styles.statusText}>Descartar</Text>
                            </View>
                        )}
                    </View>
                )}
            </View>

            {/* Controls */}
            {currentAsset && (
                <View style={styles.controls}>
                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.keepButton,
                            currentAsset.status === 'keep' && styles.selectedButton
                        ]}
                        onPress={handleKeep}
                        disabled={isDeleting}
                    >
                        <Ionicons name="heart" size={24} color="white" />
                        <Text style={styles.buttonText}>Mantener</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                            styles.button,
                            styles.discardButton,
                            currentAsset.status === 'discard' && styles.selectedButton
                        ]}
                        onPress={handleDiscard}
                        disabled={isDeleting}
                    >
                        <Ionicons name="close" size={24} color="white" />
                        <Text style={styles.buttonText}>Descartar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {/* Delete Discarded Button */}
            <View style={styles.deleteSection}>
                <TouchableOpacity
                    style={[
                        styles.deleteDiscardedButton,
                        isDeleting && styles.deletingButton,
                        discardedCount === 0 && styles.disabledButton
                    ]}
                    onPress={handleDeleteDiscarded}
                    disabled={isDeleting || discardedCount === 0}
                >
                    {isDeleting ? (
                        <ActivityIndicator size="small" color="white" />
                    ) : discardedCount > 0 ? (
                        <Ionicons name="trash" size={20} color="white" />
                    ) : null}

                    <Text style={[
                        styles.deleteDiscardedText,
                        discardedCount === 0 && styles.disabledText
                    ]}>
                        {isDeleting
                            ? 'Eliminando...'
                            : discardedCount === 0
                                ? 'Descarta elementos para poder borrarlos'
                                : `Borrar ${discardedCount} elemento${discardedCount > 1 ? 's' : ''} descartado${discardedCount > 1 ? 's' : ''}`
                        }
                    </Text>
                </TouchableOpacity>
            </View>

            <InstructionsModal
                visible={showInstructions}
                onClose={() => setShowInstructions(false)}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        paddingTop: 60,
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#f8f9fa',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 60,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 20,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '700',
        color: '#1a1a1a',
        letterSpacing: -0.5,
    },
    helpButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    statsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 10,
    },
    statItem: {
        alignItems: 'center',
        marginHorizontal: 20,
    },
    statNumber: {
        fontSize: 24,
        fontWeight: '700',
        color: '#28a745',
    },
    discardNumber: {
        color: '#dc3545',
    },
    statLabel: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
        marginTop: 4,
    },
    mediaContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        position: 'relative',
    },
    media: {
        width: imageSize,
        height: imageSize,
        borderRadius: 16,
        backgroundColor: '#e9ecef',
    },
    statusIndicator: {
        position: 'absolute',
        top: 20,
        right: 40,
    },
    statusBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
    },
    keepBadge: {
        backgroundColor: '#28a745',
    },
    discardBadge: {
        backgroundColor: '#dc3545',
    },
    statusText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '600',
        marginLeft: 4,
    },
    emptyContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyText: {
        fontSize: 18,
        color: '#666',
        marginTop: 16,
        fontWeight: '500',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingHorizontal: 40,
        paddingVertical: 20,
        gap: 4
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 16,
        borderRadius: 12,
        minWidth: 120,
        justifyContent: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    selectedButton: {
        transform: [{ scale: 1.05 }],
        elevation: 4,
        shadowOpacity: 0.2,
    },
    keepButton: {
        backgroundColor: '#28a745',
    },
    discardButton: {
        backgroundColor: '#eb5959',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
    },
    deleteSection: {
        paddingHorizontal: 40,
        paddingBottom: 30,
        alignItems: 'center',
    },
    deleteDiscardedButton: {
        backgroundColor: '#dc3545',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 12,
        maxWidth: 300,
        minWidth: 200,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    deletingButton: {
        backgroundColor: '#999',
    },
    disabledButton: {
        backgroundColor: '#ccc',
        elevation: 1,
        shadowOpacity: 0.05,
    },
    deleteDiscardedText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 8,
        textAlign: 'center',
    },
    disabledText: {
        color: '#999',
    },
    loader: {
        marginVertical: 20,
    },
    loadingText: {
        fontSize: 16,
        color: '#666',
        fontWeight: '500',
    },
});