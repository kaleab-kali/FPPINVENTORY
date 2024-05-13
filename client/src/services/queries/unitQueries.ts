import { useQueries, useQuery } from "@tanstack/react-query";
import { getUnit, getUnitIds, getAllUnits } from "../api/unitApi";

export function useUnitIds() {
    console.log("useUnitIds");
  return useQuery({
    queryKey: ["unit"],
    queryFn: getUnitIds,
  });
}
export function useAllUnits() {
    return useQuery({
      queryKey: ["unit"],
      queryFn: getAllUnits,
    });
  }
export function useUnits(ids: (string | undefined)[] | undefined) {
    console.log("useUnits", ids);
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["unit", { id }],
        queryFn: () => getUnit(id!),
      };
    }),
  });
}
export function useFindUnitById(id: string | undefined) {
    console.log("useFindUnitById");
  return useQuery({
    queryKey: ["unit", { id }],
    queryFn: () => getUnit(id!),
  });
}
