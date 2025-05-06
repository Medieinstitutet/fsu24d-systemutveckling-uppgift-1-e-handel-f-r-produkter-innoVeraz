import connectMongo from "@/lib/mongoose";
import ProductCard from "@/features/product-management/components/product-card";
import { productService } from "@/features/product-management/services/product-service";

export const revalidate = 3600;

export default async function IndoorPlants() {
  await connectMongo();

  const indoorPlantsData = await productService.getByCategory("Inomhusväxter");

  const indoorPlants = indoorPlantsData.map((plant) => ({
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
        <h1 className="text-3xl font-bold mb-4">
          Inomhusväxter
        </h1>
        <p className="max-w-2xl text-gray-600">
          Välkommen till vår samling av inomhusväxter! Här hittar du allt från
          lättskötta till mer utmanande växter som kan förvandla ditt hem till
          en grön oas.
        </p>
      </div>
      {indoorPlants.length === 0 ? (
        <div className=" py-10">
          <p className="text-lg text-gray-500">
            Inga inomhusväxter hittades. Kom tillbaka snart, vi lägger till nya
            produkter regelbundet!
          </p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {indoorPlants.map((plant) => (
              <ProductCard key={plant._id} product={plant} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
