import React, { useState } from "react";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./routes/homeStack";
import ContactsContextProvider from "./shared/context";

const fetchFonts = () => {
  return Font.loadAsync({
    roboto: require("native-base/Fonts/Roboto.ttf"),
    roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
      />
    );
  }

  return (
    <ContactsContextProvider>
      <Navigator />
    </ContactsContextProvider>
  );
}
