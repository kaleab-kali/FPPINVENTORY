import { PurchaseInfo } from "../../../../shared/types/Purchase";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getPurchaseIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/purchase`);
    return data.map((purchase: PurchaseInfo) => purchase.purchaseID);
  } catch (error) {
    handleError(error);
  }
};

export const getPurchase = async (id: string) => {
  try {
    const data: PurchaseInfo = await fetchWithAuth(
      `${BASE_URL}/purchase/${id}`
    );
    console.log("Fetched Purchase:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllPurchases = async () => {
  try {
    const data: PurchaseInfo[] = await fetchWithAuth(`${BASE_URL}/purchase`);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createPurchase = async (data: PurchaseInfo[]) => {
  try {
    await fetchWithAuth(`${BASE_URL}/purchase`, {
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

export const updatePurchase = async (data: PurchaseInfo) => {
  try {
    await fetchWithAuth(`${BASE_URL}/purchase/${data.purchaseID}`, {
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

export const deletePurchase = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/purchase/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    handleError(error);
  }
};
