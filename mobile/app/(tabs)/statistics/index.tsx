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
