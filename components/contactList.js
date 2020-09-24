import React from "react";
import * as Linking from "expo-linking";

import {
  Left,
  Body,
  Right,
  Text,
  ListItem,
  Thumbnail,
  Icon,
} from "native-base";

const ContactList = ({ item, navigation }) => {
  return (
    <ListItem
      thumbnail
      onPress={() => navigation.navigate("ContactCard", item)}
    >
      <Left>
        <Thumbnail
          source={{
            uri: item.image,
          }}
        />
      </Left>
      <Body>
        <Text>{item.name}</Text>
        <Text note>{item.cel}</Text>
      </Body>
      <Right>
        <Icon
          type="FontAwesome"
          name="phone"
          style={{ fontSize: 25 }}
          onPress={() => {
            Linking.openURL(`tel://${item.cel}`);
          }}
        />
      </Right>
      <Right>
        <Icon
          type="FontAwesome"
          name="whatsapp"
          style={{ fontSize: 25 }}
          onPress={() => {
            Linking.openURL("http://api.whatsapp.com/send?phone=54" + item.cel);
          }}
        />
      </Right>
    </ListItem>
  );
};

export default ContactList;
