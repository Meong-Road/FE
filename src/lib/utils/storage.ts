type StorageType = "localStorage" | "sessionStorage";

// 스토리지 유틸리티
export const storageUtils = {
  setItem<T>(key: string, value: T, storageType: StorageType = "localStorage") {
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  },

  getItem<T>(key: string, storageType: StorageType = "localStorage"): T | null {
    try {
      const storage =
        storageType === "localStorage" ? localStorage : sessionStorage;
      const stored = storage.getItem(key);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  },

  removeItem(key: string, storageType: StorageType = "localStorage") {
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    storage.removeItem(key);
  },

  clear(storageType: StorageType = "localStorage") {
    const storage =
      storageType === "localStorage" ? localStorage : sessionStorage;
    storage.clear();
  },
};
