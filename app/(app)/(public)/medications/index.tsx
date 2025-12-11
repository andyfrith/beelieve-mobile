import { Header } from "@/components/home/Header";
import MedicationList from "@/components/medications/MedicationList";
import { Colors } from "@/constants/theme";
import { useMedications } from "@/hooks/medications/useMedications";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";

export default function MedicationsScreen() {
  const { data: medications, isLoading, error } = useMedications();

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size={"large"} color={Colors.secondary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ padding: 16, alignItems: "center" }}>
        <Text style={{ color: Colors.dark.text, marginBottom: 8 }}>
          Failed to load medications
        </Text>
        <Text style={{ color: Colors.muted }}>
          {error instanceof Error ? error.message : "Please try again later"}
        </Text>
      </View>
    );
  }

  if (!medications || medications.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Ionicons name="medical-outline" size={48} color="#ccc" />
        <Text style={styles.emptyStateText}>
          No medications scheduled for today
        </Text>
      </View>
    );
  }

  return (
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.content}>
          <MedicationList medications={medications} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#f8f9fa",
  },

  gradient: {
    flex: 1,
  },
  headerGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: Platform.OS === "ios" ? 140 : 120,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 1,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "white",
    marginLeft: 15,
  },

  emptyState: {
    alignItems: "center",
    padding: 30,
    backgroundColor: "white",
    borderRadius: 16,
    marginTop: 10,
  },
  emptyStateText: {
    fontSize: 16,
    color: "#666",
    marginTop: 10,
    marginBottom: 20,
  },
});
