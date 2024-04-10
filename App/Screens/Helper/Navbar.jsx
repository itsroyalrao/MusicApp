import { View, Text, StatusBar, StyleSheet } from "react-native";
import React from "react";
import Icons from "@expo/vector-icons/FontAwesome";

export default function Navbar() {
  return (
    <View style={sty.body}>
      <Text style={sty.text1}>Gaana</Text>
      <Icons name="gear" size={27} color={"whitesmoke"} />
    </View>
  );
}

const sty = StyleSheet.create({
  body: {
    backgroundColor: "black",
    marginTop: StatusBar.currentHeight,
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  text1: {
    color: "green",
    fontSize: 25,
  },
});
