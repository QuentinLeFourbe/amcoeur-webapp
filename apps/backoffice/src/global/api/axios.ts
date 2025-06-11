import axios, { AxiosError } from "axios";
import {
  getTokenFromSessionStorage,
  removeTokenFromSessionStorage,
} from "../utils/auth";
import router from "../../routes";

export const applyAuthToken = () => {
  const token = getTokenFromSessionStorage();
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const logout = () => {
  removeTokenFromSessionStorage();
  delete axios.defaults.headers.common["Authorization"];
  router.navigate("/login");
};

const authToken = getTokenFromSessionStorage();

axios.interceptors.request.use((config) => {
  if (authToken) {
    config.headers.Authorization = `Bearer ${authToken}`;
  }
  return config;
});

axios.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
);
