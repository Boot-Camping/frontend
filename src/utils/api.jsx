import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiRequest = async (method, endpoint, data = {}, customHeaders = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...customHeaders,
  };

  const config = {
    method,
    url: `${API_BASE_URL}/api/${endpoint}`,
    headers,
    ...(method === "POST" && { data }),
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      const errorMessage = error.response.data.message || "오류가 발생했습니다";
      throw new Error(JSON.stringify({ status: statusCode, message: errorMessage }));
    } else if (error.request) {
      throw new Error("서버로부터 응답을 받지 못했습니다");
    } else {
      throw new Error(error.message);
    }
  }
};

export const get = (endpoint, customHeaders) =>
  apiRequest("GET", endpoint, {}, customHeaders);

export const post = (endpoint, data, customHeaders) =>
  apiRequest("POST", endpoint, data, customHeaders);
