import { CategoryInfo } from "../../../../shared/types/Category";
import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getAllStaff = async () => {
  try {
    const data = await fetchWithAuth(
      `${BASE_URL}/staff`
    );
    console.log("Fetched All Staff:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
export const getPersonnelStaff = async () => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/staff`);
    console.log("Fetched Personnel:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};

export const createStaff = async (data: CategoryInfo) => {
  try {
    console.log("Data before mutation:", data);
    await fetchWithAuth(`${BASE_URL}/staff`, {
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

// export const updateCategory = async (data: CategoryInfo) => {
//   try {
//     console.log("Data before update mutation:", data);
//     await fetchWithAuth(`${BASE_URL}/category/${data.catID}`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//   } catch (error) {
//     handleError(error);
//   }
// };

// export const deleteCategory = async (id: string) => {
//   try {
//     await fetchWithAuth(`${BASE_URL}/category/${id}`, {
//       method: "DELETE",
//     });
//   } catch (error) {
//     handleError(error);
//   }
// };
