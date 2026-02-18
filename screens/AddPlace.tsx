import { NativeStackScreenProps } from "@react-navigation/native-stack";
import PlaceForm from "../components/Places/PlaceForm";
import { RootStackParamList } from "../App";
import React, { JSX } from "react";

type AddPlaceProps = NativeStackScreenProps<RootStackParamList, "AddPlace">;

const AddPlace: React.FC<AddPlaceProps> = ({ navigation }): JSX.Element => {
  return <PlaceForm />;
};

// function AddPlace() {
//   return <PlaceForm />;
// }

export default AddPlace;
