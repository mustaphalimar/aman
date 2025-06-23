import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'http://192.168.4.207:8080/api', 
  //baseURL: 'https://aman-production-e7eb.up.railway.app/api', 
});


apiClient.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('authToken');
  console.log("token:" + token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default apiClient;