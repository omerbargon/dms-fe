export interface CartItem {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  quantity: number;
  image: string;
  inStock: boolean;
}

export interface DeliveryAddress {
  id: string;
  name: string;
  address: string;
  phone: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id: string;
  type: 'visa-card' | 'master-card' | 'paypal';
  name: string;
  last4?: string;
  isDefault: boolean;
}

export type CheckoutStep = 'cart' | 'address' | 'payment' | 'confirmation';
export type GroupBy = 'none' | 'category' | 'brand';

export const carts: CartItem[] = [
  {
    id: '1',
    name: 'Filtek Supreme Ultra Universal Composite',
    brand: '3M ESPE',
    category: 'Restorative',
    price: 149.99,
    quantity: 2,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=200&h=200&fit=crop',
    inStock: true,
  },
  {
    id: '2',
    name: 'ProTaper Universal Rotary Files',
    brand: 'Dentsply Sirona',
    category: 'Endodontics',
    price: 89.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=200&h=200&fit=crop',
    inStock: true,
  },
  {
    id: '3',
    name: 'G-ænial Universal Injectable Composite',
    brand: 'GC Corporation',
    category: 'Restorative',
    price: 119.99,
    quantity: 3,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=200&h=200&fit=crop',
    inStock: true,
  },
  {
    id: '4',
    name: 'IPS e.max CAD Blocks',
    brand: 'Ivoclar Vivadent',
    category: 'Prosthodontics',
    price: 299.99,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=200&h=200&fit=crop',
    inStock: false,
  },
];

export const paymentMethods: PaymentMethod[] = [
  {
    id: '1',
    type: 'visa-card',
    name: 'Visa Card',
    last4: '4242',
    isDefault: true,
  },
  {
    id: '2',
    type: 'master-card',
    name: 'Master Card',
    last4: '8888',
    isDefault: false,
  },
  {
    id: '3',
    type: 'paypal',
    name: 'PayPal',
    isDefault: false,
  },
];

export const addresses: DeliveryAddress[] = [
  {
    id: '1',
    name: 'Clinic Address',
    address: '123 Medical Plaza, Suite 200, New York, NY 10001',
    phone: '+1 (555) 123-4567',
    isDefault: true,
  },
  {
    id: '2',
    name: 'Home Address',
    address: '456 Park Avenue, Apt 12B, New York, NY 10022',
    phone: '+1 (555) 987-6543',
    isDefault: false,
  },
];
