import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryInfo } from "../../../../shared/types/Category";
import {
  createCategory,
  updateCategory,
  deleteCategory,
} from "../api/categoryApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateCategory() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => {
      setLoading(true);
      return createCategory(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create category");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("success");
      message.success("Category created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}

export function useUpdateCategory() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => {
      setLoading(true);
      console.log("Data before mutation:", data);
      return updateCategory(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update category");
      setLoading(false);
    },
    onSuccess: (result: any, variables, context: any) => {
      console.log("Successfully updated Category");
      message.success("Category updated successfully");
      queryClient.invalidateQueries({ queryKey: ["category"] });
      queryClient.invalidateQueries({
        queryKey: ["category", { id: variables.catID }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDeleteCategory() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteCategory(id);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to delete category");
      setLoading(false);
    },
    onSuccess: () => {
      console.log("Successfully deleted Category");
      message.success("Category deleted successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}
