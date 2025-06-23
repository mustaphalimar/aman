import AsyncStorage from "@react-native-async-storage/async-storage";
import apiClient from "./apiClient";

export const loginUser = async (email: string, password: string) => {
  console.log("Logging in with email:", email);
  console.log("Logging in with password:", password);
  const response = await apiClient.post("/auth/login", { email, password });
  const { token } = response.data;
  await AsyncStorage.setItem("authToken", token);
  return token;
};

export const updateInfoUser = async (
  firstName: string,
  lastName: string,
  phone: string
) => {
  console.log("New user info :", firstName + lastName + phone);
  const response = await apiClient.put("/mobile/user/profile/update", {
    firstName,
    lastName,
    phone,
  });
  const { data } = response.data;
  console.log("data responce recived after updating profile" + data);
  return data;
};

export const getUserProfile = async () => {
  const response = await apiClient.get("/mobile/user/profile/me");
  return response.data;
};

// local storage logic for user authentication

export const logoutUser = async () => {
  await AsyncStorage.removeItem("authToken");
};

export const checkIfUserIsAuthenticated = async (): Promise<boolean> => {
  const token = await AsyncStorage.getItem("authToken");
  return !!token;
};
