import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { SupplierInfo } from "../../../../shared/types/Supplier";
import { createSupplier, updateSupplier } from "../api/supplierApi";

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

export function useUpdateSupplier( options?: UseMutationOptions<void, Error, SupplierInfo, unknown>) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierInfo) => {
      console.log("Data before mutation:", data);
      return updateSupplier(data);
    },
    onSuccess() {
      console.log("Successfully updated employee");
    },
    // onSettled: async (_, error, variables: { _id: any }) => {
    //   console.log("settled");
    //   if (error) {
    //     console.log(error);
    //   } else {
    //     await queryClient.invalidateQueries({ queryKey: ["supplier"] });
    //     await queryClient.invalidateQueries({
    //       queryKey: ["supplier", { id: variables._id }],
    //     });
    //   }
    // },
    // ...options,
  });
}

// export function useDeleteEmployee() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: (id: string) => deleteEmployee(id),
//     onSuccess() {
//       console.log("Successfully deleted employee");
//     },
//     onSettled: async (_: any, error: any) => {
//       if (error) {
//         console.log(error);
//       } else {
//         await queryClient.invalidateQueries({ queryKey: ["employees"] });
//       }
//     },
//   });
// }
