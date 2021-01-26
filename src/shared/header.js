import React from "react";
import { StyleSheet, Text, View } from "react-native";

const Header = (props) => {
  return (
    <View>
      <Text style={styles.headerText}>{props.Header}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerText: {
    fontWeight: "normal",
    fontSize: 25,
    color: "black",
    // letterSpacing: 2,
    textAlign: "center",
  },
});

export default Header;
