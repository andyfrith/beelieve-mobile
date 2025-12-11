import { actions } from "@/data/actions";
import type { Action } from "@/data/actions";

export const actionService = {
  getAll: async (): Promise<Action[]> => {
    return Promise.resolve(actions);
  },
};
