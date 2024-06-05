import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItem,
  createUpload,
  deleteItem,
  updateItem,
} from "../api/inventoryitemapi";
import { ItemInfo } from "../../../../shared/types/itemTypes";
import { message } from "antd";

export function useCreateItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ItemInfo) => createItem(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.error("Error creating item:", error);
      message.error(error.message || "Failed to create item");
    },
    onSuccess: () => {
      console.log("Success");
      message.success("Item created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
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
    onError: (error: any) => {
      console.error("Error uploading file:", error);
      message.error(error.message || "Failed to upload file");
    },
    onSuccess: (data: { filePath: any; fileName: any }) => {
      console.log("Success");
      message.success("File uploaded successfully");
      console.log("File uploaded successfully:", data.filePath);
      console.log("File Name:", data.fileName);
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
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
    onError: (error: any) => {
      console.error("Error updating item:", error);
      message.error(error.message || "Failed to update item");
    },
    onSuccess: () => {
      console.log("Successfully updated Item");
      message.success("Item updated successfully");
    },
    onSettled: async (_: any, error: any, variables: { employeeId: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
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
    onError: (error: any) => {
      console.error("Error deleting item:", error);
      message.error(error.message || "Failed to delete item");
    },
    onSuccess: () => {
      console.log("Successfully deleted item");
      message.success("Item deleted successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
      }
    },
  });
}
