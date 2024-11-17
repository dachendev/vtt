import axios from "axios";

export interface Credentials {
  username: string;
  password: string;
}

const apiBaseUrl = "http://localhost:3000";

export const loginWithCredentials = async (credentials: Credentials) => {
  const { data } = await axios.post(`${apiBaseUrl}/login`, credentials);
  return data;
};

export const getSessionUser = async (sessionId: string) => {
  const { data } = await axios.get(`${apiBaseUrl}/users/me`, {
    headers: {
      Authorization: `Bearer ${sessionId}`,
    },
  });
  return data;
};
