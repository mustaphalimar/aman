import { getUserProfile, logoutUser } from "@/Services/userServices";
import { Feather, FontAwesome5, Ionicons } from "@expo/vector-icons";
<<<<<<< HEAD
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
=======
import { useFocusEffect } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useCallback, useState } from "react";
>>>>>>> a64a2fd0f3ffec9489450683bd81b7a5dcf27a67
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
<<<<<<< HEAD
=======

>>>>>>> a64a2fd0f3ffec9489450683bd81b7a5dcf27a67
import Toast from "react-native-toast-message";

const ProfileScreen: React.FC = () => {
  const [profile, setProfile] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

<<<<<<< HEAD
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getUserProfile();
        setProfile(response);
      } catch (err) {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);
=======
  useFocusEffect(
    useCallback(() => {
      const fetchProfile = async () => {
        try {
          const response = await getUserProfile();
          setProfile(response);
        } catch (err) {
          setError("Failed to load profile");
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }, [])
  );
>>>>>>> a64a2fd0f3ffec9489450683bd81b7a5dcf27a67

  const logoutHandler = async () => {
    console.log("Logging out...");
    setLoading(true);

    setTimeout(async () => {
      try {
        await logoutUser();
        Toast.show({
          type: "success",
          text1: "Logout successful",
        });
        router.replace("/auth/login");
      } catch (error) {
        Toast.show({
          type: "error",
          text1: "Logout failed",
          text2: "Check your credentials and try again : ",
        });
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  if (loading) {
    return (
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
          <Text style={styles.loadingTitle}>Logging out </Text>
          <Text style={styles.loadingSubtitle}>
            We are will signing you out a moment ...
          </Text>
        </View>
      </View>

      // <SafeAreaView
      //   style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      // >
      //   <ActivityIndicator size="large" color="#30b8b2" />
      // </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Text style={{ color: "red", fontSize: 16 }}>{error}</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.profileContainer}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarOuterRing}>
              <View style={styles.avatarInnerRing}>
                <Image
                  source={{
                    uri: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80",
                  }}
                  style={styles.avatar}
                />
                <TouchableOpacity style={styles.editAvatarButton}>
                  <Feather name="edit-2" size={18} color="white" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

<<<<<<< HEAD
          <Text style={styles.userName}>Zara Larson</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>
              {profile.username || "zaralarson12@gmail.com"}
=======
          <Text style={styles.userName}>
            {" "}
            {profile.last_name + " " + profile.first_name}
          </Text>
          <View style={styles.emailContainer}>
            <Text style={styles.emailText}>
              {profile.email || "zaralarson12@gmail.com"}
>>>>>>> a64a2fd0f3ffec9489450683bd81b7a5dcf27a67
            </Text>
          </View>

          <View style={styles.menuContainer}>
            <TouchableOpacity
              style={styles.menuItem}
              onPress={() => router.push("/(tabs)/profile/edit-profile")}
            >
              <View style={styles.menuIconContainer}>
                <Feather name="edit" size={20} color="#30b8b2" />
              </View>
              <Text style={styles.menuText}>Edit Profile</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.menuItem}>
              <View style={[styles.menuIconContainer, styles.passwordIcon]}>
                <FontAwesome5 name="lock" size={20} color="#f5a623" />
              </View>
              <Text style={styles.menuText}>Change Password</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.menuItem, styles.activeMenuItem]}
              activeOpacity={0.8}
            >
              <View style={[styles.menuIconContainer, styles.projectsIcon]}>
                <Ionicons name="briefcase-outline" size={20} color="#30b8b2" />
              </View>
              <Text style={styles.menuText}>Projects You Are In</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => logoutHandler()}
              style={styles.menuItem}
            >
              <View style={[styles.menuIconContainer, styles.logoutIcon]}>
                <Feather name="log-out" size={20} color="#f5a623" />
              </View>
              <Text style={styles.menuText}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#f0f2f5",
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  screenTitle: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
  profileContainer: {
    alignItems: "center",
    paddingTop: 20,
  },
  avatarContainer: {
    marginBottom: 20,
  },
  avatarOuterRing: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 2,
    borderColor: "#30b8b2",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarInnerRing: {
    width: 125,
    height: 125,
    borderRadius: 62.5,
    borderWidth: 2,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  avatar: {
    width: 115,
    height: 115,
    borderRadius: 57.5,
  },
  editAvatarButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#30b8b2",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e384d",
    marginBottom: 10,
  },
  emailContainer: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginBottom: 30,
  },
  emailText: {
    fontSize: 16,
    color: "#666",
  },
  menuContainer: {
    width: "90%",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 50,
    padding: 20,
    marginBottom: 15,
  },
  activeMenuItem: {
    // borderWidth: 2,
    // borderColor: "#8a56ff",
  },
  menuIconContainer: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "rgba(48, 184, 178, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  passwordIcon: {
    backgroundColor: "rgba(245, 166, 35, 0.1)",
  },
  projectsIcon: {
    backgroundColor: "rgba(48, 184, 178, 0.1)",
  },
  logoutIcon: {
    backgroundColor: "rgba(245, 166, 35, 0.1)",
  },
  menuText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#2e384d",
  },
  addButtonContainer: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
  },
  addButton: {
    backgroundColor: "#30b8b2",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
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

export default ProfileScreen;
