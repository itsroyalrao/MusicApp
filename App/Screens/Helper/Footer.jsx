import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Icons from '@expo/vector-icons/FontAwesome'

export default function Footer() {
  return (
    <View style={sty.body}>
      <Icons name='home' size={27} color={'whitesmoke'} />
      <Icons name='search' size={27} color={'whitesmoke'} />
      <Icons name="heart" size={27} color={'whitesmoke'} />
    </View>
  )
}

const sty = StyleSheet.create({
  body: {
    backgroundColor: "black",
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // borderTopColor: 'whitesmoke',
    // borderTopWidth: 0.2
  },
  text1: {
    color: "red",
    fontSize: 25
  },
});