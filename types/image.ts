import { ImagePickerAsset } from "expo-image-picker";

export type PickedImage = {
  uri: string;
  width: number;
  height: number;
  type?: ImagePickerAsset["type"];
  fileName?: ImagePickerAsset["fileName"];
  fileSize?: number;
};
