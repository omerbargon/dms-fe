export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  image: string;
  inStock: boolean;
  isFavorite: boolean;
  brandId: string;
  categoryId: string;
}

export const products: Product[] = [
  {
    id: '1',
    name: 'Filtek Supreme Ultra Universal Composite',
    brand: '3M ESPE',
    category: 'Restorative',
    price: 149.99,
    originalPrice: 199.99,
    discount: 25,
    rating: 4.9,
    reviews: 328,
    image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: true,
    brandId: '1',
    categoryId: '1',
  },
  {
    id: '2',
    name: 'ProTaper Universal Rotary Files',
    brand: 'Dentsply Sirona',
    category: 'Endodontics',
    price: 89.99,
    rating: 4.8,
    reviews: 215,
    image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: false,
    brandId: '2',
    categoryId: '2',
  },
  {
    id: '3',
    name: 'IPS e.max CAD Blocks',
    brand: 'Ivoclar Vivadent',
    category: 'Prosthodontics',
    price: 299.99,
    originalPrice: 349.99,
    discount: 14,
    rating: 4.9,
    reviews: 167,
    image: 'https://images.unsplash.com/photo-1581591524425-c7e0978865fc?w=400&h=400&fit=crop',
    inStock: false,
    isFavorite: true,
    brandId: '3',
    categoryId: '3',
  },
  {
    id: '4',
    name: 'Clarity Advanced Ceramic Brackets',
    brand: '3M ESPE',
    category: 'Orthodontics',
    price: 199.99,
    rating: 4.7,
    reviews: 142,
    image: '',
    inStock: true,
    isFavorite: false,
    brandId: '1',
    categoryId: '4',
  },
  {
    id: '5',
    name: 'G-ænial Universal Injectable Composite',
    brand: 'GC Corporation',
    category: 'Restorative',
    price: 119.99,
    originalPrice: 139.99,
    discount: 14,
    rating: 4.8,
    reviews: 203,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: true,
    brandId: '5',
    categoryId: '1',
  },
  {
    id: '6',
    name: 'OptiBond FL Total-Etch Adhesive',
    brand: 'Kerr Dental',
    category: 'Restorative',
    price: 79.99,
    rating: 4.6,
    reviews: 189,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
    inStock: true,
    isFavorite: false,
    brandId: '6',
    categoryId: '1',
  },
];

export interface ProductVariant {
  id: string;
  color: string;
  colorName: string;
  image: string;
  inStock: boolean;
}

export interface ProductDetails {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  rating: number;
  reviews: number;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  inStock: boolean;
  isFavorite: boolean;
  variants: ProductVariant[];
}

export const productInfo: ProductDetails = {
  id: '1',
  name: 'Filtek Supreme Ultra Universal Composite',
  brand: '3M ESPE',
  category: 'Restorative',
  price: 149.99,
  originalPrice: 199.99,
  discount: 25,
  rating: 4.9,
  reviews: 328,
  description: 'Filtek Supreme Ultra Universal Restorative is a nanofilled resin composite that provides excellent esthetics and polish retention. It offers superior strength and handling characteristics for both anterior and posterior restorations.',
  features: [
    'Excellent esthetics with natural fluorescence',
    'Superior polish retention for long-lasting shine',
    'Low polymerization shrinkage for better marginal integrity',
    'Wide shade range for precise color matching',
    'Easy to sculpt and shape',
    'Contains no Bis-GMA for reduced sensitivity',
  ],
  specifications: [
    { label: 'Type', value: 'Universal Composite' },
    { label: 'Shade System', value: 'VITA' },
    { label: 'Filler Content', value: '78.5% by weight' },
    { label: 'Particle Size', value: '20 nanometers' },
    { label: 'Curing Time', value: '20 seconds at 1000 mW/cm²' },
    { label: 'Package', value: '4g Syringe' },
  ],
  inStock: true,
  isFavorite: false,
  variants: [
    {
      id: 'v1',
      color: '#E8DCC8',
      colorName: 'A2',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      id: 'v2',
      color: '#F5EDE0',
      colorName: 'A1',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      id: 'v3',
      color: '#DFC9A8',
      colorName: 'A3',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f99?w=400&h=400&fit=crop',
      inStock: false,
    },
    {
      id: 'v4',
      color: '#C8B89A',
      colorName: 'B2',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=400&h=400&fit=crop',
      inStock: true,
    },
    {
      id: 'v5',
      color: '#f05757af',
      colorName: 'B3',
      image: '',
      inStock: false,
    },
    {
      id: 'v6',
      color: '#5ff057ae',
      colorName: 'C2',
      image: '',
      inStock: true,
    },
    {
      id: 'v7',
      color: '#7357f0a8',
      colorName: 'B3',
      image: '',
      inStock: true,
    },
  ],
};
