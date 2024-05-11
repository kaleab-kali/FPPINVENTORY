import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryInfo } from '../../../../shared/types/Category';
import { createCategory, deleteCategory, updateCategory } from "../api/categoryApi";

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
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => {
      console.log("Data before mutation:", data);
      return updateCategory(data);
    },
    onSuccess() {
      console.log("Successfully updated category");
    },
    onSettled: async (_: any, error: any, variables: { _id: any }) => {
      console.log("settled", variables._id);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
        await queryClient.invalidateQueries({
          queryKey: ["category", { id: variables._id }],
        });
        // await queryClient.setQueryData(["supplier", { id: variables._id }]);
      }
    },
  });
}

export function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onSuccess() {
      console.log("Successfully deleted category");
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
