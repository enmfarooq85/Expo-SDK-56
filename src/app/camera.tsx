import { CameraView, CameraType, useCameraPermissions } from "expo-camera";

import { useState } from "react";

import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [autoFocus, setAutoFocus] = useState<"off" | "on">("off");
  const [torch, setTorch] = useState<boolean>(false);
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading Camera...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <Text style={styles.permissionTitle}>Camera Permission</Text>

          <Text style={styles.permissionText}>
            Please allow camera access to continue.
          </Text>

          <TouchableOpacity
            style={styles.permissionButton}
            onPress={requestPermission}
          >
            <Text style={styles.permissionButtonText}>Grant Permission</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function toggleFocusMode() {
    setAutoFocus((current) => (current === "off" ? "on" : "off"));
  }

  function toggleFlashMode() {
    setTorch((current) => (current === false ? true : false));
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing={facing}
        autofocus={autoFocus}
        enableTorch={torch}
      />

      <SafeAreaView style={styles.overlay}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <Text style={styles.title}>Expo Camera</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Flash: {facing == "back" ? "back" : "front"}
            </Text>
            <Text style={styles.statusText}>
              Focus: {autoFocus == "off" ? "off" : "on"}
            </Text>
            <Text style={styles.statusText}>
              Flash: {torch == false ? "off" : "on"}
            </Text>
          </View>
        </View>

        {/* Bottom Buttons */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleCameraFacing}
          >
            <Text style={styles.buttonText}>Flip</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleFocusMode}
          >
            <Text style={styles.buttonText}>Focus</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={toggleFlashMode}
          >
            <Text style={styles.buttonText}>Flash</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },

  camera: {
    flex: 1,
  },

  overlay: {
    flex: 1,
    justifyContent: "space-between",
  },

  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#111827",
  },

  loadingText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },

  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f3f4f6",
    paddingHorizontal: 24,
  },

  permissionCard: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 28,
    borderRadius: 24,
    alignItems: "center",
    elevation: 5,
  },

  permissionTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 12,
  },

  permissionText: {
    textAlign: "center",
    fontSize: 16,
    color: "#6b7280",
    lineHeight: 24,
    marginBottom: 24,
  },

  permissionButton: {
    backgroundColor: "#111827",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 16,
  },

  permissionButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  topBar: {
    paddingHorizontal: 24,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "700",
  },

  statusContainer: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 14,
  },

  statusText: {
    color: "#fff",
    fontWeight: "600",
  },

  bottomBar: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingBottom: 40,
  },

  actionButton: {
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
