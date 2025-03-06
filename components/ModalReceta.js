import React from "react";
import { Modal, View, Text, TouchableOpacity } from "react-native";
import { styles } from "../styles";

export default function ModalReceta({ modalVisible, setModalVisible, recetaSeleccionada }) {
  return (
    <Modal
      animationType="slide"
      transparent={false}
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Receta Completa</Text>
          <Text style={styles.modalDescription}>{recetaSeleccionada}</Text>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}
          >
            <Text style={styles.textStyle}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}
