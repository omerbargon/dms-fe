export interface Brand {
  id: string;
  name: string;
  logo: string;
  productsCount: number;
}

export const brands: Brand[] = [
  {
    id: '1',
    name: '3M ESPE',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    productsCount: 240,
  },
  {
    id: '2',
    name: 'Dentsply Sirona',
    logo: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=200&h=200&fit=crop',
    productsCount: 180,
  },
  {
    id: '3',
    name: 'Ivoclar Vivadent',
    logo: 'https://images.unsplash.com/photo-1634128221889-82ed6efebfc3?w=200&h=200&fit=crop',
    productsCount: 150,
  },
  {
    id: '4',
    name: 'Colgate',
    logo: 'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?w=200&h=200&fit=crop',
    productsCount: 320,
  },
  {
    id: '5',
    name: 'GC Corporation',
    logo: '',
    productsCount: 95,
  },
  {
    id: '6',
    name: 'Kerr Dental',
    logo: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=200&h=200&fit=crop',
    productsCount: 110,
  },
];
