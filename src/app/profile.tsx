import { Link } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />

      <View style={styles.content}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/143240734?v=4",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>Muhammad Farooq</Text>

        <Text style={styles.role}>React Native Developer</Text>

        <View style={styles.infoCard}>
          <Text style={styles.infoText}>
            Passionate about building scalable and user-friendly mobile
            applications using React Native and Expo.
          </Text>
        </View>

        <Link href="/" asChild>
          <Pressable style={styles.button}>
            <Text style={styles.buttonText}>Back To Home</Text>
          </Pressable>
        </Link>
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
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 999,
    marginBottom: 20,
  },

  name: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
  },

  role: {
    fontSize: 16,
    color: "#6b7280",
    marginTop: 6,
    marginBottom: 24,
  },

  infoCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 18,
    width: "100%",
    marginBottom: 32,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 4,
  },

  infoText: {
    fontSize: 15,
    color: "#4b5563",
    lineHeight: 24,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#111827",
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 14,
  },

  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});