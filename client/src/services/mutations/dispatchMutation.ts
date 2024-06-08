import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DispatchInfo } from "../../../../shared/types/Dispatch";
import {
  createDispatch,
  updateDispatch,
  updateDistributeDispatch,
  returnDispatch,
  returnApproval,
} from "../api/dispatchApi";
import { message } from "antd";
import { useLoading } from "../../context/LoadingContext";

export function useCreateDispatch() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      setLoading(true);
      return createDispatch(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to create dispatch");
      setLoading(false);
    },
    onSuccess: () => {
      message.success("Dispatch created successfully");
      setLoading(false);
    },
    onSettled: async (_: any, error: any) => {
      setLoading(false);
      if (!error) {
        await queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      }
    },
  });
}

export function useUpdateDispatch() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      setLoading(true);
      return updateDispatch(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to update dispatch");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      message.success("Dispatch updated successfully");
      queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      queryClient.invalidateQueries({
        queryKey: ["dispatch", { id: variables.dispatchId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useDistributeDispatch() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      setLoading(true);
      return updateDistributeDispatch(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to distribute dispatch");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      message.success("Dispatch distributed successfully");
      queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      queryClient.invalidateQueries({
        queryKey: ["dispatch", { id: variables.dispatchId }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useReturnDispatch() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => {
      setLoading(true);
      return returnDispatch(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to return dispatch");
      setLoading(false);
    },
    onSuccess: (result: any, variables) => {
      message.success("Dispatch returned successfully");
      queryClient.invalidateQueries({ queryKey: ["uniqueItem"] });
      queryClient.invalidateQueries({
        queryKey: ["uniqueItem", { _id: variables._id }],
      });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}

export function useUpdateReturnApproval() {
  const { setLoading } = useLoading();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      setLoading(true);
      return returnApproval(data);
    },
    onError: (error: any) => {
      message.error(error.message || "Failed to approve return dispatch");
      setLoading(false);
    },
    onSuccess(result: any) {
      message.success("Dispatch returned successfully");
      queryClient.invalidateQueries({ queryKey: ["uniqueItem"] });
      setLoading(false);
    },
    onSettled: () => {
      setLoading(false);
    },
  });
}
