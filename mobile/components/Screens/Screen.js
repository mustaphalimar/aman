import { Colors } from '@/constants/Colors';
import Constants from 'expo-constants';
import { SafeAreaView, StyleSheet } from 'react-native';

export default function Screen({ children }) {
  return (
      <SafeAreaView style={styles.safeArea}>
        {children}
      </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: Colors.primary,
        paddingTop: Constants.statusBarHeight,
    },
})
