import React from "react";
import { ActivityIndicator } from "react-native";
import { styles } from "../styles";

export default function Loader({ cargando }) {
  return cargando ? <ActivityIndicator size="large" color="#7c3aed" style={styles.loader} /> : null;
}
