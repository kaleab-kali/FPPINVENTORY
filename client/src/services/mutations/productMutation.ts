import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductInfo } from '../../../../shared/types/Product';
import { createProduct, updateProduct, deleteProduct } from "../api/productApi";

export function useCreateProduct() {
  // console.log("useCreateProduct");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInfo) => createProduct(data),
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
        await queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });
}

export function useUpdateProduct() {
  console.log("useUpdateSupplier");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ProductInfo) => {
      console.log("Data before mutation:", data);
      return updateProduct(data);
    },
    onSuccess(result, variables, context) {
      console.log("Successfully updated Product");
      queryClient.invalidateQueries({ queryKey: ["product"] });
      queryClient.invalidateQueries({ queryKey: ["product", {id : variables.productID}] });
      
    }
    
   
  });

}

export function useDeleteProduct () {
  console.log("useDeleteProduct");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteProduct(id),
    onSuccess() {
      console.log("Successfully deleted Product");
    },
    onSettled: async (_: any, error: any) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["product"] });
      }
    },
  });

}
