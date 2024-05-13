import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SupplierInfo } from '../../../../shared/types/Supplier';
import { createSupplier, updateSupplier , deleteSupplier} from "../api/supplierApi";

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
  console.log("useUpdateSupplier");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SupplierInfo) => {
      console.log("Data before mutation:", data);
      return updateSupplier(data);
    },
    onSuccess(result, variables, context) {
      console.log("Successfully updated supplier");
      queryClient.invalidateQueries({ queryKey: ["supplier"] });
      queryClient.invalidateQueries({ queryKey: ["suppliers", {id : variables.sid}] });
      
    }
    
   
  });

}

export function useDeleteSupplier () {
  console.log("useDeleteSupplier");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteSupplier(id),
    onSuccess() {
      console.log("Successfully deleted supplier");
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
