import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Header from "../components/header";
import Home from "../screens/home";
import ContactCard from "../components/contactCard";
import AddContact from "../screens/addContact";
// import Test from "../screens/test";

const screens = {
  Home: {
    screen: Home,
    navigationOptions: () => {
      return {
        headerTitle: () => <Header title="CONTACTOS" />,
      };
    },
  },
  ContactCard: {
    screen: ContactCard,
    navigationOptions: () => {
      return {
        headerTitle: () => <Header title="Detalle de Contacto" />,
      };
    },
  },
  AddContact: {
    screen: AddContact,
    navigationOptions: () => {
      return {
        headerTitle: () => <Header title="Agregar Contacto" />,
      };
    },
  },
  //   Test: {
  //     screen: Test,
  //     navigationOptions: () => {
  //       return {
  //         headerTitle: () => <Header title="Test" />,
  //       };
  //     },
  //   },
};

const HomeNav = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTitleAlign: "left | center",
    headerStyle: {
      backgroundColor: "#76bdde",
      height: 90,
    },
  },
});

export default createAppContainer(HomeNav);
