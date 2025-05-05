"use client";

import { Button } from '@/components/ui/button';
import { useCart } from '../context/cart-context';

export default function CartSummary() {
  const { getTotal, itemCount, clearCart } = useCart();
  
  const handleCheckout = () => {
    // Här skulle du implementera checkout-logiken
    alert('Checkout-flödet skulle starta här!');
    // clearCart(); // Anropa detta efter lyckad checkout
  };
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      <h3 className="text-lg font-medium mb-4">Sammanfattning</h3>
      
      <div className="space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-600">Antal artiklar</span>
          <span>{itemCount}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Delsumma</span>
          <span>{getTotal()} kr</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Frakt</span>
          <span>0 kr</span>
        </div>
      </div>
      
      <div className="border-t pt-4 mb-6">
        <div className="flex justify-between font-medium">
          <span>Totalt</span>
          <span>{getTotal()} kr</span>
        </div>
      </div>
      
      <Button 
        onClick={handleCheckout}
        className="w-full bg-green-600 hover:bg-green-700 text-white" 
        disabled={itemCount === 0}
      >
        Till kassan
      </Button>
      
      {itemCount > 0 && (
        <button 
          onClick={clearCart}
          className="w-full text-sm text-gray-500 hover:text-gray-700 mt-3"
        >
          Töm kundvagn
        </button>
      )}
    </div>
  );
}