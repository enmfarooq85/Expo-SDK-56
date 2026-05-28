import {
  useBatteryLevel,
  useBatteryState,
  useLowPowerMode,
  BatteryState,
} from "expo-battery";

import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const batteryLevel = useBatteryLevel();
  const batteryState = useBatteryState();
  const lowPowerMode = useLowPowerMode();

  const batteryPercentage = batteryLevel
    ? Math.round(batteryLevel * 100)
    : 0;

  const getBatteryStateText = () => {
    switch (batteryState) {
      case BatteryState.CHARGING:
        return "Charging";
      case BatteryState.FULL:
        return "Full";
      case BatteryState.UNPLUGGED:
        return "Unplugged";
      default:
        return "Unknown";
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Battery Monitor</Text>

        {/* Battery Circle */}
        <View style={styles.batteryWrapper}>
          <View style={styles.batteryCircle}>
            <Text style={styles.batteryText}>
              {batteryPercentage}%
            </Text>
          </View>
        </View>

        {/* Battery Info */}
        <View style={styles.infoCard}>
          <Text style={styles.label}>Battery State</Text>
          <Text style={styles.value}>
            {getBatteryStateText()}
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.label}>Low Power Mode</Text>

          <Text
            style={[
              styles.value,
              {
                color: lowPowerMode ? "#dc2626" : "#16a34a",
              },
            ]}
          >
            {lowPowerMode ? "Enabled" : "Disabled"}
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Live battery information powered by Expo Battery API.
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
    borderRadius: 28,
    padding: 24,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  heading: {
    fontSize: 30,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 28,
    textAlign: "center",
  },

  batteryWrapper: {
    alignItems: "center",
    marginBottom: 30,
  },

  batteryCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: "#dcfce7",
    alignItems: "center",
    justifyContent: "center",
  },

  batteryText: {
    fontSize: 42,
    fontWeight: "700",
    color: "#166534",
  },

  infoCard: {
    backgroundColor: "#f9fafb",
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,
  },

  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 6,
  },

  value: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },

  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 16,
  },

  footerText: {
    textAlign: "center",
    fontSize: 13,
    color: "#6b7280",
    lineHeight: 20,
  },
});