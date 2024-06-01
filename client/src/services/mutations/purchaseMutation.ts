import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PurchaseInfo } from '../../../../shared/types/Purchase';
import { updatePurchase } from "../api/purchaseApi";


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