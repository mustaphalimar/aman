import { colors } from "@/constants/tokens";
import { getUserProfile, updateInfoUser } from "@/Services/userServices";
import { BlurView } from "expo-blur";
import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Toast from "react-native-toast-message";
import * as Yup from "yup";

const EditProfileScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserInfo = async () => {
    try {
      const userData = await getUserProfile();
      console.log("user geting for edit profile : " + userData.phone);
      setUser(userData);
    } catch (error) {
      console.error("Failed to fetch user info:", error);
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handleSave = async (values) => {
    setIsLoading(true);

    setTimeout(async () => {
      try {
        await updateInfoUser(
          values.firstName,
          values.lastName,
          values.phoneNumber
        );
        Toast.show({
          type: "success",
          text1: "Update successful",
        });
        await fetchUserInfo();
      } catch (error) {
        console.log("error : " + error.message);
        Toast.show({
          type: "error",
          text1: "Update failed",
          text2: "Check your credentials and try again : " + error.message,
        });
      } finally {
        setIsLoading(false);
      }
    }, 3000);
  };

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().required("Phone is required"),
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
  });

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.formContainer}>
            <Formik
              enableReinitialize={true}
              initialValues={{
                email: user?.email || "",
                lastName: user?.last_name || "",
                firstName: user?.first_name || "",
                phoneNumber: user?.phone || "",
              }}
              validationSchema={validationSchema}
              onSubmit={handleSave}
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
                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Last Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your Last name"
                      autoCapitalize="none"
                      value={values.lastName}
                      onChangeText={handleChange("lastName")}
                      onBlur={() => {
                        handleBlur("lastName");
                        setFieldTouched("lastName", true);
                      }}
                    />
                    {touched.lastName && errors.lastName && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.lastName}
                      </Text>
                    )}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>First Name</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Enter your First name"
                      autoCapitalize="none"
                      value={values.firstName}
                      onChangeText={handleChange("firstName")}
                      onBlur={() => {
                        handleBlur("firstName");
                        setFieldTouched("firstName", true);
                      }}
                    />

                    {touched.firstName && errors.firstName && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.firstName}
                      </Text>
                    )}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Phone Number</Text>
                    <TextInput
                      placeholder="Enter your phone number"
                      keyboardType="phone-pad"
                      style={styles.input}
                      autoCapitalize="none"
                      value={values.phoneNumber}
                      onChangeText={handleChange("phoneNumber")}
                      onBlur={() => {
                        handleBlur("phoneNumber");
                        setFieldTouched("phoneNumber", true);
                      }}
                    />

                    {touched.phoneNumber && errors.phoneNumber && (
                      <Text style={{ color: "red", marginBottom: 8 }}>
                        {errors.phoneNumber}
                      </Text>
                    )}
                  </View>

                  <View style={styles.inputGroup}>
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                      style={[
                        styles.input,
                        { backgroundColor: "#f0f0f0", color: "#888" },
                      ]}
                      value={values.email}
                      placeholder="Enter your email"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      editable={false}
                    />
                  </View>

                  <TouchableOpacity
                    style={styles.saveButton}
                    onPress={handleSubmit}
                  >
                    <Text style={styles.saveButtonText}>Save Changes</Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

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
            <Text style={styles.loadingTitle}>Updating Profile </Text>
            <Text style={styles.loadingSubtitle}>
              We are will signing you in a moment.
            </Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
  },
  formContainer: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    marginTop: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2e384d",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#f8f9fa",
    borderRadius: 10,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#e1e4e8",
  },
  saveButton: {
    backgroundColor: colors.primary,
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "white",
    fontSize: 16,
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

export default EditProfileScreen;
