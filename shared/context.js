import React, { createContext, useReducer, useEffect } from "react";
import contactsData from "./contacts";

export const ContactsContext = React.createContext();

contactReducer = (state, action) => {
  switch (action.type) {
    case "delete_contact":
      return state.filter((contact) => contact.key !== action.payload);

    case "add_contact":
      return [...state, action.payload];

    // case "make_search":
    //   return action.filteredContact;

    default:
      return state;
  }
};

const ContactsContextProvider = ({ children }) => {
  const [contacts, dispatch] = useReducer(contactReducer, contactsData);

  const deleteContact = (key, callback) => {
    dispatch({ type: "delete_contact", payload: key });
    callback();
  };

  const addContact = (newContact, callback) => {
    dispatch({ type: "add_contact", payload: newContact });
    callback();
  };

  // const search = (filteredContact) => {
  //   dispatch({ type: "make_search", filteredContact: filteredContact });
  // };

  return (
    <ContactsContext.Provider value={{ contacts, deleteContact, addContact }}>
      {children}
    </ContactsContext.Provider>
  );
};

export default ContactsContextProvider;
