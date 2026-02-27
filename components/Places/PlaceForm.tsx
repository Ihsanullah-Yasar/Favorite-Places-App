import React, { JSX, useState } from "react";
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
interface PlaceFormProps {
  initialData?: Partial<Place>;
}

const PlaceForm: React.FC<PlaceFormProps> = ({ initialData }): JSX.Element => {
  const [enteredTitle, setEnteredTitle] = useState<string>(
    initialData?.title || "",
  );

  const handleTitleChange: TextInputProps["onChangeText"] = (enteredTitle) => {
    setEnteredTitle(enteredTitle);
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
        <ImagePicker />
        //locationPicker cmp
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
