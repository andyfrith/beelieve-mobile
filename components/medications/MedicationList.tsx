import { StyleSheet, Text, View } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Medication } from "@/utils/storage";

const MedicationList = ({ medications }: { medications: Medication[] }) => {
  return (
    <FlashList
      data={medications}
      renderItem={({ item: medication }) => (
        <View key={medication.id} style={styles.medicationCard}>
          <View
            style={[
              styles.medicationBadge,
              { backgroundColor: `${medication.color}15` },
            ]}
          >
            <Ionicons name="medical" size={24} color={medication.color} />
          </View>
          <View style={styles.doseInfo}>
            <View>
              <Text style={styles.medicineName}>{medication.name}</Text>
              <Text style={styles.dosageInfo}>{medication.dosage}</Text>
            </View>
            <View style={styles.doseTime}>
              <Ionicons name="time-outline" size={16} color="#666" />
              <Text style={styles.timeText}>
                {medication.times.join(" : ")}
              </Text>
            </View>
          </View>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 16,
    padding: 16,
    borderRadius: 12,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#000",
    overflow: "hidden",
    boxShadow: "0px 4px 2px -2px rgba(0,0,0, 0.2)",
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 180,
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    color: Colors.muted,
  },
  metadata: {
    // borderTopColor: Colors.light,
    borderTopWidth: StyleSheet.hairlineWidth,
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    padding: 10,
  },
  metadataText: {
    fontSize: 13,
    color: Colors.muted,
  },
  dot: {
    color: "#999",
    fontSize: 13,
  },
  medicationCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },
  medicationBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  doseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  dosageInfo: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  doseTime: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeText: {
    marginLeft: 5,
    color: "#666",
    fontSize: 14,
  },
});
export default MedicationList;
