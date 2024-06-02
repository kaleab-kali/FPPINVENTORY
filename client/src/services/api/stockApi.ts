import { StockInfo } from '../../../../shared/types/Stock';
import BASE_URL from '../sharedVariables';

// const BASE_URL = "http://localhost:7000";

export const getStockIds = async () => {
    console.log("getStockIds");
    const response = await fetch(`${BASE_URL}/stock`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Stock IDs");
    }
  
    const data = await response.json();
  
    return data.map((stock: StockInfo ) => stock._id);
  };
  
  export const getStock = async (id: string) => {
    console.log("getStock", id);
    const response = await fetch(`${BASE_URL}/stock/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Stocks");
    }
  
    const data: StockInfo = await response.json();
    console.log("Fetched Stock:", data);
  
    return data;
  };

  export const getAllStocks = async () => {
    const response = await fetch(`${BASE_URL}/stock`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Stock IDs");
    }
  
  const data: StockInfo[] = await response.json();
  console.log(data); 
    return data;
  };
  
  
  export const createStock = async (data: StockInfo) => {
    console.log("Data before mutation:", data);
    await fetch(`${BASE_URL}/stock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  export const updateStock = async (data: StockInfo) => {
    const response = await fetch(`${BASE_URL}/stock/${data._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Stock data");
    }
  };
  
  
//   export const deleteStock = async (id: string) => {
//     const response = await fetch(`${BASE_URL}/Stock/${id}`, {
//       method: "DELETE",
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
  
//     if (!response.ok) {
//       throw new Error("Failed to delete Stock");
//     }
//   };