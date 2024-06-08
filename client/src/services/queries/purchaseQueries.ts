import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllPurchases, getPurchaseIds, getPurchase} from "../api/purchaseApi";

export function usePurchaseIds() {
    // console.log("useProductIds");
  return useQuery({
    queryKey: ["purchase"],
    queryFn: getPurchaseIds,
  });
}
export function useAllPurchases() {
    return useQuery({
      queryKey: ["purchase"],
      queryFn: getAllPurchases,
    });
  }
export function usePurchases(ids: (string | undefined)[] | undefined) {
    // console.log("useProducts", ids);
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["purchase", { id }],
        queryFn: () => getPurchase(id!),
      };
    }),
  });
}
export function useFindPurchaseById(id: string | undefined) {
    // console.log("useFindProductById");
  return useQuery({
    queryKey: ["purchase", { id }],
    queryFn: () => getPurchase(id!),
  });
}
