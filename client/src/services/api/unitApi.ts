import { UnitInfo } from "../../../../shared/types/Unit";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getUnitIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/units`);
    return data.map((unit: UnitInfo) => unit.unitID);
  } catch (error) {
    handleError(error);
  }
};

export const getUnit = async (id: string) => {
  try {
    const data: UnitInfo = await fetchWithAuth(`${BASE_URL}/units/${id}`);
    console.log("Fetched Unit:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllUnits = async () => {
  try {
    const data: UnitInfo[] = await fetchWithAuth(`${BASE_URL}/units`);
    console.log(data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createUnit = async (data: UnitInfo) => {
  try {
    console.log("Data before mutation:", data);
    await fetchWithAuth(`${BASE_URL}/units`, {
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

export const updateUnit = async (data: UnitInfo) => {
  try {
    console.log("Data before updateApi:", data);
    const response = await fetchWithAuth(`${BASE_URL}/units/${data.unitID}`, {
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

export const deleteUnit = async (id: string) => {
  try {
    const response = await fetchWithAuth(`${BASE_URL}/units/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    handleError(error);
  }
};
