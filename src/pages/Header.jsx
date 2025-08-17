import { useState } from "react";
import { searchCities } from "../api";
import CityModal from "../components/CityModal";

const Header = () => {
  const [query, setQuery] = useState("");
  const [cities, setCities] = useState([]);
  const [modalCity, setModalCity] = useState(null);

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);
    if (q.length > 0) {
      const results = await searchCities(q);
      setCities(Array.isArray(results) ? results : []);
    } else {
      setCities([]);
    }
  };

  const renderValue = (value) => {
    if (value === null || value === undefined) return "–";
    if (typeof value === "object") return JSON.stringify(value);
    return value;
  };

  return (
    <>
      <header
        className={`relative flex flex-col justify-start items-center text-black rounded-2xl shadow-lg mb-12 bg-white transition-all duration-500 mx-6 md:mx-12`}
        style={{
          height: cities.length > 0 ? "auto" : "9rem",
          minHeight: "9rem",
          paddingBottom: "1.5rem",
        }}
      >
        <div className="relative z-10 flex flex-col items-center w-full">
          <h1
            className="text-3xl md:text-4xl tracking-wide mt-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Weltstädte-App
          </h1>

          <input
            type="text"
            value={query}
            onChange={handleSearch}
            placeholder="Stadtname eingeben..."
            className="mt-3 w-64 p-2 border rounded text-black"
          />
        </div>

        {cities.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 w-full px-4 md:px-6">
            {cities.map((city, idx) => (
              <div
                key={idx}
                className="bg-white p-4 rounded shadow cursor-pointer hover:shadow-lg"
                onClick={() => setModalCity(city)}
              >
                <h2 className="font-bold">{renderValue(city.city)}</h2>
                <p>Land: {renderValue(city.country)}</p>
                <p>Bundesstaat: {renderValue(city.state || city.region)}</p>
                <p>County: {renderValue(city.county)}</p>
                <p>Postleitzahl: {renderValue(city.postcode)}</p>
                <p>Ländercode: {renderValue(city.country_code)}</p>
                <p>Längengrad: {renderValue(city.lon)}</p>
                <p>Breitengrad: {renderValue(city.lat)}</p>
              </div>
            ))}
          </div>
        )}
      </header>

      {modalCity && (
        <CityModal city={modalCity} onClose={() => setModalCity(null)} />
      )}
    </>
  );
};

export default Header;
