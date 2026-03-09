// const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY;


export function getMapImagePreviewUrl(lat: number, lng: number): string {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap
&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
console.log("image preview url",imagePreviewUrl);
  return imagePreviewUrl;
}

export async function getAddress(lat: number,lng: number){
  const url=  `https://maps.googleapis.com/maps/api/geocode/json?lat=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response= await fetch(url);

  if(!response.ok){
    throw new Error('Failed to fetch address!')
  }

  const data = await response.json();
  const address=data.results[0].formated_address;
  return address;
}
  