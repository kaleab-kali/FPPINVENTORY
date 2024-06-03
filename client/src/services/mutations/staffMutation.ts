import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryInfo } from "../../../../shared/types/Category";
import {
  createStaff,
} from "../api/staffApi";
import { message } from "antd";

export function useCreateStaff() {
  console.log("useCreateStaff");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => createStaff(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create staff");
    },
    onSuccess: () => {
      console.log("success");
      message.success("Staff created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["staff"] });
      }
    },
  });
}


