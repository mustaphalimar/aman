import { Stack } from "expo-router";
import React from "react";
import { colors } from "@/constants/tokens";

export default function StatisticsStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f0f2f5" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="detailed-stats"
        options={{
          headerShown: true,
          title: "Detailed Statistics",
          headerTintColor: colors.primary,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="export-data"
        options={{
          headerShown: true,
          title: "Export Data",
          headerTintColor: colors.primary,
          presentation: "modal",
        }}
      />
    </Stack>
  );
}
