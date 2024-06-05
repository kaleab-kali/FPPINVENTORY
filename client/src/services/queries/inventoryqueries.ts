import { useQueries, useQuery } from "@tanstack/react-query";
import {
  getAllItems,
  getItem,
  getItemIds,
  getSingleItem,
} from "../api/inventoryitemapi";

export function useItemIds() {
  return useQuery({
    queryKey: ["items"],
    queryFn: getItemIds,
  });
}
export function useAllItems() {
  return useQuery({
    queryKey: ["items"],
    queryFn: getAllItems,
  });
}
export function useItems(ids: (string | undefined)[] | undefined) {
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["item", { id }],
        queryFn: () => getItem(id!),
      };
    }),
  });
}
export function useItem(id: string | undefined) {
  return useQuery({
    queryKey: ["item", { id }],
    queryFn: () => getSingleItem(id!),
  });
}
export function useFindEmployeeById(id: string | undefined) {
  return useQuery({
    queryKey: ["item", { id }],
    queryFn: () => getItem(id!),
  });
}
