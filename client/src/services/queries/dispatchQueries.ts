import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllDispatches, getDispatchIds, getDispatch} from "../api/dispatchApi";

export function useDispatchIds() {
    // console.log("useDisaptchIds");
  return useQuery({
    queryKey: ["dispatch"],
    queryFn: getDispatchIds,
  });
}
export function useAllDispatchs() {
    return useQuery({
      queryKey: ["dispatch"],
      queryFn: getAllDispatches,
    });
  }
export function useDispatches(ids: (string | undefined)[] | undefined) {
    // console.log("usedispatch", ids);
  return useQueries({
    queries: (ids ?? []).map((id) => {
      return {
        queryKey: ["dispatch", { id }],
        queryFn: () => getDispatch(id!),
      };
    }),
  });
}
export function useFindDispatchById(id: string | undefined) {
    // console.log("useFindProductById");
  return useQuery({
    queryKey: ["dispatch", { id }],
    queryFn: () => getDispatch(id!),
  });
}
