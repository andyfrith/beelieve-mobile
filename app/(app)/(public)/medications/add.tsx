import { Header } from "@/components/home/Header";
import MedicationForm from "@/components/medications/MedicationForm";
import { Colors } from "@/constants/theme";
import { LinearGradient } from "expo-linear-gradient";
import { Platform, ScrollView, StyleSheet, View } from "react-native";

export default function AddMedication() {
  return (
    <LinearGradient
      colors={[Colors.honey.color2, Colors.honey.color1]}
      style={styles.gradient}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <Header />
        <View style={styles.content}>
          <MedicationForm />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingTop: Platform.OS === "ios" ? 50 : 30,
  },
});
