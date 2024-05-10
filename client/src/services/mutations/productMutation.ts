import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProductInfo } from '../../../../shared/types/Product';
import { createProduct } from "../api/productApi";

export function useCreateProduct() {
  console.log("useCreateProduct");
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
