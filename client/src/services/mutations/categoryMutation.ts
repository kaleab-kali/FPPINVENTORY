import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CategoryInfo } from '../../../../shared/types/Category';
import { createCategory } from "../api/categoryApi";

export function useCreateCategory() {
  console.log("useCreateCategory");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CategoryInfo) => createCategory(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: () => {
      console.log("success");
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["category"] });
      }
    },
  });
}
