import { StaffData } from "../../../../shared/types/Staff";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getAllStaff = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/invstaff`);
    console.log("Fetched All Staff:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const getPersonnelStaff = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/invstaff/personnel`);
    console.log("Fetched Personnel:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createStaff = async (data: FormData) => {
  try {
    console.log("Data before mutation:", Array.from(data.entries()));
    await fetchWithAuth(`${BASE_URL}/invstaff/create-invstaff`, {
      method: "POST",
      // headers: {
      //   "Content-Type": "multipart/form-data",
      // },
      body: data,
    });
  } catch (error) {
    handleError(error);
  }
};


export const updateStaff = async (data: FormData) => {
  try {
    console.log("Data before update mutation:", data);
    const id = data.get("id");
    if (!id) throw new Error("ID is missing in form data");

    // Remove the ID from the form data as it doesn't need to be sent in the body
    data.delete("id");

    console.log("Data before update mutation:", data);
    await fetchWithAuth(`${BASE_URL}/invstaff/update-invstaff/${id}`, {
      method: "PUT",
      body: data,
    });
  } catch (error) {
    handleError(error);
  }
};

export const updateSelfPassword = async (data: any) => {
  try {
    console.log("Data before update mutation:", data);
    await fetchWithAuth(`${BASE_URL}/invstaff/change-password`, {
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
// export const deleteCategory = async (id: string) => {
//   try {
//     await fetchWithAuth(`${BASE_URL}/category/${id}`, {
//       method: "DELETE",
//     });
//   } catch (error) {
//     handleError(error);
//   }
// };
