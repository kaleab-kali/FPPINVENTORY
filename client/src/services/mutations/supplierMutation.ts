import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import {
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../api/supplierApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateSupplier() {
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
        // setLoading(true);
  return useMutation({
    mutationFn: (data: SupplierInfo) => {
            setLoading(true);
      return createSupplier(data)},
    onMutate: () => {
            setLoading(true);
      console.log("Mutating");
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error creating supplier:", error);
      message.error(error.message || "Failed to create supplier");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Success");
      message.success("Supplier created successfully");
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
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
    const { setLoading } = useLoading();

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierInfo) => {
            setLoading(true);
      console.log("Data before mutation:", data);
      return updateSupplier(data);
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error updating supplier:", error);
      message.error(error.message || "Failed to update supplier");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Successfully updated supplier");
      message.success("Supplier updated successfully");
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
    },
    onSettled: async (_: any, error: any, variables) => {
      setLoading(false);
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
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
            setLoading(true);
      return deleteSupplier(id)},
    onError: (error: any) => {
      setLoading(false);
      console.error("Error deleting supplier:", error);
      message.error(error.message || "Failed to delete supplier");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Successfully deleted supplier");
      message.success("Supplier deleted successfully");
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["supplier"] });
      }
    },
  });
}
