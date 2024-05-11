import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitInfo } from '../../../../shared/types/Unit';
import { createUnit, deleteUnit, updateUnit } from "../api/unitApi";

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitInfo) => {
      console.log("Data before mutation:", data);
      return updateUnit(data);
    },
    onSuccess() {
      console.log("Successfully updated Unit");
    },
    onSettled: async (_: any, error: any, variables: { _id: any }) => {
      console.log("settled", variables._id);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["unit"] });
        await queryClient.invalidateQueries({
          queryKey: ["unit", { id: variables._id }],
        });
      }
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteUnit(id),
    onSuccess() {
      console.log("Successfully deleted Unit");
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