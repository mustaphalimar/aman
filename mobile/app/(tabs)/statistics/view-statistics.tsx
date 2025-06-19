import React, { useState } from "react";

import {
  Alert,
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from "react-native";

import HeaderScreen from "@/components/Screens/HeaderScreen";
import Screen from "@/components/Screens/Screen";
import ListeItemDeleteAction from "@/components/Swipeable/ListeItemDeleteAction";
import { Colors } from "@/constants/Colors";
import Swipeable from "react-native-gesture-handler/Swipeable";
const listings = [
  {
    id: "1",
    image: require("../../../assets/images/mosh.jpg"),
    title: "Statistics 1",
    description: "Here you can see your statistics",
  },
  {
    id: "2",
    image: require("../../../assets/images/mosh.jpg"),
    title: "Statistics 2",
    description: "Here you can see your statistics",
  },
  {
    id: "3",
    image: require("../../../assets/images/mosh.jpg"),
    title: "Statistics 3",
    description: "Here you can see your statistics",
  },
];

function ViewStatistics() {
  const [list, setListings] = useState(listings);
  const handleDelete = (item: any) => {
    setListings(list.filter((l) => l.id !== item.id));
    console.log(list);
  };
  return (
    <>
      <Screen>
        <HeaderScreen title="View Statistics" />
        {/* <View style={styles.containerBody}>
        {listings.map((list, key) => (
          <ListingDetails
            key={key}
            image={list.image}
            title={list.title}
            description={list.description}
          />
        ))}
      </View> */}

        <View style={styles.containerBody}>
          <Text style={styles.subText}>Here you can see your statistics</Text>

          <FlatList
            data={list}
            keyExtractor={(item) => item.id}
            renderItem={({ item, index, separators }) => (
              <ListingDetails
                image={item.image}
                title={item.title}
                description={item.description}
                onPress={() => console.log("Pressed", item)}
                renderRightActions={() => (
                  // <TouchableHighlight
                  //   onPress={() => console.log("Delete", item.id)}
                  //   underlayColor={Colors.light.background}
                  //   style={{
                  //     backgroundColor: Colors.error,
                  //     justifyContent: "center",
                  //     alignItems: "center",
                  //     width: 70,
                  //     height: "100%",
                  //     borderTopRightRadius: 10,
                  //     borderBottomRightRadius: 10,
                  //   }}
                  // >
                  //   <Text style={styles.iconBack}>Delete</Text>
                  // </TouchableHighlight>

                  <ListeItemDeleteAction
                    onPress={() => {
                      Alert.alert(
                        "Delete",
                        "Are you sure you want to delete this item?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel",
                          },
                          {
                            text: "OK",
                            onPress: () => handleDelete(item),
                          },
                        ]
                      );
                    }}
                  />
                )}
              />
            )}
          />
        </View>
      </Screen>
    </>
  );
}

function ListingDetails({
  image,
  title,
  description,
  onPress,
  renderRightActions,
}: {
  image: ImageSourcePropType;
  title: string;
  description: string;
  onPress: () => void;
  renderRightActions?: () => React.ReactNode;
}) {
  return (
    <View style={styles.listContainer}>
      <TouchableHighlight
        underlayColor={Colors.light.background}
        onPress={onPress}
      >
        <Swipeable renderRightActions={renderRightActions}>
          <View style={styles.listBody}>
            <Image style={styles.image} source={image} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
          </View>
        </Swipeable>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    marginBottom: 20,

    borderColor: "#e1e4e8",
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: "white",
    shadowColor: "black",
  },
  listBody: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
  },
  textContainer: {
    marginLeft: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  description: {
    fontSize: 16,
    color: "#888",
    marginTop: 5,
  },

  iconBack: {
    color: "white",
    fontSize: 20,
  },

  containerBody: {
    flex: 1,
    backgroundColor: "#f0f2f5",
    padding: 20,
    // justifyContent: "center",
    // alignItems: "center",
  },
  subText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
  },
});
export default ViewStatistics;
