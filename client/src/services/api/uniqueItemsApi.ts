import { UniqueItemInfo } from "../../../../shared/types/UniqueItems";
import BASE_URL from "../sharedVariables";

export const getAllUniqueItems = async () => {
  const response = await fetch(`${BASE_URL}/uniqueItem`);

  if (!response.ok) {
    throw new Error("Failed to fetch unique Items ");
  }

  const data: UniqueItemInfo[] = await response.json();
  // console.log(data);
  return data;
};
