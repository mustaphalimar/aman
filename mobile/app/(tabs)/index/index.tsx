import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import React from "react";
import {
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
  // Mock data for the chart
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

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeText}>Hi, Hamza!</Text>

          <View style={styles.waterQualityCard}>
            <View style={styles.waterQualityContent}>
              <View style={styles.waterQualityIndicator} />
              <View style={styles.waterQualityTextContainer}>
                <Text style={styles.waterQualityLabel}>
                  Niveau de qualité de l&apos;eau
                </Text>
                <Text style={styles.waterQualityValue}>Bonne</Text>
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
            <View style={styles.metricCard}>
              <Text style={styles.metricTitle}>TDS</Text>
              <View style={styles.metricValueContainer}>
                <Text style={styles.metricValue}>15</Text>
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
                <Text style={styles.metricValue}>6,5</Text>
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
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    flex: 1,
    backgroundColor: "#f8f9fa",
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
    backgroundColor: "#30b8b2",
    margin: 20,
    borderRadius: 20,
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
    backgroundColor: "#30b8b2",
    borderRadius: 2,
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
    color: "#30b8b2",
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
});

export default HomeScreen;
