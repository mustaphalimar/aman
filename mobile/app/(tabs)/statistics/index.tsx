<<<<<<< HEAD
import AppButton from "@/components/AppButton";
import { Image, ScrollView, StyleSheet, Text, View } from "react-native";

export default function StatisticsScreen() {
  return (
    //   <SafeAreaView>
    //     <AppText>This is my paragraph</AppText>
    //     <Button title="Click Me" onPress={() => console.log("Button Pressed")} />
    //     {/* <MaterialCommunityIcons name="chart-bar" size={24} color="black" /> */}
    //   </SafeAreaView>
    <ScrollView>
      <View style={styles.container}>
        <CardApp
          image={require("../../../assets/images/jacket.jpg")}
          title="Statistics"
          subtitle="Here you can see your statistics"
        />
        <CardApp
          image={require("../../../assets/images/jacket.jpg")}
          title="Statistics"
          subtitle="Here you can see your statistics"
        />
        <CardApp
          image={require("../../../assets/images/jacket.jpg")}
          title="Statistics"
          subtitle="Here you can see your statistics"
        />
        <CardApp
          image={require("../../../assets/images/jacket.jpg")}
          title="Statistics"
          subtitle="Here you can see your statistics"
        />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    margin: 20,
    //backgroundColor: "red",
    flex: 1,
    paddingBottom: 90,
  },
  Text: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    backgroundColor: "white",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 20,
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 50,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10, // For Android shadow
  },
  image: {
    width: "100%",
    height: 200,
  },
  textContainer: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  button: {
    //none border
  },
});

import { ImageSourcePropType } from "react-native";

interface CardAppProps {
  image: ImageSourcePropType;
  title: string;
  subtitle: string;
}

function CardApp({ image, title, subtitle }: CardAppProps) {
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={styles.buttonsContainer}>
        <AppButton
          isRoute="true"
          routeUrl="/(tabs)/statistics/view-statistics"
          style={styles.button}
          title="View Statistics"
          onPress={() => console.log("View Statistics Pressed")}
        />
        <AppButton
          isRoute="true"
          routeUrl="/(tabs)/statistics/view-details"
          style={[styles.button]}
          title="View Details"
          onPress={() => console.log("View Details Pressed")}
        />
      </View>
    </View>
  );
}
=======
import { WaterQualityAverages } from "@/intarfaces";
import {
  getDailyAverage,
  getSensorCurve,
} from "@/Services/WaterQualityService";
import { Feather } from "@expo/vector-icons";
import Constants from "expo-constants";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { Circle, Polyline, Text as SvgText } from "react-native-svg";

const screenWidth = Dimensions.get("window").width;

interface MetricData {
  id: string;
  label: string;
  value: string;
  color: string;
  isActive: boolean;
  percentage: number;
}

interface DayItem {
  id: string;
  label: string;
  dayName: string;
  dayNumber: string;
  monthName: string;
  date: Date;
  isSelected: boolean;
  isToday: boolean;
}

