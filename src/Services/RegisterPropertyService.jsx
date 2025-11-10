// src/services/RegisterService.js
import { Delete, Post, Put } from "../Adapter/Api";

class RegisterPropertyService {
  async createAsset(data) {
    try {
      const response = await Post("properties/save", data);
      return response.data;
    } catch (error) {
      console.error("RegisterPropertyService.createAsset:", error);
      throw error.response?.errorMessage;
    }
  }

  async getAssets(params) {
    try {
      const response = await Post("properties", params); // 👈 skip و take در body ارسال می‌شوند
      return response.data;
    } catch (error) {
      console.error("RegisterPropertyService.getAssets:", error);
      throw error.response?.data || error.message;
    }
  }

  // src/services/RegisterPropertyService.js
  async deleteAsset(id) {
    try {
      const response = await Delete(`properties/${id}`);
      return response.data; // فرض بر این است API موفقیت یا پیام موفق برمی‌گرداند
    } catch (error) {
      console.error("RegisterPropertyService.deleteAsset:", error);
      throw error.response?.data || error.message;
    }
  }
  // src/services/RegisterPropertyService.js
  async updateAsset(id, data) {
    try {
      const response = await Put(`properties/edit`, {
        ...data,
        id,
        appAction: true,
      });
      return response.data;
    } catch (error) {
      console.error("RegisterPropertyService.updateAsset:", error);
      throw error.response?.data || error.message;
    }
  }
}

export default new RegisterPropertyService();
