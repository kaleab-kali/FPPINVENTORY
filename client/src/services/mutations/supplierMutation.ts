import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierInfo } from '../../../../shared/types/Supplier';
import { createSupplier, deleteSupplier, updateSupplier } from "../api/supplierApi";

export function useCreateSupplier() {
  console.log("useCreateSupplier");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierInfo) => createSupplier(data),
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
    onSuccess() {
      console.log("Successfully updated Supplier");
    },
    onSettled: async (_: any, error: any, variables: { _id: any }) => {
      console.log("settled" , variables._id);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["supplier"] });
        await queryClient.invalidateQueries({ queryKey: ["supplier", { id: variables._id }]});
        // await queryClient.setQueryData(["supplier", { id: variables._id }]);

      }
    },
  });
}

export function useDeleteSupplier() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess() {
      console.log("Successfully deleted Supplier");
    },
    onSettled: async (_: any, error: any) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["supplier"] });
      }
    },
  });
}
