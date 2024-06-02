import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryInfo } from "../../../../shared/types/Category";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";
import { message } from "antd";

export function useCreateCategory() {
  console.log("useCreateCategory");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => createCategory(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create category");
    },
    onSuccess: () => {
      console.log("success");
      message.success("Category created successfully");
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
  console.log("useUpdateCategory");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => {
      console.log("Data before mutation:", data);
      return updateCategory(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update category");
    },
    onSuccess: (result: any, variables: { catID: any }, context: any) => {
      console.log("Successfully updated Category");
      message.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.invalidateQueries({
        queryKey: ["category", { id: variables.catID }],
      });
    },
  });
}

export function useDeleteCategory() {
  console.log("useDeleteCategory");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCategory(id),
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete category");
    },
    onSuccess: () => {
      console.log("Successfully deleted Category");
      message.success("Category deleted successfully");
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
