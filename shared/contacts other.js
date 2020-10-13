import React, { useEffect, useState } from "react";
import { View, Text } from "react-native";
import * as Contacts from "expo-contacts";

const contactsData = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === "granted") {
        const { data } = await Contacts.getContactsAsync({
          fields: [Contacts.Fields.Emails],
        });

        setContacts(data);
      }
    })();
  }, []);

  return null;
};

export default contactsData;
