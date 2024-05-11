import { CategoryInfo } from '../../../../shared/types/Category';

const BASE_URL = "http://localhost:7000";

export const getCategoryIds = async () => {
    console.log("getCategoryIds");
    const response = await fetch(`${BASE_URL}/category`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Category IDs");
    }
  
    const data = await response.json();
  
    return data.map((category: CategoryInfo ) => category.id);
  };
  
  export const getCategory = async (id: string) => {
    console.log("getCategory", id);
    const response = await fetch(`${BASE_URL}/category/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Categorys");
    }
  
    const data: CategoryInfo = await response.json();
    console.log("Fetched Category:", data);
  
    return data;
  };

  export const getAllCategorys = async () => {
    const response = await fetch(`${BASE_URL}/category`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Category IDs");
    }
  
  const data: CategoryInfo[] = await response.json();
  console.log(data); 
    return data;
  };
  
  export const createCategory = async (data: CategoryInfo) => {
    console.log("Data before mutation:", data);
    await fetch(`${BASE_URL}/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  export const updateCategory = async (data: CategoryInfo) => {
    const response = await fetch(`${BASE_URL}/category/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Category data");
    }
  };
  
  
  export const deleteEmployee = async (id: string) => {
    const response = await fetch(`${BASE_URL}/category/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete category");
    }
  };