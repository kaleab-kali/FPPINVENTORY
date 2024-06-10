import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductInfo } from "../../../../shared/types/Product";
import { createProduct, updateProduct, deleteProduct } from "../api/productApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateProduct() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInfo) => {
      setLoading(true);
      return createProduct(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to create product");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Product created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });
}

export function useUpdateProduct() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInfo) => {
      setLoading(true);
      return updateProduct(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update product");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
      setLoading(false);
    },
    onSettled: async (_: any, error: any, variables) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({
          queryKey: ["product", { id: variables.productID }],
        });
      }
    },
  });
}

export function useDeleteProduct() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteProduct(id);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to delete product");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Product deleted successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });
}
