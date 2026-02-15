import React, { useCallback, useMemo } from "react";
import { Place } from "../../models/Place";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

interface PlaceItemProps {
  place: Place;
  onSelect: (placeId: string) => void;
}

const PlaceItem: React.FC<PlaceItemProps> = React.memo(
  ({ place, onSelect }) => {
    const [latitude, longitude] = useMemo(
      () => place.getCoordinates(),
      [place],
    );

    const handlePress = useCallback(() => {
      onSelect(place.id);
    }, [onSelect, place.id]);

    return (
      <Pressable
        onPress={handlePress}
        style={({ pressed }) => []}
        android_ripple={{ color: "#ccc" }}
        accessibilityRole="button"
        accessibilityLabel={`${place.title}, located at ${place.getFormattedAddress()}`}
        accessibilityHint="Double tap to view place details"
      >
        <Image
          source={{ uri: place.imageUrl }}
          style={styles.image}
          resizeMode="cover"
          resizeMethod="auto"
          onError={({ nativeEvent }) => {
            console.log(
              `Failed to load image for ${place.title}:`,
              nativeEvent.error,
            );
          }}
          accessibilityLabel={`Image of ${place.title}`}
        />
        <View style={styles.infoContainer}>
          <Text style={styles.title} numberOfLines={1}>
            {place.title}
          </Text>

          <Text style={styles.address} numberOfLines={2}>
            {place.getFormattedAddress()}
          </Text>

          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinates}>
              {latitude.toFixed(4)}°, {longitude.toFixed(4)}°
            </Text>

            {place.hasAltitude() && (
              <Text style={styles.altitude}>
                ↑ {place.getAltitude()?.toFixed(1)}m
              </Text>
            )}
          </View>
        </View>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.98 }],
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: "#f0f0f0", // Placeholder color
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
    lineHeight: 18,
  },
  coordinatesContainer: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  coordinates: {
    fontSize: 12,
    color: "#999",
  },
  altitude: {
    fontSize: 12,
    color: "#4CAF50",
    marginLeft: 8,
    fontWeight: "500",
  },
});

// import { Image, Pressable, Text, View } from "react-native";

// function PlaceItem({place,onSelect}){
//     return (
//         <Pressable onPress={onSelect}>
//             <Image source={{uri: place.imageUrl}} />
//             <View>
//                 <Text>Title</Text>
//                 <Text>address</Text>
//             </View>
//         </Pressable>
//     )
// }

export default PlaceItem;
