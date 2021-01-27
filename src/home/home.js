import React, { useEffect, useState, useMemo } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Icon, Button, Container } from "native-base";
import { StatusBar } from "expo-status-bar";
import List from "./list";
import * as Contacts from "expo-contacts";

const Home = ({ navigation }) => {
  const [contacts, setContacts] = useState([]); //contiene la primer carga de contactos
  const [filteredContacts, setFilterContacts] = useState(); //se le pasa por primera vez el estado contacts
  const [inputVal, setInputVal] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [addCel, setAddCel] = useState(null);

  const deleteHandler = async (id) => {
    try {
      await Contacts.removeContactAsync(id);
      navigation.navigate("Home");
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    console.log("app rendered");
  });

  useEffect(() => {
    // navigation.addListener("focus", () => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [
            Contacts.Fields.Name,
            Contacts.Fields.Image,
            Contacts.Fields.PhoneNumbers,
          ],
        });
        setContacts(data);
      }
    })();

    return () => "";
  }, []);

  useEffect(() => {
    setFilterContacts(contacts);
    setIsLoading(false);
    // return () => [];
  }, [contacts]);

  // const makeSearch = useMemo(() => {
  //   setFilterContacts(
  //     contacts.filter((contact) => {
  //       return contact.name.toLowerCase().includes(inputVal.toLowerCase());
  //     })
  //   );
  // }, [filteredContacts, contacts]);

  const makeSearch = () => {
    setFilterContacts(
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(inputVal.toLowerCase());
      })
    );
  };

  return (
    <Container style={styles.content}>
      <StatusBar style="auto" />
      <View>
        {isLoading ? (
          <View
            style={{
              ...StyleSheet.absoluteFill,
              alignItems: "center",
              justifyContent: "center",
              marginTop: 100,
            }}
          >
            <ActivityIndicator size="large" color="black" />
          </View>
        ) : null}
      </View>

      <View style={styles.search}>
        <Icon name="ios-search" />
        <TextInput
          style={styles.searchText}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
          placeholderTextColor={"white"}
          onChangeText={(val) => setInputVal(val)}
          onKeyPress={() => makeSearch()}
        />
      </View>

      <View>
        <FlatList
          ListEmptyComponent={() =>
            isLoading ? null : <Text>No contacts found</Text>
          }
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={filteredContacts}
          maxToRenderPerBatch={10}
          initialNumToRender={50}
          renderItem={({ item }) => (
            <List
              item={item}
              navigation={navigation}
              deleteHandler={deleteHandler}
            />
          )}
        />
      </View>

      <Button
        rounded
        large
        style={{
          position: "absolute",
          right: 20,
          bottom: 20,
          backgroundColor: "#3B5998",
        }}
        onPress={() => {
          navigation.navigate("AddContact");
        }}
      >
        <Icon name="user-plus" type="Feather" />
      </Button>
    </Container>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
  },

  search: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#dadada",
    alignItems: "center",
    marginHorizontal: 10,
    marginBottom: 7,
  },
  searchText: {
    paddingHorizontal: 20,
    fontSize: 20,
    width: "95%",
    paddingVertical: 10,
    color: "white",
  },

  openButton: {
    backgroundColor: "#F194FF",
    borderRadius: 20,
    padding: 10,
    paddingHorizontal: 20,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Home;
