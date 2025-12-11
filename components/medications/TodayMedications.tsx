import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { DoseHistory, Medication } from "@/utils/storage";
import { Colors } from "@/constants/theme";

export function TodayMedications({
  todaysMedications,
  doseHistory,
  handleTakeDose,
}: {
  todaysMedications: Medication[];
  doseHistory: DoseHistory[];
  handleTakeDose: (medication: Medication) => Promise<void>;
}) {
  const isDoseTaken = (medicationId: string) => {
    return doseHistory.some(
      (dose) => dose.medicationId === medicationId && dose.taken,
    );
  };

  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today&apos;s Meds</Text>
        <Link href="/calendar" asChild>
          <TouchableOpacity>
            <Text style={styles.seeAllButton}>See All</Text>
          </TouchableOpacity>
        </Link>
      </View>
      {todaysMedications.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="medical-outline" size={48} color="#ccc" />
          <Text style={styles.emptyStateText}>
            No medications scheduled for today
          </Text>
          <Link href="/medications/add" asChild>
            <TouchableOpacity style={styles.addMedicationButton}>
              <Text style={styles.addMedicationButtonText}>Add Medication</Text>
            </TouchableOpacity>
          </Link>
        </View>
      ) : (
        todaysMedications.map((medication) => {
          const taken = isDoseTaken(medication.id);
          return (
            <View key={medication.id} style={styles.doseCard}>
              <View
                style={[
                  styles.doseBadge,
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
                  {/* <Text style={styles.timeText}>{medication.times[0]}</Text> */}
                </View>
              </View>
              {taken ? (
                <View style={[styles.takenBadge]}>
                  <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
                  <Text style={styles.takenText}>Taken</Text>
                </View>
              ) : (
                <TouchableOpacity
                  style={[
                    styles.takeDoseButton,
                    { backgroundColor: medication.color },
                  ]}
                  onPress={() => handleTakeDose(medication)}
                >
                  <Text style={styles.takeDoseText}>Take</Text>
                </TouchableOpacity>
              )}
            </View>
          );
        })
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  section: {
    paddingHorizontal: 20,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#1a1a1a",
    marginBottom: 5,
  },
  seeAllButton: {
    color: Colors.honey.color4,
    fontWeight: "600",
  },
  doseCard: {
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
  doseBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },
  doseInfo: {
    flex: 1,
    justifyContent: "space-between",
  },
  medicineName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
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
  takeDoseButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 15,
    marginLeft: 10,
  },
  takeDoseText: {
    color: "white",
    fontWeight: "600",
    fontSize: 14,
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
  addMedicationButton: {
    backgroundColor: "#ffbf00",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  addMedicationButtonText: {
    color: "white",
    fontWeight: "600",
  },
  takenBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 10,
  },
  takenText: {
    color: "#4CAF50",
    fontWeight: "600",
    fontSize: 14,
    marginLeft: 4,
  },
});
