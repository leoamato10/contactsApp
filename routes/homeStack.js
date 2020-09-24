import React from "react";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ContactsContextProvider from "../shared/context";
import Home from "../screens/home";
import ContactCard from "../components/contactCard";
import AddContact from "../screens/addContact";

const HomeNav = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        title: "CONTACTS",
      },
    },

    ContactCard: {
      screen: ContactCard,
      navigationOptions: {
        title: "Contact Detail",
      },
    },
    AddContact: {
      screen: AddContact,
      title: "Add Contact",
    },
  },
  {
    defaultNavigationOptions: {
      headerTitleAlign: "center",
      headerStyle: {
        backgroundColor: "ef4136",
      },
      headerTitleStyle: {
        color: "black",
        fontSize: 24,
        letterSpacing: 0.3,
      },
    },
  }
);

const App = createAppContainer(HomeNav);

export default () => {
  return (
    <ContactsContextProvider>
      <App />
    </ContactsContextProvider>
  );
};
