import React, { useState } from 'react';
import { Filter, ShoppingCart, Star, Truck, Shield, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Product {
  id: string;
  name: string;
  activeIngredient: string;
  rating: number;
  price: number;
  seller: string;
  deliveryETA: string;
  image: string;
  badges: string[];
  inStock: boolean;
}

const Store = () => {
  const [cartItems, setCartItems] = useState<{ [key: string]: number }>({});
  const [selectedFilters, setSelectedFilters] = useState({
    crop: '',
    problem: '',
    type: '',
    price: ''
  });

  const products: Product[] = [
    {
      id: '1',
      name: 'Imidacloprid 17.8% SL',
      activeIngredient: 'Imidacloprid',
      rating: 4.6,
      price: 320,
      seller: 'AgriCorp Solutions',
      deliveryETA: '2-3 days',
      image: '/api/placeholder/150/150',
      badges: ['Certified', 'Govt. recommended'],
      inStock: true
    },
    {
      id: '2',
      name: 'Neem Oil 3000 ppm',
      activeIngredient: 'Azadirachtin',
      rating: 4.4,
      price: 280,
      seller: 'Bio Agri Tech',
      deliveryETA: '1-2 days',
      image: '/api/placeholder/150/150',
      badges: ['Organic', 'Bee Safe'],
      inStock: true
    },
    {
      id: '3',
      name: 'NPK Complex 19:19:19',
      activeIngredient: 'Balanced NPK',
      rating: 4.7,
      price: 1250,
      seller: 'Fertilizer Direct',
      deliveryETA: '3-4 days',
      image: '/api/placeholder/150/150',
      badges: ['In stock', 'Fast delivery'],
      inStock: true
    },
    {
      id: '4',
      name: 'Propiconazole 25% EC',
      activeIngredient: 'Propiconazole',
      rating: 4.3,
      price: 450,
      seller: 'Crop Protection Co.',
      deliveryETA: '2-3 days',
      image: '/api/placeholder/150/150',
      badges: ['Certified'],
      inStock: false
    }
  ];

  const filters = {
    crops: ['Rice', 'Wheat', 'Cotton', 'Maize', 'Pulses'],
    problems: ['Pest Control', 'Fungal Disease', 'Nutrient Deficiency', 'Weed Control'],
    types: ['Organic', 'Chemical', 'Bio-fertilizer', 'Growth Promoter'],
    priceRanges: ['Under ₹500', '₹500-₹1000', '₹1000-₹2000', 'Above ₹2000']
  };

  const addToCart = (productId: string) => {
    setCartItems(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [productId, count]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * count : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Agricultural Store</h1>
            <p className="text-muted-foreground text-sm mt-1">
              Quality inputs for better harvests
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Filters Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-card rounded-2xl p-4 shadow-card space-y-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-5 h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Filters</h3>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Crop Type</label>
                <select 
                  className="w-full mt-1 p-2 border border-border rounded-lg text-sm bg-background"
                  value={selectedFilters.crop}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, crop: e.target.value }))}
                >
                  <option value="">All Crops</option>
                  {filters.crops.map(crop => (
                    <option key={crop} value={crop}>{crop}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Problem Type</label>
                <select 
                  className="w-full mt-1 p-2 border border-border rounded-lg text-sm bg-background"
                  value={selectedFilters.problem}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, problem: e.target.value }))}
                >
                  <option value="">All Problems</option>
                  {filters.problems.map(problem => (
                    <option key={problem} value={problem}>{problem}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Product Type</label>
                <select 
                  className="w-full mt-1 p-2 border border-border rounded-lg text-sm bg-background"
                  value={selectedFilters.type}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, type: e.target.value }))}
                >
                  <option value="">All Types</option>
                  {filters.types.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground">Price Range</label>
                <select 
                  className="w-full mt-1 p-2 border border-border rounded-lg text-sm bg-background"
                  value={selectedFilters.price}
                  onChange={(e) => setSelectedFilters(prev => ({ ...prev, price: e.target.value }))}
                >
                  <option value="">All Prices</option>
                  {filters.priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
              </div>

              <Button 
                variant="outline" 
                className="w-full text-sm"
                onClick={() => setSelectedFilters({ crop: '', problem: '', type: '', price: '' })}
              >
                Clear Filters
              </Button>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-card rounded-2xl p-4 shadow-card">
                  {/* Product Image */}
                  <div className="aspect-square bg-muted/50 rounded-xl mb-3 flex items-center justify-center">
                    <div className="text-4xl">🧪</div>
                  </div>

                  {/* Product Info */}
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {product.badges.map((badge) => (
                        <Badge 
                          key={badge} 
                          variant="secondary" 
                          className="text-xs"
                        >
                          {badge}
                        </Badge>
                      ))}
                    </div>

                    <h3 className="font-semibold text-foreground text-sm">{product.name}</h3>
                    <p className="text-xs text-muted-foreground">{product.activeIngredient}</p>

                    <div className="flex items-center space-x-2">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-warning text-warning" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{product.seller}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <div className="text-lg font-bold text-foreground">₹{product.price}</div>
                        <div className="flex items-center space-x-1 text-xs text-muted-foreground">
                          <Truck className="w-3 h-3" />
                          <span>{product.deliveryETA}</span>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                        className="flex-shrink-0"
                      >
                        {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sticky Cart */}
        {getTotalItems() > 0 && (
          <div className="fixed bottom-20 left-4 right-4 md:bottom-6 z-40">
            <div className="bg-primary text-primary-foreground rounded-2xl p-4 shadow-floating max-w-md mx-auto">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <ShoppingCart className="w-5 h-5" />
                  <div>
                    <div className="font-semibold text-sm">
                      {getTotalItems()} item{getTotalItems() > 1 ? 's' : ''}
                    </div>
                    <div className="text-xs text-primary-foreground/80">
                      Total: ₹{getTotalPrice()}
                    </div>
                  </div>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Store;