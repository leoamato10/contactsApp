import React, { useState } from "react";
import { Button, Image, View, Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

const PickImg = ({ imageSelected }) => {
  const [image, setImage] = useState(null);

  const getPermissionAsync = async () => {
    if (Platform.OS !== "web") {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        setImage(result.uri);
      }
      imageSelected(result.uri);
      // this.props.imageSelected(result.uri); //estoy es en el class component
    } catch (E) {
      console.log(E);
    }
  };

  return <Button title="Seleccionar Foto" onPress={pickImage} />;
};

export default PickImg;
