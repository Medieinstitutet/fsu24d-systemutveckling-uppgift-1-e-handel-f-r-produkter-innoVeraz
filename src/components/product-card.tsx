import Image from 'next/image';
import { Button } from '@/components/ui/button';

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
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105">
      <div className="relative h-60 w-full">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="h-full w-full bg-gray-200 flex items-center justify-center">
            <span className="text-gray-400">Ingen bild</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        {product.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {product.description}
          </p>
        )}
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">{product.price} kr</span>
          <div className="text-sm text-gray-500">
            {product.stock > 0 ? `${product.stock} i lager` : 'Slut i lager'}
          </div>
        </div>
        <Button 
          className="w-full mt-4 bg-green-600 hover:bg-green-700" 
          disabled={product.stock <= 0}
        >
          Lägg i varukorgen
        </Button>
      </div>
    </div>
  );
}