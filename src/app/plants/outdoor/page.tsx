import connectMongo from "@/lib/mongoose";
import ProductCard from "@/features/products/components/product-card";
import { productService } from "@/features/products/services/product-service";

export const revalidate = 3600;

export default async function OutdoorPlants() {
  await connectMongo();

  const outdoorPlantsData = await productService.getByCategory("Utomhusväxter");

  const outdoorPlants = outdoorPlantsData.map((plant) => ({
    _id: plant._id.toString(),
    name: plant.name,
    description: plant.description,
    price: plant.price,
    stock: plant.stock,
    category: plant.category,
    image_url: plant.image_url,
  }));

  return (
    <div className="container max-w-7xl mx-auto px-4 py-8">
      <div className="mb-10">
        <h1 className="text-3xl font-bold mb-4">Utomhusväxter</h1>
        <p className="max-w-2xl text-gray-600">
          Upptäck vårt sortiment av vackra utomhusväxter för din trädgård,
          balkong eller uteplats. <br /> Här finns allt från tåliga perenner
          till färgglada sommarblommor.
        </p>
      </div>
      {outdoorPlants.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-500">
            Inga utomhusväxter hittades. Kom tillbaka snart, vi lägger till nya
            produkter regelbundet!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {outdoorPlants.map((plant) => (
              <ProductCard key={plant._id} product={plant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
