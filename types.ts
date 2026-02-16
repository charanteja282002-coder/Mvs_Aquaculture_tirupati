export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  category: string;
  imageUrl: string;
  stock: number;
  weight: number; // in kg
  option?: string; // e.g., "XL", "500ml", "Starter Pack"
  featured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  date: string;
  customerName: string;
  customerEmail: string;
  customerAddress: string;
  items: CartItem[];
  subtotal: number;
  shippingCharge: number;
  totalWeight: number;
  tax: number;
  total: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
}

export interface User {
  uid: string;
  email: string | null;
  role: 'admin' | 'customer';
}