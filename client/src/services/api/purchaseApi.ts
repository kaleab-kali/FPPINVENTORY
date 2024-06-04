import { PurchaseInfo } from '../../../../shared/types/Purchase';
import BASE_URL from '../sharedVariables';

export const getPurchaseIds = async () => {
    // console.log("getProductIds");
    const response = await fetch(`${BASE_URL}/purchase`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Product IDs");
    }
  
    const data = await response.json();
  
    return data.map((purchase: PurchaseInfo ) => purchase.purchaseID );
  };
  
  export const getPurchase = async (id: string) => {
    console.log("getPurchase", id);
    const response = await fetch(`${BASE_URL}/purchase/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Purchases");
    }
  
    const data: PurchaseInfo = await response.json();
    console.log("Fetched Purchases:", data);
  
    return data;
  };

  export const getAllPurchases = async () => {
    const response = await fetch(`${BASE_URL}/purchase`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Purchase IDs");
    }
  
  const data: PurchaseInfo[] = await response.json();
  // console.log(data); 
    return data;
  };
  
  
  export const createPurchase = async (data: PurchaseInfo[]) => {
    console.log("Data before mutation:", data);
    await fetch(`${BASE_URL}/purchase`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  export const updatePurchase = async (data: PurchaseInfo) => {
    const response = await fetch(`${BASE_URL}/purchase/${data.purchaseID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Purchase data");
    }
  };
  
  
  export const deletePurchase = async (id: string) => {
    const response = await fetch(`${BASE_URL}/purchase/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete Purchase");
    }
  };