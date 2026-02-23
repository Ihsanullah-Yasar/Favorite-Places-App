import { Ionicons } from "@expo/vector-icons";
import React, { JSX } from "react";
import { GestureResponderEvent, Pressable, StyleSheet } from "react-native";

type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

interface IconButtonProps {
  icon: IoniconName;
  size: number;
  color: string;
  onPress: (event: GestureResponderEvent) => void;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  size,
  color,
  onPress,
}): JSX.Element => {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    padding: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.7,
  },
});
