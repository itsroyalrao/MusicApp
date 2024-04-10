import { View, Text } from "react-native";
import React from "react";
import tw from "twrnc";

export default function Login() {
  return (
    <View style={tw`flex pt-40`}>
      <Text style={tw`flex justify-center items-center text-2xl text-white`}>
        Login
      </Text>
    </View>
  );
}
