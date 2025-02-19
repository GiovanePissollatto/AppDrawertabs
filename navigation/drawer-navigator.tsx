import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StackScreenProps } from "@react-navigation/stack";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { HeaderButton } from "components/HeaderButton";

import { RootStackParamList } from ".";
import TabNavigator from "./tab-navigator";
import Home from "../screens/home";
import LoginScreen from "../screens/login"; 

type Props = StackScreenProps<RootStackParamList, "DrawerNavigator">;

const Drawer = createDrawerNavigator();

const CustomDrawerContent = ({ navigation }: any) => {
  return (
    <View style={styles.drawerContent}>
      {/* Imagem do logo no topo, centralizado */}
      <View style={styles.userIconContainer}>
        <Image 
          source={require('../assets/logo.png')} 
          style={styles.logoImage} 
          resizeMode="contain" 
        />
      </View>

      <View style={styles.menuItems}>
        {/* Menu para a tela Home */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("Home")}>
          <Ionicons name="home" size={24} color="black" />
          <Text style={styles.menuText}>Home</Text>
        </TouchableOpacity>

        {/* Menu para a tela TabNavigator */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("TabNavigator")}>
          <MaterialIcons name="account-tree" size={24} color="black" />
          <Text style={styles.menuText}>Opções</Text>
        </TouchableOpacity>

        {/* Menu para a tela de Login (opcional, se desejar ter uma opção de logout ou login) */}
        <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate("LoginScreen")}>
          <Ionicons name="log-in" size={24} color="black" />
          <Text style={styles.menuText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function DrawerNavigator({ navigation }: Props) {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={Home}
        options={{
          drawerIcon: ({ size, color }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="TabNavigator"
        component={TabNavigator}
        options={{
          headerRight: () => (
            <HeaderButton onPress={() => navigation.navigate("Modal")} />
          ),
          drawerIcon: ({ size, color }) => (
            <MaterialIcons name="account-tree" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    paddingTop: 50,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  userIconContainer: {
    marginBottom: 30, 
    justifyContent: "center",
    alignItems: "center",
  },
  logoImage: {
    width: 110,  
    height: 110, 
    borderRadius: 40, 
  },
  menuItems: {
    width: "100%",
    paddingLeft: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  menuText: {
    marginLeft: 10,
    fontSize: 16,
    color: "black",
  },
});
