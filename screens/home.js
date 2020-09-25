import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";

import ContactList from "../components/contactList";
import SearchBar from "../components/search";
import { ContactsContext } from "../shared/context";

const Home = ({ navigation }) => {
  const { contacts } = useContext(ContactsContext);

  const [searchText, setSearchText] = useState("");
  const [filteredContacts, setFilterContacts] = useState(contacts);
  const [onSearch, setOnSearch] = useState(false);

  const makeSearch = () => {
    setFilterContacts(
      contacts.filter((contact) => {
        return contact.name.toLowerCase().includes(searchText.toLowerCase());
      })
    );
  };

  let leo = onSearch ? console.log(onSearch) : console.log("false");

  return (
    <View style={styles.container}>
      <View>
        <SearchBar
          searchText={searchText}
          newSearchText={(newText) => setSearchText(newText)}
          onTermSubmit={() => {
            makeSearch();
          }}
        />
      </View>
      <View style={{ marginBottom: 65 }}>
        <FlatList
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
  container: {
    flex: 1,
    padding: 15,
    justifyContent: "flex-start",
  },
  fabView: {
    position: "absolute",
    right: 27,
    bottom: 27,
  },
  fab: {
    backgroundColor: "mediumturquoise",
    height: 55,
    width: 55,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Home;
