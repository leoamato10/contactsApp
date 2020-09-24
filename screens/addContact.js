import React, { useState, useContext } from "react";
import { View, Button } from "react-native";
import { Item, Label, Input, Card } from "native-base";
import { ContactsContext } from "../shared/context";
import PickImg from "../components/pickImage";

const AddContacts = ({ navigation }) => {
  const [addName, setAddname] = useState("");
  const [addCel, setAddCel] = useState("");
  const [addImage, setAddImage] = useState(
    "https://bauerglobalbrigades.files.wordpress.com/2018/10/no-photo7.png"
  );
  const { contacts, addContact } = useContext(ContactsContext);

  const newContact = {
    name: addName,
    cel: addCel,
    image: addImage,
    key: Math.random().toString(),
  };

  return (
    <View style={{ flex: 1, justifyContent: "flex-start", padding: 5 }}>
      <Card style={{ padding: 20 }}>
        <Item stackedLabel>
          <Label>Nombre y Apellido</Label>
          <Input
            autoCapitalize="words"
            onChangeText={(val) => setAddname(val)}
          />
        </Item>
        <Item stackedLabel one onPress={(cel) => setAddCel(cel)}>
          <Label>Celular</Label>
          <Input
            keyboardType="numeric"
            onChangeText={(val1) => setAddCel(val1)}
          />
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
