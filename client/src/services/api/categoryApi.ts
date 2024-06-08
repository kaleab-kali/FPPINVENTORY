import { CategoryInfo } from "../../../../shared/types/Category";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getCategoryIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/category`);
    return data.map((category: CategoryInfo) => category.catID);
  } catch (error) {
    handleError(error);
  }
};

export const getCategory = async (id: string) => {
  try {
    const data: CategoryInfo = await fetchWithAuth(
      `${BASE_URL}/category/${id}`
    );
    console.log("Fetched Category:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllCategories = async () => {
  try {
    const data: CategoryInfo[] = await fetchWithAuth(`${BASE_URL}/category`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createCategory = async (data: CategoryInfo) => {
  try {
    console.log("Data before mutation:", data);
    await fetchWithAuth(`${BASE_URL}/category`, {
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

export const updateCategory = async (data: CategoryInfo) => {
  try {
    console.log("Data before update mutation:", data);
    await fetchWithAuth(`${BASE_URL}/category/${data.catID}`, {
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

export const deleteCategory = async (id: string) => {
  try {
    await fetchWithAuth(`${BASE_URL}/category/${id}`, {
      method: "DELETE",
    });
  } catch (error) {
    handleError(error);
  }
};
