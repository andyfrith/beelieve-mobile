import { Fonts } from "@/constants/theme";
import { useActions } from "@/hooks/useActions";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { Link } from "expo-router";
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export function Actions() {
  const { data: actions } = useActions();

  if (!actions) {
    return null;
  }

  return (
    <View style={styles.actionsContainer}>
      <Text style={styles.sectionTitle}>Actions</Text>
      <View style={styles.actionsGrid}>
        {actions.map((action) => (
          <Link href={action.route as any} key={action.label} asChild>
            <TouchableOpacity style={styles.actionButton}>
              <LinearGradient
                colors={["white", "white"]}
                // colors={action.gradient as [string, string]}
                style={styles.actionGradient}
              >
                <View style={styles.actionContent}>
                  <View
                    style={[
                      styles.actionIcon,
                      { backgroundColor: `${action.color}15` },
                    ]}
                  >
                    <Ionicons
                      name={action.icon as keyof typeof Ionicons.glyphMap}
                      size={28}
                      color={action.color}
                    />
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
  actionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  actionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 15,
  },
  actionButton: {
    width: (Dimensions.get("window").width - 92) / 2,
    height: 120,
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
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  actionLabel: {
    fontFamily: Fonts.brand,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 8,
    paddingLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "white",
    marginBottom: 5,
    fontFamily: Fonts.brand,
  },
});
