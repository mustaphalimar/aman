import { Platform, StyleSheet, Text } from "react-native";


function AppText({ children }) {
    return (<Text style={styles.text} >
        {children}
    </Text>);
}
const styles = StyleSheet.create({
    text: {
        fontSize: 16,
        color: 'red',
        fontFamily: 'Arial',
        margin: 10,
        fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
    },
});


export default AppText;