import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Button,
} from "react-native";
import { Icon } from "native-base";
import ContactList from "../components/contactList";
import { ContactsContext } from "../shared/context";
import AsyncStorage from "@react-native-community/async-storage";

const Home = ({ navigation }) => {
  const { contacts } = useContext(ContactsContext);
  const [inputVal, setInputVal] = useState("");
  const [filteredContacts, setFilterContacts] = useState(contacts);

  const makeSearch = () => {
    setFilterContacts(
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(inputVal.toLowerCase());
      })
    );
  };

  useEffect(() => {
    setFilterContacts(contacts);
  }, [contacts]);

  return (
    <View style={styles.content}>
      <View style={styles.search}>
        <Icon name="ios-search" />
        <TextInput
          style={styles.searchText}
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
          onChangeText={(val) => setInputVal(val)}
          onKeyPress={() => makeSearch()}
        />
      </View>
      {/* <Button title="press me" onPress={() => navigation.navigate("Test")} /> */}

      <View>
        <FlatList
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
          data={filteredContacts}
          renderItem={({ item }) => (
            <ContactList item={item} navigation={navigation} />
          )}
        />
      </View>

      <View style={styles.fabView}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.fab}
          onPress={() => navigation.navigate("AddContact")}
        >
          <Text style={{ color: "white", fontSize: 30 }}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: 10,
    marginBottom: 65,
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
  },
  fabView: {
    position: "absolute",
    right: 30,
    bottom: -40,
  },
  fab: {
    backgroundColor: "#76bdde",
    height: 60,
    width: 60,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