const StatisticsScreen: React.FC = () => {
  const [statusData, setStatusData] = useState<WaterQualityAverages | null>(
    null
  );

  const [selectedDayList, setSelectedDayList] = useState<DayItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());

  const [selectedMetric, setSelectedMetric] = useState("overall");

  const deviceId = 1;

  // Initialize days
  useEffect(() => {
    generateInitialDays();
  }, []);

  const generateInitialDays = () => {
    const newDays: DayItem[] = [];
    const today = new Date();

    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.getDate().toString().padStart(2, "0");
      const monthName = date.toLocaleDateString("en-US", { month: "short" });

      const uniqueKey = `day-${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dayNumber}-${date.getTime()}`;

      newDays.push({
        id: uniqueKey,
        label: `${dayName} ${dayNumber}`,
        dayName,
        dayNumber,
        monthName,
        date,
        isSelected: i === 0,
        isToday: i === 0,
      });
    }

    setSelectedDayList(newDays);
    setSelectedDay(today); // <-- Set the actual selected date for use in API
  };

  const generateMoreDays = (count: number = 14) => {
    if (selectedDayList.length === 0) return;

    const oldestDay = selectedDayList[selectedDayList.length - 1];
    const newDays: DayItem[] = [];

    // Generate more days going backwards from the oldest day
    for (let i = 1; i <= count; i++) {
      const date = new Date(oldestDay.date);
      date.setDate(date.getDate() - i);

      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });
      const dayNumber = date.getDate().toString().padStart(2, "0");
      //const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const monthName = date.toLocaleDateString("en-US", { month: "short" });

      const year = date.getFullYear();

      // Create a more unique key by including timestamp
      // const uniqueKey = `day-${year}-${month}-${dayNumber}-${date.getTime()}`;

      const uniqueKey = `day-${date.getFullYear()}-${(date.getMonth() + 1)
        .toString()
        .padStart(2, "0")}-${dayNumber}-${date.getTime()}`;

      newDays.push({
        id: uniqueKey,
        label: `${dayName} ${dayNumber}`,
        dayName: dayName,
        dayNumber: dayNumber,
        monthName: monthName, // Add month name
        date: date,
        isSelected: false,
        isToday: false,
      });
    }

    setSelectedDayList((prev) => [...prev, ...newDays]);
  };

  const handleDaySelect = (id: string) => {
    const selected = selectedDayList.find((d) => d.id === id);
    if (!selected) return;

    setSelectedDayList((prev) =>
      prev.map((day) => ({
        ...day,
        isSelected: day.id === id,
      }))
    );

    setSelectedDay(selected.date); // <-- Track selected date for fetching
  };

  const handleEndReached = () => {
    generateMoreDays(14);
  };

  // Calculate water quality percentage based on your backend logic
  const calculateWaterQualityPercentage = (
    data: WaterQualityAverages | null
  ) => {
    if (!data) return 100;

    let score = 100;

    // pH (6.5-8.5 is ideal)
    if (data.pH < 6.0 || data.pH > 9.0) score -= 25;
    else if (
      (data.pH >= 6.0 && data.pH < 6.5) ||
      (data.pH > 8.5 && data.pH <= 9.0)
    )
      score -= 10;

    // Turbidity (0-5 is ideal)
    if (data.turbidity > 10) score -= 25;
    else if (data.turbidity > 5 && data.turbidity <= 10) score -= 10;

    // Temperature (5-25 is ideal)
    if (data.temperature < 5 || data.temperature > 35) score -= 25;
    else if (data.temperature >= 26 && data.temperature <= 35) score -= 10;

    // TDS (0-500 is ideal)
    if (data.tds > 1000) score -= 25;
    else if (data.tds > 500 && data.tds <= 1000) score -= 10;

    // Chlorine Level (0.5-3.0 is ideal)
    if (data.chlorineLevel < 0.2 || data.chlorineLevel > 5.0) score -= 25;
    else if (data.chlorineLevel < 0.5 || data.chlorineLevel > 3.0) score -= 10;

    return Math.max(0, score);
  };

  // Calculate individual sensor percentages
  const calculateSensorPercentages = (data: WaterQualityAverages | null) => {
    if (!data)
      return {
        temperature: 100,
        turbidity: 100,
        ph: 100,
        tds: 100,
        chlorineLevel: 100,
      };

    return {
      temperature: Math.max(0, 100 - Math.abs(20 - data.temperature) * 2),
      turbidity: Math.max(0, 100 - data.turbidity * 5),
      ph: Math.max(0, 100 - Math.abs(7.5 - data.pH) * 20),
      tds: Math.max(0, 100 - data.tds / 10),
      chlorineLevel: Math.max(0, 100 - Math.abs(1.5 - data.chlorineLevel) * 20),
    };
  };

  const [dailyAvgData, setDailyAvgData] = useState<WaterQualityAverages | null>(
    null
  );

  // Use the same functions:
  const overallAvgQuality = calculateWaterQualityPercentage(dailyAvgData);
  const avgSensorPercentages = calculateSensorPercentages(dailyAvgData);

  //   const sensorPercentages = calculateSensorPercentages(statusData);
  //   const overallQuality = calculateWaterQualityPercentage(statusData);

  const metricsData: MetricData[] = [
    {
      id: "overall",
      label: "Overall",
      value: `${overallAvgQuality}%`,
      color: "#30b8b2",
      isActive: selectedMetric === "overall",
      percentage: overallAvgQuality,
    },
    {
      id: "temperature",
      label: "Temperature",
      value: statusData ? `${statusData.temperature}°C` : "--",
      color: "#ff6b6b",
      isActive: selectedMetric === "temperature",
      percentage: avgSensorPercentages.temperature,
    },
    {
      id: "turbidity",
      label: "Turbidity",
      value: statusData ? `${statusData.turbidity}` : "--",
      color: "#4ecdc4",
      isActive: selectedMetric === "turbidity",
      percentage: avgSensorPercentages.turbidity,
    },
    {
      id: "ph",
      label: "pH",
      value: statusData ? `${statusData.pH}` : "--",
      color: "#45b7d1",
      isActive: selectedMetric === "ph",
      percentage: avgSensorPercentages.ph,
    },
    {
      id: "tds",
      label: "TDS",
      value: statusData ? `${statusData.tds}` : "--",
      color: "#a78bfa",
      isActive: selectedMetric === "tds",
      percentage: avgSensorPercentages.tds,
    },
    {
      id: "chlorineLevel",
      label: "Chlorine",
      value: statusData ? `${statusData.chlorineLevel}` : "--",
      color: "#f9c74f",
      isActive: selectedMetric === "chlorineLevel",
      percentage: avgSensorPercentages.chlorineLevel,
    },
  ];

  const [sensorCurveData, setSensorCurveData] = useState<{
    pH: number[];
    turbidity: number[];
    temperature: number[];
    tds: number[];
    chlorineLevel: number[];
  }>({
    pH: [],
    turbidity: [],
    temperature: [],
    tds: [],
    chlorineLevel: [],
  });

  useEffect(() => {
    const fetchDailyAvg = async () => {
      try {
        const selectedDate = selectedDay.toISOString().split("T")[0]; // Format: YYYY-MM-DD
        const data = await getDailyAverage(deviceId, selectedDate);
        setDailyAvgData(data);

        const dataCurve = await getSensorCurve(deviceId, selectedDate);
        const parsed = {
          pH: dataCurve.map((entry) => entry.pH ?? 0),
          turbidity: dataCurve.map((entry) => entry.turbidity ?? 0),
          temperature: dataCurve.map((entry) => entry.temperature ?? 0),
          tds: dataCurve.map((entry) => entry.tds ?? 0),
          chlorineLevel: dataCurve.map((entry) => entry.chlorineLevel ?? 0),
        };

        setSensorCurveData(parsed);
      } catch (error) {
        console.error("Error fetching average daily data", error);
      }
    };

    fetchDailyAvg();
  }, [selectedDay]);

  const CircularProgress = ({
    percentage = 75,
    size = 120,
    strokeWidth = 8,
    label = "",
    subLabel = "",
  }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <View style={styles.circularProgressContainer}>
        <Svg width={size} height={size} style={styles.circularProgress}>
          {/* Background circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Progress circle */}
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#30b8b2"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
          />
          {/* Center text */}
          <SvgText
            x={size / 2}
            y={size / 2 - 10}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#333"
          >
            {percentage}%
          </SvgText>
          <SvgText
            x={size / 2}
            y={size / 2 + 15}
            textAnchor="middle"
            fontSize="12"
            fill="#666"
          >
            {label}
          </SvgText>
        </Svg>
      </View>
    );
  };

  const MiniChart = ({ data, color = "#30b8b2" }) => {
    const maxValue = Math.max(...data);
    const chartWidth = 80;
    const chartHeight = 30;

    const points = data
      .map((value, index) => {
        const x = (index / (data.length - 1)) * chartWidth;
        const y = chartHeight - (value / maxValue) * chartHeight;
        return `${x},${y}`;
      })
      .join(" ");

    return (
      <Svg width={chartWidth} height={chartHeight} style={styles.miniChart}>
        <Polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    );
  };

  const renderDayItem = ({ item }: { item: DayItem }) => (
    <TouchableOpacity
      style={[
        styles.dayButton,
        item.isSelected && styles.activeDayButton,
        item.isToday && styles.todayButton,
      ]}
      onPress={() => handleDaySelect(item.id)}
    >
      <Text
        style={[
          styles.dayNameText,
          item.isSelected && styles.activeDayNameText,
        ]}
      >
        {item.dayName}
      </Text>
      <Text
        style={[
          styles.dayNumberText,
          item.isSelected && styles.activeDayNumberText,
        ]}
      >
        {item.dayNumber}
      </Text>

      <Text
        style={[
          styles.monthNameText,
          item.isSelected && styles.activeMonthNameText,
        ]}
      >
        {item.monthName}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Statistic Details</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Day Selection */}
        <View style={styles.daysContainer}>
          <FlatList
            data={[1]} // Single item to render the static content
            keyExtractor={(item) => item.toString()}
            ListHeaderComponent={
              <>
                {/* Days Horizontal Scroll */}
                <View style={styles.daysContainer}>
                  <FlatList
                    horizontal
                    data={selectedDayList}
                    keyExtractor={(item) => item.id}
                    renderItem={renderDayItem}
                    onEndReached={handleEndReached}
                    onEndReachedThreshold={0.5}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.daysList}
                  />
                </View>
              </>
            }
            renderItem={() => null} // We don't need to render items since we're using ListHeaderComponent
            ListFooterComponent={
              <View style={styles.detailedMetrics}>
                {/* Your detailed metrics content */}
              </View>
            }
            contentContainerStyle={styles.scrollContent}
          />
        </View>

        {/* Circular Progress Section */}
        <View style={{ margin: 15 }}>
          <View style={styles.progressSection}>
            <CircularProgress
              percentage={
                selectedMetric === "overall"
                  ? overallAvgQuality
                  : metricsData.find((m) => m.id === selectedMetric)
                      ?.percentage || 0
              }
              label={
                selectedMetric === "overall"
                  ? "Overall"
                  : metricsData.find((m) => m.id === selectedMetric)?.label ||
                    ""
              }
            />

            <View style={[styles.metricsLegend]}>
              {metricsData.map((metric) => (
                <TouchableOpacity
                  key={metric.id}
                  style={styles.legendItem}
                  onPress={() => setSelectedMetric(metric.id)}
                >
                  <View
                    style={[
                      styles.legendDot,
                      { backgroundColor: metric.color },
                      metric.isActive && styles.activeLegendDot,
                    ]}
                  />
                  <Text
                    style={[
                      styles.legendLabel,
                      metric.isActive && styles.activeLegendLabel,
                    ]}
                  >
                    {metric.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Detailed Metrics */}
          <View style={styles.detailedMetrics}>
            <View style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>pH</Text>
                <Text style={styles.metricTimeframe}>6h 30m</Text>
                <Text style={styles.metricValue}>
                  {dailyAvgData ? dailyAvgData.pH : "--"}
                </Text>
              </View>
              <MiniChart data={sensorCurveData.pH} color="#4ecdc4" />
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>TDS</Text>
                <Text style={styles.metricTimeframe}>6h 30m</Text>
                <Text style={styles.metricValue}>
                  {dailyAvgData ? dailyAvgData.tds : "--"}
                </Text>
              </View>
              <MiniChart
                data={sensorCurveData.tds.map((x) => x * 0.8)}
                color="#45b7d1"
              />
            </View>

            <View style={styles.metricRow}>
              <View style={styles.metricInfo}>
                <Text style={styles.metricLabel}>Chlorine Level</Text>
                <Text style={styles.metricTimeframe}>6h 30m</Text>
                <Text style={styles.metricValue}>
                  {dailyAvgData ? dailyAvgData.chlorineLevel : "--"}
                </Text>
              </View>
              <MiniChart
                data={sensorCurveData.chlorineLevel.map((x) => x * 1.2)}
                color="#f9c74f"
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
    backgroundColor: "#f8f9fa",
    paddingBottom: 100,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  placeholder: {
    width: 34,
  },
  daysContainer: {
    // backgroundColor: "#fff",
    paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: "#e0e0e0",
  },
  daysList: {
    paddingHorizontal: 15,
  },
  dayButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 25,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    minWidth: 60,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "transparent",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  activeDayButton: {
    backgroundColor: "#30b8b2",
    borderColor: "#30b8b2",
    shadowColor: "#30b8b2",
    shadowOpacity: 0.3,
    elevation: 4,
  },
  todayButton: {
    borderColor: "#30b8b2",
    borderWidth: 2,
  },
  dayNameText: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
    marginBottom: 2,
  },
  activeDayNameText: {
    color: "#fff",
    fontWeight: "600",
  },
  dayNumberText: {
    fontSize: 16,
    color: "#333",
    fontWeight: "600",
  },
  activeDayNumberText: {
    color: "#fff",
    fontWeight: "700",
  },
  progressSection: {
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    borderRadius: 5,
  },
  circularProgressContainer: {
    marginBottom: 20,
  },
  circularProgress: {
    transform: [{ rotate: "0deg" }],
  },
  metricsLegend: {
    flexDirection: "column",
    marginLeft: 25,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  activeLegendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  legendLabel: {
    fontSize: 14,
    color: "#666",
  },
  activeLegendLabel: {
    color: "#333",
    fontWeight: "600",
  },
  detailedMetrics: {
    flexDirection: "column",
  },
  metricRow: {
    flexDirection: "row",
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 10,
  },
  metricInfo: {
    flex: 1,
  },
  metricLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 5,
  },
  metricTimeframe: {
    fontSize: 12,
    color: "#666",
  },
  metricValue: {
    fontSize: 18,
    fontWeight: "700",
    color: "#30b8b2",
    marginTop: 5,
  },
  miniChart: {
    marginLeft: 20,
  },
  monthNameText: {
    fontSize: 10,
    color: "#999",
    marginTop: 2,
  },
  activeMonthNameText: {
    color: "#fff",
    fontWeight: "600",
  },
});

export default StatisticsScreen;
>>>>>>> a64a2fd0f3ffec9489450683bd81b7a5dcf27a67
