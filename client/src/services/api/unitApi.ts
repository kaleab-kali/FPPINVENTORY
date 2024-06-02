import { UnitInfo } from "../../../../shared/types/Unit";
import BASE_URL from '../sharedVariables';

// const BASE_URL = "http://localhost:7000";

export const getUnitIds = async () => {
  console.log("getUnitIds");
  const response = await fetch(`${BASE_URL}/units`);

  if (!response.ok) {
    throw new Error("Failed to fetch units IDs");
  }

  const data = await response.json();

  return data.map((unit: UnitInfo) => unit.unitID);
};

export const getUnit = async (id: string) => {
  console.log("getUnit", id);
  const response = await fetch(`${BASE_URL}/units/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Units");
  }

  const data: UnitInfo = await response.json();
  console.log("Fetched Unit:", data);

  return data;
};

export const getAllUnits = async () => {
  const response = await fetch(`${BASE_URL}/units`);

  if (!response.ok) {
    throw new Error("Failed to fetch unit IDs");
  }

  const data: UnitInfo[] = await response.json();
  console.log(data);
  return data;
};

export const createUnit = async (data: UnitInfo) => {
  console.log("Data before mutation:", data);
  await fetch(`${BASE_URL}/units`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateUnit = async (data: UnitInfo) => {
  console.log("Data before updateApi:", data);
  const response = await fetch(`${BASE_URL}/units/${data.unitID}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update unit data");
  }
};

export const deleteUnit = async (id: string) => {
  const response = await fetch(`${BASE_URL}/units/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete unit");
  }
};
