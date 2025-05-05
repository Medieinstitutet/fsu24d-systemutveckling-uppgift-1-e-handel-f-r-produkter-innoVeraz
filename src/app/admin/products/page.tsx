import ProductForm from "@/features/products/components/product-upload-form";


export default function Products() {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">Produktuppladdning</h1>
      <ProductForm />
    </div>
  );
}
