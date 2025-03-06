import React from "react";
import { Pressable, View, Text, Image } from "react-native";
import { styles } from "../styles";

export default function RecetaCard({ receta, abrirModalReceta }) {
  return (
    <Pressable
      style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }, styles.wrapperCustom]}
      onPress={() => abrirModalReceta(receta.descripcion)}
    >
      <View style={styles.card}>
        <Image
          source={{ uri: "https://placehold.co/100x100/7c3aed/FFFFFF/png" }}
          style={styles.cardImage}
        />
        <View style={styles.cardContent}>
          <Text style={styles.cardTitle}>{receta.titulo}</Text>
          <Text style={styles.cardText} numberOfLines={3} ellipsizeMode="tail">
            {receta.descripcion}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
