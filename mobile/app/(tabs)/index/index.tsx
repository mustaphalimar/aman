import { WaterQualityStatus } from "@/intarfaces";
import { getLatestWaterStatus } from "@/Services/WaterQualityService";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LineChart } from "react-native-chart-kit";

const screenWidth = Dimensions.get("window").width;

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
    color: (opacity: number) => string;
    strokeWidth: number;
  }[];
}

interface ChartConfig {
  backgroundGradientFrom: string;
  backgroundGradientTo: string;
  decimalPlaces: number;
  color: (opacity: number) => string;
  labelColor: (opacity: number) => string;
  style: {
    borderRadius: number;
  };
  propsForDots: {
    r: string;
    strokeWidth: string;
    stroke: string;
  };
  fillShadowGradient: string;
  fillShadowGradientOpacity: number;
}

const HomeScreen: React.FC = () => {
  const [statusData, setStatusData] = useState<WaterQualityStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [colorStatus, setColorStatus] = useState("");

  const deviceId = 1; // change as needed

  const data: ChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
        color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };

  const chartConfig: ChartConfig = {
    backgroundGradientFrom: "#f8f9fa",
    backgroundGradientTo: "#f8f9fa",
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#30b8b2",
    },
    fillShadowGradient: "rgba(0, 122, 255, 0.2)",
    fillShadowGradientOpacity: 0.5,
  };

  const [isMounted, setIsMounted] = useState(false);

  const {
    data: db,
    isLoading: isl,
    error,
  } = useQuery({
    queryKey: ["dashboard_data", deviceId],
    queryFn: async () => {
      try {
        const result = await getLatestWaterStatus(deviceId);
        console.log("Fetched data:", result);
        return result;
      } catch (error) {
        console.error("Error in queryFn:", error);
        throw error;
      }
    },
    refetchInterval: 5000,
    staleTime: 0, // Always consider data stale
    cacheTime: 0, // Don't cache data
    retry: 3,
    retryDelay: 1000,
    onSuccess: (data) => {
      console.log("Query successful, data:", data);
      if (data?.status) {
        setColorStatus(getStatusColor(data.status));
      }
    },
    onError: (error) => {
      console.error("Query error:", error);
    },
  });

  // Alternative approach - using useEffect with React Query data
  useEffect(() => {
    if (db?.status) {
      const newColorStatus = getStatusColor(db.status);
      setColorStatus(newColorStatus);
      console.log("Updated color status:", newColorStatus);
    }
  }, [db?.status]);

  // Handle error state
  if (error) {
    console.error("Data fetching error:", error);
  }

  // useEffect(() => {
  //   setIsMounted(true);

  //   const fetchData = async () => {
  //     try {
  //       const data = await getLatestWaterStatus(deviceId);

  //       if (isMounted) {
  //         setStatusData(data);
  //         setColorStatus(getStatusColor(data?.status));
  //         //console.log(data);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching water data:", error);
  //     } finally {
  //       if (isMounted) setIsLoading(false);
  //     }
  //   };

  //   fetchData(); // initial fetch

  //   const interval = setInterval(() => {
  //     fetchData();
  //   }, 5000); // fetch every 5 seconds

  //   return () => {
  //     setIsMounted(false);
  //     clearInterval(interval);
  //   };
  // }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={[styles.welcomeCard, { backgroundColor: colorStatus }]}>
          <Text style={styles.welcomeText}>Hi, Hamza!</Text>

          <View style={styles.waterQualityCard}>
            <View style={styles.waterQualityContent}>
              <View
                style={[
                  styles.waterQualityIndicator,
                  { backgroundColor: colorStatus },
                ]}
              />
              <View style={styles.waterQualityTextContainer}>
                <Text style={styles.waterQualityLabel}>
                  Niveau de qualité de l&apos;eau
                </Text>
                <Text
                  style={[styles.waterQualityValue, { color: colorStatus }]}
                >
                  {db?.status}
                </Text>
              </View>
            </View>
            <Feather name="chevron-right" size={24} color="#ccc" />
          </View>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statsHeader}>
            <Text style={styles.statsTitle}>Statistiques</Text>
            <TouchableOpacity onPress={() => router.push("/(tabs)/statistics")}>
              <Text style={styles.viewAllText}>View All</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Day</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.tab}>
              <Text style={styles.tabText}>Week</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.tab, styles.activeTab]}>
              <Text style={[styles.tabText, styles.activeTabText]}>Month</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.chartContainer}>
            <LineChart
              data={data}
              width={screenWidth - 40}
              height={220}
              chartConfig={chartConfig}
              bezier
              style={styles.chart}
              withInnerLines={false}
              withOuterLines={true}
              withVerticalLines={true}
              withHorizontalLines={false}
              withDots={true}
              withShadow={false}
              transparent={true}
            />
          </View>

          <View style={styles.metricsContainer}>
            <View style={styles.rowContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricTitle}>TDS</Text>
                <View style={styles.metricValueContainer}>
                  <Text style={styles.metricValue}>{db?.tds}</Text>
                  <Feather
                    name="arrow-down-right"
                    size={24}
                    color="#30b8b2"
                    style={styles.metricIcon}
                  />
                </View>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricTitle}>pH</Text>

                <View style={styles.metricValueContainer}>
                  <Text style={styles.metricValue}>{db?.pH}</Text>
                  <Feather
                    name="arrow-up-right"
                    size={24}
                    color="#30b8b2"
                    style={styles.metricIcon}
                  />
                </View>
              </View>
            </View>

            <View style={styles.rowContainer}>
              <View style={styles.metricCard}>
                <Text style={styles.metricTitle}>Turbidity</Text>

                <View style={styles.metricValueContainer}>
                  <Text style={styles.metricValue}>{db?.turbidity}</Text>
                  <Feather
                    name="arrow-up-right"
                    size={24}
                    color="#30b8b2"
                    style={styles.metricIcon}
                  />
                </View>
              </View>

              <View style={styles.metricCard}>
                <Text style={styles.metricTitle}>Temperature</Text>

                <View style={styles.metricValueContainer}>
                  <Text style={styles.metricValue}>{db?.temperature}</Text>
                  <Feather
                    name="arrow-up-right"
                    size={24}
                    color="#30b8b2"
                    style={styles.metricIcon}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {isl && (
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

const getStatusColor = (status: string) => {
  console.log("status of whater : " + status);
  switch (status) {
    case "normal":
      return "#4caf50";
    case "warning":
      return "#ff9800";
    case "danger":
      return "#f44336";
    default:
      return "#ccc";
  }
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: "#f8f9fa",
    marginBottom: 100,
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
  welcomeCard: {
    borderRadius: 20,

    margin: 20,
    padding: 20,
    paddingBottom: 0,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    marginBottom: 20,
  },
  waterQualityCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  waterQualityContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  waterQualityIndicator: {
    width: 4,
    height: 40,
    marginRight: 15,
  },
  waterQualityTextContainer: {
    flexDirection: "column",
  },
  waterQualityLabel: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  waterQualityValue: {
    fontSize: 18,
    //color: "#30b8b2",
    fontWeight: "500",
  },
  statsContainer: {
    paddingHorizontal: 20,
  },
  statsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  statsTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  viewAllText: {
    fontSize: 16,
    color: "#30b8b2",
  },
  tabContainer: {
    flexDirection: "row",
    marginBottom: 15,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: "#30b8b2",
  },
  tabText: {
    fontSize: 16,
    color: "#888",
  },
  activeTabText: {
    color: "#333",
    fontWeight: "500",
  },
  chartContainer: {
    marginBottom: 20,
  },
  chart: {
    borderRadius: 16,
  },
  metricsContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  metricCard: {
    backgroundColor: "#1e2a47",
    borderRadius: 15,
    padding: 15,
    width: "48%",
    height: 120,
  },
  metricTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#AAA",
    marginBottom: 5,
  },
  metricSubtitle: {
    fontSize: 12,
    color: "#aaa",
    marginBottom: 15,
  },
  metricValueContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metricValue: {
    fontSize: 32,
    fontWeight: "bold",
    color: "white",
  },
  metricIcon: {
    marginLeft: 10,
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

export default HomeScreen;
