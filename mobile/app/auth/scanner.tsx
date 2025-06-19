import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Feather } from "@expo/vector-icons";

export default function ScannerScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Feather name="arrow-left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Device QR Code</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.mockScannerContainer}>
        <View style={styles.scanner}>
          <Feather name="camera" size={50} color="#30b8b2" />
        </View>

        <Text style={styles.instructionText}>
          Camera access is required to scan QR codes
        </Text>

        <TouchableOpacity
          style={styles.mockScanButton}
          onPress={() => {
            alert("QR code scanned successfully!");
            router.replace("/(tabs)/index");
          }}
        >
          <Text style={styles.mockScanButtonText}>
            Simulate Successful Scan
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e2a47",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  placeholder: {
    width: 40,
  },
  mockScannerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  scanner: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: "#30b8b2",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
  },
  instructionText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 30,
  },
  mockScanButton: {
    backgroundColor: "#30b8b2",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  mockScanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
