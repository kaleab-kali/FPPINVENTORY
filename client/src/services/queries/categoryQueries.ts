import { useQueries, useQuery } from "@tanstack/react-query";
import { getCategory, getAllCategorys, getCategoryIds} from "../api/categoryApi";

export function useCategoryIds() {
    console.log("useCategoryIds");
  return useQuery({
    queryKey: ["category"],
    queryFn: getCategoryIds,
  });
}
export function useAllCategorys() {
    return useQuery({
      queryKey: ["category"],
      queryFn: getAllCategorys,
    });
  }
export function useCategorys(ids: (string | undefined)[] | undefined) {
    console.log("useCategorys", ids);
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["category", { id }],
        queryFn: () => getCategory(id!),
      };
    }),
  });
}
export function useFindCategoryById(id: string | undefined) {
    console.log("useFindCategoryById");
  return useQuery({
    queryKey: ["category", { id }],
    queryFn: () => getCategory(id!),
  });
}
