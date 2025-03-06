import React from "react";
import { View, Image } from "react-native";
import { styles } from "../styles";

export default function Imagen() {
  return (
    <View style={styles.imageContainer}>
      <Image
        source={{ uri: "https://placehold.co/600x200/7c3aed/FFFFFF/png" }}
        style={styles.image}
      />
    </View>
  );
}
