import { ItemInfo } from "../../../../shared/types/itemTypes";

const BASE_URL = "http://localhost:7000";
export const getItemIds = async () => {
  const response = await fetch(`${BASE_URL}/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch Leave IDs");
  }

  const data = await response.json();

  return data;
};
export const getAllItems = async () => {
  const response = await fetch(`${BASE_URL}/items`);

  if (!response.ok) {
    throw new Error("Failed to fetch Items");
  }

  const data: ItemInfo[] = await response.json();
  console.log(data);
  return data;
};

export const getSingleItem = async (id: string) => {
  const response = await fetch(`${BASE_URL}/items/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Leaves");
  }

  const data: ItemInfo[] = await response.json();

  const mappedData = data.map((leave) => ({
    _id: leave._id,
    reason: leave.reason,
    from: leave.from,
    to: leave.to,
    employeeId: leave.employeeId,
    employee: leave.employee
      ? {
          firstName: leave.employee.firstName,
          email: leave.employee.email,
          gender: leave.employee.gender,
          department: leave.employee.department,
        }
      : undefined,
  }));

  return data;
};

export const getItem = async (id: string) => {
  const response = await fetch(`${BASE_URL}/items/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch Leaves");
  }

  const data: ItemInfo[] = await response.json();


  return data;
};

export const createItem = async (data: ItemInfo) => {
  await fetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
};

export const updateItem = async (data: any) => {
  const response = await fetch(`${BASE_URL}/items/${data._id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update Item data");
  }
};

export const deleteItem = async (id: string) => {
  const response = await fetch(`${BASE_URL}/items/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to delete Item");
  }
};
