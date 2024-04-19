import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createItem, createUpload, deleteItem, updateItem } from "../api/inventoryitemapi";
import { ItemInfo } from "../../../../shared/types/itemTypes";

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ItemInfo) => createItem(data),
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
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
      }
    },
  });
}

export function useCreateUpload() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => createUpload(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: () => {
      console.log("error");
    },
    onSuccess: (data: { filePath: any; fileName: any; }) => {
      console.log("Success");
      // Access the data.filePath and data.fileName here
      console.log("File uploaded successfully:", data.filePath);
      console.log("File Name:", data.fileName);

      // Further processing if needed
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["uploads"] });
      }
    },
  });
}


export function useUpdateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ItemInfo) => {
      console.log("Data before mutation:", data);
      return updateItem(data);
    },
    onSuccess() {
      console.log("Successfully updated Item");
    },
    onSettled: async (_: any, error: any, variables: { employeeId: any; }) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
        await queryClient.invalidateQueries({
          queryKey: ["item", { id: variables.employeeId }],
        });
      }
    },
  });
}

export function useDeleteItem() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteItem(id),
    onSuccess() {
      console.log("Successfully deleted item");
    },
    onSettled: async (_: any, error: any) => {
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
      }
    },
  });
}
