import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "../home/home";
import ContactCard from "../home/contactCard";
import AddContact from "../home/addContact";

const Stack = createStackNavigator();

function Nav() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#3c64cb",
          },
          headerTintColor: "white",
          headerTitleStyle: {
            fontWeight: "normal",
            textAlign: "center",
            fontSize: 25,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: "Contacts" }}
          // options={{ headerTitle: (props) => <Header {...props} /> }}
        />
        <Stack.Screen
          name="ContactCard"
          component={ContactCard}
          options={{ title: "Contact Details" }}
          // options={{ headerTitle: (props) => <Header {...props} /> }}
        />
        <Stack.Screen
          name="AddContact"
          component={AddContact}
          options={{ title: "Add Contact" }}
          // options={{ headerTitle: (props) => <Header {...props} /> }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Nav;
