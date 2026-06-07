import {Product} from '../types/product';

export const categories = [
  {id: 'all', label: 'All', icon: 'All', color: '#D9F4E5'},
  {id: 'fruit', label: 'Fruits & Veg', icon: 'Fr', color: '#F9DFC8'},
  {id: 'dairy', label: 'Dairy', icon: 'Da', color: '#DDEEFE'},
  {id: 'bakery', label: 'Bakery', icon: 'Bk', color: '#FFE5C9'},
  {id: 'drinks', label: 'Beverages', icon: 'Be', color: '#FFE0DF'},
];

export const products: Product[] = [
  {
    id: 'bananas',
    name: 'Organic Bananas',
    unit: 'kg',
    price: '$3.99',
    category: 'fruit',
    image:
      'https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=500&q=80',
    favorite: true,
    description:
      'Sweet organic bananas picked fresh for smoothies, breakfast bowls, and quick snacks.',
    quality: 'Organic, naturally ripened, hand-selected bunches',
    origin: 'Local certified organic farms',
    storage: 'Keep at room temperature and away from direct sunlight.',
    delivery: 'Packed fresh and delivered within 24 hours.',
    nutrition: ['Potassium', 'Fiber', 'Vitamin B6'],
  },
  {
    id: 'milk',
    name: 'Fresh Whole Milk',
    unit: 'bottle',
    price: '$4.49',
    category: 'dairy',
    image:
      'https://images.unsplash.com/photo-1563636619-e9143da7973b?auto=format&fit=crop&w=500&q=80',
    favorite: true,
    description: 'Creamy whole milk delivered cold from trusted local dairies.',
    quality: 'Pasteurized, full cream, cold-chain maintained',
    origin: 'Trusted local dairies',
    storage: 'Keep refrigerated below 4 C and use within 3 days of opening.',
    delivery: 'Delivered chilled in insulated packaging.',
    nutrition: ['Calcium', 'Protein', 'Vitamin D'],
  },
  {
    id: 'bread',
    name: 'Artisan Bread',
    unit: 'loaf',
    price: '$3.99',
    category: 'bakery',
    image:
      'https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=500&q=80',
    favorite: true,
    description: 'Crusty bakery bread with a soft center and slow-fermented flavor.',
    quality: 'Fresh baked, slow-fermented, no artificial flavor',
    origin: 'Neighborhood artisan bakery',
    storage: 'Store in a cool dry place and toast before serving if needed.',
    delivery: 'Baked early morning and packed the same day.',
    nutrition: ['Carbs', 'Fiber', 'Iron'],
  },
  {
    id: 'eggs',
    name: 'Free Range Eggs',
    unit: 'dozen',
    price: '$4.49',
    category: 'dairy',
    image:
      'https://images.unsplash.com/photo-1518569656558-1f25e69d93d7?auto=format&fit=crop&w=500&q=80',
    favorite: false,
    description: 'Protein-rich free range eggs for breakfast and baking.',
    quality: 'Free range, grade A, carefully checked shells',
    origin: 'Cage-free poultry farms',
    storage: 'Keep refrigerated and use before the best-before date.',
    delivery: 'Delivered in protective cartons to avoid breakage.',
    nutrition: ['Protein', 'Vitamin B12', 'Healthy fats'],
  },
  {
    id: 'apples',
    name: 'Gala Apples',
    unit: 'kg',
    price: '$4.49',
    category: 'fruit',
    image:
      'https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=500&q=80',
    favorite: true,
    description: 'Crisp gala apples with a bright, naturally sweet finish.',
    quality: 'Crisp, wax-free, hand-picked seasonal apples',
    origin: 'Highland fruit orchards',
    storage: 'Refrigerate for longer freshness or keep in a fruit bowl for daily use.',
    delivery: 'Sorted by size and packed with soft separators.',
    nutrition: ['Fiber', 'Vitamin C', 'Antioxidants'],
  },
];
