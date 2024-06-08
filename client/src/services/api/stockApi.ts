import { StockInfo } from '../../../../shared/types/Stock';
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

// export const getStockIds = async () => {
//   try {
//     const data = await fetchWithAuth(`${BASE_URL}/stock`);
//     return data.map((stock: StockInfo) => stock._id);
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const getStock = async (id: string) => {
//   try {
//     const data: StockInfo = await fetchWithAuth(`${BASE_URL}/stock/${id}`);
//     console.log("Fetched Stock:", data);
//     return data;
//   } catch (error) {
//     handleError(error);
//   }
// };

export const getAllStocks = async () => {
  try {
    const data: StockInfo[] = await fetchWithAuth(`${BASE_URL}/stock`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

// export const createStock = async (data: StockInfo) => {
//   try {
//     console.log("Data before mutation:", data);
//     await fetchWithAuth(`${BASE_URL}/stock`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const updateStock = async (data: StockInfo) => {
//   try {
//     const response = await fetchWithAuth(`${BASE_URL}/stock/${data._id}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     handleError(error);
//   }
// };

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
