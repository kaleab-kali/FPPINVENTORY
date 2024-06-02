import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PurchaseInfo } from '../../../../shared/types/Purchase';
import { updatePurchase, createPurchase } from "../api/purchaseApi";


export function useCreatePurchase() {
  // console.log("useCreateProduct");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PurchaseInfo[]) => createPurchase(data),
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
        await queryClient.invalidateQueries({ queryKey: ["purchase"] });
      }
    },
  });
}


export function useUpdatePurchase() {
    console.log("useUpdatePurchaseapproval");
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: PurchaseInfo) => {
        console.log("Data before mutation:", data);
        return updatePurchase(data);
      },
      onSuccess(result, variables, context) {
        console.log("Successfully updated Product");
        queryClient.invalidateQueries({ queryKey: ["purchase"] });
        queryClient.invalidateQueries({ queryKey: ["purchase", {id : variables.purchaseID}] });
        
      }
      
     
    });
  
  }