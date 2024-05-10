import { ProductInfo } from '../../../../shared/types/Product';

const BASE_URL = "http://localhost:8000";

export const getProductIds = async () => {
    console.log("getProductIds");
    const response = await fetch(`${BASE_URL}/items`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Product IDs");
    }
  
    const data = await response.json();
  
    return data.map((product: ProductInfo ) => product.productID);
  };
  
  export const getProduct = async (id: string) => {
    console.log("getProduct", id);
    const response = await fetch(`${BASE_URL}/items/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Products");
    }
  
    const data: ProductInfo = await response.json();
    console.log("Fetched Product:", data);
  
    return data;
  };

  export const getAllProducts = async () => {
    const response = await fetch(`${BASE_URL}/items`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Product IDs");
    }
  
  const data: ProductInfo[] = await response.json();
  console.log(data); 
    return data;
  };
  
  
  export const createProduct = async (data: ProductInfo) => {
    console.log("Data before mutation:", data);
    // await fetch(`${BASE_URL}/items`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // });
  };

  export const updateProduct = async (data: ProductInfo) => {
    const response = await fetch(`${BASE_URL}/items/${data.productID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Product data");
    }
  };
  
  
  export const deleteProduct = async (id: string) => {
    const response = await fetch(`${BASE_URL}/product/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete Product");
    }
  };