
import { Product, Order } from '../types';

const DB_KEY = 'mvs_aqua_cloud_db_v2';

interface CloudDB {
  products: Product[];
  orders: Order[];
  lastUpdated: number;
}

export const cloudService = {
  // Fix: Removed missing StaffMember and AuditLog types to align with types.ts
  async getDB(): Promise<CloudDB> {
    const data = localStorage.getItem(DB_KEY);
    if (!data) {
      return { products: [], orders: [], lastUpdated: Date.now() };
    }
    try {
      return JSON.parse(data);
    } catch (e) {
      console.error("Database corruption detected, resetting...");
      return { products: [], orders: [], lastUpdated: Date.now() };
    }
  },

  async saveDB(data: Partial<CloudDB>) {
    const current = await this.getDB();
    const updated = { ...current, ...data, lastUpdated: Date.now() };
    localStorage.setItem(DB_KEY, JSON.stringify(updated));
    
    // Broadcast change to other components in the same window
    window.dispatchEvent(new CustomEvent('cloud-sync', { detail: updated }));
  },

  subscribe(callback: (db: CloudDB) => void) {
    const handler = (e: any) => {
      if (e instanceof CustomEvent && e.type === 'cloud-sync') {
        callback(e.detail);
      } else if (e instanceof StorageEvent && e.key === DB_KEY) {
        this.getDB().then(callback);
      }
    };
    
    window.addEventListener('cloud-sync', handler);
    window.addEventListener('storage', handler);
    
    return () => {
      window.removeEventListener('cloud-sync', handler);
      window.removeEventListener('storage', handler);
    };
  }
};
