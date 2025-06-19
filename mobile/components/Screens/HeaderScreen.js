import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function HeaderScreen({ title }) {
  return (
    <View style={styles.header}>
              <TouchableOpacity
                onPress={() => router.back()}
                style={{ marginRight: 10 }}
              >
                <MaterialCommunityIcons
                  name="chevron-left"
                  size={40}
                  color="white"
                />
              </TouchableOpacity>
              <Text style={styles.screenTitle}> {title} </Text>
    </View>
  );
}

const styles = StyleSheet.create({
    header: {
    backgroundColor: "#30b8b2",
    alignItems: "center",
    paddingHorizontal: 5,
    height: 70,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
    screenTitle: {
    color: "white",
    fontSize: 24,
    marginLeft: 10,
  },
});