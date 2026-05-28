import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pedometer } from "expo-sensors";
import { Link } from "expo-router";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState("Checking...");
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [permissionStatus, setPermissionStatus] = useState("Pending");

  useEffect(() => {
    let subscription: Pedometer.Subscription;

    const startPedometer = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();

      setIsPedometerAvailable(isAvailable ? "Available" : "Unavailable");

      if (!isAvailable) return;

      const permission = await Pedometer.requestPermissionsAsync();

      console.log(permission);

      if (!permission.granted) {
        setPermissionStatus("Denied");
        return;
      }

      setPermissionStatus("Granted");

      subscription = Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });
    };

    startPedometer();

    return () => {
      subscription?.remove();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Step Counter</Text>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Pedometer</Text>
          <Text style={styles.value}>{isPedometerAvailable}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.label}>Permission</Text>
          <Text style={styles.value}>{permissionStatus}</Text>
        </View>

        <View style={styles.stepCard}>
          <Text style={styles.stepTitle}>Live Steps</Text>

          <Text style={styles.steps}>{currentStepCount}</Text>

          <Text style={styles.description}>Walk to increase the counter</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f3f4f6",
    justifyContent: "center",
    paddingHorizontal: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 24,
    padding: 24,
    elevation: 5,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    marginBottom: 24,
    color: "#111827",
  },

  infoBox: {
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  stepCard: {
    backgroundColor: "#ecfeff",
    padding: 24,
    borderRadius: 20,
    marginTop: 10,
  },

  stepTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#0891b2",
    marginBottom: 12,
  },

  steps: {
    fontSize: 48,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    color: "#6b7280",
  },
});
