const BASE_URL = "http://localhost:7000";

const getUserToken = () => {
  const userString = localStorage.getItem("user");

  if (!userString) {
    throw new Error("User not found in local storage");
  }

  const user = JSON.parse(userString);

  if (!user.token) {
    throw new Error("User token not found");
  }

  return user.token;
};

const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    const errorMessage = errorData.error || "An error occurred";
    throw new Error(errorMessage);
  }
  return response.json();
};

const handleError = (error: unknown) => {
  if (error instanceof Error) {
    throw new Error(error.message);
  } else {
    throw new Error(String(error));
  }
};

const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
  const token = getUserToken();
  const headers = {
    Authorization: `Bearer ${token}`,
    ...options.headers,
  };

  const response = await fetch(url, { ...options, headers });
  return handleResponse(response);
};

export { handleResponse, handleError, fetchWithAuth, BASE_URL };
