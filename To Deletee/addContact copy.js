import React, { useState, useContext } from "react";
import { View, Button } from "react-native";
import { Form, Item, Label, Input, Card } from "native-base";
import PickImg from "../components/pickImage";
import { ContactsContext } from "../shared/context";

const AddContacts = ({ navigation }) => {
  const [addName, setAddname] = useState("");
  const [addCel, setAddCel] = useState("");
  const [addImage, setAddImage] = useState(
    "https://bucket2.glanacion.com/anexos/fotos/03/3207903.jpg"
  );
  const { contacts, addContact } = useContext(ContactsContext);

  const newContact = {
    name: addName,
    cel: addCel,
    image: addImage,
    key: Math.random(),
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", padding: 5 }}>
      <Card style={{ padding: 20 }}>
        <Item stackedLabel>
          <Label>Nombre y Apellido</Label>
          <Input onChangeText={(val) => setAddname(val)} />
        </Item>
        <Item stackedLabel one onPress={(cel) => setAddCel(cel)}>
          <Label>Celular</Label>
          <Input onChangeText={(val1) => setAddCel(val1)} />
        </Item>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignContent: "center",
            margin: 20,
          }}
        >
          <PickImg
            imageSelected={(uri) => {
              console.log(uri);
              setAddImage(uri);
            }}
          />
          <Button
            title="Guardar"
            onPress={() => {
              addContact(newContact, () => {
                navigation.navigate("Home");
              });
            }}
          />
        </View>
      </Card>
    </View>
  );
};

export default AddContacts;
