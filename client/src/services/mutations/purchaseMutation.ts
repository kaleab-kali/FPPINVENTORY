import { useMutation, useQueryClient } from "@tanstack/react-query";
import { PurchaseInfo } from "../../../../shared/types/Purchase";
import { updatePurchase, createPurchase } from "../api/purchaseApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreatePurchase() {
    const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PurchaseInfo[]) => {
      setLoading(true);
      return createPurchase(data)},
    onMutate: () => {
      // setLoading(true);
      console.log("Mutating");
    },
    onError: (error: any) => {
      setLoading(false);
      console.error("Error creating purchase:", error);
      message.error(error.message || "Failed to create purchase");
    },
    onSuccess: () => {
      setLoading(false);
      console.log("Success");
      message.success("Purchase created successfully");
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["purchase"] });
      }
    },
  });
}

export function useUpdatePurchase() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: PurchaseInfo) => {
      console.log("Data before mutation:", data);
      return updatePurchase(data);
    },
    onError: (error: any) => {
      console.error("Error updating purchase:", error);
      message.error(error.message || "Failed to update purchase");
    },
    onSuccess: () => {
      console.log("Successfully updated purchase");
      message.success("Purchase updated successfully");
      queryClient.invalidateQueries({ queryKey: ["purchase"] });
    },
    onSettled: async (_: any, error: any, variables: { purchaseID: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["purchase", { id: variables.purchaseID }],
        });
      }
    },
  });
}
