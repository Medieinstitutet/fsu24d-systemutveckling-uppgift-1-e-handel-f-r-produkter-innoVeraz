"use client";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image_url?: string;
}

export default function ProductList({
  onEditProduct,
}: {
  onEditProduct: (product: Product) => void;
}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/products");
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products");
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Är du säker på att du vill ta bort denna produkt?")) {
      return;
    }
    
    try {
      const response = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });
      
      if (response.ok) {
        alert("Produkt borttagen!");
        fetchProducts();
      } else {
        alert("Något gick fel vid borttagning");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && 
        product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (product.category && 
        product.category.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <Input
          placeholder="Sök produkt..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm mr-4"
        />
        <Button onClick={fetchProducts}>Uppdatera lista</Button>
      </div>

      {loading ? (
        <div>Laddar produkter...</div>
      ) : filteredProducts.length === 0 ? (
        <div>Inga produkter hittades</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Namn
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Pris
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Lagersaldo
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Åtgärder
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.category || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.price} kr
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {product.stock}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <Button 
                      variant="outline" 
                      onClick={() => onEditProduct(product)}
                    >
                      Redigera
                    </Button>
                    <Button 
                      variant="destructive" 
                      onClick={() => handleDelete(product._id)}
                    >
                      Ta bort
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}