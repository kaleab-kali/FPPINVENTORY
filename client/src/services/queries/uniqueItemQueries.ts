import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllUniqueItems} from "../api/uniqueItemsApi";

export function useAllUniqueItems() {
    return useQuery({
      queryKey: ["uniqueItem"],
      queryFn: getAllUniqueItems,
    });
  }
