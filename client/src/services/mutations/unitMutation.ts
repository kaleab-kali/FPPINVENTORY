import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UnitInfo } from "../../../../shared/types/Unit";
import { createUnit, updateUnit, deleteUnit } from "../api/unitApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateUnit() {
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitInfo) => {
            setLoading(true);
      return createUnit(data)},
    onMutate: () => {
            // setLoading(true);
      console.log("Mutating");
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error creating unit:", error);
      message.error(error.message || "Failed to create unit");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Success");
      message.success("Unit created successfully");
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
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
    const { setLoading } = useLoading();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: UnitInfo) => {
          setLoading(true);
      console.log("Data before mutation:", data);
      return updateUnit(data);
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error updating unit:", error);
      message.error(error.message || "Failed to update unit");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Successfully updated unit");
      message.success("Unit updated successfully");
      queryClient.invalidateQueries({ queryKey: ["unit"] });
    },
    onSettled: async (_: any, error: any, variables: { unitID: any }) => {
      setLoading(false);
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
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
            setLoading(true);
      return deleteUnit(id)},
    onError: (error: any) => {
      setLoading(false);
      console.error("Error deleting unit:", error);
      message.error(error.message || "Failed to delete unit");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Successfully deleted unit");
      message.success("Unit deleted successfully");
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["unit"] });
      }
    },
  });
}
