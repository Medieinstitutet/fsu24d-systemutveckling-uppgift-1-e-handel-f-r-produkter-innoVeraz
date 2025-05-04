export default function IndoorPlants() {
  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold text-center my-4">Inomhusväxter</h1>
      <p className="text-center mb-8">
        Välkommen till vår samling av inomhusväxter! Här hittar du allt från
        lättskötta till mer utmanande växter som kan förvandla ditt hem till en
        grön oas.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Här kan du lägga till komponenter för att visa växter */}
      </div>
    </div>
  );
}