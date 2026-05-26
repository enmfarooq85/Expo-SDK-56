import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Pedometer } from "expo-sensors";

export default function App() {
  const [isPedometerAvailable, setIsPedometerAvailable] =
    useState("Checking...");
  const [pastStepCount, setPastStepCount] = useState(0);
  const [currentStepCount, setCurrentStepCount] = useState(0);

  console.log(isPedometerAvailable);
  console.log(currentStepCount);

  useEffect(() => {
    let subscription;

    const subscribe = async () => {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable ? "Available" : "Unavailable");

      if (!isAvailable) return;

      subscription = Pedometer.watchStepCount((result) => {
        console.log("steps:", result.steps);
        setCurrentStepCount(result.steps);
      });
    };

    subscribe();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Daily Activity</Text>

        <View style={styles.section}>
          <Text style={styles.label}>Pedometer Status</Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor:
                  isPedometerAvailable === "Available" ? "#dcfce7" : "#fee2e2",
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color:
                    isPedometerAvailable === "Available"
                      ? "#166534"
                      : "#991b1b",
                },
              ]}
            >
              {isPedometerAvailable}
            </Text>
          </View>
        </View>

        <View style={styles.statsCard}>
          <Text style={styles.statsTitle}>Last 24 Hours (iOS only)</Text>
          <Text style={styles.steps}>{pastStepCount}</Text>
          <Text style={styles.description}>Total steps recorded</Text>
        </View>

        <View style={styles.liveCard}>
          <Text style={styles.liveTitle}>Live Step Counter</Text>
          <Text style={styles.liveSteps}>{currentStepCount}</Text>
          <Text style={styles.description}>
            Walk and watch this increase in real time
          </Text>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Real-time step tracking powered by Expo Sensors API.
          </Text>
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
    backgroundColor: "#ffffff",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 28,
  },

  section: {
    marginBottom: 24,
  },

  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },

  badge: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  statsCard: {
    backgroundColor: "#eef2ff",
    padding: 22,
    borderRadius: 20,
    marginBottom: 18,
  },

  statsTitle: {
    fontSize: 16,
    color: "#4f46e5",
    fontWeight: "600",
    marginBottom: 12,
  },

  steps: {
    fontSize: 42,
    fontWeight: "700",
    color: "#111827",
  },

  description: {
    marginTop: 6,
    fontSize: 14,
    color: "#6b7280",
  },

  liveCard: {
    backgroundColor: "#ecfeff",
    padding: 22,
    borderRadius: 20,
  },

  liveTitle: {
    fontSize: 16,
    color: "#0891b2",
    fontWeight: "600",
    marginBottom: 12,
  },

  liveSteps: {
    fontSize: 42,
    fontWeight: "700",
    color: "#111827",
  },

  footer: {
    marginTop: 24,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 18,
  },

  footerText: {
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 20,
  },
});
