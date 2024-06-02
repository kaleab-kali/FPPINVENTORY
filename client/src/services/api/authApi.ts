// src/api/authApi.ts
const BASE_URL = "http://localhost:7000";

export const loginUser = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/invstaff/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Failed to login");
  }

  const data = await response.json();
  return data;
};
