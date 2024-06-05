import { useQueries, useQuery } from "@tanstack/react-query";
import { getAllStocks} from "../api/stockApi";


export function useAllStocks() {
    return useQuery({
      queryKey: ["stock"],
      queryFn: getAllStocks,
    });
  }