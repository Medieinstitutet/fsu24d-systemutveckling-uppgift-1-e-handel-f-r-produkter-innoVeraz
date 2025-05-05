"use client";

import Image from 'next/image';

import { useCart } from '../context/cart-context';
import { CartItem as CartItemType } from '../types';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();
  const { product, quantity } = item;

  return (
    <div className="flex items-center border-b py-4">
      <div className="relative h-24 w-24 flex-shrink-0">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100px, 120px"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400 text-xs">Ingen bild</span>
          </div>
        )}
      </div>
      <div className="ml-4 flex-grow">
        <h3 className="text-sm font-medium">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.price} kr</p>
        <div className="mt-2 flex items-center">
          <button
            onClick={() => updateQuantity(product._id, quantity - 1)}
            className="rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
          >
            -
          </button>
          <span className="mx-2 w-8 text-center">{quantity}</span>
          <button
            onClick={() => updateQuantity(product._id, quantity + 1)}
            className="rounded-md bg-gray-100 p-1 text-gray-600 hover:bg-gray-200"
            disabled={quantity >= product.stock}
          >
            +
          </button>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <p className="font-medium">{product.price * quantity} kr</p>
        <button
          onClick={() => removeFromCart(product._id)}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          Ta bort
        </button>
      </div>
    </div>
  );
}