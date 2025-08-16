const GEOAPIFY_KEY = "55e909bc27dc450b8f322b4754b9216d";
const UNSPLASH_KEY = "9eLfD7TKFyeK2Oy4Q56voohvdDPOMAk7chn7AiixE8A";

export async function searchCities(query) {
  const res = await fetch(
    `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(query)}&type=city&format=json&limit=10&apiKey=${GEOAPIFY_KEY}`
  );
  const data = await res.json();
  return data.results || [];
}

export async function fetchUnsplashImages(cityName, count = 8) {
  const res = await fetch(`https://api.unsplash.com/search/photos?query=${encodeURIComponent(cityName)}&per_page=${count}`, {
    headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` }
  });
  const data = await res.json();
  return data.results.map(img => img.urls.regular);
}