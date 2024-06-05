import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateNotification } from "../api/notificationApi";
import { message } from "antd";
import { INotification2 } from "../../../../shared/types/Notification";

export function useUpdateNotification() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: INotification2) => {
      console.log("Data before mutation:", data);
      return updateNotification(data);
    },
    onError: (error: any) => {
      console.error("Error updating notification:", error);
    //   message.error(error.message || "Failed to update notification");
    },
    onSuccess: () => {
      console.log("Successfully updated notification");
    //   message.success("notification updated successfully");
      queryClient.invalidateQueries({ queryKey: ["notification"] });
    },
    onSettled: async (_: any, error: any, variables: { id: any }) => {
      console.log("Settled");
      if (error) {
        console.error("Error on settle:", error);
      } else {
        await queryClient.invalidateQueries({
          queryKey: ["product", { id: variables.id }],
        });
      }
    },
  });
}
