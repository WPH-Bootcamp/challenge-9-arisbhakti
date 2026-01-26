import axios from "axios";

const rawBaseUrl = import.meta.env.VITE_API_BASE_URL as string | undefined;
const sanitizedBaseUrl = rawBaseUrl
  ? rawBaseUrl.replace(/\/api-swagger\/?$/i, "")
  : "";

export const API_BASE_URL = sanitizedBaseUrl;

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
  const token =
    localStorage.getItem("auth_token") || sessionStorage.getItem("auth_token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

const API = "/api";
export const ENDPOINTS = {
  RESTO: `${API}/resto`,
  RESTO_RECOMMENDED: `${API}/resto/recommended`,
  RESTO_BEST_SELLER: `${API}/resto/best-seller`,
  RESTO_SEARCH: `${API}/resto/search`,
  AUTH_LOGIN: `${API}/auth/login`,
  AUTH_REGISTER: `${API}/auth/register`,
  AUTH_ME: `${API}/auth/me`,
  AUTH_PROFILE: `${API}/auth/profile`,
  ORDER_MY: `${API}/order/my-order`,
  ORDER_CHECKOUT: `${API}/order/checkout`,
  REVIEW_MY: `${API}/review/my-reviews`,
  REVIEW: `${API}/review`,
  CART: `${API}/cart`,
};
