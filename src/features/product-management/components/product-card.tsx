'use client';

import Image from 'next/image';
import AddToCartButton from '@/features/cart/components/add-to-cart-button';
import { useState } from 'react';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    description?: string;
    price: number;
    stock: number;
    image_url?: string;
    category?: string;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowModal(false);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105 h-full flex flex-col cursor-pointer"
        onClick={openModal}
      >
        <div className="relative w-full h-48">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover md:object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
            />
          ) : (
            <div className="h-full w-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400">Ingen bild</span>
            </div>
          )}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-md font-semibold mb-2">{product.name}</h3>
          {product.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 hidden md:block md:max-h-16 overflow-hidden">
              {product.description}
            </p>
          )}
          <div className="flex items-center justify-between mt-auto">
            <span className="font-bold text-green-600">{product.price} kr</span>
            <div className="text-sm text-gray-500">
              {product.stock > 0 ? `${product.stock} i lager` : 'Slut i lager'}
            </div>
          </div>
          <div onClick={(e) => e.stopPropagation()} className="mt-4">
            <AddToCartButton 
              product={product}
              className="w-full bg-green-600 hover:bg-green-700" 
            />
          </div>
        </div>
      </div>

      {showModal && (
        <div 
          className="fixed inset-0 bg-[rgba(0,0,0,0.15)] backdrop-blur-xs z-50 flex items-center justify-center p-4" 
          onClick={closeModal}
        >
          <div className="bg-white rounded-lg overflow-hidden max-w-md w-full max-h-[80vh] shadow-xl flex flex-col" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-xl font-bold z-10 bg-white bg-opacity-70 rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeModal}
            >
              &times;
            </button>
            
            {product.image_url && (
              <div className="relative w-full h-64">
                <Image
                  src={product.image_url}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw"
                />
              </div>
            )}
            
            <div className="p-6 overflow-y-auto">
              <h2 className="text-xl font-bold mb-4">{product.name}</h2>
              
              {product.description && (
                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>
              )}
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-green-600 text-xl">{product.price} kr</span>
                <div className="text-gray-500">
                  {product.stock > 0 ? `${product.stock} i lager` : 'Slut i lager'}
                </div>
              </div>
              
              <div className="mt-4">
                <AddToCartButton 
                  product={product}
                  className="w-full bg-green-600 hover:bg-green-700" 
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}