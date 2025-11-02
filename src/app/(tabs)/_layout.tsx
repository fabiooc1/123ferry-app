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
          borderColor: colors.border.primary,
          backgroundColor: colors.bg.secondary,
          borderWidth: 2,
          height: 72,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Inter-SemiBold",
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
        name="schedule-trip"
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

      <Tabs.Screen
        name="(schedule-trip)/schedule-details"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="(schedule-trip)/checkout"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
