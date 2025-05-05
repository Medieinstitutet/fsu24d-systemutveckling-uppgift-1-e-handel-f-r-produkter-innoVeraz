"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useCart } from '../context/cart-context';
import { Product } from '../types';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
}

export default function AddToCartButton({ product, className = '' }: AddToCartButtonProps) {
  const { addToCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart(product, 1);
    
    // Visuell feedback
    setTimeout(() => {
      setIsAdding(false);
    }, 500);
  };
  
  return (
    <Button 
      onClick={handleAddToCart}
      disabled={product.stock <= 0 || isAdding}
      className={`w-full mt-4 bg-green-600 hover:bg-green-700 ${className} ${isAdding ? 'opacity-75' : ''}`}
    >
      {isAdding ? 'Tillagd!' : 'Lägg i varukorgen'}
    </Button>
  );
}