import { Ionicons } from "@expo/vector-icons";
import React, { JSX, ReactNode, useCallback } from "react";
import {
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";
import { Colors } from "../../constants/colors";

type IonIconName = React.ComponentProps<typeof Ionicons>["name"];

interface OutlinedButtonProps {
  onPress: (event: GestureResponderEvent) => void;
  icon: IonIconName;
  children: ReactNode;
  style?: ViewStyle;
  disabled?: boolean;
}

const OutlinedButton: React.FC<OutlinedButtonProps> = ({
  onPress,
  icon,
  children,
  style,
  disabled = false,
}): JSX.Element => {
  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      if (disabled) return;
      onPress(event);
    },
    [onPress, disabled],
  );
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        pressed && !disabled && styles.pressed,
        disabled && styles.disabled,
      ]}
      android_ripple={{ color: Colors.primary100 }}
    >
      <Ionicons
        style={styles.icon}
        size={18}
        name={icon}
        color={Colors.primary500}
      />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
};

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    marginRight: 4,
  },
  text: {
    color: Colors.primary500,
  },
});
