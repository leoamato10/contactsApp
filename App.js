import React, { useState } from "react";
import { Text, View } from "react-native";
import * as Font from "expo-font";
import { AppLoading } from "expo";
import Navigator from "./routes/homeStack";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("native-base/Fonts/Roboto.ttf"),
    "open-sans-bold": require("native-base/Fonts/Roboto_medium.ttf"),
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

  return <Navigator />;
}
