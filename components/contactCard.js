import React, { useContext } from "react";
import { ContactsContext } from "../shared/context";
import { Image } from "react-native";
import * as Linking from "expo-linking";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  View,
  Right,
} from "native-base";

export default function ContactCard({ navigation }) {
  const { dispatch, deleteContact, phoneCall } = useContext(ContactsContext);

  return (
    <View style={{ padding: 5 }}>
      <Card style={{ padding: 5 }}>
        <CardItem>
          <Body
            style={{
              paddingVertical: 5,
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "400" }}>
              {navigation.getParam("name")}
            </Text>
          </Body>
        </CardItem>
        <CardItem cardBody>
          <Image
            source={{ uri: navigation.getParam("image") }}
            style={{ height: 200, width: null, flex: 1, resizeMode: "cover" }}
          />
        </CardItem>
        <CardItem style={{ justifyContent: "space-around" }}>
          <Button
            transparent
            onPress={() => {
              Linking.openURL(`tel://${navigation.getParam("cel")}`);
            }}
          >
            <Icon type="FontAwesome" name="phone" style={{ fontSize: 25 }} />
          </Button>

          <Button
            transparent
            onPress={() => {
              Linking.openURL(
                "http://api.whatsapp.com/send?phone=54" +
                  navigation.getParam("cel")
              );
            }}
          >
            <Icon type="FontAwesome" name="whatsapp" style={{ fontSize: 25 }} />
          </Button>

          <Button
            transparent
            onPress={() => {
              deleteContact(navigation.getParam("key"), () => {
                navigation.navigate("Home");
              });
            }}
          >
            <Icon
              type="FontAwesome"
              name="trash-o"
              style={{ fontSize: 25, color: "red" }}
            />
          </Button>
        </CardItem>
      </Card>
    </View>
  );
}
