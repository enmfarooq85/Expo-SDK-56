import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, StyleSheet } from "react-native";

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Text style={styles.heading}>Welcome Back 👋</Text>

        <Text style={styles.subHeading}>
          Simple Expo Router UI with TypeScript safety and clean navigation.
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Dashboard</Text>

          <Text style={styles.cardText}>
            Build scalable mobile apps with Expo Router and React Native.
          </Text>
        </View>

        <View style={styles.btnContainer}>
          <Link href="/profile" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Go To Profile</Text>
            </Pressable>
          </Link>
          <Link href="/network" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>See Network Details</Text>
            </Pressable>
          </Link>
          <Link href="/pedometer" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>Try Pedometer</Text>
            </Pressable>
          </Link>
          <Link href="/battery" asChild>
            <Pressable style={styles.button}>
              <Text style={styles.buttonText}>See Battery Details</Text>
            </Pressable>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f7fb",
  },

  content: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
  },

  heading: {
    fontSize: 32,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  subHeading: {
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 32,
  },

  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#111827",
  },

  cardText: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 22,
  },

  btnContainer: {
    display: "flex",
    gap: 10,
  },

  button: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});
