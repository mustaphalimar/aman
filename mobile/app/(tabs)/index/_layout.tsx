import { Stack } from "expo-router";
import React from "react";

export default function HomeStackLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: "#f0f2f5" },
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen name="index" />
      {/* Comment out or remove these screens until you create the actual files */}
      {/* <Stack.Screen
        name="water-details"
        options={{
          headerShown: true,
          title: "Water Quality Details",
          headerTintColor: colors.primary,
          presentation: "card"
        }}
      />
      <Stack.Screen
        name="add-measurement"
        options={{
          headerShown: true,
          title: "Add Measurement",
          headerTintColor: colors.primary,
          presentation: "modal"
        }}
      /> */}
    </Stack>
  );
}
