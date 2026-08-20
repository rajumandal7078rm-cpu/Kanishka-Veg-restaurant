// High-capacity browser storage using IndexedDB + Cloud/Server persistence so uploaded photos are visible across all devices and phones

const DB_NAME = 'KanishkaRestaurantDB_v1';
const DB_VERSION = 1;
const STORE_NAME = 'uploaded_photos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      reject(new Error('IndexedDB not supported in this browser environment'));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

/**
 * Persist an image data URL permanently in IndexedDB + server API
 */
export async function saveImageToDB(key: string, dataUrl: string): Promise<void> {
  // 1. Save to local IndexedDB for immediate offline cache
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.put(dataUrl, key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB write warning:', e);
    try {
      localStorage.setItem(`kanishka_img_${key}`, dataUrl);
    } catch (err) {
      console.warn('localStorage quota reached:', err);
    }
  }

  // 2. Persist to server API so other phones/devices can see it immediately
  try {
    await fetch('/api/images', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, dataUrl }),
    });
  } catch (serverErr) {
    console.warn('Server image sync failed:', serverErr);
  }
}

/**
 * Fetch all shared images from the backend server
 */
export async function fetchImagesFromServer(): Promise<Record<string, string>> {
  try {
    const res = await fetch('/api/images');
    if (res.ok) {
      const data = await res.json();
      if (data.success && data.images) {
        return data.images;
      }
    }
  } catch (err) {
    console.warn('Could not fetch server images:', err);
  }
  return {};
}

/**
 * Batch sync local images to the server
 */
export async function syncBatchToServer(images: Record<string, string>): Promise<void> {
  if (Object.keys(images).length === 0) return;
  try {
    await fetch('/api/images/batch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ images }),
    });
  } catch (err) {
    console.warn('Batch sync to server failed:', err);
  }
}

/**
 * Retrieve all custom stored images from IndexedDB + localStorage migration
 */
export async function loadAllImagesFromDB(): Promise<Record<string, string>> {
  const result: Record<string, string> = {};

  // 1. Check old legacy localStorage structure for migration
  try {
    const legacy = localStorage.getItem('kanishka_custom_uploaded_images_v1');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      Object.assign(result, parsed);
    }
  } catch (e) {
    console.warn('Legacy localStorage read failed', e);
  }

  // 2. Check individual localStorage keys
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kanishka_img_')) {
        const imageKey = k.replace('kanishka_img_', '');
        const val = localStorage.getItem(k);
        if (val) result[imageKey] = val;
      }
    }
  } catch (e) {
    console.warn('Individual localStorage read failed', e);
  }

  // 3. Load from IndexedDB (source of truth with 1GB+ capacity)
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.openCursor();
      req.onsuccess = (e) => {
        const cursor = (e.target as IDBRequest<IDBCursorWithValue>).result;
        if (cursor) {
          result[cursor.key as string] = cursor.value;
          cursor.continue();
        } else {
          resolve();
        }
      };
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB read failed, using localStorage fallback', e);
  }

  return result;
}

/**
 * Remove a specific image from IndexedDB & Server
 */
export async function removeImageFromDB(key: string): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.delete(key);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB delete failed', e);
  }

  try {
    localStorage.removeItem(`kanishka_img_${key}`);
    const legacy = localStorage.getItem('kanishka_custom_uploaded_images_v1');
    if (legacy) {
      const parsed = JSON.parse(legacy);
      delete parsed[key];
      localStorage.setItem('kanishka_custom_uploaded_images_v1', JSON.stringify(parsed));
    }
  } catch (e) {
    console.warn(e);
  }

  try {
    await fetch(`/api/images/${encodeURIComponent(key)}`, { method: 'DELETE' });
  } catch (e) {
    console.warn('Server delete failed', e);
  }
}

/**
 * Clear all custom images from IndexedDB & Server
 */
export async function clearAllImagesFromDB(): Promise<void> {
  try {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_NAME, 'readwrite');
      const store = tx.objectStore(STORE_NAME);
      const req = store.clear();
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  } catch (e) {
    console.warn('IndexedDB clear failed', e);
  }

  try {
    localStorage.removeItem('kanishka_custom_uploaded_images_v1');
    const toRemove: string[] = [];
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith('kanishka_img_')) {
        toRemove.push(k);
      }
    }
    toRemove.forEach((k) => localStorage.removeItem(k));
  } catch (e) {
    console.warn(e);
  }

  try {
    await fetch('/api/images', { method: 'DELETE' });
  } catch (e) {
    console.warn('Server clear failed', e);
  }
}
