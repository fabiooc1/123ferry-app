import { colors } from "@/constants/colors";
import { Tabs } from "expo-router";
import {
  HouseIcon,
  ShoppingCartSimpleIcon,
  TicketIcon,
  UserIcon
} from "phosphor-react-native";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.icon.primary,
        tabBarActiveTintColor: colors.icon.secondary,
        tabBarStyle: {
          backgroundColor: colors.bg.secondary,
          borderColor: colors.border.primary,
          borderWidth: 1,
          paddingVertical: 6,
          paddingHorizontal: 44,
          height: 88,
        },
        tabBarIconStyle: {
          width: 28,
          height: 28
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarLabel: "Inicio",
          tabBarIcon: ({ color, size }) => (
            <HouseIcon color={color} size={size} weight="bold" />
          ),
        }}
      />

      <Tabs.Screen
        name="schedule-ticket"
        options={{
          tabBarLabel: "Passagens",
          tabBarIcon: ({ color, size }) => (
            <TicketIcon color={color} size={size} weight="bold" />
          ),
        }}
      />

      <Tabs.Screen
        name="purchases"
        options={{
          tabBarLabel: "Compras",
          tabBarIcon: ({ color, size }) => (
            <ShoppingCartSimpleIcon color={color} size={size} weight="bold" />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "Perfil",
          tabBarIcon: ({ color, size }) => (
            <UserIcon color={color} size={size} weight="bold" />
          ),
        }}
      />
    </Tabs>
  );
}
