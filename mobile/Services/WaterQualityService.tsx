import { WaterQualityAverages } from "@/intarfaces";
import apiClient from "./apiClient";

export const getLatestWaterStatus = async (deviceId: number) => {
  const response = await apiClient.get(
    `/mobile/whaterquality/status/${deviceId}`
  );
  //console.log("data recived from server of whatter quality : " + response.data);
  return response.data;
};

export const getDailyAverage = async (
  deviceId: number,
  date: string = "2025-06-18"
) => {
  const response = await apiClient.get(
    `/mobile/whaterquality/daily/raw/${deviceId}?date=${date}`
  );
  console.log("data daily average : " + response);
  return response.data as WaterQualityAverages;
};

export const getSensorCurve = async (deviceId: number, date: string) => {
  const response = await apiClient.get(
    `/mobile/whaterquality/daily/curve/${deviceId}?date=${date}`
  );
  console.log("This is for cirve data " + response);
  return response.data;
};
