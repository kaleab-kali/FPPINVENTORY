import { SupplierInfo } from "../../../../shared/types/Supplier";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getSupplierIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/supplier`);
    return data.map((supplier: SupplierInfo) => supplier._id);
  } catch (error) {
    handleError(error);
  }
};

export const getAllSuppliers = async () => {
  try {
    const data: SupplierInfo[] = await fetchWithAuth(`${BASE_URL}/supplier`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getSupplier = async (id: string) => {
  try {
    const data: SupplierInfo = await fetchWithAuth(
      `${BASE_URL}/supplier/${id}`
    );
    console.log("Fetched Supplier:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createSupplier = async (data: SupplierInfo) => {
  try {
    console.log("Data before mutation:", data);
    await fetchWithAuth(`${BASE_URL}/supplier`, {
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

export const updateSupplier = async (data: SupplierInfo) => {
  try {
    console.log("Data before mutation on update api:", data);
    const response = await fetchWithAuth(`${BASE_URL}/supplier/${data.sid}`, {
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

export const deleteSupplier = async (id: string) => {
  try {
    console.log("deleteSupplier", id);
    const response = await fetchWithAuth(`${BASE_URL}/supplier/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
