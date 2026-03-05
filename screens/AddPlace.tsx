import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import React, { JSX } from "react";
import { RootStackParamList } from "../types/navigation";

type AddPlaceProps = NativeStackScreenProps<RootStackParamList, "AddPlace">;

const AddPlace: React.FC<AddPlaceProps> = ({ navigation }): JSX.Element => {
  return <PlaceForm />;
};

// function AddPlace() {
//   return <PlaceForm />;
// }

export default AddPlace;
