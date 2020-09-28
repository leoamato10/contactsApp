import React, { useState, useContext, useEffect } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
} from "react-native";
import { Item, Input, Icon } from "native-base";
import ContactList from "../components/contactList";
import { ContactsContext } from "../shared/context";

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
      <Item style={styles.search}>
        <Icon name="ios-search" />
        <Input
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="Search"
          onChangeText={(val) => setInputVal(val)}
          onKeyPress={() => makeSearch()}
        />
      </Item>
      <View style={styles.list}>
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
  content: {
    padding: 10,
    marginBottom: 65,
  },

  search: {
    marginBottom: 10,
  },
  fabView: {
    position: "absolute",
    right: 27,
    bottom: 30,
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
