import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { fetchUnsplashImages } from "../api";

export default function CityDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [city, setCity] = useState(null);
  const [photos, setPhotos] = useState([]);
  const [modalPhoto, setModalPhoto] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cities") || "[]");
    const found = stored.find(c => String(c.id) === id);
    if (found) {
      setCity(found);
      fetchUnsplashImages(found.city, 8).then(setPhotos);
    }
  }, [id]);

  if (!city) {
    return <div className="p-6">Stadt nicht gefunden.</div>;
  }

  return (
    <div className="p-6 flex flex-col items-center gap-6">
      {/* Stadtname oben zentriert */}
      <h1 className="text-3xl font-bold mb-4 text-center">{city.city}</h1>

      {/* Fotos Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 w-full max-w-4xl">
        {photos.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`${city.city}-${idx}`}
            className="rounded shadow-sm object-cover w-full h-64 cursor-pointer"
            onClick={() => setModalPhoto(url)}
          />
        ))}
      </div>

      {/* Karte */}
      <div className="w-full max-w-4xl h-96 rounded overflow-hidden shadow-lg">
        <MapContainer
          center={[city.lat, city.lon]}
          zoom={10}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[city.lat, city.lon]}>
            <Popup>{city.city}</Popup>
          </Marker>
        </MapContainer>
      </div>

      {/* Button zur Startseite */}
      <button
        className="mb-4 px-3 py-1 bg-black text-white rounded text-sm hover:bg-gray-800"
        onClick={() => navigate("/")}
      >
        Zur Startseite
      </button>

      {/* Modal für Foto */}
      {modalPhoto && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black bg-opacity-90 overflow-auto pointer-events-auto">
          <div className="relative p-4">
            <button
              className="absolute top-4 right-4 text-red-500 text-xl font-bold z-[1001]"
              onClick={() => setModalPhoto(null)}
            >
              Schließen
            </button>
            <img
              src={modalPhoto}
              alt="Full"
              className="max-h-[90vh] max-w-[90vw] rounded shadow-lg mx-auto"
            />
          </div>
        </div>
      )}
    </div>
  );
}
