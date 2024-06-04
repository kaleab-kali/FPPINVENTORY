import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductInfo } from "../../../../shared/types/Product";
import { createProduct, updateProduct, deleteProduct } from "../api/productApi";
import { message } from "antd";

export function useCreateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInfo) => createProduct(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.error("Error creating product:", error);
      message.error(error.message || "Failed to create product");
    },
    onSuccess: () => {
      console.log("Success");
      message.success("Product created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });
}

export function useUpdateProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInfo) => {
      console.log("Data before mutation:", data);
      return updateProduct(data);
    },
    onError: (error: any) => {
      console.error("Error updating product:", error);
      message.error(error.message || "Failed to update product");
    },
    onSuccess: () => {
      console.log("Successfully updated product");
      message.success("Product updated successfully");
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
    onSettled: async (_: any, error: any, variables: { productID: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["product", { id: variables.productID }],
        });
      }
    },
  });
}

export function useDeleteProduct() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onError: (error: any) => {
      console.error("Error deleting product:", error);
      message.error(error.message || "Failed to delete product");
    },
    onSuccess: () => {
      console.log("Successfully deleted product");
      message.success("Product deleted successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });
}
