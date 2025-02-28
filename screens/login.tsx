import React, { useState, useEffect } from "react";
import { View, StyleSheet, ImageBackground, TextInput, Text, TouchableOpacity, Switch } from "react-native";
import * as SecureStore from 'expo-secure-store';

export default function LoginScreen({ navigation }: any) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  // Estados de configurações
  const [host, setHost] = useState("");
  const [port, setPort] = useState("");
  const [https, setHttps] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  useEffect(() => {
    const loadCredentials = async () => {
      const savedEmail = await SecureStore.getItemAsync("email");
      const savedPassword = await SecureStore.getItemAsync("password");
      const savedRememberMe = await SecureStore.getItemAsync("rememberMe");

      if (savedEmail && savedPassword && savedRememberMe === "true") {
        setEmail(savedEmail);
        setPassword(savedPassword);
        setRememberMe(true);
      }

      // Carregar configurações de host, porta e HTTPS
      const savedHost = await SecureStore.getItemAsync("host");
      const savedPort = await SecureStore.getItemAsync("port");
      const savedHttps = await SecureStore.getItemAsync("https");

      if (savedHost) setHost(savedHost);
      if (savedPort) setPort(savedPort);
      if (savedHttps === "true") setHttps(true);
    };

    loadCredentials();
  }, []);

  // Função para salvar as credenciais
  const handleSaveCredentials = async () => {
    if (rememberMe) {
      await SecureStore.setItemAsync("email", email);
      await SecureStore.setItemAsync("password", password);
      await SecureStore.setItemAsync("rememberMe", "true");
    } else {
      await SecureStore.deleteItemAsync("email");
      await SecureStore.deleteItemAsync("password");
      await SecureStore.deleteItemAsync("rememberMe");
    }
  };

  // Função para salvar as configurações
  const handleSaveSettings = async () => {
    await SecureStore.setItemAsync("host", host);
    await SecureStore.setItemAsync("port", port);
    await SecureStore.setItemAsync("https", https ? "true" : "false");
    setIsSettingsVisible(false);  // Voltar para a tela de login
  };

  // Função para cancelar as configurações
  const handleCancelSettings = () => {
    setIsSettingsVisible(false);  // Voltar para a tela de login sem salvar
  };

  const handleLogin = () => {
    handleSaveCredentials();
    navigation.replace("DrawerNavigator"); // Navega para o DrawerNavigator após o login
  };

  return (
    <ImageBackground
      source={{ uri: "https://source.unsplash.com/random/800x600?abstract" }}
      style={styles.background}
      blurRadius={5}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Bem-vindo!</Text>

        {!isSettingsVisible ? (
          <>
            {/* Tela de Login */}
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

            <View style={styles.rememberMeContainer}>
              <Switch
                value={rememberMe}
                onValueChange={setRememberMe}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={rememberMe ? "#f5dd4b" : "#f4f3f4"}
                style={styles.switch}
              />
              <Text style={styles.rememberMeText}>Salvar credenciais</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
              <Text style={styles.buttonText}>Entrar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.settingsButton]} onPress={() => setIsSettingsVisible(true)}>
              <Text style={styles.buttonText}>Configurações</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Tela de Configurações */}
            <TextInput
              placeholder="Host"
              value={host}
              onChangeText={setHost}
              style={styles.input}
            />

            <TextInput
              placeholder="Porta"
              value={port}
              onChangeText={setPort}
              keyboardType="numeric"
              style={styles.input}
            />

            <View style={styles.rememberMeContainer}>
              <Switch
                value={https}
                onValueChange={setHttps}
                trackColor={{ false: "#767577", true: "#81b0ff" }}
                thumbColor={https ? "#f5dd4b" : "#f4f3f4"}
                style={styles.switch}
              />
              <Text style={styles.rememberMeText}>Usar HTTPS</Text>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleSaveSettings}>
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancelSettings}>
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(169, 169, 169, 0.7)", 
    alignItems: "center",
  },
  overlay: {
    width: "90%",
    padding: 24,
    borderRadius: 12,
    backgroundColor: "rgba(235, 230, 230, 0.9)",
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
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 25,
    backgroundColor: "#4CAF50",
    marginBottom: 12,
    alignItems: "center",
  },
  settingsButton: {
    backgroundColor: "rgba(169, 169, 169, 0.7)", // Botão cinza transparente
  },
  cancelButton: {
    backgroundColor: "rgba(255, 0, 0, 0.7)", // Botão vermelho transparente
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  rememberMeContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  switch: {
    marginRight: 8,
  },
  rememberMeText: {
    fontSize: 14,
  },
});
