const GEOAPIFY_KEY = "55e909bc27dc450b8f322b4754b9216d";
const UNSPLASH_KEY = "9eLfD7TKFyeK2Oy4Q56voohvdDPOMAk7chn7AiixE8A";

export function fixEncoding(str) {
  if (!str) return "";
  try {
    return decodeURIComponent(
      str
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
  } catch {
    return str;
  }
}


export async function searchCities(query) {
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&type=city&format=json&limit=10&apiKey=${GEOAPIFY_KEY}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchUnsplashImages(cityName, count = 8) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&per_page=${count}`,
    {
      headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` },
    }
  );
  const data = await res.json();
  return data.results.map((img) => img.urls.regular);
}

export async function fetchIpInfo() {
  try {
    const res = await fetch(
      `https://api.geoapify.com/v1/ipinfo?&apiKey=${GEOAPIFY_KEY}`
    );
    if (!res.ok) throw new Error("Fehler beim Abrufen der IP-Infos");
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("IP-Info Fehler:", err);
    return null;
  }
}
