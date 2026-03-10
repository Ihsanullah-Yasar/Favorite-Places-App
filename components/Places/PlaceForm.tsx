import React, { JSX, useCallback, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";
import { Place } from "../../models/Place";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../UI/Button";
import { ILocation } from "../../types/place";
import { PickedImage } from "../../types/image";

interface PlaceFormProps {
  initialData?: Partial<Place>;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ initialData }): JSX.Element => {
  const [enteredTitle, setEnteredTitle] = useState<string>(
    initialData?.title || "",
  );
  const [selectedImage, setSelectedImage] = useState<PickedImage | null>(null);
  const [pickedLocation, setPickedLocation] = useState<ILocation | null>(null);
  const handleTitleChange: TextInputProps["onChangeText"] = (enteredTitle) => {
    setEnteredTitle(enteredTitle);
  };

  const takeImageHandler = (imageUrl: PickedImage) => {
    setSelectedImage(imageUrl);
  };

  const pickLocationHandler = useCallback((location: ILocation) => {
    setPickedLocation(location);
  }, []);

  const savePlaceHandler = () => {
    console.log(enteredTitle);
    console.log(selectedImage);
    console.log(pickedLocation);
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={100}
    >
      <ScrollView style={styles.form}>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            onChangeText={handleTitleChange}
            value={enteredTitle}
          />
        </View>
        <ImagePicker onTakeImage={takeImageHandler} />
        <LocationPicker onPickLocation={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Add Place</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default PlaceForm;

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
