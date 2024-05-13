import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitInfo } from '../../../../shared/types/Unit';
import { createUnit, updateUnit, deleteUnit } from "../api/unitApi";

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

export function useUpdateUnit() {
  console.log("useUpdateSupplier");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitInfo) => {
      console.log("Data before use mutation:", data);
      return updateUnit(data);
    },
    onSuccess(result, variables, context) {
      console.log("Successfully updated unit");
      queryClient.invalidateQueries({ queryKey: ["unit"] });
      queryClient.invalidateQueries({ queryKey: ["unit", {id : variables.unitID}] });
      
    }
    
   
  });

}

export function useDeleteUnit () {
  console.log("useDeleteUnit");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUnit(id),
    onSuccess() {
      console.log("Successfully deleted unit");
    },
    onSettled: async (_: any, error: any) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["unit"] });
      }
    },
  });

}