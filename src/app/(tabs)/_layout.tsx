import { colors } from "@/constants/colors";
import { Tabs } from "expo-router";
import {
  HouseIcon,
  ShoppingCartSimpleIcon,
  TicketIcon,
  UserIcon,
} from "phosphor-react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: colors.icon.primary,
        tabBarActiveTintColor: colors.icon.secondary,
      }}
      safeAreaInsets={{
        bottom: insets.bottom,
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
        name="checkout"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="schedule-details"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="purchase-details"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}
