import React from "react";

import { Image, StyleSheet, Alert } from "react-native";
import * as Linking from "expo-linking";
import { Text, Icon, View, Card } from "native-base";
import * as Contacts from "expo-contacts";
import * as SMS from "expo-sms";

export default function ContactCard({ route }) {
  const { item, deleteHandler } = route.params;
  const noPhotoImage =
    "https://bauerglobalbrigades.files.wordpress.com/2018/10/no-photo7.png";

  const imgExist = (item) => {
    if (item.imageAvailable) {
      return (
        <Image source={{ uri: item.image.uri }} style={styles.cardThumbnail} />
      );
    } else {
      return (
        <Image source={{ uri: noPhotoImage }} style={styles.cardThumbnail} />
      );
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.cardContent}>
        <View style={styles.cardTitle}>
          <Text style={styles.cardText}>{item.name}</Text>
        </View>
        {imgExist(item)}

        <View style={styles.cardIcons}>
          <Icon
            type="FontAwesome"
            name="phone"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              Linking.openURL(
                `tel://${
                  item.phoneNumbers ? item.phoneNumbers[0].number : null
                }`
              );
            }}
          />

          <Icon
            type="FontAwesome"
            name="whatsapp"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              Linking.openURL("https://wa.me/" + item.phoneNumbers[0].number);
            }}
          />

          <Icon
            type="FontAwesome5"
            name="sms"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              Linking.openURL("https://wa.me/" + item.phoneNumbers[0].number);
            }}
          />

          <Icon
            type="FontAwesome"
            name="trash-o"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              Alert.alert(
                "Estas por borrar un contacto",
                "¿Estas seguro de querer borrarlo?",
                [
                  {
                    text: "Si",
                    onPress: () => deleteHandler(item.id),
                  },
                  {
                    text: "Cancelar",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel",
                  },
                ],
                { cancelable: false }
              );
            }}
          />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  cardContent: {
    height: 500,
    width: "95%",
    paddingVertical: 30,
    backgroundColor: "#dadada",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardTitle: {
    width: "83%",
    height: 90,
    borderColor: "black",
    borderBottomWidth: 1,
  },
  cardThumbnail: {
    width: 200,
    height: 200,
    borderRadius: 200 / 2,
  },
  cardText: {
    fontSize: 25,
    fontWeight: "normal",
    textAlign: "center",
    color: "black",
  },
  cardIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "rgba(217, 217, 217,0.5)",
    width: "95%",
    height: 50,
    borderRadius: 15,
    alignItems: "center",
    paddingHorizontal: 50,
  },
});
