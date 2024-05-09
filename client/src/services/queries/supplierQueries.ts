import { useQueries, useQuery } from "@tanstack/react-query";
import { getSupplier, getSupplierIds, getAllSuppliers } from "../api/supplierApi";

export function useSupplierIds() {
    console.log("useSupplierIds");
  return useQuery({
    queryKey: ["supplier"],
    queryFn: getSupplierIds,
  });
}
export function useAllSuppliers() {
    return useQuery({
      queryKey: ["leaves"],
      queryFn: getAllSuppliers,
    });
  }
export function useSuppliers(ids: (string | undefined)[] | undefined) {
    console.log("useSuppliers", ids);
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["supplier", { id }],
        queryFn: () => getSupplier(id!),
      };
    }),
  });
}
export function useFindSupplierById(id: string | undefined) {
    console.log("useFindSupplierById");
  return useQuery({
    queryKey: ["supplier", { id }],
    queryFn: () => getSupplier(id!),
  });
}
