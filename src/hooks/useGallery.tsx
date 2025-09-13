import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import { Alert } from 'react-native';
import { getLocalUri } from '../utils/uriHelper';

export interface MediaAsset extends MediaLibrary.Asset {
    isVideo: boolean;
    localUri?: string;
    status: 'unmarked' | 'keep' | 'discard';
}

export const useGallery = () => {
    const [assets, setAssets] = useState<MediaAsset[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [hasNextPage, setHasNextPage] = useState(true);
    const [endCursor, setEndCursor] = useState<string | undefined>();

    const loadAssets = async (loadMore = false) => {
        try {
            setIsLoading(true);

            const result = await MediaLibrary.getAssetsAsync({
                mediaType: [MediaLibrary.MediaType.photo, MediaLibrary.MediaType.video],
                sortBy: MediaLibrary.SortBy.creationTime,
                first: 20,
                after: loadMore ? endCursor : undefined,
            });

            // Procesar assets y obtener URIs locales
            const enhancedAssets: MediaAsset[] = await Promise.all(
                result.assets.map(async (asset) => {
                    try {
                        const localUri = await getLocalUri(asset);
                        return {
                            ...asset,
                            isVideo: asset.mediaType === MediaLibrary.MediaType.video,
                            localUri,
                            status: 'unmarked' as const,
                        };
                    } catch (error) {
                        console.warn(`Error processing asset ${asset.id}:`, error);
                        // En caso de error, devolvemos el asset sin localUri
                        return {
                            ...asset,
                            isVideo: asset.mediaType === MediaLibrary.MediaType.video,
                            status: 'unmarked' as const,
                        };
                    }
                })
            );

            if (loadMore) {
                setAssets(prev => [...prev, ...enhancedAssets]);
            } else {
                setAssets(enhancedAssets);
                setCurrentIndex(0);
            }

            setHasNextPage(result.hasNextPage);
            setEndCursor(result.endCursor);
        } catch (error) {
            console.error('Error loading assets:', error);
            Alert.alert('Error', 'No se pudieron cargar las imágenes y videos de la galería');
        } finally {
            setIsLoading(false);
        }
    };

    const markAsset = (assetId: string, status: 'keep' | 'discard') => {
        setAssets(prev => prev.map(asset =>
            asset.id === assetId ? { ...asset, status } : asset
        ));
    };

    const deleteDiscardedAssets = async () => {
        try {
            const discardedAssets = assets.filter(asset => asset.status === 'discard');

            if (discardedAssets.length === 0) {
                Alert.alert('Sin fotos marcadas', 'No hay fotos marcadas para descartar');
                return false;
            }

            const canDelete = await MediaLibrary.deleteAssetsAsync(discardedAssets);

            if (canDelete) {
                // Remover assets descartados del estado local
                setAssets(prev => {
                    const newAssets = prev.filter(asset => asset.status !== 'discard');

                    // Ajustar el índice si es necesario
                    if (currentIndex >= newAssets.length && newAssets.length > 0) {
                        setCurrentIndex(newAssets.length - 1);
                    } else if (newAssets.length === 0) {
                        setCurrentIndex(0);
                    }

                    return newAssets;
                });

                Alert.alert(
                    'Fotos eliminadas',
                    `Se eliminaron ${discardedAssets.length} foto(s). Las fotos están en la papelera por si las necesitas.`
                );
                return true;
            } else {
                Alert.alert('Error', 'No se pudieron eliminar las fotos');
                return false;
            }
        } catch (error) {
            console.error('Error deleting discarded assets:', error);
            Alert.alert('Error', 'Ocurrió un error al eliminar las fotos');
            return false;
        }
    };

    const nextAsset = () => {
        if (currentIndex < assets.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else if (hasNextPage && !isLoading) {
            loadAssets(true);
        }
    };

    const previousAsset = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    const getCurrentAsset = (): MediaAsset | null => {
        return assets[currentIndex] || null;
    };

    useEffect(() => {
        loadAssets();
    }, []);

    const getDiscardedCount = () => {
        return assets.filter(asset => asset.status === 'discard').length;
    };

    const getKeptCount = () => {
        return assets.filter(asset => asset.status === 'keep').length;
    };

    return {
        assets,
        currentAsset: getCurrentAsset(),
        currentIndex,
        isLoading,
        hasNextPage,
        loadAssets,
        markAsset,
        deleteDiscardedAssets,
        nextAsset,
        previousAsset,
        totalAssets: assets.length,
        discardedCount: getDiscardedCount(),
        keptCount: getKeptCount(),
    };
};
