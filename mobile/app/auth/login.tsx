import { loginUser } from "@/Services/userServices";
import { Feather } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import {
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";

import { Formik } from "formik";
import { Keyboard } from "react-native";
import * as Yup from "yup";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (values) => {
    Keyboard.dismiss();

    setIsLoading(true);

    console.log("Logging in with values:", values);
    setTimeout(async () => {
      try {
        await loginUser(values.email, values.password);
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
    // Simulate login process
     // 3 seconds delay to show the loading state
    */
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Min 6 characters")
      .required("Password is required"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "height" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 40 : 50}
      >
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../../assets/images/logo.png")}
              style={styles.logo}
            />
            <Text style={styles.appName}>Water Quality</Text>
          </View>

          <Text style={styles.title}>Welcome Back</Text>
          <Text style={styles.subtitle}>Sign in to continue</Text>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
              setFieldTouched,
            }) => (
              <>
                <View style={styles.form}>
                  <View style={styles.inputContainer}>
                    <Feather
                      name="mail"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      value={values.email}
                      onChangeText={handleChange("email")}
                      onBlur={() => {
                        handleBlur("email");
                        setFieldTouched("email", true);
                      }}
                    />
                    {touched.email && errors.email && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.email}
                      </Text>
                    )}
                  </View>

                  <View style={styles.inputContainer}>
                    <Feather
                      name="lock"
                      size={20}
                      color="#666"
                      style={styles.inputIcon}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Password"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!showPassword}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      onBlur={() => {
                        handleBlur("password");
                        setFieldTouched("password", true);
                      }}
                    />
                    {touched.password && errors.password && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.password}
                      </Text>
                    )}
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                      style={styles.eyeIcon}
                    >
                      <Feather
                        name={showPassword ? "eye" : "eye-off"}
                        size={20}
                        color="#666"
                      />
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity
                    onPress={() => router.push("/auth/forgot-password")}
                    style={styles.forgotPasswordContainer}
                  >
                    <Text style={styles.forgotPasswordText}>
                      Forgot Password?
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={handleSubmit}
                    disabled={isLoading}
                  >
                    <Text style={styles.loginButtonText}>Login</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>

          {/* <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => router.push("/auth/signup")}>
              <Text style={styles.signupLink}>Sign Up</Text>
            </TouchableOpacity>
          </View> */}
        </View>
      </KeyboardAvoidingView>

      {/* Loading Overlay */}
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
    backgroundColor: "#fff",
  },
  keyboardView: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  appName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#30b8b2",
    marginTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2e384d",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 30,
  },
  form: {
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#e1e4e8",
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f8f9fa",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  forgotPasswordText: {
    color: "#30b8b2",
    fontSize: 14,
  },
  loginButton: {
    backgroundColor: "#30b8b2",
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: "center",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  signupText: {
    color: "#666",
    fontSize: 14,
  },
  signupLink: {
    color: "#30b8b2",
    fontSize: 14,
    fontWeight: "600",
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
