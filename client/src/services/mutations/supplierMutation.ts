import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../api/supplierApi";
import { message } from "antd";

export function useCreateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierInfo) => createSupplier(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.error("Error creating supplier:", error);
      message.error(error.message || "Failed to create supplier");
    },
    onSuccess: () => {
      console.log("Success");
      message.success("Supplier created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["supplier"] });
      }
    },
  });
}

export function useUpdateSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierInfo) => {
      console.log("Data before mutation:", data);
      return updateSupplier(data);
    },
    onError: (error: any) => {
      console.error("Error updating supplier:", error);
      message.error(error.message || "Failed to update supplier");
    },
    onSuccess: () => {
      console.log("Successfully updated supplier");
      message.success("Supplier updated successfully");
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
    onSettled: async (_: any, error: any, variables: { sid: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["suppliers", { id: variables.sid }],
        });
      }
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onError: (error: any) => {
      console.error("Error deleting supplier:", error);
      message.error(error.message || "Failed to delete supplier");
    },
    onSuccess: () => {
      console.log("Successfully deleted supplier");
      message.success("Supplier deleted successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["supplier"] });
      }
    },
  });
}
