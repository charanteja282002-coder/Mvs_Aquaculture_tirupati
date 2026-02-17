import { Product } from './types.ts';

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    sku: 'FISH-NEON-XL',
    name: 'Neon Tetra (XL)',
    description: 'Vibrant blue and red schooling fish, perfect for community tanks. Sold per piece.',
    price: 40,
    category: 'Fish',
    imageUrl: 'https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?auto=format&fit=crop&q=80&w=800',
    stock: 500,
    weight: 0.05,
    featured: true
  },
  {
    id: '2',
    sku: 'SUB-ADA-9L',
    name: 'ADA Amazonia Ver. 2 (9L)',
    description: 'The world standard for planted aquarium substrate. Rich in nutrients for aquatic plants.',
    price: 3800,
    category: 'Substrate',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&q=80&w=800',
    stock: 12,
    weight: 9.0,
    featured: true
  },
  {
    id: '3',
    sku: 'PLNT-ANUB-PET',
    name: 'Anubias Nana Petite',
    description: 'Slow-growing, hardy epiphyte plant for aquascaping. High quality mother plant.',
    price: 350,
    category: 'Plants',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&q=80&w=800',
    stock: 25,
    weight: 0.1,
    featured: false
  },
  {
    id: '4',
    sku: 'FLTR-EHM-2217',
    name: 'Eheim 2217 Classic',
    description: 'Reliable canister filter for tanks up to 600 liters. Includes all media.',
    price: 14500,
    category: 'Equipment',
    imageUrl: 'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&q=80&w=800',
    stock: 5,
    weight: 6.0,
    featured: true
  }
];

export const STORE_CONFIG = {
  name: 'MVS Aqua',
  whatsapp: '9490255775',
  instagram: 'mvs_aqua',
  youtube: 'mvs_aqua',
  address: '15 Line, Upadhyaya Nagar, Tirupati, Andhra Pradesh 517507',
  shippingRatePerKg: 80,
  trackingUrl: 'https://www.tpcindia.com/'
};