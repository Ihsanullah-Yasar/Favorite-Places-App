import { NavigationContainer } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationOptions,
} from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import { JSX } from "react";

export type RootStackParamList = {
  AllPlaces: undefined;
  AddPlace: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const screenOptions: NativeStackNavigationOptions = {
  headerShown: true,
};

export default function App(): JSX.Element {
  return (
    <>
      <StatusBar />
      <NavigationContainer>
        <Stack.Navigator screenOptions={screenOptions}>
          <Stack.Screen name="AllPlaces" component={AllPlaces} />
          <Stack.Screen
            name="AddPlace"
            component={AddPlace}
            options={{ title: "Add new place" }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
