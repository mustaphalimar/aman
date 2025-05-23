import { Stack } from "expo-router";
import React from "react";
import { colors } from "@/constants/tokens";

export default function ProfileStackLayout() {
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
        name="edit-profile"
        options={{
          headerShown: true,
          title: "Edit Profile",
          headerTintColor: colors.primary,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="change-password"
        options={{
          headerShown: true,
          title: "Change Password",
          headerTintColor: colors.primary,
          presentation: "card",
        }}
      />
      <Stack.Screen
        name="projects"
        options={{
          headerShown: true,
          title: "Your Projects",
          headerTintColor: colors.primary,
          presentation: "card",
        }}
      />
    </Stack>
  );
}
