import { SupplierInfo } from '../../../../shared/types/Supplier';
import BASE_URL from '../sharedVariables';

// const BASE_URL = "http://localhost:7000";

export const getSupplierIds = async () => {
    console.log("getSupplierIds");
    const response = await fetch(`${BASE_URL}/supplier`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch supplier IDs");
    }
  
    const data = await response.json();
  
    return data.map((supplier: SupplierInfo ) => supplier._id);
  };
  
  export const getSupplier = async (id: string) => {
    console.log("getSupplier", id);
    const response = await fetch(`${BASE_URL}/supplier/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch suppliers");
    }
  
    const data: SupplierInfo = await response.json();
    console.log("Fetched Supplier:", data);
  
    return data;
  };
  
  export const createSupplier = async (data: SupplierInfo) => {
    console.log("Data before mutation:", data);
    await fetch(`${BASE_URL}/supplier`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };

  export const updateEmployee = async (data: SupplierInfo) => {
    const response = await fetch(`${BASE_URL}/supplier/${data.sid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update supplier data");
    }
  };
  
  
  export const deleteEmployee = async (id: string) => {
    const response = await fetch(`${BASE_URL}/supplier/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  
    if (!response.ok) {
      throw new Error("Failed to delete supplier");
    }
  };