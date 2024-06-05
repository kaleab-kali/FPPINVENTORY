import {  useQuery } from "@tanstack/react-query";
import { getAllUniqueItems, getUniqueItem } from "../api/uniqueItemsApi";

export function useAllUniqueItems() {
  return useQuery({
    queryKey: ["uniqueItem"],
    queryFn: getAllUniqueItems,
  });
}
export function useUniqueItemById(id: string | undefined) {
  console.log("useFindCategoryById");
  return useQuery({
    queryKey: ["uniqueItem", { id }],
    queryFn: () => getUniqueItem(id!),
  });
}
