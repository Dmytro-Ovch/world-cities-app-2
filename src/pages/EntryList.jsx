import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EntryList() {
  const [entries, setEntries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cities") || "[]");
    setEntries(stored);
  }, []);

  useEffect(() => {
    const handleStorageChange = () => {
      const stored = JSON.parse(localStorage.getItem("cities") || "[]");
      setEntries(stored);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  if (entries.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-8">
        Noch keine Städte gespeichert.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-6 md:px-12">
      {entries.map((city) => (
        <div
          key={city.id}
          className="bg-white rounded-2xl shadow-lg p-4 cursor-pointer hover:shadow-2xl transition"
          onClick={() => navigate(`/city/${city.id}`)}
        >
          <h2 className="text-xl font-bold mb-2">{city.city}</h2>
          <p className="text-sm text-gray-600">Land: {city.country}</p>
          <p className="text-sm text-gray-600">
            {city.state || city.region || "–"}
          </p>
          <p className="text-sm text-gray-600">PLZ: {city.postcode || "–"}</p>
           <p className="text-sm text-gray-600">Längengrad: {city.lon || "–"}</p>
          <p className="text-sm text-gray-600">Breitengrad: {city.lat || "–"}</p>
          <p className="text-sm text-gray-600">Ländercode: {city.country_code || "–"}</p>
        </div>
      ))}
    </div>
  );
}
