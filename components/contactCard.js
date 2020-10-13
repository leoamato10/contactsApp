import React, { useContext } from "react";
import { ContactsContext } from "../shared/context";
import { Image, StyleSheet } from "react-native";
import * as Linking from "expo-linking";
import { Text, Icon, View } from "native-base";

export default function ContactCard({ navigation }) {
  const { deleteContact } = useContext(ContactsContext);

  return (
    <View style={styles.container}>
      <View style={styles.cardContent}>
        <View
          style={{
            width: "83%",
            height: 65,
            alignItems: "center",
            justifyContent: "center",
            borderColor: "black",
            borderBottomWidth: 1,
          }}
        >
          <Text style={styles.cardText}>{navigation.getParam("name")}</Text>
        </View>
        <Image
          source={{ uri: navigation.getParam("image") }}
          style={styles.cardThumbnail}
        />

        <View style={styles.cardIcons}>
          <Icon
            type="FontAwesome"
            name="phone"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              Linking.openURL(`tel://${navigation.getParam("cel")}`);
            }}
          />

          <Icon
            type="FontAwesome"
            name="whatsapp"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              Linking.openURL(
                "http://api.whatsapp.com/send?phone=54" +
                  navigation.getParam("cel")
              );
            }}
          />

          <Icon
            type="FontAwesome"
            name="trash-o"
            style={{ fontSize: 25, color: "black" }}
            onPress={() => {
              deleteContact(navigation.getParam("key"), () => {
                navigation.navigate("Home");
              });
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginTop: "50%",
    alignItems: "center",
    flex: 1,
  },
  cardContent: {
    marginTop: 10,
    marginHorizontal: 5,
    height: 500,
    width: "95%",
    paddingVertical: 30,
    backgroundColor: "#dadada",
    borderRadius: 25,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  cardThumbnail: {
    // position: "absolute",
    // zIndex: 1,
    // elevation: 5,
    // top: -70,
    width: 200,
    height: 200,
    borderRadius: 200 / 2,

    // alignSelf: "center",
  },
  cardText: {
    fontSize: 25,
    fontWeight: "normal",
    textAlign: "center",
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
