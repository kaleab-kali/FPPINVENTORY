import { ProductInfo } from "../../../../shared/types/Product";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getProductIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/items`);
    return data.map((product: ProductInfo) => product.productID);
  } catch (error) {
    handleError(error);
  }
};

export const getProduct = async (id: string) => {
  try {
    const data: ProductInfo = await fetchWithAuth(`${BASE_URL}/items/${id}`);
    console.log("Fetched Product:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllProducts = async () => {
  try {
    const data: ProductInfo[] = await fetchWithAuth(`${BASE_URL}/items`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createProduct = async (data: ProductInfo) => {
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

export const updateProduct = async (data: ProductInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/items/${data.productID}`, {
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

export const deleteProduct = async (id: string) => {
  try {
    console.log("deleteProduct: + id: " + id);
    await fetchWithAuth(`${BASE_URL}/items/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    handleError(error);
  }
};
