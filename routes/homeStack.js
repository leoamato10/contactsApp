import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Header from "../components/header";
import Home from "../screens/home";
import ContactCard from "../components/contactCard";
import AddContact from "../screens/addContact";

const HomeNav = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: () => {
      return {
        headerTitle: () => <Header title="Contactos" />,
        headerTintColor: "white",
        headerStyle: {
          backgroundColor: "lightgray",
        },
      };
    },
  },

  ContactCard: {
    screen: ContactCard,
    navigationOptions: {
      headerShown: false,
    },
  },
  AddContact: {
    screen: AddContact,
  },
});

export default createAppContainer(HomeNav);
