import { useDeviceId } from "@/hooks/use-device-id";
import { loginUser } from "@/Services/userServices";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { BarCodeScannerResult } from "expo-barcode-scanner";
import { BlurView } from "expo-blur";
import { CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

interface DeviceData {
  deviceId: string;
  deviceName: string;
  serialNumber: string;
  email: string;
  password: string;
  timestamp: string;
}

export default function ScannerScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [enableTorch, setEnableTorch] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const useDeviceIdHook = useDeviceId();

  useEffect(() => {
    if (!permission) {
      requestPermission();
    }
  }, [permission, requestPermission]);

  const handleBarCodeScanned = async (result: BarCodeScannerResult) => {
    if (scanned || isProcessing) return;

    setScanned(true);
    setIsProcessing(true);

    try {
      // Validate QR code format for water quality device
      const deviceData = validateDeviceQRCode(result.data);

      if (deviceData) {
        // Show device detected message
        useDeviceIdHook.setDeviceId(deviceData.deviceId);

        Toast.show({
          type: "info",
          text1: "Device Detected!",
          text2: `${deviceData.deviceName} - ${deviceData.deviceId}`,
        });

        // Automatically attempt login with QR credentials
        await handleQRLogin(deviceData);
      } else {
        // Invalid QR code
        Toast.show({
          type: "error",
          text1: "Invalid QR Code",
          text2: "Not a valid water quality device QR code",
        });
        resetScanner();
      }
    } catch (error) {
      console.error("QR Code processing error:", error);
      Toast.show({
        type: "error",
        text1: "Scan Error",
        text2: "Failed to process QR code",
      });
      resetScanner();
    }

    setIsProcessing(false);
  };

  const validateDeviceQRCode = (qrData: string): DeviceData | null => {
    try {
      const deviceInfo = JSON.parse(qrData);

      // Validate required fields including authentication
      if (
        deviceInfo.deviceId &&
        deviceInfo.model &&
        deviceInfo.serialNumber &&
        deviceInfo.email &&
        deviceInfo.password
      ) {
        return {
          deviceId: deviceInfo.deviceId,
          deviceName: deviceInfo.deviceName,
          serialNumber: deviceInfo.serialNumber,
          email: deviceInfo.email,
          password: deviceInfo.password,
          timestamp: new Date().toISOString(),
        };
      }

      return null;
    } catch (error) {
      // Try alternative format: Extended string format with credentials
      // Example: "WQ001234-AquaSensorPro-AS2024001234-hamza@gmail.com-123456"
      if (typeof qrData === "string" && qrData.includes("WQ")) {
        const parts = qrData.split("-");
        if (parts.length >= 5) {
          return {
            deviceId: parts[0],
            deviceName: parts[1],
            serialNumber: parts[2],
            email: parts[3],
            password: parts[4],
            timestamp: new Date().toISOString(),
          };
        }
      }

      return null;
    }
  };

  const handleQRLogin = async (deviceData: DeviceData) => {
    try {
      console.log("Attempting QR login with device:", deviceData.deviceId);
      console.log("Attempting QR login with email:", deviceData.email);
      console.log("Attempting QR login with password:", deviceData.password);

      // Show logging in message
      Toast.show({
        type: "info",
        text1: "Logging in...",
        text2: "Authenticating with device credentials",
      });

      //await loginUser(deviceData.email, deviceData.password);
      //const token = await loginUser(deviceData.email, deviceData.password);

      await simulateLogin(deviceData.email, deviceData.password);

      // Store device information for later use
      //await storeDeviceInfo(deviceData);

      // Show success message
      Toast.show({
        type: "success",
        text1: "Login Successful!",
        text2: `Welcome! Device ${deviceData.deviceId} connected`,
      });

      // Navigate to dashboard/tabs
      router.replace("/(tabs)/index");
    } catch (error) {
      console.error("QR Login failed:", error);

      // Show error message and offer manual login option
      Alert.alert(
        "Login Failed",
        `Authentication failed with device credentials.\n\nDevice: ${deviceData.deviceId}\nEmail: ${deviceData.email}\n\nWould you like to try manual login?`,
        [
          {
            text: "Scan Again",
            style: "cancel",
            onPress: () => resetScanner(),
          },
          {
            text: "Manual Login",
            onPress: () => {
              // Navigate to manual login with pre-filled email
              router.push({
                pathname: "/auth/login",
                params: {
                  email: deviceData.email,
                  deviceData: JSON.stringify(deviceData),
                },
              });
            },
          },
        ],
      );
    }
  };

  const simulateLogin = async (email: string, password: string) => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await loginUser(email, password);
        Toast.show({
          type: "success",
          text1: "Login successful",
        });
        router.replace("/(tabs)/index");
      } catch (error) {
        console.log("error : " + error.message);
        Toast.show({
          type: "error",
          text1: "Login failed",
          text2: "Check your credentials and try again : " + error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }, 3000);
    /*
  const simulateLogin = async (
    email: string,
    password: string
  ): Promise<void> => {
    // Simulate API call delay - replace with actual loginUser(email, password)
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate random success/failure for demo
        if (Math.random() > 0.2) {
          // 80% success rate
          resolve();
        } else {
          reject(new Error("Invalid credentials"));
        }
      }, 2000);
    });
  };
*/
  };

  const resetScanner = () => {
    setScanned(false);
    setIsProcessing(false);
  };

  const toggleFlash = () => {
    setEnableTorch(!enableTorch);
  };

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.loadingText}>Requesting camera permission...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.centerContainer}>
        <View style={styles.permissionContainer}>
          <Ionicons name="camera-off" size={64} color="#666" />
          <Text style={styles.permissionTitle}>Camera Access Required</Text>
          <Text style={styles.permissionText}>
            We need access to your camera to scan the QR code on your water
            quality device.
          </Text>
          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>Go Back</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Scan Device QR Code</Text>
        <TouchableOpacity style={styles.flashBtn} onPress={toggleFlash}>
          <Ionicons
            name={enableTorch ? "flash" : "flash-off"}
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>

      {/* Camera View */}
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          enableTorch={enableTorch}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
        />

        {/* Scanning Overlay */}
        <View style={styles.overlay}>
          <View style={styles.scanningArea}>
            <View style={[styles.corner, styles.topLeft]} />
            <View style={[styles.corner, styles.topRight]} />
            <View style={[styles.corner, styles.bottomLeft]} />
            <View style={[styles.corner, styles.bottomRight]} />

            {isProcessing && (
              <View style={styles.processingOverlay}>
                <MaterialIcons name="check-circle" size={64} color="#4CAF50" />
                <Text style={styles.processingText}>Processing...</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      {/* Instructions */}
      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>How to scan:</Text>
        <Text style={styles.instructionsText}>
          1. Point your camera at the QR code on your water quality device
        </Text>
        <Text style={styles.instructionsText}>
          2. The device will automatically authenticate and log you in
        </Text>
        <Text style={styles.instructionsText}>
          3. Wait for automatic detection and processing
        </Text>

        {scanned && !isProcessing && (
          <TouchableOpacity style={styles.rescanButton} onPress={resetScanner}>
            <Text style={styles.rescanButtonText}>Scan Again</Text>
          </TouchableOpacity>
        )}
      </View>

      {isLoading && (
        <View style={styles.loadingOverlay}>
          <BlurView
            intensity={5}
            style={{
              ...StyleSheet.absoluteFillObject,
              overflow: "hidden",
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
            }}
          />
          <View style={styles.loadingCard}>
            <ActivityIndicator size="large" color="#30b8b2" />
            <Text style={styles.loadingTitle}>Welcome back </Text>
            <Text style={styles.loadingSubtitle}>
              We are will signing you in a moment.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1a1a1a",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingVertical: 10,
    backgroundColor: "#2d5a5a",
  },
  backBtn: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  flashBtn: {
    padding: 5,
  },
  cameraContainer: {
    flex: 1,
    position: "relative",
  },
  camera: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  scanningArea: {
    width: 250,
    height: 250,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  corner: {
    position: "absolute",
    width: 30,
    height: 30,
    borderColor: "#00d4aa",
    borderWidth: 3,
  },
  topLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  topRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  processingOverlay: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    padding: 20,
    borderRadius: 10,
  },
  processingText: {
    color: "white",
    fontSize: 16,
    marginTop: 10,
  },
  instructionsContainer: {
    backgroundColor: "white",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  instructionsTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 15,
  },
  instructionsText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
    lineHeight: 20,
  },
  rescanButton: {
    backgroundColor: "#2d5a5a",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    alignSelf: "center",
    marginTop: 15,
  },
  rescanButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  permissionTitle: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333",
    marginTop: 20,
    marginBottom: 10,
  },
  permissionText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    lineHeight: 24,
    marginBottom: 30,
  },
  permissionButton: {
    backgroundColor: "#2d5a5a",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    marginBottom: 15,
  },
  permissionButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  backButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  backButtonText: {
    color: "#666",
    fontSize: 16,
  },
  loadingText: {
    fontSize: 16,
    color: "#666",
  },

  // Loading overlay styles
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(30, 42, 71, 0.8)", // Dark blue with opacity
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    backdropFilter: "blur(10px)", // Add blur effect
  },
  loadingCard: {
    backgroundColor: "white",
    borderRadius: 20,
    padding: 30,
    width: "80%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1e2a47",
    marginTop: 20,
    marginBottom: 10,
    textAlign: "center",
  },
  loadingSubtitle: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    lineHeight: 20,
  },
});
