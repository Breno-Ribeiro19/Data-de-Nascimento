import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";

export default function App() {
  const [dataNascimento, setDataNascimento] = useState("");
  const [idade, setIdade] = useState(null);
  const [categoria, setCategoria] = useState("");

  const calcularIdade = () => {
    const hoje = new Date();
    const nascimento = new Date(dataNascimento);

    if (isNaN(nascimento.getTime()) || nascimento > hoje) {
      setIdade(null);
      setCategoria("Data inválida");
      return;
    }

    let anos = hoje.getFullYear() - nascimento.getFullYear();
    let meses = hoje.getMonth() - nascimento.getMonth();
    let dias = hoje.getDate() - nascimento.getDate();

    if (dias < 0) {
      meses -= 1;
      dias += new Date(hoje.getFullYear(), hoje.getMonth(), 0).getDate();
    }
    if (meses < 0) {
      anos -= 1;
      meses += 12;
    }

    let faixaEtaria = "";
    if (anos <= 19) faixaEtaria = "Jovem";
    else if (anos >= 20 && anos <= 59) faixaEtaria = "Adulto";
    else faixaEtaria = "Idoso";

    setIdade({ anos, meses, dias });
    setCategoria(faixaEtaria);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Digite sua data de nascimento (YYYY-MM-DD):</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex: 2000-05-15"
        keyboardType="numeric"
        value={dataNascimento}
        onChangeText={setDataNascimento}
      />
      <Button title="Calcular Idade" onPress={calcularIdade} />

      {idade && (
        <View style={styles.resultado}>
          <Text style={styles.resultText}>Idade: {idade.anos} anos, {idade.meses} meses, {idade.dias} dias</Text>
          <Text style={styles.resultText}>Categoria: {categoria}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  resultado: {
    marginTop: 20,
    alignItems: "center",
  },
  resultText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
