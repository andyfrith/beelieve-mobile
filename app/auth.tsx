import { Colors } from "@/constants/theme";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Auth() {
  const [hasBiometrics, setHasBiometrics] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const checkBiometrics = async () => {
    const hasHardware = await LocalAuthentication.hasHardwareAsync();
    const isEnrolled = await LocalAuthentication.isEnrolledAsync();
    setHasBiometrics(hasHardware && isEnrolled);
  };

  const authenticate = async () => {
    try {
      setIsAuthenticating(true);
      setError(null);
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      const isEnrolled = await LocalAuthentication.isEnrolledAsync();
      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();

      const auth = await LocalAuthentication.authenticateAsync({
        promptMessage:
          hasHardware && hasBiometrics ? "Use face ID/TouchID" : "Enter PIN",
        fallbackLabel: "Use Pin",
        cancelLabel: "Cancel",
        disableDeviceFallback: false,
      });

      if (auth.success) {
        console.log("Authentication successful", auth);
        router.replace("/home");
      } else {
        setError("Authentication failed. Please try again");
      }
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Authentication failed",
      );
      console.error("Authentication failed", error);
    }
  };

  useEffect(() => {
    checkBiometrics();
  }, []);

  //   useEffect(() => {
  //     setTimeout(() => {
  //       router.replace("/tabs");
  //     }, 1000);
  //   }, []);

  return (
    // <LinearGradient colors={["#FFD700", "#FFA500"]} style={styles.container}>
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.container}
    >
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name="bee" size={100} color="white" />
        </View>
        <Text style={styles.title}>Beelieve</Text>
        <Text style={styles.subtitle}>Health & Happiness</Text>
        <View style={styles.card}>
          <Text style={styles.welcomeText}>Welcome to Beelieve</Text>
          <Text style={styles.instructionsText}>
            {hasBiometrics
              ? "Use face ID/TouchID or PIN to access your reminders"
              : "Enter your PIN to access your reminders"}
          </Text>
          <TouchableOpacity
            style={[styles.button, isAuthenticating && styles.buttonDisabled]}
            onPress={authenticate}
            disabled={isAuthenticating}
          >
            <Ionicons
              name={hasBiometrics ? "finger-print" : "keypad-outline"}
              size={24}
              color="white"
              style={styles.buttonIcon}
            />
            <Text style={styles.buttonText}>
              {isAuthenticating
                ? "Verifying..."
                : hasBiometrics
                  ? "Use Face ID/TouchID"
                  : "Enter PIN"}
            </Text>
          </TouchableOpacity>
          {error && (
            <View style={styles.errorContainer}>
              <Ionicons name="alert-circle" size={24} color="#f44336" />
              <Text style={styles.errorText}>{error}</Text>
            </View>
          )}
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginBottom: 10,
    textShadowColor: "rgba(0, 0, 0, 0.2)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
    marginBottom: 40,
    textAlign: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 30,
    borderRadius: 20,
    width: Dimensions.get("window").width - 40,
    alignItems: "center",
    shadowColor: "rgb(0, 0, 0)",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  instructionsText: {
    fontSize: 16,
    color: "black",
    marginBottom: 20,
    textAlign: "center",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#ffbf00",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 12,
    width: "100%",
  },
  buttonIcon: {
    marginRight: 8,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  errorContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#ffebee",
    padding: 10,
    borderRadius: 8,
    width: "100%",
    marginTop: 20,
  },
  errorText: {
    color: "#f44336",
    fontSize: 14,
    marginLeft: 8,
    fontWeight: "500",
  },
});
