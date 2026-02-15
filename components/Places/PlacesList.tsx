import React, { useCallback } from "react";
import { Place } from "../../models/Place";
import { View, Text, StyleSheet, FlatList, ListRenderItem } from "react-native";
import PlaceItem from "./PlaceItem";

interface PlaceListProps {
  places: Place[];
  onPlacePress?: (placeId: string) => void;
  // keyExtractor?: (item: Place, index: number) => string;
  emptyMessage?: string;
  testID?: string;
}

//Default empty state component
const EmptyListComponent: React.FC<{ message: string }> = React.memo(
  ({ message }) => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>{message}</Text>
    </View>
  ),
);

const PlaceList: React.FC<PlaceListProps> = ({
  places,
  onPlacePress,
  emptyMessage = "No places to display.",
  testID = "place-list",
}) => {
  // Memoized key extractor
  const keyExtractor = useCallback((item: Place): string => {
    return item.id;
  }, []);

  const renderPlaceItem: ListRenderItem<Place> = React.useCallback(
    ({ item, index }) => (
      <PlaceItem place={item} onSelect={onPlacePress ?? (() => {})} />
    ),
    [onPlacePress, testID],
  );

  // Memoized empty component to prevent unnecessary re-renders\
  const emptyComponent = React.useMemo(
    () => <EmptyListComponent message={emptyMessage} />,
    [emptyMessage],
  );

  return (
    <FlatList
      data={places}
      renderItem={renderPlaceItem}
      keyExtractor={keyExtractor}
      ListEmptyComponent={emptyComponent}
      showsHorizontalScrollIndicator={false}
      showsVerticalScrollIndicator={false}
      removeClippedSubviews={true}
      maxToRenderPerBatch={10}
      windowSize={21}
      initialNumToRender={10}
      testID={testID}
      accessibilityLabel="List of places"
      accessibilityRole="list"
    />
  );
};

const styles = StyleSheet.create({
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 32,
    paddingHorizontal: 16,
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "#e0e0e0",
    marginHorizontal: 16,
  },
  placeholderItem: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
  },
  placeholderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  coordinatesText: {
    fontSize: 12,
    color: "#999",
    marginTop: 2,
  },
});

export default PlaceList;
