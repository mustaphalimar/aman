import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Slot, router } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
// Keep the splash screen visible while we fetch resources
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [appIsReady, setAppIsReady] = useState(false);
  const [initialRoute, setInitialRoute] = useState("auth/login");
  const [fontsLoaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make API calls, etc.
        // Artificially delay for demonstration
        await new Promise((resolve) => setTimeout(resolve, 2000));

        // Check if user is authenticated and if they've seen onboarding
        const isAuthenticated = await checkIfUserIsAuthenticated();
        const hasSeenOnboarding = await checkIfUserHasSeenOnboarding();

        // Determine the initial route
        if (!hasSeenOnboarding) {
          setInitialRoute("onboarding");
        } else if (!isAuthenticated) {
          setInitialRoute("auth/login");
        } else {
          setInitialRoute("(tabs)");
        }

        // Tell the application to render
        setAppIsReady(true);
      } catch (e) {
        console.warn(e);
      } finally {
        // Hide the splash screen
        await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  // Dummy functions - replace with your actual implementations
  async function checkIfUserIsAuthenticated() {
    const token = await AsyncStorage.getItem("authToken");
    return !!token;

    // This would check if the user is logged in
    //return false;
  }

  async function checkIfUserHasSeenOnboarding() {
    // This would check if the user has completed onboarding
    return false;
  }

  useEffect(() => {
    if (appIsReady && fontsLoaded && initialRoute) {
      // Navigate to the initial route once everything is ready
      // @ts-ignore
      router.replace(initialRoute);
    }
  }, [appIsReady, fontsLoaded, initialRoute]);

  // Show a loading indicator while the app is getting ready
  if (!appIsReady || !fontsLoaded || !initialRoute) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#30b8b2" />
      </View>
    );
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
        {/* Use Slot instead of Stack for the root layout */}
        <Slot />
        <Toast />
        <StatusBar style="auto" />
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
