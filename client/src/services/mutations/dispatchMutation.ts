import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DispatchInfo } from '../../../../shared/types/Dispatch';
import { createDispatch, updateDispatch, updateDistributeDispatch, returnDispatch } from "../api/dispatchApi";
import exp from "constants";


export function useCreateDispatch() {
  // console.log("useCreateDispatch");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: DispatchInfo) => createDispatch(data),
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
        await queryClient.invalidateQueries({ queryKey: ["dispatch"] });
      }
    },
  });
}

export function useUpdateDispatch() {
    console.log("useUpdateDispatchapproval");
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: DispatchInfo) => {
        console.log("Data before mutation:", data);
        return updateDispatch(data);
      },
      onSuccess(result, variables, context) {
        console.log("Successfully updated Dispatch");
        queryClient.invalidateQueries({ queryKey: ["dispatch"] });
        queryClient.invalidateQueries({ queryKey: ["dispatch", {id : variables.dispatchId}] });
        
      }
      
     
    });
  
  }

  export function useDisrtibuteDispatch() {
    console.log("useUpdateDistributedDispatchapproval");
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: DispatchInfo) => {
        console.log("Data before mutation:", data);
        return updateDistributeDispatch(data);
      },
      onSuccess(result, variables, context) {
        console.log("Successfully updated Dispatch Disribute");
        queryClient.invalidateQueries({ queryKey: ["dispatch"] });
        queryClient.invalidateQueries({ queryKey: ["dispatch", {id : variables.dispatchId}] });
        
      }
      
     
    });
  
  }

  export function useReturnDispatch() {
    console.log("useUpdateDispatchapproval");
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (data: DispatchInfo) => {
        console.log("Data before mutation:", data);
        return returnDispatch(data);
      },
      onSuccess(result, variables, context) {
        console.log("Successfully updated Dispatch");
        queryClient.invalidateQueries({ queryKey: ["dispatch"] });
        queryClient.invalidateQueries({ queryKey: ["dispatch", {id : variables.dispatchId}] });
        
      }
      
     
    });
  }



