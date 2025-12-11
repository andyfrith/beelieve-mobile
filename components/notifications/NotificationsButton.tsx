import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Medication } from "@/utils/storage";

export function NotificationsButton({
  todaysMedications,
  setShowNotifications,
}: {
  todaysMedications: Medication[];
  setShowNotifications: (show: boolean) => void;
}) {
  return (
    <TouchableOpacity
      style={styles.notificationButton}
      onPress={() => setShowNotifications(true)}
    >
      <Ionicons name="notifications-outline" size={24} color="white" />
      {todaysMedications.length > 0 && (
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationCount}>
            {todaysMedications.length}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  notificationButton: {
    position: "relative",
    padding: 8,
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 12,
    marginLeft: 8,
  },
  notificationBadge: {
    position: "absolute",
    top: -4,
    right: -4,
    backgroundColor: "#FF5252",
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#146922",
    paddingHorizontal: 4,
  },
  notificationCount: {
    color: "white",
    fontSize: 11,
    fontWeight: "bold",
  },
});
