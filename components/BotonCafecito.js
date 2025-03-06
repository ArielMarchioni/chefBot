import React from "react";
import { TouchableOpacity, Image , Linking} from "react-native";
import { styles } from "../styles";

export default function BotonCafecito() {
  const abrirCafecito = () => {
    Linking.openURL("https://cafecito.app/nintendo");
  };

  return (
    <TouchableOpacity style={styles.cafecitoButton} onPress={abrirCafecito}>
      <Image
        source={{ uri: 'https://cdn.cafecito.app/imgs/buttons/button_3.png' }}
        style={styles.cafecitoImage}
        resizeMode="contain"
      />
    </TouchableOpacity>
  );
}
