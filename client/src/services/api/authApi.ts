const BASE_URL = "http://localhost:7000";
export const loginEmployee = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/employee/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};

export const loginInvStaff = async (email: string, password: string) => {
  const response = await fetch(`${BASE_URL}/invstaff/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error("Login failed");
  }

  const data = await response.json();
  return data;
};
