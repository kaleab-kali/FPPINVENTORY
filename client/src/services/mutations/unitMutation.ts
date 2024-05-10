import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitInfo } from '../../../../shared/types/Unit';
import { createUnit } from "../api/unitApi";

export function useCreateUnit() {
  console.log("useCreateUnit");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitInfo) => createUnit(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["unit"] });
      }
    },
  });
}
