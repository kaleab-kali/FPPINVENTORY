import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitInfo } from "../../../../shared/types/Unit";
import { createUnit, updateUnit, deleteUnit } from "../api/unitApi";
import { message } from "antd";

export function useCreateUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitInfo) => createUnit(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.error("Error creating unit:", error);
      message.error(error.message || "Failed to create unit");
    },
    onSuccess: () => {
      console.log("Success");
      message.success("Unit created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
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
    onError: (error: any) => {
      console.error("Error updating unit:", error);
      message.error(error.message || "Failed to update unit");
    },
    onSuccess: () => {
      console.log("Successfully updated unit");
      message.success("Unit updated successfully");
      queryClient.invalidateQueries({ queryKey: ["unit"] });
    },
    onSettled: async (_: any, error: any, variables: { unitID: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["unit", { id: variables.unitID }],
        });
      }
    },
  });
}

export function useDeleteUnit() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteUnit(id),
    onError: (error: any) => {
      console.error("Error deleting unit:", error);
      message.error(error.message || "Failed to delete unit");
    },
    onSuccess: () => {
      console.log("Successfully deleted unit");
      message.success("Unit deleted successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["unit"] });
      }
    },
  });
}
