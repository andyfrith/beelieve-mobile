import { MED_ACTIONS } from "@/constants/actions";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";

export function MedActions() {
  return (
    <View style={styles.quickActionsContainer}>
      <Text style={styles.sectionTitle}>Med Actions</Text>
      <View style={styles.quickActionsGrid}>
        {MED_ACTIONS.map((action) => (
          <Link href={action.route} key={action.label} asChild>
            <TouchableOpacity key={action.label} style={styles.actionButton}>
              <LinearGradient
                colors={action.gradient}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <View style={styles.actionIcon}>
                    <Ionicons name={action.icon} size={28} color="white" />
                  </View>
                  <Text style={styles.actionLabel}>{action.label}</Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  actionButton: {
    width: (Dimensions.get("window").width - 52) / 2,
    height: 110,
    borderRadius: 16,
    overflow: "hidden",
  },
  actionGradient: {
    flex: 1,
    padding: 15,
  },
  actionContent: {
    flex: 1,
    justifyContent: "space-between",
  },
  actionIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
});
