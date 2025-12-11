import AsyncStorage from "@react-native-async-storage/async-storage";
import { medications } from "@/data/medications";
import type { Medication } from "@/data/medications";

enum StorageKeys {
  MEDICATIONS = "@medications",
}

export const medicationService = {
  add: async (medication: Medication): Promise<void> => {
    try {
      const medications = await medicationService.getAll();
      medications.push(medication);
      await AsyncStorage.setItem(
        StorageKeys.MEDICATIONS,
        JSON.stringify(medications),
      );
    } catch (error) {
      console.error("Error adding medication:", error);
      throw error;
    }
  },
  update: async (medication: Medication): Promise<void> => {
    try {
      const medications = await medicationService.getAll();
      const index = medications.findIndex((med) => med.id === medication.id);
      if (index !== -1) {
        medications[index] = medication;
        await AsyncStorage.setItem(
          StorageKeys.MEDICATIONS,
          JSON.stringify(medications),
        );
      }
    } catch (error) {
      console.error("Error updating medication:", error);
      throw error;
    }
  },
  delete: async (id: string): Promise<void> => {
    try {
      const medications = await medicationService.getAll();
      const updatedMedications = medications.filter((med) => med.id !== id);
      await AsyncStorage.setItem(
        StorageKeys.MEDICATIONS,
        JSON.stringify(updatedMedications),
      );
    } catch (error) {
      console.error("Error deleting medication:", error);
      throw error;
    }
  },
  getAllTest: async (): Promise<Medication[]> => {
    return Promise.resolve(medications);
  },
  getAll: async (): Promise<Medication[]> => {
    try {
      const data = await AsyncStorage.getItem(StorageKeys.MEDICATIONS);
      // console.log("getAll() data", data);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Error getting medications:", error);
      return [];
    }
  },
  clearAll: async (): Promise<void> => {
    try {
      await AsyncStorage.multiRemove([StorageKeys.MEDICATIONS]);
    } catch (error) {
      console.error("Error clearing data:", error);
      throw error;
    }
  },
};
