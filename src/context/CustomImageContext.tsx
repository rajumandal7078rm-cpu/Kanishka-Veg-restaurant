import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  loadAllImagesFromDB,
  saveImageToDB,
  removeImageFromDB,
  clearAllImagesFromDB,
  fetchImagesFromServer,
  syncBatchToServer,
} from '../utils/imageStorage';

// Static bundled authentic uploads (ensures images NEVER disappear even offline or on fresh devices)
import facadeImg from '../assets/images/uploaded_hero-facade.jpg';
import diningImg from '../assets/images/uploaded_about-dining.jpg';
import familyImg from '../assets/images/uploaded_about-family.jpg';
import dosaImg from '../assets/images/uploaded_dish-mysore-masala.jpg';
import gal1Img from '../assets/images/uploaded_gallery-gal-1.jpg';
import gal3Img from '../assets/images/uploaded_gallery-gal-3.jpg';
import gal4Img from '../assets/images/uploaded_gallery-gal-4.jpg';
import gal9Img from '../assets/images/uploaded_gallery-gal-9.jpg';
import heroDiningImg from '../assets/images/uploaded_hero-dining.jpg';
import locFacadeImg from '../assets/images/uploaded_location-facade.jpg';

export const STATIC_AUTHENTIC_IMAGES: Record<string, string> = {
  'hero-facade': facadeImg,
  'about-dining': diningImg,
  'about-family': familyImg,
  'dish-mysore-masala': dosaImg,
  'gallery-gal-1': gal1Img,
  'gallery-gal-3': gal3Img,
  'gallery-gal-4': gal4Img,
  'gallery-gal-9': gal9Img,
  'hero-dining': heroDiningImg,
  'location-facade': locFacadeImg,
};

interface CustomImageContextType {
  customImages: Record<string, string>;
  getImage: (key: string, fallbackUrl: string) => string;
  setCustomImage: (key: string, dataUrl: string) => void;
  removeCustomImage: (key: string) => void;
  resetAllCustomImages: () => void;
  isCustom: (key: string) => boolean;
  isLoading: boolean;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  toggleEditMode: () => void;
}

const CustomImageContext = createContext<CustomImageContextType | undefined>(undefined);

export const CustomImageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [customImages, setCustomImages] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Edit/Admin Mode: Default false for clean public live internet viewing (no upload buttons visible to customers)
  const [isEditMode, setIsEditMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('edit') === 'true' || params.get('admin') === 'true';
    }
    return false;
  });

  const toggleEditMode = () => {
    setIsEditMode((prev) => !prev);
  };

  // Load all images asynchronously on mount from IndexedDB AND sync with Backend Server
  useEffect(() => {
    let isMounted = true;

    async function initializeAndSyncImages() {
      try {
        // 1. Instant local load (zero latency)
        const localImages = await loadAllImagesFromDB();
        if (isMounted && Object.keys(localImages).length > 0) {
          setCustomImages(localImages);
        }

        // 2. Fetch server images (shared across all devices/phones)
        const serverImages = await fetchImagesFromServer();

        if (isMounted) {
          // Merge: Server images take precedence, then local images, then bundled static
          const merged = { ...localImages, ...serverImages };
          setCustomImages(merged);
          setIsLoading(false);

          // If local has images not yet on server, upload them to server
          const missingOnServer: Record<string, string> = {};
          for (const [k, v] of Object.entries(localImages)) {
            if (!serverImages[k]) {
              missingOnServer[k] = v;
            }
          }
          if (Object.keys(missingOnServer).length > 0) {
            syncBatchToServer(missingOnServer);
          }

          // Also save any server images into local IndexedDB for offline cache
          for (const [k, v] of Object.entries(serverImages)) {
            if (!localImages[k] || localImages[k] !== v) {
              saveImageToDB(k, v);
            }
          }
        }
      } catch (err) {
        console.warn('Image synchronization error:', err);
        if (isMounted) setIsLoading(false);
      }
    }

    initializeAndSyncImages();

    // Re-sync on window focus (so if photo was uploaded on another tab/phone, it syncs immediately)
    const handleFocus = () => {
      fetchImagesFromServer().then((serverImages) => {
        if (isMounted && Object.keys(serverImages).length > 0) {
          setCustomImages((prev) => ({ ...prev, ...serverImages }));
        }
      });
    };

    window.addEventListener('focus', handleFocus);

    return () => {
      isMounted = false;
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const getImage = (key: string, fallbackUrl: string): string => {
    return customImages[key] || STATIC_AUTHENTIC_IMAGES[key] || fallbackUrl;
  };

  const setCustomImage = (key: string, dataUrl: string) => {
    // 1. Immediately update React state for instant visual feedback
    setCustomImages((prev) => ({
      ...prev,
      [key]: dataUrl,
    }));

    // 2. Persist in IndexedDB and sync with server so ALL phones/devices get it
    saveImageToDB(key, dataUrl).catch((err) => {
      console.error('Failed to persist image', err);
    });
  };

  const removeCustomImage = (key: string) => {
    setCustomImages((prev) => {
      const next = { ...prev };
      delete next[key];
      return next;
    });

    removeImageFromDB(key).catch((err) => {
      console.error('Failed to remove image', err);
    });
  };

  const resetAllCustomImages = () => {
    setCustomImages({});
    clearAllImagesFromDB().catch((err) => {
      console.error('Failed to clear images', err);
    });
  };

  const isCustom = (key: string): boolean => {
    return Boolean(customImages[key] || STATIC_AUTHENTIC_IMAGES[key]);
  };

  return (
    <CustomImageContext.Provider
      value={{
        customImages,
        getImage,
        setCustomImage,
        removeCustomImage,
        resetAllCustomImages,
        isCustom,
        isLoading,
        isEditMode,
        setIsEditMode,
        toggleEditMode,
      }}
    >
      {children}
    </CustomImageContext.Provider>
  );
};

export const useCustomImages = (): CustomImageContextType => {
  const context = useContext(CustomImageContext);
  if (!context) {
    throw new Error('useCustomImages must be used within a CustomImageProvider');
  }
  return context;
};

