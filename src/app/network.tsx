import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Network from "expo-network";

export default function NetworkScreen() {
  const networkState = Network.useNetworkState();

  const isConnected = networkState.isConnected;
  const isReachable = networkState.isInternetReachable;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Network Status</Text>

        <View style={styles.row}>
          <Text style={styles.label}>Connection Type</Text>
          <Text style={styles.value}>
            {networkState.type || "Unknown"}
          </Text>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Device Status</Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: isConnected ? "#dcfce7" : "#fee2e2",
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: isConnected ? "#166534" : "#991b1b",
                },
              ]}
            >
              {isConnected ? "Connected" : "Disconnected"}
            </Text>
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.label}>Internet Access</Text>

          <View
            style={[
              styles.badge,
              {
                backgroundColor: isReachable ? "#dbeafe" : "#fef3c7",
              },
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                {
                  color: isReachable ? "#1d4ed8" : "#92400e",
                },
              ]}
            >
              {isReachable ? "Reachable" : "Limited"}
            </Text>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Real-time network monitoring using Expo Network API.
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
    backgroundColor: "white",
    borderRadius: 24,
    padding: 24,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 5,
  },

  heading: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 28,
  },

  row: {
    marginBottom: 22,
  },

  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 8,
  },

  value: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    textTransform: "capitalize",
  },

  badge: {
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 14,
    fontWeight: "600",
  },

  footer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
    paddingTop: 18,
  },

  footerText: {
    color: "#6b7280",
    fontSize: 13,
    lineHeight: 20,
  },
});