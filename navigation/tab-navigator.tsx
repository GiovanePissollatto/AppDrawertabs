import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList } from ".";
import { HeaderButton } from "../components/HeaderButton";
import { TabBarIcon } from "../components/TabBarIcon";
import One from "../screens/one";
import Two from "../screens/two";

const Tab = createBottomTabNavigator();

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;

export default function TabLayout({ navigation }: Props) {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",

        headerShown: false,
      }}
    >
      <Tab.Screen
        name="One"
        component={One}
        options={{
          title: "Primeira aba",
          tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          headerRight: () => (
            <HeaderButton onPress={() => navigation.navigate("Modal")} />
          ),
        }}
      />
      <Tab.Screen
        name="Two"
        component={Two}
        options={{
          title: "Segunda aba",
          tabBarIcon: ({ color }) => <TabBarIcon name="question" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}
