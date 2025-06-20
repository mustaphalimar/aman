import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet, TouchableHighlight, View } from "react-native";

export default function ListeItemDeleteAction(props) {
  return (
    <TouchableHighlight
      onPress={props.onPress}
      underlayColor={Colors.light.background}
    >
      <View style={styles.container}>
        <MaterialCommunityIcons name="trash-can" size={35} color="white" />
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.error,
    width: 70,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
