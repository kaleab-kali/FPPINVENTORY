import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DispatchInfo } from "../../../../shared/types/Dispatch";
import {
  createDispatch,
  updateDispatch,
  updateDistributeDispatch,
  returnDispatch,
} from "../api/dispatchApi";
import { message } from "antd";

export function useCreateDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => createDispatch(data),
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create dispatch");
    },
    onSuccess: () => {
      console.log("success");
      message.success("Dispatch created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      }
    },
  });
}

export function useUpdateDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      console.log("Data before mutation:", data);
      return updateDispatch(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to update dispatch");
    },
    onSuccess: (result: any, variables: { dispatchId: any }) => {
      console.log("Successfully updated Dispatch");
      message.success("Dispatch updated successfully");
      queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      queryClient.invalidateQueries({
        queryKey: ["dispatch", { id: variables.dispatchId }],
      });
    },
  });
}

export function useDistributeDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      console.log("Data before mutation:", data);
      return updateDistributeDispatch(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to distribute dispatch");
    },
    onSuccess: (result: any, variables: { dispatchId: any }) => {
      console.log("Successfully distributed Dispatch");
      message.success("Dispatch distributed successfully");
      queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      queryClient.invalidateQueries({
        queryKey: ["dispatch", { id: variables.dispatchId }],
      });
    },
  });
}

export function useReturnDispatch() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      console.log("Data before mutation:", data);
      return returnDispatch(data);
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to return dispatch");
    },
    onSuccess: (result: any, variables: { dispatchId: any }) => {
      console.log("Successfully returned Dispatch");
      message.success("Dispatch returned successfully");
      queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      queryClient.invalidateQueries({
        queryKey: ["dispatch", { id: variables.dispatchId }],
      });
    },
  });
}
