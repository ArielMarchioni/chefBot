import React from "react";
import { View, Text } from "react-native";
import { styles } from "../styles";

export default function Titulo() {
  return (
    <View style={styles.titleContainer}>
      <Text style={styles.title}>‍ ¿Qué tenés en la heladera?</Text>
    </View>
  );
}
