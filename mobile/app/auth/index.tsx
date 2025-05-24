import { Feather } from "@expo/vector-icons";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  // Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

// const { width, height } = Dimensions.get("window");

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Top Section with Teal Background */}
      <View style={styles.topSection}>
        <Text style={styles.welcomeTitle}>Hey, Welcome!</Text>
        <Text style={styles.welcomeText}>
          Enter your details below to start monitoring your water quality in
          real-time and ensure safe, clean water every day.
        </Text>
      </View>

      {/* Bottom Section with White Background */}
      <View style={styles.bottomSection}>
        {/* Create Account Option */}
        <View style={styles.optionContainer}>
          <View style={styles.iconContainer}>
            <Feather name="user" size={32} color="#fff" />
          </View>

          <View style={styles.optionTextContainer}>
            <Text style={styles.optionTitle}>Sign In</Text>
            <Text style={styles.optionSubtitle}>Start monitoring again</Text>
          </View>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => router.push("/auth/login")}
          >
            <Text style={styles.actionButtonText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        {/* Dark Blue Section */}
        <View style={styles.darkSection}>
          {/* Scan QR Option */}
          <View style={styles.optionContainer}>
            <View style={[styles.iconContainer, styles.darkIconContainer]}>
              <Ionicons name="qr-code" size={32} color="white" />
            </View>

            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionTitle, styles.darkText]}>
                Scan Your
              </Text>
              <Text style={[styles.optionSubtitle, styles.darkText]}>
                Capteur&apos;s QR
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.actionButton, styles.darkActionButton]}
              onPress={() => router.push("/auth/scanner")}
            >
              <Text style={styles.actionButtonText}>Scanner</Text>
            </TouchableOpacity>
          </View>

          {/* Login Link at Bottom */}
          {/* <View style={styles.loginLinkContainer}>
            <Text style={styles.loginLinkText}>Already have an account</Text>
            <TouchableOpacity onPress={() => router.push("/auth/login")}>
              <Text style={styles.loginLink}>Login</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#30b8b2",
  },
  topSection: {
    flex: 0.4,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
  welcomeTitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  welcomeText: {
    fontSize: 16,
    color: "white",
    textAlign: "center",
    lineHeight: 24,
  },
  bottomSection: {
    flex: 0.6,
    backgroundColor: "#f5f7fa",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  optionContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 25,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 15,
    backgroundColor: "#b0b0b0",
    justifyContent: "center",
    alignItems: "center",
  },
  darkIconContainer: {
    backgroundColor: "#3a4a64",
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 15,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e2a47",
  },
  optionSubtitle: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  actionButton: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  actionButtonText: {
    color: "#30b8b2",
    fontSize: 16,
    fontWeight: "600",
  },
  darkSection: {
    flex: 1,
    backgroundColor: "#1e2a47",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    justifyContent: "space-between",
  },
  darkText: {
    color: "white",
  },
  darkActionButton: {
    backgroundColor: "white",
    borderColor: "transparent",
  },
  loginLinkContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 40,
  },
  loginLinkText: {
    color: "#8a9ab0",
    fontSize: 14,
    marginRight: 5,
  },
  loginLink: {
    color: "#30b8b2",
    fontSize: 14,
    fontWeight: "600",
  },
});
