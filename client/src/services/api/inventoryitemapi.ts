import { ItemInfo } from "../../../../shared/types/itemTypes";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getItemIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/items`);
    return data.map((item: ItemInfo) => item.itemId);
  } catch (error) {
    handleError(error);
  }
};
export const getItem = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/items/${id}`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllItems = async () => {
  try {
    const data: ItemInfo[] = await fetchWithAuth(`${BASE_URL}/items`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getSingleItem = async (id: string) => {
  try {
    const data: ItemInfo = await fetchWithAuth(`${BASE_URL}/items/${id}`);
    console.log("Fetched Item:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createItem = async (data: ItemInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/items`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};

export async function createUpload(data: FormData): Promise<any> {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/uploads`, {
      method: "POST",
      body: data,
    });

    const { message, filePath, fileName } = await response;

    console.log(message, filePath, fileName);

    // You can return any data you need from this mutation
    return { message, filePath, fileName };
  } catch (error) {
    handleError(error);
  }
}

export const updateItem = async (data: ItemInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/items/${data.itemId}`, {
      method: "PUT",
      headers: {
            "Content-Type": "application/json",
          },
      body: JSON.stringify(data),
    });
  } catch (error) {
    handleError(error);
  }
};

export const deleteItem = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
