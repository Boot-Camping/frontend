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
    ...(method === "PUT" && { data }),
    ...(method === "DELETE" && { data }),
  };

  try {
    const response = await axios(config);
    return response.data;
  } catch (error) {
    if (error.response) {
      const statusCode = error.response.status;
      let errorMessage;
      if (typeof error.response.data === "object") {
        // 객체일 경우 "message" 값을 추출
        errorMessage =
          error.response.data.message || JSON.stringify(error.response.data);
      } else {
        errorMessage = error.response.data || "오류가 발생했습니다";
      }
      throw new Error(`Status: ${statusCode}, Message: ${errorMessage}`);
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

export const put = (endpoint, data, customHeaders) =>
  apiRequest("PUT", endpoint, data, customHeaders);

export const deleteRequest = (endpoint, data, customHeaders) =>
  apiRequest("DELETE", endpoint, data, customHeaders);
