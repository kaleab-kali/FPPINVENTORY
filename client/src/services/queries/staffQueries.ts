import {useQuery } from "@tanstack/react-query";

import { getAllStaff, getPersonnelStaff } from "../api/staffApi";

export function useAllStaff() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getAllStaff,
  });
}
export function usePersonnelStaff() {
  return useQuery({
    queryKey: ["staff"],
    queryFn: getPersonnelStaff,
  });
}
