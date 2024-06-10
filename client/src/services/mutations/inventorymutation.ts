import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createItem,
  createUpload,
  deleteItem,
  updateItem,
} from "../api/inventoryitemapi";
import { ItemInfo } from "../../../../shared/types/itemTypes";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateItem() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ItemInfo) => {
      setLoading(true);
      return createItem(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to create item");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Item created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
      }
    },
  });
}

export function useCreateUpload() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return createUpload(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to upload file");
      setLoading(false);
    },
    onSuccess: (data: { filePath: any; fileName: any }) => {
      message.success("File uploaded successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["uploads"] });
      }
    },
  });
}

export function useUpdateItem() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: ItemInfo) => {
      setLoading(true);
      return updateItem(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update item");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Item updated successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any, variables) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
        await queryClient.invalidateQueries({
          queryKey: ["item", { id: variables.employeeId }],
        });
      }
    },
  });
}

export function useDeleteItem() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => {
      setLoading(true);
      return deleteItem(id);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to delete item");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Item deleted successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["Items"] });
      }
    },
  });
}
