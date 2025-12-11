import { useQuery } from "@tanstack/react-query";
import { medicationService } from "@/services/medicationService";

export const useMedications = () => {
  return useQuery({
    queryKey: ["medications"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return medicationService.getAll();
    },
  });
};
