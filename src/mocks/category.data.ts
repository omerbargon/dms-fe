export interface Category {
  id: string;
  name: string;
  icon: string;
  productsCount: number;
  brandId?: string;
}

export const categories: Category[] = [
  {
    id: '1',
    name: 'Restorative',
    icon: 'https://img.icons8.com/fluency/96/tooth.png',
    productsCount: 2400,
  },
  {
    id: '2',
    name: 'Endodontics',
    icon: 'https://img.icons8.com/fluency/96/stethoscope.png',
    productsCount: 1800,
  },
  {
    id: '3',
    name: 'Prosthodontics',
    icon: '',
    productsCount: 3100,
  },
  {
    id: '4',
    name: 'Orthodontics',
    icon: '',
    productsCount: 1500,
  },
  {
    id: '5',
    name: 'Surgery',
    icon: '',
    productsCount: 890,
  },
  {
    id: '6',
    name: 'Preventive',
    icon: 'https://img.icons8.com/fluency/96/shield.png',
    productsCount: 1200,
  },
];
