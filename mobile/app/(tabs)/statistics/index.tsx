import { useDeviceId } from "@/hooks/use-device-id";
import { WaterQualityAverages } from "@/intarfaces";
import {
  getDailyAverage,
  getSensorCurve,
} from "@/Services/WaterQualityService";
import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { BlurView } from "expo-blur";
import Constants from "expo-constants";
import { router } from "expo-router";
import React, { useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
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

interface CircularProgressProps {
  percentage?: number;
  size?: number;
  strokeWidth?: number;
  label?: string;
  subLabel?: string;
}

interface MiniChartProps {
  data: number[];
  color?: string;
}

const StatisticsScreen: React.FC = () => {
  const [selectedDayList, setSelectedDayList] = useState<DayItem[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date>(new Date());
  const [selectedMetric, setSelectedMetric] = useState("overall");
  const useDeviceIdHook = useDeviceId();

  const deviceId = useDeviceIdHook.deviceId;

  const formatDateSafely = (date: Date | string | null | undefined): string => {
    let validDate: Date;

    if (!date) {
      console.warn("No date provided, using today");
      validDate = new Date();
    } else if (typeof date === "string") {
      validDate = new Date(date);
    } else if (date instanceof Date) {
      validDate = date;
    } else {
      console.warn("Invalid date type provided, using today");
      validDate = new Date();
    }

    if (isNaN(validDate.getTime())) {
      console.warn("Invalid date provided, using today");
      validDate = new Date();
    }

    const year = validDate.getFullYear();
    const month = String(validDate.getMonth() + 1).padStart(2, "0");
    const day = String(validDate.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  // React Query for daily average data
  const {
    data: dailyAvgData,
    isLoading: isDailyAvgLoading,
    error: dailyAvgError,
    refetch: refetchDailyAvg,
  } = useQuery({
    queryKey: ["dailyAverage", deviceId, formatDateSafely(selectedDay)],
    queryFn: async () => {
      const selectedDate = formatDateSafely(selectedDay);
      console.log("Formatted date for API:", selectedDate);
      return await getDailyAverage(deviceId, selectedDate);
    },
    enabled: !!selectedDay,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error("Error fetching daily average data:", error);
    },
  });

  // React Query for sensor curve data
  const {
    data: sensorCurveRawData,
    isLoading: isCurveLoading,
    error: curveError,
    refetch: refetchCurve,
  } = useQuery({
    queryKey: ["sensorCurve", deviceId, formatDateSafely(selectedDay)],
    queryFn: async () => {
      const selectedDate = formatDateSafely(selectedDay);
      console.log({ selectedDay });
      return await getSensorCurve(deviceId, selectedDate);
    },
    enabled: !!selectedDay,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    onError: (error) => {
      console.error("Error fetching sensor curve data:", error);
    },
  });

  // Process sensor curve data
  const sensorCurveData = useMemo(() => {
    if (!sensorCurveRawData || !Array.isArray(sensorCurveRawData)) {
      return {
        pH: [],
        turbidity: [],
        temperature: [],
        tds: [],
        chlorineLevel: [],
      };
    }

    return {
      pH: sensorCurveRawData.map((entry) => {
        const value = entry?.pH;
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value)
          : 0;
      }),
      turbidity: sensorCurveRawData.map((entry) => {
        const value = entry?.turbidity;
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value)
          : 0;
      }),
      temperature: sensorCurveRawData.map((entry) => {
        const value = entry?.temperature;
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value)
          : 0;
      }),
      tds: sensorCurveRawData.map((entry) => {
        const value = entry?.tds;
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value)
          : 0;
      }),
      chlorineLevel: sensorCurveRawData.map((entry) => {
        const value = entry?.chlorineLevel;
        return value !== null && value !== undefined && !isNaN(value)
          ? Number(value)
          : 0;
      }),
    };
  }, [sensorCurveRawData]);

  // Combined loading state
  const isLoading = isDailyAvgLoading || isCurveLoading;
  const hasError = dailyAvgError || curveError;

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
    setSelectedDay(today);
  };

  const generateMoreDays = (count: number = 14) => {
    if (selectedDayList.length === 0) return;

    const oldestDay = selectedDayList[selectedDayList.length - 1];
    const newDays: DayItem[] = [];

    for (let i = 1; i <= count; i++) {
      const date = new Date(oldestDay.date);
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
        dayName: dayName,
        dayNumber: dayNumber,
        monthName: monthName,
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
      })),
    );

    setSelectedDay(selected.date);
  };

  const handleEndReached = () => {
    generateMoreDays(14);
  };

  // Retry function for failed requests
  const handleRetry = () => {
    refetchDailyAvg();
    refetchCurve();
  };

  // Calculate water quality percentage based on your backend logic
  const calculateWaterQualityPercentage = (
    data: WaterQualityAverages | null | undefined,
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
  const calculateSensorPercentages = (
    data: WaterQualityAverages | null | undefined,
  ) => {
    if (!data)
      return {
        temperature: 100,
        turbidity: 100,
        ph: 100,
        tds: 100,
        chlorineLevel: 100,
      };

    return {
      temperature:
        data.temperature != null
          ? Math.max(0, 100 - Math.abs(20 - data.temperature) * 2)
          : 0,
      turbidity:
        data.turbidity != null ? Math.max(0, 100 - data.turbidity * 5) : 0,
      ph: data.pH != null ? Math.max(0, 100 - Math.abs(7.5 - data.pH) * 20) : 0,
      tds: data.tds != null ? Math.max(0, 100 - data.tds / 10) : 0,
      chlorineLevel:
        data.chlorineLevel != null
          ? Math.max(0, 100 - Math.abs(1.5 - data.chlorineLevel) * 20)
          : 0,
    };
  };

  const overallAvgQuality = useMemo(
    () => calculateWaterQualityPercentage(dailyAvgData),
    [dailyAvgData],
  );

  const avgSensorPercentages = useMemo(
    () => calculateSensorPercentages(dailyAvgData),
    [dailyAvgData],
  );

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
      value: dailyAvgData ? `${dailyAvgData.temperature}°C` : "--",
      color: "#ff6b6b",
      isActive: selectedMetric === "temperature",
      percentage: avgSensorPercentages.temperature,
    },
    {
      id: "turbidity",
      label: "Turbidity",
      value: dailyAvgData ? `${dailyAvgData.turbidity}` : "--",
      color: "#4ecdc4",
      isActive: selectedMetric === "turbidity",
      percentage: avgSensorPercentages.turbidity,
    },
    {
      id: "ph",
      label: "pH",
      value: dailyAvgData ? `${dailyAvgData.pH}` : "--",
      color: "#45b7d1",
      isActive: selectedMetric === "ph",
      percentage: avgSensorPercentages.ph,
    },
    {
      id: "tds",
      label: "TDS",
      value: dailyAvgData ? `${dailyAvgData.tds}` : "--",
      color: "#a78bfa",
      isActive: selectedMetric === "tds",
      percentage: avgSensorPercentages.tds,
    },
    {
      id: "chlorineLevel",
      label: "Chlorine",
      value: dailyAvgData ? `${dailyAvgData.chlorineLevel}` : "--",
      color: "#f9c74f",
      isActive: selectedMetric === "chlorineLevel",
      percentage: avgSensorPercentages.chlorineLevel,
    },
  ];

  const CircularProgress = ({
    percentage = 75,
    size = 120,
    strokeWidth = 8,
    label = "",
    subLabel = "",
  }) => {
    const safePercentage =
      isNaN(percentage) || !isFinite(percentage)
        ? 0
        : Math.max(0, Math.min(100, percentage));

    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset =
      circumference - (safePercentage / 100) * circumference;

    return (
      <View style={styles.circularProgressContainer}>
        <Svg width={size} height={size} style={styles.circularProgress}>
          <Circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e6e6e6"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

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

          <SvgText
            x={size / 2}
            y={size / 2 - 10}
            textAnchor="middle"
            fontSize="24"
            fontWeight="bold"
            fill="#333"
          >
            {isNaN(percentage) ? 0 : Math.round(percentage)}%
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
    if (!data || data.length === 0) {
      return <View style={{ width: 80, height: 30 }} />;
    }

    // Filter out invalid values (NaN, null, undefined)
    const validData = data.filter(
      (val) =>
        val !== null && val !== undefined && !isNaN(val) && isFinite(val),
    );

    if (validData.length === 0) {
      return <View style={{ width: 80, height: 30 }} />;
    }

    const maxValue = Math.max(...validData);
    const minValue = Math.min(...validData);

    // Handle case where all values are the same
    const range = maxValue - minValue;
    const effectiveRange = range === 0 ? 1 : range;

    const chartWidth = 80;
    const chartHeight = 30;

    // Create points using original data but with safe calculations
    const points = data
      .map((value, index) => {
        // Skip invalid values by using a previous valid value or 0
        const safeValue =
          value !== null &&
          value !== undefined &&
          !isNaN(value) &&
          isFinite(value)
            ? value
            : validData.length > 0
              ? validData[0]
              : 0;

        const x =
          data.length > 1
            ? (index / (data.length - 1)) * chartWidth
            : chartWidth / 2;

        // Normalize the value between 0 and chartHeight
        const normalizedValue =
          range === 0
            ? chartHeight / 2
            : ((safeValue - minValue) / effectiveRange) * chartHeight;

        const y = chartHeight - normalizedValue;

        // Ensure x and y are valid numbers
        const safeX = isFinite(x) ? x : 0;
        const safeY = isFinite(y) ? y : chartHeight / 2;

        return `${safeX},${safeY}`;
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

  // Error state component
  const ErrorState = () => (
    <View style={styles.errorContainer}>
      <Text style={styles.errorTitle}>Failed to load data</Text>
      <Text style={styles.errorSubtitle}>Please try again</Text>
      <TouchableOpacity style={styles.retryButton} onPress={handleRetry}>
        <Text style={styles.retryButtonText}>Retry</Text>
      </TouchableOpacity>
    </View>
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

        {/* Error State */}
        {hasError && !isLoading && <ErrorState />}

        {/* Main Content */}
        {!hasError && (
          <View style={{ margin: 15 }}>
            {/* Circular Progress Section */}
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
        )}
      </ScrollView>

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
            <Text style={styles.loadingTitle}>Loading Statistics</Text>
            <Text style={styles.loadingSubtitle}>
              Fetching water quality data...
            </Text>
          </View>
        </View>
      )}
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
    paddingVertical: 15,
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
  // Loading overlay styles
  loadingOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(30, 42, 71, 0.8)",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
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
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    textAlign: "center",
  },
  errorSubtitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    textAlign: "center",
  },
  retryButton: {
    backgroundColor: "#30b8b2",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default StatisticsScreen;
