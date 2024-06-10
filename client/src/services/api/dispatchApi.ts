import { DispatchInfo } from "../../../../shared/types/Dispatch";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getDispatchIds = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/dispatch`);
    return data.map((dispatch: DispatchInfo) => dispatch.dispatchId);
  } catch (error) {
    handleError(error);
  }
};

export const getDispatch = async (id: string) => {
  try {
    const data: DispatchInfo = await fetchWithAuth(
      `${BASE_URL}/dispatch/${id}`
    );
    console.log("Fetched Dispatch:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const getAllDispatches = async () => {
  try {
    const data: DispatchInfo[] = await fetchWithAuth(`${BASE_URL}/dispatch`);
    console.log("Fetched Dispatches:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createDispatch = async (data: DispatchInfo) => {
  try {
    console.log("Data before mutation:", data);
    await fetchWithAuth(`${BASE_URL}/dispatch`, {
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

export const updateDispatch = async (data: DispatchInfo) => {
  try {
    console.log("Data before mutation update api:", data);
    await fetchWithAuth(`${BASE_URL}/dispatch/approve`, {
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

export const updateDistributeDispatch = async (data: DispatchInfo) => {
  try {
    console.log("Data before mutation update distribute api:", data);
    await fetchWithAuth(`${BASE_URL}/dispatch/dispatch-item`, {
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

export const returnDispatch = async (data: DispatchInfo) => {
  try {
    console.log("Data before mutation return api:", data);
    await fetch(`${BASE_URL}/dispatch/return`, {
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

export const returnApproval = async (data: any) => {
  try {
    console.log("Data before mutation return approval api:", data);
    await fetchWithAuth(`${BASE_URL}/dispatch/approve-return`, {
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