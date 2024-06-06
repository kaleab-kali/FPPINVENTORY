import { UniqueItemInfo } from "../../../../shared/types/UniqueItems";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";


export const getAllUniqueItems = async () => {
    try {
      const data = await fetchWithAuth(`${BASE_URL}/uniqueItem`);
      // const data = await response.json();
      // console.log(data);
    console.log("Fetched unique Item:", data);

      return data;
    } catch (error) {
      handleError(error);
    }
};

export const getUniqueItem = async (id: string) => {
  try {
    const data: UniqueItemInfo = await fetchWithAuth(
      `${BASE_URL}/uniqueItem/employee/${id}`
    );
    console.log("Fetched unique:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};