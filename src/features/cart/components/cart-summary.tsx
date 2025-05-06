"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useCart } from '../context/cart-context';
import { cartApi } from '../api/cartApi';

export default function CartSummary() {
  const { getTotal, items, itemCount, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    address: '',
    phone: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleStartCheckout = () => {
    setIsCheckingOut(true);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customerInfo.name || !customerInfo.email) {
      setError('Namn och e-post är obligatoriska fält');
      return;
    }
    
    setIsSubmitting(true);
    setError('');
    
    try {
   
      const result = await cartApi.checkout(items, customerInfo);
      
 
      setSuccess(`Order skapad! Tack för din beställning.`);
      clearCart(); 
      setIsCheckingOut(false);
    } catch (err) {
      setError('Något gick fel vid betalningen. Försök igen.');
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  if (success) {
    return (
      <div className="bg-green-50 p-6 rounded-lg shadow-sm border border-green-200">
        <h3 className="text-lg font-medium text-green-800 mb-4">Tack för din beställning!</h3>
        <p className="text-green-700 mb-4">{success}</p>
        <p className="text-sm text-green-600">
          En bekräftelse har skickats till din e-post.
        </p>
      </div>
    );
  }
  
  return (
    <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
      {error && (
        <div className="bg-red-50 text-red-500 p-3 mb-4 rounded-md text-sm">
          {error}
        </div>
      )}
      
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
        <div className="flex justify-between font-medium pt-2 border-t border-gray-200">
          <span>Totalt</span>
          <span>{getTotal()} kr</span>
        </div>
      </div>
      
      {!isCheckingOut ? (
        <>
          <Button 
            onClick={handleStartCheckout}
            className="w-full bg-green-600 hover:bg-green-700" 
            disabled={itemCount === 0}
          >
            Gå till kassan
          </Button>
          
          {itemCount > 0 && (
            <button 
              onClick={clearCart}
              className="w-full text-sm text-gray-500 hover:text-gray-700 mt-3"
            >
              Töm kundvagn
            </button>
          )}
        </>
      ) : (
        <form onSubmit={handleCheckout} className="space-y-4 mt-6 pt-4 border-t border-gray-200">
          <h4 className="font-medium">Kunduppgifter</h4>
          
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Namn *
            </label>
            <Input
              id="name"
              name="name"
              type="text"
              required
              value={customerInfo.name}
              onChange={handleInputChange}
              placeholder="Förnamn Efternamn"
            />
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              E-post *
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={customerInfo.email}
              onChange={handleInputChange}
              placeholder="exempel@mail.se"
            />
          </div>
          
          <div>
            <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
              Adress
            </label>
            <Input
              id="address"
              name="address"
              type="text"
              value={customerInfo.address}
              onChange={handleInputChange}
              placeholder="Gatuadress, postnummer, ort"
            />
          </div>
          
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
              Telefon
            </label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={handleInputChange}
              placeholder="0701234567"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-green-600 hover:bg-green-700 mt-4"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Bearbetar...' : 'Slutför köp'}
          </Button>
          
          <Button 
            type="button"
            variant="outline"
            className="w-full mt-2" 
            onClick={() => setIsCheckingOut(false)}
          >
            Tillbaka
          </Button>
        </form>
      )}
    </div>
  );
}