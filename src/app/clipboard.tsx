import { useState } from "react";

import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import * as Clipboard from "expo-clipboard";

export default function App() {
  const [copiedText, setCopiedText] = useState("");

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync("This Text Should be visible on the clipboard.");
  };

  const fetchCopiedText = async () => {
    const text = await Clipboard.getStringAsync();
    setCopiedText(text);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Clipboard Manager</Text>

        <Text style={styles.description}>
          Copy and retrieve text using Expo Clipboard API.
        </Text>

        {/* Copy Button */}
        <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>Set Text</Text>
        </TouchableOpacity>

        {/* Fetch Button */}
        <TouchableOpacity style={styles.fetchButton} onPress={fetchCopiedText}>
          <Text style={styles.buttonText}>View Clipboard</Text>
        </TouchableOpacity>

        {/* Result */}
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Clipboard Content</Text>

          <Text style={styles.resultText}>
            {copiedText || "Nothing copied yet"}
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

  copyButton: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 16,
  },

  fetchButton: {
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

  resultCard: {
    marginTop: 28,
    backgroundColor: "#f9fafb",
    padding: 20,
    borderRadius: 18,
  },

  resultLabel: {
    fontSize: 14,
    color: "#6b7280",
    marginBottom: 10,
  },

  resultText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#111827",
  },
});
