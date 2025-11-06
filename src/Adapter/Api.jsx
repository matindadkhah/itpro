// src/Adapter/Api.jsx
import axios from "axios";
import ServerErrorHandler from "./ServerErrorHandler";


// ساخت یک instance از axios برای کل پروژه
const api = axios.create({
  baseURL: "/api", // از proxy استفاده می‌کنیم
  withCredentials: true, // اگر لاگین با کوکی است ضروریه
  headers: {
    "Content-Type": "application/json",
  },
});

// متدهای کمکی برای درخواست‌ها
export const Get = async (action, params = {}) => {
  try {
    const response = await api.get(`/${action}`, { params });
    return response.data ?? null;
  } catch (err) {
    throw new ServerErrorHandler(err);
  }
};

export const Post = async (action, data) => {
  try {
    const response = await api.post(`/${action}`, data);
    return response.data ?? null;
  } catch (err) {
    throw new ServerErrorHandler(err);
  }
};

export const Put = async (action, data = {}) => {
  try {
    const response = await api.put(`/${action}`, data);
    return response.data ?? null;
  } catch (err) {
    throw new ServerErrorHandler(err);
  }
};

export const Delete = async (action) => {
  try {
    const response = await api.delete(`/${action}`);
    return response.data ?? null;
  } catch (err) {
    throw new ServerErrorHandler(err);
  }
};
