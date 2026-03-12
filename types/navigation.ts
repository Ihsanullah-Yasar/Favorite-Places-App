import { Place } from "../models/Place";

export type RootStackParamList = {
  AllPlaces: {place: Place};
  AddPlace: {pickedLat?: number, pickedLng?: number};
  Map: undefined;
  PlaceDetails: {place: Place};
};