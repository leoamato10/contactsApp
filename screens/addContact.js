import React, { useState, useContext, useRef } from "react";
import {
  View,
  Button,
  Image,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { Item, Label } from "native-base";
import { ContactsContext } from "../shared/context";
import PickImg from "../components/pickImage";
import * as ImagePicker from "expo-image-picker";

const AddContacts = ({ navigation }) => {
  const [addName, setAddname] = useState(null);
  const [addCel, setAddCel] = useState(null);
  const [image, setImage] = useState(
    "https://bauerglobalbrigades.files.wordpress.com/2018/10/no-photo7.png"
  );
  const { contacts, addContact } = useContext(ContactsContext);

  const newContact = {
    name: addName,
    cel: addCel,
    image: image,
    key: Math.random().toString(),
  };

  const takePic = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status === "granted") {
      const photo = await ImagePicker.launchCameraAsync();
      setImage(photo.uri);
    }
  };

  const inputRef = useRef(null);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.cardContent}>
          <Item stackedLabel>
            <Label>Nombre y Apellido</Label>
            <TextInput
              autoFocus={true}
              style={{ borderBottomWidth: 1, width: "100%" }}
              autoCapitalize="words"
              onChangeText={(val) => setAddname(val)}
              onSubmitEditing={() => inputRef.current.focus()}
            />
          </Item>
          <Item stackedLabel one>
            <Label>Celular</Label>
            <TextInput
              ref={inputRef}
              style={{ borderBottomWidth: 1, width: "100%" }}
              keyboardType="phone-pad"
              onChangeText={(val1) => setAddCel(val1)}
            />
          </Item>
          <View style={styles.imageContainer}>
            <Item stackedLabel one>
              <Label>Seleccionar Foto</Label>
              <Image
                style={styles.image}
                source={{
                  uri: image,
                }}
              />
            </Item>
            <View style={styles.buttons}>
              <PickImg
                imageSelected={(uri) => {
                  setImage(uri);
                }}
              />
              <Button title="Tomar Foto" onPress={() => takePic()} />
              <Button
                title="Guardar"
                onPress={() => {
                  if (addName == null) {
                    Alert.alert("Faltan datos", "Debes ingresar un nombre");
                  } else if (addCel == null) {
                    Alert.alert(
                      "Faltan datos",
                      "Debes ingresar un número de celular"
                    );
                  } else {
                    addContact(newContact, () => {
                      navigation.navigate("Home");
                    });
                  }
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    // borderColor: "red",
    // borderWidth: 1,
  },
  cardContent: {
    marginTop: 10,
    height: "95%",
    width: "95%",
    backgroundColor: "#dadada",
    padding: 15,
    borderRadius: 30,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  imageContainer: {
    // backgroundColor: "blue",
  },
  image: {
    marginTop: 25,
    width: "95%",
    height: 250,
    borderRadius: 10,
    resizeMode: "contain",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 25,
  },
});
export default AddContacts;
