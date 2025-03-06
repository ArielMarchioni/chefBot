import React from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles";

export default function Input({ ingredientes, setIngredientes, obtenerReceta, cargando }) {
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={[styles.input, focused && styles.inputFocused]}  
        placeholder="Ej: huevo, pan, queso..."
        placeholderTextColor="#999"
        value={ingredientes}
        onChangeText={setIngredientes}
        onFocus={() => setFocused(true)}  // Aplica el borde cuando el input recibe el foco
        onBlur={() => setFocused(false)}   // Elimina el borde cuando pierde el foco
      />
      <TouchableOpacity style={styles.button} onPress={obtenerReceta} disabled={cargando}>
        <Ionicons name="search" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}
