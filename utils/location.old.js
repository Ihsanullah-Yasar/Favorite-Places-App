const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;

export function getMapImagePreviewUrl(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

//`https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=13&size=400x200&maptype=roadmap
//&markers=color:red%7Clabel:S%7C${lat},${lng}&key=AIzaSyDjw0wxpQ1_CWKm01-nfYMKs1I-Gtvtgy0&signature=YOUR_SIGNATURE`;
