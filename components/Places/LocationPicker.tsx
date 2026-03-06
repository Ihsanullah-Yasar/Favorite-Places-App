import {
  getCurrentPositionAsync,
  LocationObject,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { FC, useCallback, useEffect, useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getMapImagePreviewUrl } from "../../utils/location";
import {
  RouteProp,
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "../../types/navigation";

export interface location {
  lat: number;
  lng: number;
}
type routeParams = RouteProp<RootStackParamList, "AddPlace">;

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AddPlace">;

interface LocationPickerProps {
  onPickLocation: (location: location) => void;
}

const LocationPicker: FC<LocationPickerProps> = ({ onPickLocation }) => {
  const [pickedLocation, setPickedLocation] = useState<location | null>(null);
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<routeParams>();
  const isFocused = useIsFocused();
  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = {
        lat: route.params.pickedLat,
        lng: route.params.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    if (pickedLocation) onPickLocation(pickedLocation);
  }, [pickedLocation, onPickLocation]);

  const verifyPermission = useCallback(async (): Promise<boolean> => {
    if (
      locationPermissionInformation?.status === PermissionStatus.UNDETERMINED
    ) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant location permission to use this feature.",
      );
      return false;
    }
    return true;
  }, [locationPermissionInformation, requestPermission]);

  const getLocationHandler = useCallback(async () => {
    const hasPermission = await verifyPermission();
    if (!hasPermission) return;
    try {
      const location: LocationObject = await getCurrentPositionAsync();
      setPickedLocation({
        lat: location.coords.latitude,
        lng: location.coords.longitude,
      });
    } catch (error) {
      Alert.alert(
        "Could not fetch location",
        "Please try again later or pick a location on the map.",
      );
      console.error(error);
    }
  }, [verifyPermission]);
  const pickOnMapHandler = useCallback(() => {
    navigation.navigate("Map");
  }, [navigation]);

  const locationPreview = pickedLocation ? (
    <Image
      style={styles.image}
      source={{
        uri: getMapImagePreviewUrl(pickedLocation.lat, pickedLocation.lng),
      }}
    />
  ) : (
    <Text>No location picked yet.</Text>
  );
  console.log(pickedLocation);
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          location user
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          pick on map
        </OutlinedButton>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
