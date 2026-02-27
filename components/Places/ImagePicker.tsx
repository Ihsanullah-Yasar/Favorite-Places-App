import {
  ImagePickerAsset,
  ImagePickerOptions,
  launchCameraAsync,
  PermissionStatus,
  useCameraPermissions,
} from "expo-image-picker";
import React, { JSX, useCallback, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Button,
  Image,
  ImageProps,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Colors } from "../../constants/colors";

type PickedImage = {
  uri: string;
  width: number;
  height: number;
  type?: ImagePickerAsset["type"];
  fileName?: ImagePickerAsset["fileName"];
  fileSize?: number;
};
interface ImagePickerProps {
  onImagePicked?: (image: PickedImage) => void;
}

const ImagePicker: React.FC<ImagePickerProps> = ({
  onImagePicked,
}): JSX.Element => {
  const [pickedImage, setPickedImage] = useState<PickedImage | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  const verifyPermissions = async (): Promise<boolean> => {
    if (cameraPermissionInformation?.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation?.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permission!",
        "You need to grant camera permission to use this app!",
      );
      return false;
    }
    return true;
  };
  const takeImageHandler = useCallback(async (): Promise<void> => {
    try {
      const hasPermission = await verifyPermissions();
      if (!hasPermission) return;
      const result = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
        // mediaTypes: "images",
        // allowsMultipleSelection: false
      });
      if (!result.canceled && result.assets && result.assets.length > 0) {
        const asset = result.assets[0];
        const image: PickedImage = {
          uri: asset.uri,
          width: asset.width,
          height: asset.height,
          type: asset.type,
          fileName: asset.fileName,
          fileSize: asset.fileSize,
        };
        setPickedImage(image);
        onImagePicked?.(image);
      }
    } catch (error) {
      Alert.alert("Error", "Failed to take image, Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [onImagePicked]);

  if (isLoading) {
    return <ActivityIndicator size="large" color={Colors.primary500} />;
  }

  return (
    <View>
      <View style={styles.previewContainer}>
        {pickedImage ? (
          <Image source={{ uri: pickedImage.uri }} style={styles.image} />
        ) : (
          <Text>No image taken yet.</Text>
        )}
      </View>
      <Button
        title={isLoading ? "Processing..." : "Take Image"}
        disabled={isLoading}
        onPress={takeImageHandler}
      />
    </View>
  );
};

export default ImagePicker;

const styles = StyleSheet.create({
  previewContainer: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
