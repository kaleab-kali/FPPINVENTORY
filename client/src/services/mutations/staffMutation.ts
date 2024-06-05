import { useMutation, useQueryClient } from "@tanstack/react-query";
import { StaffData } from "../../../../shared/types/Staff";
import {
  createStaff,
  updateSelfPassword,
  updateStaff,
} from "../api/staffApi";
import { message } from "antd";

export function useCreateStaff() {
  console.log("useCreateStaff: ");
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
  console.log("useCreateStaff:", Array.from(data.entries()));
      createStaff(data)},
    onMutate: () => {
      console.log("Mutating");
    },
    onError: (error: any) => {
      console.log("error");
      message.error(error.message || "Failed to create staff");
    },
    onSuccess: () => {
      console.log("success");
      message.success("Staff created successfully");
    },
    onSettled: async (_: any, error: any) => {
      console.log("settled");
      if (error) {
        console.log(error);
      } else {
        await queryClient.invalidateQueries({ queryKey: ["staff"] });
      }
    },
  });
}

export function useUpdateStaff() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: FormData) => {
      console.log("Data before mutation:", data);
      return updateStaff(data);
    },
    onError: (error: any) => {
      console.error("Error updating satff:", error);
      message.error(error.message || "Failed to update staff");
    },
    onSuccess: () => {
      console.log("Successfully updated staff");
      message.success("staff updated successfully");
      queryClient.invalidateQueries({ queryKey: ["staff"] });
    },
    onSettled: async (_: any, error: any, variables: { email: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["staff", { id: variables.email }],
        });
      }
    },
  });
}

export function useUpdateSelfPassword() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: any) => {
      console.log("Data before mutation:", data);
      return updateSelfPassword(data);
    },
    onError: (error: any) => {
      console.error("Error updating password:", error);
      message.error(error.message || "Failed to update password");
    },
    onSuccess: () => {
      console.log("Successfully updated password");
      message.success("password updated successfully");
      // queryClient.invalidateQueries({ queryKey: ["password"] });
    },
    onSettled: async (_: any, error: any, variables: { email: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          // queryKey: ["password", { id: variables.email }],
        });
      }
    },
  });
}

