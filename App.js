import React, { useState } from "react";
import { SafeAreaView, View, ScrollView } from "react-native";
import BotonCafecito from "./components/BotonCafecito";
import Input from "./components/Input";
import Loader from "./components/Loader";
import ModalReceta from "./components/ModalReceta";
import RecetaCard from "./components/RecetaCard";
import Titulo from "./components/Titulo";
import Imagen from "./components/Imagen";
import { API_KEY } from "@env";
import { styles } from "./styles";
 
export default function App() {
  const [ingredientes, setIngredientes] = useState("");
  const [recetas, setRecetas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState("");

  const obtenerReceta = async () => {
    if (!ingredientes) return;

    setCargando(true);
    const prompt = `Tengo estos ingredientes: ${ingredientes}. ¿Qué puedo cocinar? Genera 3 recetas en formato JSON, donde cada receta incluya los siguientes campos: 'titulo', 'descripcion'. Responde en español rioplatense, de manera breve e informal. Sugiere comidas típicas de Argentina y países vecinos. Evita usar caracteres como '*'`;

    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization:
        `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.0-pro-exp-02-05:free",
          messages: [{ role: "user", content: prompt }],
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        console.error("Error en la respuesta de la API:", response.status, response.statusText);
        setRecetas([
          {
            titulo: "Error",
            descripcion: `La API devolvió un error: ${response.status} ${response.statusText}`,
          },
        ]);
        return;
      }

      const data = await response.json();
      let recetaCruda = data.choices[0].message.content;

      recetaCruda = recetaCruda.replace(/`json\n/g, "").replace(/`/g, "").trim();

      try {
        const recetasJSON = JSON.parse(recetaCruda);
        // Combinar las nuevas recetas con las existentes, agregando las nuevas al principio
        setRecetas((prevRecetas) => [...recetasJSON, ...prevRecetas]);
      } catch (parseError) {
        console.error("Error al parsear el JSON:", parseError);
        setRecetas([
          { titulo: "Error", descripcion: "No se pudo entender la respuesta de la API." },
        ]);
      }
    } catch (error) {
      console.error("Error obteniendo receta:", error);
      setRecetas([{ titulo: "Error", descripcion: "Uh, hubo un error. ¿Probás de nuevo?" }]);
    } finally {
      setCargando(false);
    }
  };

  const abrirModalReceta = (descripcion) => {
    setRecetaSeleccionada(descripcion);
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Imagen />
        <Titulo />
        <Input
          ingredientes={ingredientes}
          setIngredientes={setIngredientes}
          obtenerReceta={obtenerReceta}
          cargando={cargando}
        />
        <Loader cargando={cargando} />
        <ScrollView style={styles.recipeContainer}>
          {recetas.map((receta, index) => (
            <RecetaCard
              key={index}
              receta={receta}
              abrirModalReceta={abrirModalReceta}
            />
          ))}
        </ScrollView>
        <ModalReceta
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          recetaSeleccionada={recetaSeleccionada}
        />
        <BotonCafecito />
      </View>
    </SafeAreaView>
  );
}