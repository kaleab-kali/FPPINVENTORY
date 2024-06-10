import { useQuery } from "@tanstack/react-query";
import { getEmployeeProfile } from "../api/employeeApi";

export function useEmployeeProfile(id: string) {
  return useQuery({
    queryKey: ["employee",{id}],
    queryFn: ()=>getEmployeeProfile(id!),
  });
}
