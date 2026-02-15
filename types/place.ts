/**
 * Geographic location coordinates
 */
export interface ILocation {
  /** Latitude in degrees (-90 to 90) */
  lat: number;
  /** Longitude in degrees (-180 to 180) */
  lng: number;
  /** Optional altitude in meters */
  alt?: number;
}

/**
 * Raw place data interface (for API responses, etc.)
 */
export interface IPlaceData {
  id: string;
  title: string;
  imageUrl: string;
  address: string;
  location: ILocation;
}

/**
 * Place creation DTO (Data Transfer Object)
 */
export interface ICreatePlaceDTO {
  title: string;
  imageUrl: string;
  address: string;
  location: ILocation;
}

export interface PlaceItem {
id: string;
title: string;
imageUrl: string;
address: string;
location: {
    lat: number;
    lng: number;
    alt?: number;
};
}