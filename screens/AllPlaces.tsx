import React, { useCallback, useState } from "react";
import PlaceList from "../components/Places/PlacesList";
import { Place } from "../models/Place";
import { Alert, Button, StyleSheet, Text, View } from "react-native";

interface AllPlacesProps {
  navigation: any;
}

const AllPlaces: React.FC<AllPlacesProps> = ({ navigation }) => {
  const [places, setPlaces] = useState<Place[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load places when screen comes into focus
  // useFocusEffect(
  //   useCallback(() => {
  //     loadPlaces();
  //   }, [])
  // );

  /**
   * Load places from storage/service
   */
  const loadPlaces = async () => {
    try {
      setIsLoading(true);
      setError(null);

      // Example: Fetch from service
      // const loadedPlaces = await PlacesService.getPlaces();
      // setPlaces(loadedPlaces);

      // For demo purposes:
      setPlaces([]);
    } catch (err) {
      setError("Failed to load places. Please try again.");
      Alert.alert("Error", "Could not load places");
      console.error("Error loading places:", err);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle place selection
   */
  const handlePlaceSelect = useCallback(
    (placeId: string) => {
      // Navigate to place details
      navigation.navigate("PlaceDetails", { placeId });
    },
    [navigation],
  );

  /**
   * Handle retry when error occurs
   */
  const handleRetry = useCallback(() => {
    loadPlaces();
  }, []);

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
        <Button title="Retry" onPress={handleRetry} />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorText: {
    fontSize: 16,
    color: "#ff0000",
    textAlign: "center",
    marginBottom: 16,
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllPlaces;
