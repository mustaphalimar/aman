import React, { useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from "react-native";
import { router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

const ONBOARDING_DATA = [
  {
    id: "1",
    title: "Monitor Water Quality",
    description: "Track and analyze water quality parameters in real-time.",
    image: require("../assets/images/onboarding/1.png"),
  },
  {
    id: "2",
    title: "Get Detailed Statistics",
    description: "View comprehensive statistics and trends over time.",
    image: require("../assets/images/onboarding/2.png"),
  },
  {
    id: "3",
    title: "Join Water Projects",
    description: "Collaborate with others on water monitoring projects.",
    image: require("../assets/images/onboarding/3.png"),
  },
];

// Separate Dot component that uses the hook
const Dot = ({ index, scrollX, currentIndex }: any) => {
  const animatedDotStyle = useAnimatedStyle(() => {
    const inputRange = [
      (index - 1) * width,
      index * width,
      (index + 1) * width,
    ];

    const dotWidth = interpolate(
      scrollX.value,
      inputRange,
      [8, 16, 8],
      "clamp",
    );

    const opacity = interpolate(
      scrollX.value,
      inputRange,
      [0.5, 1, 0.5],
      "clamp",
    );

    return {
      width: dotWidth,
      opacity,
      backgroundColor: index === currentIndex ? "#30b8b2" : "#ccc",
    };
  });

  return <Animated.View style={[styles.dot, animatedDotStyle]} />;
};

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollX.value = event.contentOffset.x;
    },
  });

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      // Calculate the next screen position
      const nextScreenPosition = (currentIndex + 1) * width;

      // Programmatically scroll to the next screen
      scrollViewRef.current?.scrollTo({
        x: nextScreenPosition,
        animated: true,
      });

      // Update the current index
      setCurrentIndex(currentIndex + 1);

      // Animate the scrollX value for smooth dot animation
      scrollX.value = withTiming(nextScreenPosition, { duration: 300 });
    } else {
      router.replace("/auth");
    }
  };

  const handleSkip = () => {
    router.replace("/auth/login");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.skipContainer}>
        <TouchableOpacity onPress={handleSkip}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        // @ts-ignore
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
      >
        {ONBOARDING_DATA.map((item, index) => (
          <View key={item.id} style={styles.slide}>
            <Image source={item.image} style={styles.image} />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <View style={styles.indicatorContainer}>
        {ONBOARDING_DATA.map((_, index) => (
          <Dot
            key={index}
            index={index}
            scrollX={scrollX}
            currentIndex={currentIndex}
          />
        ))}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <Text style={styles.buttonText}>
            {currentIndex === ONBOARDING_DATA.length - 1
              ? "Get Started"
              : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  skipContainer: {
    position: "absolute",
    top: 70,
    right: 30,
    zIndex: 1,
  },
  skipText: {
    fontSize: 16,
    color: "#666",
    fontWeight: "500",
  },
  slide: {
    width,
    alignItems: "center",
    padding: 20,
    paddingTop: 100,
  },
  image: {
    width: width * 0.8,
    height: height * 0.4,
    resizeMode: "contain",
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e384d",
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    paddingHorizontal: 20,
  },
  indicatorContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#30b8b2",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});
