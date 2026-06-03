import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, world!</Text>
      <Text style={styles.subtitle}>Your Expo app is running.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#f8fafc",
    padding: 24,
  },
  title: {
    color: "#0f172a",
    fontSize: 32,
    fontWeight: "700",
  },
  subtitle: {
    color: "#475569",
    fontSize: 18,
    textAlign: "center",
  },
});
