export interface AppNotification {
  id: string;
  type: 'order' | 'promotion' | 'account' | 'product';
  description: string;
  message: string;
  time: string;
  isRead: boolean;
  iconType: 'cart' | 'crown' | 'bell' | 'star';
}

export const notifications: AppNotification[] = [
  {
    id: '1',
    type: 'order',
    description: 'Order Shipped',
    message: 'Your order #DMS-2847 has been shipped.',
    time: '2 hours ago',
    isRead: false,
    iconType: 'cart',
  },
  {
    id: '2',
    type: 'promotion',
    description: 'Premium Membership Deal',
    message: 'Save 30% on Premium Membership this week only!',
    time: '5 hours ago',
    isRead: false,
    iconType: 'crown',
  },
  {
    id: '3',
    type: 'product',
    description: 'Back in Stock',
    message: 'ProTech Digital X-Ray Sensor is now available.',
    time: '1 day ago',
    isRead: true,
    iconType: 'star',
  },
  {
    id: '4',
    type: 'order',
    description: 'Order Delivered',
    message: 'Your order #DMS-2834 has been successfully delivered.',
    time: '2 days ago',
    isRead: true,
    iconType: 'cart',
  },
  {
    id: '5',
    type: 'account',
    description: 'Password Changed',
    message: 'Your account password was successfully updated.',
    time: '3 days ago',
    isRead: true,
    iconType: 'bell',
  },
  {
    id: '6',
    type: 'promotion',
    description: 'Flash Sale Alert',
    message: 'Up to 40% off on dental equipment. Sale ends tonight!',
    time: '4 days ago',
    isRead: true,
    iconType: 'crown',
  },
];
