import { Colors } from '@/constants/Colors';
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function AppButton({onPress , title , style ,isRoute , routeUrl}) {
    return (
        <TouchableOpacity style={[styles.button, style]} 
        // If isRoute is true, we can use navigation.navigate(routeUrl) to navigate to a different screen
        onPress={isRoute ? () => router.push(routeUrl) : onPress} 
        activeOpacity={0.7}>
                <Text style={styles.text} >
                    {title}
                </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button : {
        backgroundColor: Colors.primary,
        //borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        width: '50%',
    }
    , text: {
        color: "white",
        fontSize: 16,
        padding: 10,
        fontFamily: 'Arial',
    }
});