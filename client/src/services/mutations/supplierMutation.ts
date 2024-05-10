import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierInfo } from '../../../../shared/types/Supplier';
import { createSupplier } from "../api/supplierApi";

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


// export function useUpdateEmployee() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: EmployeeData) => {
//       console.log("Data before mutation:", data);
//       return updateEmployee(data);
//     },
//     onSuccess() {
//       console.log("Successfully updated employee");
//     },
//     onSettled: async (_: any, error: any, variables: { _id: any; }) => {
//       console.log("settled");
//       if (error) {
//         console.log(error);
//       } else {
//         await queryClient.invalidateQueries({ queryKey: ["employees"] });
//         await queryClient.invalidateQueries({
//           queryKey: ["employee", { id: variables._id }],
//         });
//       }
//     },
//   });
// }

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
