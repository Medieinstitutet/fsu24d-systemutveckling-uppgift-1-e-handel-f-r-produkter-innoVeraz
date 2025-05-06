"use client";
import { useState } from "react";
import ProductForm from "@/features/product-management/components/product-upload-form";
import ProductList from "../../../features/product-management/components/product-list";
import ProductEditForm from "../../../features/product-management/components/product-edit-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  stock: number;
  category?: string;
  image_url?: string;
}

export default function Products() {
  const [activeTab, setActiveTab] = useState("list");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setActiveTab("edit");
  };

  const handleEditComplete = () => {
    setSelectedProduct(null);
    setActiveTab("list");
  };

  return (
    <div className="p-8 w-full overflow-scroll">
      <h1 className="text-3xl font-bold mb-6">Produkthantering</h1>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
        <TabsList className="mb-4">
          <TabsTrigger value="list">Produktlista</TabsTrigger>
          <TabsTrigger value="upload">Lägg till ny produkt</TabsTrigger>
          {selectedProduct && (
            <TabsTrigger value="edit">Redigera produkt</TabsTrigger>
          )}
        </TabsList>
        
        <TabsContent value="list" className="pt-4">
          <h2 className="text-2xl font-semibold mb-4">Produktlista</h2>
          <ProductList onEditProduct={handleEditProduct} />
        </TabsContent>
        
        <TabsContent value="upload" className="pt-4">
          <h2 className="text-2xl font-semibold mb-4">Lägg till ny produkt</h2>
          <ProductForm 
            onProductSaved={() => setActiveTab("list")}
          />
        </TabsContent>
        
        {selectedProduct && (
          <TabsContent value="edit" className="pt-4">
            <h2 className="text-2xl font-semibold mb-4">
              Redigera produkt: {selectedProduct.name}
            </h2>
            <ProductEditForm 
              product={selectedProduct} 
              onSaved={handleEditComplete}
              onCancel={() => setActiveTab("list")}
            />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
