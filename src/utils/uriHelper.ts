import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export const getLocalUri = async (asset: MediaLibrary.Asset): Promise<string> => {
    try {
        // Si la URI ya es local (file://) o http/https, la devolvemos tal como está
        if (asset.uri.startsWith('file://') || asset.uri.startsWith('http')) {
            return asset.uri;
        }

        // Si es una URI ph:// (iOS), obtenemos información del asset y creamos una URI local
        if (asset.uri.startsWith('ph://')) {
            try {
                const assetInfo = await MediaLibrary.getAssetInfoAsync(asset);

                // Si getAssetInfoAsync devuelve una URI local, la usamos
                if (assetInfo.localUri) {
                    return assetInfo.localUri;
                }

                // Si no hay localUri, intentamos usar la URI original con un warning
                console.warn(`No localUri available for asset ${asset.id}, using original URI`);
                return asset.uri;
            } catch (assetError) {
                console.warn('Error getting asset info, falling back to original URI:', assetError);
                return asset.uri;
            }
        }

        // Para cualquier otro esquema, devolvemos la URI original
        return asset.uri;
    } catch (error) {
        console.error('Error in getLocalUri:', error);
        // En caso de error, devolvemos la URI original como último recurso
        return asset.uri;
    }
};

export const isPhotoLibraryUri = (uri: string): boolean => {
    return uri.startsWith('ph://');
};

export const isLocalUri = (uri: string): boolean => {
    return uri.startsWith('file://');
};

export const isHttpUri = (uri: string): boolean => {
    return uri.startsWith('http://') || uri.startsWith('https://');
};
