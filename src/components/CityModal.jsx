import { useNavigate } from "react-router-dom";

export default function CityModal({ city, onClose }) {
  const navigate = useNavigate();

  const addToList = () => {
    const stored = JSON.parse(localStorage.getItem("cities") || "[]");
    const newId = Date.now();
    const newCity = { ...city, id: newId };
    localStorage.setItem("cities", JSON.stringify([...stored, newCity]));
    onClose();
    navigate(`/city/${newId}`);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 relative shadow-lg">
        
        <h2 className="text-2xl font-bold mb-2 text-center">{city.city || "–"}</h2>
        <p className="mb-2">Land: {city.country || "–"}</p>
        <p className="mb-2">Bundesstaat: {city.state || city.region || "–"}</p>
        <p className="mb-2">County: {city.county || "–"}</p>
        <p className="mb-2">Postleitzahl: {city.postcode || "–"}</p>
        <p className="mb-2">Längengrad: {city.lon || "–"}</p>
        <p className="mb-2">Breitengrad: {city.lat || "–"}</p>
        <p className="mb-4">Ländercode: {city.country_code || "–"}</p>

        {city.lat && city.lon && (
          <iframe
            className="w-full h-64 rounded mb-4"
            src={`https://www.google.com/maps?q=${city.lat},${city.lon}&hl=de&z=10&output=embed`}
            title="Karte"
          ></iframe>
        )}

        <div className="flex justify-between mt-4">
          <button
            onClick={onClose}
            className="px-3 py-1.5 bg-gray-200 text-sm rounded-lg hover:bg-gray-300 transition"
          >
            Zurück
          </button>
          <button
            onClick={addToList}
            className="px-3 py-1.5 bg-gray-800 text-white text-sm rounded-lg hover:bg-gray-900 transition"
          >
            Zur Liste hinzufügen
          </button>
        </div>
      </div>
    </div>
  );
}
