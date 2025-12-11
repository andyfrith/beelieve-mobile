import { useQuery } from "@tanstack/react-query";
import { actionService } from "@/services/actionService";

export const useActions = () => {
  return useQuery({
    queryKey: ["actions"],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return actionService.getAll();
    },
  });
};
