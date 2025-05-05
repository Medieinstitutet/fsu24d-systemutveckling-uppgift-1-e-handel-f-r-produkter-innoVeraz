"use client";

import { useCart } from '@/features/cart/context/cart-context';
import CartItem from '@/features/cart/components/cart-item';
import CartSummary from '@/features/cart/components/cart-summary';
import Link from 'next/link';

export default function CartPage() {
  const { items } = useCart();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Din kundvagn</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500 mb-6">Din kundvagn är tom</p>
          <Link 
            href="/" 
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Fortsätt handla
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              {items.map((item) => (
                <CartItem key={item.product._id} item={item} />
              ))}
            </div>
          </div>
          <div>
            <CartSummary />
          </div>
        </div>
      )}
    </div>
  );
}