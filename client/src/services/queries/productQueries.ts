import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllProducts, getProductIds, getProduct} from "../api/productApi";

export function useProductIds() {
    console.log("useProductIds");
  return useQuery({
    queryKey: ["product"],
    queryFn: getProductIds,
  });
}
export function useAllProducts() {
    return useQuery({
      queryKey: ["product"],
      queryFn: getAllProducts,
    });
  }
export function useProducts(ids: (string | undefined)[] | undefined) {
    console.log("useProducts", ids);
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["product", { id }],
        queryFn: () => getProduct(id!),
      };
    }),
  });
}
export function useFindProductById(id: string | undefined) {
    console.log("useFindProductById");
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id!),
  });
}
