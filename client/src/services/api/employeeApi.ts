import { fetchWithAuth, handleError, BASE_URL } from "../shared/sharedApi";

export const getEmployeeProfile = async (id: string) => {
  try {
    const data = await fetchWithAuth(`${BASE_URL}/employee/${id}`);
    console.log("Fetched employee data:", data);
    return data;
  } catch (error) {
    handleError(error);
  }
};
