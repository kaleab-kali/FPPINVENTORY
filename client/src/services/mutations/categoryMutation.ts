import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryInfo } from '../../../../shared/types/Category';
import { createCategory, updateCategory, deleteCategory } from "../api/categoryApi";

export function useCreateCategory() {
  console.log("useCreateCategory");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => createCategory(data),
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
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}


export function useUpdateCategory() {
  console.log("useUpdateSupplier");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => {
      console.log("Data before mutation:", data);
      return updateCategory(data);
    },
    onSuccess(result, variables, context) {
      console.log("Successfully updated Category");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.invalidateQueries({ queryKey: ["category", {id : variables.catID}] });
      
    }
    
   
  });

}

export function useDeleteCategory () {
  console.log("useDeleteCategory");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess() {
      console.log("Successfully deleted Category");
    },
    onSettled: async (_: any, error: any) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });

}