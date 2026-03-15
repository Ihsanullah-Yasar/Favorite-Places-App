import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import React, { JSX } from "react";
import { RootStackParamList } from "../types/navigation";
import { ILocation } from "../types/place";
import { Place } from "../models/Place";

type AddPlaceProps = NativeStackScreenProps<RootStackParamList, "AddPlace">;

function AddPlace({ navigation }: AddPlaceProps) {
  function createPlaceHandler(place: Place) {
    navigation.navigate("AllPlaces", { place });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

// function AddPlace() {
//   return <PlaceForm />;
// }

export default AddPlace;
