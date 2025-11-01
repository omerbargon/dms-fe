export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'completed' | 'cancelled';

export interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  image: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  promoCode?: string;
  deliveryAddress: string;
  estimatedDelivery?: string;
}

export const orders: Order[] = [
  {
    id: '1',
    orderNumber: 'ORD-2024-1234',
    date: 'Oct 8, 2025',
    status: 'shipped',
    items: [
      {
        id: '1',
        name: 'Premium Composite Kit',
        quantity: 2,
        price: 149.99,
        image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=200&h=200&fit=crop',
      },
      {
        id: '2',
        name: 'Dental Handpiece',
        quantity: 1,
        price: 899.99,
        image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=200&h=200&fit=crop',
      },
    ],
    subtotal: 1199.97,
    shipping: 15.0,
    discount: 60.0,
    total: 1154.97,
    promoCode: 'SAVE20',
    deliveryAddress: '123 Medical Plaza, Suite 200, New York, NY 10001',
    estimatedDelivery: 'Oct 12, 2025',
  },
  {
    id: '2',
    orderNumber: 'ORD-2024-1189',
    date: 'Oct 5, 2025',
    status: 'processing',
    items: [
      {
        id: '3',
        name: 'Orthodontic Starter Pack',
        quantity: 1,
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=200&h=200&fit=crop',
      },
    ],
    subtotal: 199.99,
    shipping: 10.0,
    discount: 0,
    total: 209.99,
    deliveryAddress: '123 Medical Plaza, Suite 200, New York, NY 10001',
    estimatedDelivery: 'Oct 15, 2025',
  },
  {
    id: '3',
    orderNumber: 'ORD-2024-0987',
    date: 'Sep 28, 2025',
    status: 'delivered',
    items: [
      {
        id: '4',
        name: 'Digital Impression Scanner',
        quantity: 1,
        price: 2299.99,
        image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=200&h=200&fit=crop',
      },
    ],
    subtotal: 2299.99,
    shipping: 0,
    discount: 345.0,
    total: 1954.99,
    promoCode: 'PREMIUM15',
    deliveryAddress: '123 Medical Plaza, Suite 200, New York, NY 10001',
  },
  {
    id: '4',
    orderNumber: 'ORD-2024-0856',
    date: 'Sep 15, 2025',
    status: 'completed',
    items: [
      {
        id: '5',
        name: 'Sterilization Pouches (500ct)',
        quantity: 3,
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=200&h=200&fit=crop',
      },
    ],
    subtotal: 137.97,
    shipping: 8.0,
    discount: 0,
    total: 145.97,
    deliveryAddress: '123 Medical Plaza, Suite 200, New York, NY 10001',
  },
  {
    id: '5',
    orderNumber: 'ORD-2024-0748',
    date: 'Sep 23, 2025',
    status: 'cancelled',
    items: [
      {
        id: '5',
        name: 'Sterilization Pouches (500ct)',
        quantity: 3,
        price: 45.99,
        image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=200&h=200&fit=crop',
      },
    ],
    subtotal: 137.97,
    shipping: 8.0,
    discount: 0,
    total: 145.97,
    deliveryAddress: '123 Medical Plaza, Suite 200, New York, NY 10001',
  },
];
