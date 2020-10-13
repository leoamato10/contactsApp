import React, { createContext, useReducer, useEffect } from "react";
import { Alert } from "react-native";

import contactsData from "./contacts other";

export const ContactsContext = React.createContext();

contactReducer = (state, action) => {
  switch (action.type) {
    case "delete_contact":
      const filteredContact = state.filter(
        (contact) => contact.key !== action.payload
      );
      return filteredContact;

    case "add_contact":
      return [...state, action.payload];

    default:
      return state;
  }
};

const ContactsContextProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, contactsData);

  // const storeData = async () => {
  //   try {
  //     const storedContacts = JSON.stringify(contactsData);
  //     await AsyncStorage.setItem("storedContacts", storedContacts);
  //   } catch (e) {
  //     // saving error
  //   }
  // };

  // const getData = async () => {
  //   try {
  //     const jsonValue = await AsyncStorage.getItem("@storage_Key");
  //     return jsonValue != null ? JSON.parse(jsonValue) : null;
  //   } catch (e) {
  //     // error reading value
  //   }
  // };

  // removeValue = async () => {
  //   try {
  //     await AsyncStorage.removeItem("@MyApp_key");
  //   } catch (e) {
  //     // remove error
  //   }

  //   console.log("Done.");
  // };

  const deleteContact = (key, callback) => {
    Alert.alert("Eliminar Contacto", "¿Deseas eliminar el contacto?", [
      {
        text: "Eliminar",
        onPress: () => {
          dispatch({ type: "delete_contact", payload: key, callback });
          callback();
        },
      },

      {
        text: "CANCEL",
        onPress: () => null,
      },
    ]);
  };

  const addContact = (newContact, callback) => {
    dispatch({ type: "add_contact", payload: newContact });
    callback();
  };

  return (
    <ContactsContext.Provider value={{ contacts, deleteContact, addContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContextProvider;
