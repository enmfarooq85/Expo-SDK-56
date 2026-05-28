import { useState, useEffect } from "react";

import {
  Platform,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Device from "expo-device";
import * as Location from "expo-location";

export default function App() {
  const [location, setLocation] = useState<Location.LocationObject | null>(
    null,
  );

  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [loading, setLoading] = useState<boolean>(false);

  async function getCurrentLocation() {
    setLoading(true);

    try {
      if (Platform.OS === "android" && !Device.isDevice) {
        setErrorMsg("Location does not work properly on Android Emulator.");

        setLoading(false);
        return;
      }

      // Ask Permission
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied.");

        setLoading(false);
        return;
      }

      // Get Location
      let currentLocation = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setLocation(currentLocation);
      setErrorMsg(null);
    } catch (error) {
      setErrorMsg("Something went wrong.");
    }

    setLoading(false);
  }

  useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Live Location</Text>

        <Text style={styles.description}>
          Get your current GPS coordinates using Expo Location API.
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2563eb" />
        ) : errorMsg ? (
          <View style={styles.errorCard}>
            <Text style={styles.errorText}>{errorMsg}</Text>
          </View>
        ) : location ? (
          <View style={styles.locationCard}>
            <View style={styles.infoBox}>
              <Text style={styles.label}>Latitude</Text>

              <Text style={styles.value}>{location.coords.latitude}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Longitude</Text>

              <Text style={styles.value}>{location.coords.longitude}</Text>
            </View>

            <View style={styles.infoBox}>
              <Text style={styles.label}>Accuracy</Text>

              <Text style={styles.value}>{location.coords.accuracy} m</Text>
            </View>
          </View>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={getCurrentLocation}>
          <Text style={styles.buttonText}>Refresh Location</Text>
        </TouchableOpacity>
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
    marginBottom: 10,
    textAlign: "center",
  },

  description: {
    textAlign: "center",
    fontSize: 15,
    color: "#6b7280",
    lineHeight: 22,
    marginBottom: 28,
  },

  locationCard: {
    backgroundColor: "#eff6ff",
    borderRadius: 20,
    padding: 20,
    marginBottom: 24,
  },

  infoBox: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 4,
  },

  value: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },

  errorCard: {
    backgroundColor: "#fee2e2",
    padding: 18,
    borderRadius: 18,
    marginBottom: 20,
  },

  errorText: {
    color: "#991b1b",
    fontSize: 15,
    textAlign: "center",
    lineHeight: 22,
  },

  button: {
    backgroundColor: "#2563eb",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
