import React, { useState } from "react";
import { View, StyleSheet, ImageBackground, TextInput, Button, Text } from "react-native";

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    navigation.replace("DrawerNavigator");
  };

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/random/800x600?abstract" }}
      style={styles.background}
      blurRadius={5}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo!</Text>

        <TextInput
          placeholder="E-mail"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />

        <Button title="Entrar" onPress={handleLogin} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    width: "90%",
    padding: 24,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    alignItems: "center",
  },
  title: {
    marginBottom: 24,
    fontWeight: "bold",
    fontSize: 24,
  },
  input: {
    width: "100%",
    marginBottom: 12,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
  },
});
