import React, { useState, useRef } from "react";
import {
  View,
  Image,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { Item, Label, Card, Button, Text } from "native-base";
import PickImg from "./pickImage";
import * as ImagePicker from "expo-image-picker";
import * as Contacts from "expo-contacts";

const AddContact = ({ navigation }) => {
  const [addName, setAddname] = useState(null);
  const [addCel, setAddCel] = useState(null);
  const [image, setImage] = useState(
    "https://bauerglobalbrigades.files.wordpress.com/2018/10/no-photo7.png"
  );

  const newContact = async () => {
    const contact = {
      [Contacts.Fields.FirstName]: addName,
      [Contacts.Fields.LastName]: "Loco",
      [Contacts.Fields.Company]: "Young Money",
      [Contacts.Fields.PhoneNumbers]: [
        {
          number: addCel,
          isPrimary: true,
          digits: "1234567890",
          countryCode: "+54",
          label: "main",
        },
      ],
    };
    return Contacts.addContactAsync(contact)
      .then(() => {
        alert("Contacto creado");
        navigation.navigate("Home");
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      });
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
        <Card style={styles.cardContent}>
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
              <PickImg imageSelected={(uri) => setImage(uri)} />
              <Button primary onPress={() => takePic()}>
                <Text>Tomar Foto</Text>
              </Button>
              <Button primary onPress={newContact}>
                <Text>Guardar</Text>
              </Button>
            </View>
          </View>
        </Card>
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
    width: "95%",
    backgroundColor: "#dadada",
    padding: 15,
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
export default AddContact;
