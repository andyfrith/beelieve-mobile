import { Alert } from "react-native";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { medicationService } from "@/services/medicationService";
import { RelativePathString, router } from "expo-router";

export const useAddMedication = ({
  successRedirectPath,
}: {
  successRedirectPath?: string;
}) => {
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: medicationService.add,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["medications"] });
      Alert.alert("Success", "Medication added successfully");
      if (successRedirectPath) {
        router.navigate(successRedirectPath as RelativePathString);
      }
    },
    onError: (error) => {
      Alert.alert("Error", "Failed to save medication. Please try again.");
    },
  });
  return mutation;
};
