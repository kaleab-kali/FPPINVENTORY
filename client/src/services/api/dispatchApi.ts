import { DispatchInfo } from '../../../../shared/types/Dispatch';
import BASE_URL from '../sharedVariables'

export const getDispatchIds = async () => {
    // console.log("getDispatchIds");
    const response = await fetch(`${BASE_URL}/dispatch`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Dispatch IDs");
    }
  
    const data = await response.json();
  
    return data.map((dispatch: DispatchInfo ) => dispatch.dispatchId);
  };
  
  export const getDispatch = async (id: string) => {
    console.log("getDispatch", id);
    const response = await fetch(`${BASE_URL}/dispatch/${id}`);
  
    if (!response.ok) {
      throw new Error("Failed to fetch Dispatchs");
    }
  
    const data: DispatchInfo = await response.json();
    console.log("Fetched Dispatches:", data);
  
    return data;
  };

  export const getAllDispatches = async () => {
    const response = await fetch(`${BASE_URL}/dispatch`);
    
  
    if (!response.ok) {
      throw new Error("Failed to fetch Purchase IDs");
    }
  
  const data: DispatchInfo[] = await response.json();
  console.warn("repsnse", data);
    console.log("respnse log", data)
  // console.log(data); 
    return data;
  };
//   ===========================

export const createDispatch = async (data: DispatchInfo) => {
    console.log("Data before mutation:", data);
    await fetch(`${BASE_URL}/dispatch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  };



  export const updateDispatch = async (data: DispatchInfo) => {
    console.log("Data before mutation update api Tick:", data);
    const response = await fetch(`${BASE_URL}/dispatch/approve`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Dispatch data");
    }
  };

  export const updateDistributeDispatch = async (data: DispatchInfo) => {
    console.log("Data before mutation update disribute api:", data);
    const response = await fetch(`${BASE_URL}/dispatch/dispatch-item`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Dispatch data");
    }
  };

  export const returnDispatch = async (data: DispatchInfo) => {
    console.log("Data before mutation return api:", data);
    const response = await fetch(`${BASE_URL}/dispatch/return`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
  
    if (!response.ok) {
      throw new Error("Failed to update Dispatch data");
    }
  }

export const returnApproval = async (data: any) => {
  console.log("Data before mutation return approval api:", data);
  await fetch(`${BASE_URL}/dispatch/approve-return`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

}